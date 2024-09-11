import { plainToInstance, Expose } from "class-transformer";
import { AuthenticateKeysData, ContactData } from "../superficial/contact";
import { delay, unixTimeStampNow } from "labs-sharable";
import { Generator } from "../../services/generator";
import { FunctionHelpers } from "../../services/helper";
import { ApiKeyPrefix, BankIDTypes, DocumentTypes } from "../../enums/enums";
import { v4 as uuidv4 } from 'uuid';
import { ConsoleRegAccountRequest } from "../../interfaces/requests";
import { APIKeys, ConsumerServiceJSON } from "../../interfaces/documents";
import { BankID } from "../bankid";
import { SeverError } from "../../utils/server.error";

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
  @Expose() image = "";
  @Expose() regNum = "";
  @Expose() tin = "";
  @Expose() apiKey = "";
  @Expose() email = "";
  @Expose() test = false;
  @Expose() created: number | undefined;
  @Expose() lut: number | undefined;
  @Expose() tier = 1;
  @Expose() information?: ConsumerVerificationInfoModel;
  @Expose() stats?: {
    /**
     * Monthly eSign count
     */
    mec: number;
    /**
     * Monthly auth count
     */
    mac: number;
  };
  @Expose() contact: Record<string, unknown> = {};
  @Expose() keys: Record<string, unknown> = {};
  @Expose() apis: APIKeys | undefined;
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
   * Helper class function to find one specific object based on id
   *
   * @param {ConsumerModel[]} list an array to sort from and find given
   * @param {string} key provide api key needed to match for
   * @return {ConsumerModel | undefined} found object else undefined
   */
  public static matchApiKey(list: ConsumerModel[], key: string)
    : ConsumerModel | undefined {
    for (let i = 0; i < list.length; i++) {
      var a = list[i];
      if (a.validateApiKey(key)) {
        return a;
      }
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
  * @param {string[]} paths add attributes you'd like to omit from the map
  * @return { Record<string, unknown>} returns doc map .
  */
  public toMap(paths?:string[])
    : Record<string, unknown> {
    const res = JSON.parse(this.toJsonString());
    delete res["contactData"];
    delete res["keyData"];
    if (paths) {
      for (let i = 0; i < paths.length; i++){
        delete res[paths[i]];
      }
    }
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
      throw new SeverError("Cannot create organisation with no reference to owner");
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
      throw new SeverError("Consumer hasn't configured its api settings");
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
      throw new SeverError("Could not generate RSA keys.")
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
      throw new SeverError("Failed creating credentials");
    }
  }

  /**
   * finally hash api keys for db storing
   * @return {void} generated api keys
   */
  public hashAPIKeys(): void {
    if (!this.apis) return;
    this.apis = {
      live: FunctionHelpers.hashAPIKey(this.apis.live),
      test: FunctionHelpers.hashAPIKey(this.apis.test),
    }
    this.apiKey = this.apis.live;
  }
  

  /**
   * Validate if api key is valid
   * @param {string} other string value to compare
   * @return {boolean} valid or not
   */
  public validateApiKey(other: string): boolean {
    if (this.apiKey.length < 1) {
      return false;
    }
    const hash = FunctionHelpers.hashAPIKey(other);
    if (this.apis?.live === hash) return true;
    if (this.apis?.test === hash) return true;
    return false;
  }
}

/**
 * App Verification InfoModel
 */
export interface ConsumerVerificationInfoModel {
  legalName: string,
  domain: string,
  rcNumber: string,
  vat: string,
  description: string,
  address: string,
  country?: string,
  industry?: string,
  verified: boolean,
}