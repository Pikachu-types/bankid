import { LabsCipher, unixTimeStampNow } from "labs-sharable";
import fakeNINs = require("../jsons/fake-nin.json");
import {
  ApiKeyPrefix, AppConsumerReturn, AppType,
  AuthRequest, BAccount, BillingModel, ClientApp,
  ConsumerAppsResponse,
  ConsumerModel, DocumentReference, DocumentTypes,
  IdentificationModel, SeverError, SingleBankIDModel,
  StandaloneBankID, UsageRecording, VendorModel
} from "..";
import { DatabaseFunctions } from "./database";
import { ConsumerHelper } from "../modules/utils/consumer.helper";

/**
 * Service class for
 */
export class Accounts {

  readonly getter: DatabaseFunctions.Getters;

  constructor(getter: DatabaseFunctions.Getters,) {
    this.getter = getter;
  }

  /**
   * Get a some bankid account
   * @param {Record<string, unknown>} params arguments
   * @return {Promise<BAccount | undefined>} values
   */
  public async retrieve(params: {
    id: string,
    /**
     * if looking for consumer app/user reference add reference id
     */
    reference?: string,
    cipher: string
  }):
    Promise<BAccount | undefined> {
    let accounts: BAccount[] = [];
    if (params.id.startsWith(DocumentTypes.consumer)) {
      accounts = await this.getter.retrieveConsumers();
    } else if (params.id.startsWith(DocumentTypes.app) && params.reference) {
      accounts = await this.getter.getConsumerApps(params.reference);
    } else if (params.id.startsWith(DocumentTypes.user) && params.reference) {
      accounts = await this.getter.retrieveRegisteredNINs(params.cipher);
    } else {
      throw new SeverError("Invalid account identifier");
    }

    if (accounts.length < 1) {
      throw new SeverError("Found no accounts for such identifier");
    }

    if (accounts[0] instanceof IdentificationModel) {
      return IdentificationModel.findOne(accounts as IdentificationModel[], params.id);
    } else if (accounts[0] instanceof ConsumerModel) {
      return ConsumerModel.findOne(accounts as ConsumerModel[], params.id);
    } else if (accounts[0] instanceof ClientApp) {
      return ClientApp.findOne(accounts as ClientApp[], params.id);
    } else {
      return;
    }
  }

  /**
   * A clamp function to get a specific registered user
   * @param {Record<string, unknown>} params required arguments 
   * @return {Promise<IdentificationModel>} gotten model containing need content
   */
  public async getRegisteredUser(params: {
    /**
     * possible reference to a registered nin
     */
    id: string,
    /**
     * encryption key
     */
    cipher: string,
  }):
    Promise<IdentificationModel> {
    if (!params.id.startsWith("bid_")) {
      throw new SeverError("Invalid identifier");
    }
    const registeredNINs = await this.getter.retrieveRegisteredNINs(params.cipher);
    const user = IdentificationModel.findOne(registeredNINs,
      params.id);
    if (!user) {
      throw new SeverError("National does not have a pasby™ digital ID", 404);
    }
    return user;
  }

  /**
   * Generate fake nin information for test consumer
   * @return {IdentificationModel} gotten model containing need content
   */
  public static fakeUser():
    IdentificationModel {
    const user = IdentificationModel.fromJson(fakeNINs[0]);
    user.resolveMaps();
    user.unResolveMaps();
    return user;
  }

  /**
   * A clamp function to get a validate app credentials
   * @param {Record<string, unknown>} params arguments
   * @return {Promise<AppConsumerReturn | undefined>} valid or not
   */
  public async validateAuthRequest(params: {
    data: AuthRequest,
    cipher: string
  }):
    Promise<AppConsumerReturn | undefined> {
    if (params.data.app === undefined) {
      throw new SeverError("Missing app identifier", 403);
    }
    const consumer = await this.getConsumer(params.data.consumer, params.cipher);
    const app = await this.getApp(params.data.app, params.data.consumer, params.cipher);
    const valid = consumer.validateApiKey(params.data.key) &&
      app.validateSecret(params.data.secret, params.cipher);

    if (!valid) {
      throw new SeverError("Requester is not authorized", 401);
    }

    if (params.data.key.startsWith(ApiKeyPrefix.test) &&
      app.type === AppType.production) {
      throw new SeverError("Cannot apply a test key to a production type application", 403);
    }
    return {
      consumer: consumer,
      app: app,
    };
  }

  /**
     * Validates the provided API key against the list of consumers.
     * @param params - An object containing the API key to validate.
     * @param params.apikey - The consumer API key to validate.
     * @returns The consumer associated with the provided API key if valid.
     * @throws {SeverError} If the API key is not valid.
     */
  public async validateConsumer(params: {
    /**
     * Consumer api key
     */
    apikey: string,
    /**
    * client secret key
    */
    appSecret: string,
    cipher: string,
  }) {
    const consumer = ConsumerModel.
      matchApiKey(await this.getter.retrieveConsumers(), params.apikey);
    if (!consumer) {
      throw new SeverError("Request forbidden: Api key not valid", 403);
    }
    const app = ClientApp.
      matchSecretKey(await this.getter.getConsumerApps(consumer.id), params.appSecret, params.cipher);

    if (!app) {
      throw new SeverError("Request forbidden: App secret not valid", 403);
    }

    return {
      consumer: consumer,
      app: app,
    }
  }

  /**
  * Authenticate mobile applications
  * @param {Record<string, unknown>} params required arguments
  * @return {Promise<ConsumerAppsResponse>} returns auth token
  */
  public async authenticateApp(params: {
    /**
     * Consumer api key
     */
    apikey: string,
    /**
     * client secret key
     */
    appSecret: string,
    /**
     * Finsel DGI pasby jwt encryption key
     */
    jwt: string,
    cipher: string,
  }):
    Promise<ConsumerAppsResponse> {
    const consumer = ConsumerModel.
      matchApiKey(await this.getter.retrieveConsumers(), params.apikey);
    if (consumer === undefined) {
      throw new SeverError("Request forbidden: Api key not valid", 403);
    }
    const app = ClientApp.
      matchSecretKey(await this.getter.getConsumerApps(consumer.id), params.appSecret, params.cipher);

    if (app === undefined) {
      throw new SeverError("Request forbidden: App secret not valid", 403);
    }

    if (params.apikey.startsWith(ApiKeyPrefix.test) &&
      app.type === AppType.production) {
      throw new SeverError("Cannot apply a test key to a production type application", 403);
    }
    const data = {
      sub: consumer.id,
      app: app.id,
      secret: params.appSecret,
      iat: unixTimeStampNow(),
      name: app.displayName,
    };
    const token = LabsCipher.jwtSign(data, params.jwt, "10min");
    const result = await ConsumerHelper.validateTokenAlone(token, params.jwt);
    return {
      token: token,
      model: result,
    };
  }

  /**
  * Validate consumer existence
  * @param {string} id account id
  * @return {Promise<boolean>} returns true or false
  */
  public async consumerExist(id: string): Promise<boolean> {
    const exists = await this.getter.doesDocumentExist(id, DocumentReference.
      consumers);
    if (!exists) throw new SeverError("Client does not exist", 400);
    else return true;
  }

  /**
 * A clamp function to get a specific issued bank id
 * @param {string} params arguments
 * @return {Promise<SingleBankIDModel>} gotten model containing need content
 */
  public async getIssuedBankID(params: {
    /**
     * possible reference to an issued bank id
     */
    id: string,
    cipher: string,
  }): Promise<SingleBankIDModel> {
    if (!params.id.startsWith("std_") || (params.id.split("-").length != 2)) {
      throw new SeverError("Invalid standalone identifier");
    }

    const nin = params.id.split("-")[0].split("_")[1];
    const bid = `bid_${nin}`;

    const registeredNINs = await this.getter.retrieveRegisteredNINs(params.cipher);
    const vendors = await this.getter.retrieveVendors(params.cipher);
    const issuedIDs = await this.getter.retrieveIssuedBankIDs(bid);

    // console.log("Found ids: ", issuedIDs.map((value) => {
    //   return value.id;
    // }).join(", "));
    const user = IdentificationModel.findOne(registeredNINs, bid);
    const issued = StandaloneBankID.findOne(issuedIDs, params.id);
    if (!user) {
      throw new SeverError("User not found");
    }
    if (!issued) {
      throw new SeverError("No such issued pasby");
    }
    const vendor = VendorModel.findOne(vendors, issued.vendor);
    if (!vendor) {
      throw new SeverError("This was issued by an unknown vendor");
    }
    return {
      issued: issued,
      user: user,
      vendor: vendor,
    };
  }

  /**
   * Get a consumer
   * @param {string} id account retrieval
   * @param {string} cipher encryption key
   * @return {Promise<ConsumerModel>} returns consumer
   */
  public async getConsumer(id: string, cipher: string): Promise<ConsumerModel> {
    const client = await this.retrieve({
      id: id,
      cipher: cipher,
    });
    if (client === undefined || !(client instanceof ConsumerModel)) {
      throw new SeverError("No such consumer", 400);
    } else {
      return client;
    }
  }

  /**
  * Get a consumer
  * @param {string} id account retrieval
  * @param {string} clientid id of consumer
  * @param {string} cipher encryption key
  * @return {Promise<ClientApp>} returns app
  */
  public async getApp(id: string, clientid: string, cipher: string): Promise<ClientApp> {
    const app = await this.retrieve({
      id: id,
      reference: clientid,
      cipher: cipher,
    });
    if (app === undefined || !(app instanceof ClientApp)) {
      throw new SeverError(`App id: ${id} no longer or never existed`, 400);
    } else {
      return app;
    }
  }


  /**
   * A clamp function to register api usage
   * @param {UsageRecording} request usage data
   * @param {ConsumerModel} consumer consumer
   * @param {DatabaseFunctions.Management} database handle any document updates
   * @return {Promise<BillingModel>} action carried
   */
  public async logApiUsage(request: UsageRecording,
    consumer: ConsumerModel, database: DatabaseFunctions.Management):
    Promise<BillingModel> {
    // validate we creating a new bill
    const timeline = BillingModel.generateDocID();
    let billing;
    let create = false;

    const b = BillingModel.
      findOne(await this.getter.getApiBillingUsages(consumer.id), timeline);
    if (!b) {
      billing = new BillingModel();
      billing.timeline = timeline;
      create = true;
    } else {
      billing = b;
    }

    billing.count = billing.count +
      (request.action === "increment" ? +1 : -1);
    billing.cost = billing.cost + request.cost;
    billing.lut = unixTimeStampNow();
    const route = `${request.mode} ${request.route}`;
    billing.endpoints[route] = billing.endpoints[route] ?
      (billing.endpoints[route]) + 1 : 1;

    // upload
    await database.updateConsumerBillingHistory(billing, consumer, create);

    return billing;
  }
}
