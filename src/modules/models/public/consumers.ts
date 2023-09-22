import { plainToInstance, Expose } from "class-transformer";
import { AuthenticateKeysData, ContactData } from "../superficial/contact";
import { CustomError, delay, unixTimeStampNow } from "labs-sharable";
import { Generator } from "../../services/generator";
import { FunctionHelpers } from "../../services/helper";
import { ApiKeyPrefix, BankIDTypes, DocumentTypes } from "../../enums/enums";
import { v4 as uuidv4 } from 'uuid';
import { ConsoleRegAccountRequest } from "../../interfaces/requests";
import { APIKeys, ConsumerProfile, ConsumerServiceJSON } from "../../interfaces/documents";
import { BankID } from "../bankid";

/**
 * ConsumerModel class
*/
export class ConsumerModel {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/

  /**
   * id look like [bcn_{id}]
   */
  @Expose() id = "";
  @Expose() name = "";
  @Expose() regNum = "";
  @Expose() tin = "";
  @Expose() apiKey = "";
  @Expose() email = "";
  @Expose() test = false;
  @Expose() created: number | undefined;
  @Expose() lut: number | undefined;
  @Expose() tier = 1;
  @Expose() contact: Record<string, unknown> = {};
  @Expose() keys: Record<string, unknown> = {};
  @Expose() apis: APIKeys | undefined;
  @Expose() profile: ConsumerProfile | undefined;
  // / monthly usage counter
  @Expose() usage: number | undefined;

  contactData: ContactData | undefined;
  keyData: AuthenticateKeysData | undefined;

  /**
   * Change record to ConsumerModel class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {ConsumerModel} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : ConsumerModel {
    const result: ConsumerModel = plainToInstance(ConsumerModel, obj,
      { excludeExtraneousValues: true });
    result.resolveMaps();
    return result;
  }

  /**
  * resolve maps for certain attributes
  * @return {void} text
  */
  public resolveMaps(): void {
    this.contactData = ContactData.fromJson(this.contact);
    this.keyData = AuthenticateKeysData.fromJson(this.keys);
  }

  /**
   * Helper class function to validate if org name already exists
   *
   * @param {ConsumerModel[]} list an array to sort from and find given
   * @param {string} name provide the needed id to match for
   * @return {ConsumerModel | undefined} found object else undefined
   */
  public static exists(list: ConsumerModel[], name: string)
    : ConsumerModel | undefined {
    for (let i = 0; i < list.length; i++) {
      if (list[i].name === name) return list[i];
    }
    return;
  }
  /**
   * Helper class function to find one specific object based on id
   *
   * @param {ConsumerModel[]} list an array to sort from and find given
   * @param {string} id provide the needed id to match for
   * @return {ConsumerModel | undefined} found object else undefined
   */
  public static findOne(list: ConsumerModel[], id: string)
    : ConsumerModel | undefined {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return;
  }

  /**
   * un-resolve maps for certain attributes
   * @return {void} nothing
   */
  public unResolveMaps(): void {
    if (this.contactData) this.contact = this.contactData.toMap();
    if (this.keyData) this.keys = this.keyData.toMap();
  }

  /**
   * This class handler to json
   * @return {string} text
   */
  public toJsonString(): string {
    return JSON.stringify(this);
  }

  /**
  * get document in map format
  * @return { Record<string, unknown>} returns doc map .
  */
  public toMap()
    : Record<string, unknown> {
    const res = JSON.parse(this.toJsonString());
    delete res["contactData"];
    delete res["keyData"];
    return res;
  }

  /**
   * creates a new consumer model
   * @param {ConsoleRegAccountRequest} request organisation create requester
   * @return {ConsumerModel} new Consumer
   */
  public static createConsumer(request: ConsoleRegAccountRequest,): ConsumerModel {
    const template: Record<string, unknown> = {
      "tier": 1,
      "test": false,
      "regNum": "", // edit
      "created": 1688536369,
      "usage": 0,
      "contact": {
        "emailVerified": false,
        "phone": "",
        "phoneVerified": false,
        "email": "",
      },
      "name": "", // edit
      "tin": "", // edit
      "id": "",
      "email": "", //edit
      "updatedAt": 1688536369,
      "keys": {
        "public": "",
      },
      "apis": {
        "live": "",
        "test": "",
      },
      "apiKey": "",
    };
    if (request.email == undefined) {
      throw new CustomError("Cannot create organisation with no reference to owner");
    }
    const data = ConsumerModel.fromJson(template);
    data.name = request.org;
    data.email = request.email;
    data.id = `${DocumentTypes.consumer}${uuidv4()}`;
    data.created = unixTimeStampNow();
    data.lut = unixTimeStampNow();
    data.test = request.debug;
    return data;
  }


  /**
   * generates consumer service json
   * @return {void} generated uid
   */
  public generateServiceJSON(): ConsumerServiceJSON {
    if (this.apiKey === undefined || this.apiKey.length < 1 ||
      this.keyData === undefined) {
      throw new CustomError("Consumer hasn't configured its api settings");
    }
    return {
      type: BankIDTypes.consumer,
      clientid: this.id,
      privatekey: this.keyData?.private,
      publickey: this.keyData?.public,
      authUri: `${BankID.Links.authUri}?sub=${this.id}`,
      apikeys: this.apis as APIKeys,
    }
  }


  /**
    * create unique RSA keys for app
    * @param {string} secret aes cipher key
    * @return {void} generated uid
    */
  public async generateRSA(secret: string, callback:
    (keys: AuthenticateKeysData) => void): Promise<void> {
    const gen = Generator.createRSAPairString();
    await delay(400);
    if (gen === undefined || !gen.private || !gen.public) {
      throw new CustomError("Could not generate RSA keys.")
    }
    const publicKey = FunctionHelpers.bankidCipherString(secret,
      gen.public);
    const privateKey = FunctionHelpers.bankidCipherString(secret,
      gen.private);
    this.keys = {
      public: publicKey,
      private: privateKey,
    };
    this.keyData = AuthenticateKeysData.fromJson(this.keys);
    this.generateApiKeys(secret);
    callback(this.keyData);
  }

  /**
   * create unique api keys for consumer
   * @param {string} secret cipher key
   * @return {void} generated api keys
   */
  private generateApiKeys(secret: string): void {
    const signable = {
      "name": this.name,
      "created": this.created,
      "identifier": this.id,
    };
    const source = FunctionHelpers.bankidCipherString(secret,
      JSON.stringify(signable));
    try {
      const cryp = FunctionHelpers.
        changeCipherStringToModel(source);
      this.apis = {
        live: `${ApiKeyPrefix.live}${cryp.content}`,
        test: `${ApiKeyPrefix.test}${cryp.iv}`,
      };
      this.apiKey = this.apis.live;
    } catch (error) {
      throw new CustomError("Failed creating credentials");
    }
  }

  /**
   * finally hash api keys for db storing
   * @return {void} generated api keys
   */
  public async hashAPIKeys(): Promise<void> {
    if (this.apis?.live === undefined || this.apis.live.length < 1) {
      throw new CustomError("Api keys haven't been created");
    }
    const live = await FunctionHelpers.generateApiKey(this.apis.live);
    const test = await FunctionHelpers.generateApiKey(this.apis.test);
    this.apis = {
      live: live,
      test: test,
    };
    this.apiKey = this.apis.live;
  }
}
