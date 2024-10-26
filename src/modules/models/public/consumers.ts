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
import generateApiKey from 'generate-api-key';
import { AppType, VerificationStatus, UserRoles, ConsumptionType } from "../../enums/shared";
import { ConsumerUserReference } from "../portal/consoleuser";

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
  @Expose() apiKey = "";
  @Expose() email = ""; // email used to create account
  @Expose() test = false;
  @Expose() created: number | undefined;
  @Expose() lut: number | undefined;
  @Expose() tier = 1;
  @Expose() information?: BusinessDetails;
  @Expose() billing: BillingCycle | null | undefined;
  /**
   * Statistics details of usage
   */
  @Expose() stats?: {
    production: {
      /**
       * Monthly eSign count
       */
      mec: number;
      /**
       * Monthly auth count
       */
      mac: number;
    },
    test: {
      /**
       * Monthly eSign count
      */
      mec: number;
      /**
       * Monthly auth count
       */
      mac: number;
    }
  };
  @Expose() contact: Record<string, unknown> = {};
  @Expose() keys: Record<string, unknown> = {};
  @Expose() apis: APIKeys = {
    live: "",
    test: ""
  };
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
  
  public static findPaystackCustomer(list: ConsumerModel[], id: string)
    : ConsumerModel | undefined {
    const c = "paystack_"+ id;
    for (let i = 0; i < list.length; i++) {
      if (list[i].billing && list[i].billing?.customer === c) return list[i];
    }
    return;
  }

  public findApiKey(env: AppType)
    : string {
    if (env === 'production' && this.apis) {
      return this.apis.live;
    } else if (env === 'test' && this.apis) {
      return this.apis.test;
    } else {
      return ""
    }
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

  public hasApiKeys(): boolean {
    return this.apis.live.length > 1 && this.apis.test.length > 1;
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
  public toMap(params?: {
    paths?: string[],
    detailPaths?: string[]
  })
    : Record<string, unknown> {
    const res = JSON.parse(this.toJsonString());
    delete res["contactData"];
    delete res["keyData"];
    if (params && params.paths) {
      for (let i = 0; i < params.paths.length; i++) {
        delete res[params.paths[i]];
      }
    } if (params && params.detailPaths && res.information) {
      for (let i = 0; i < params.detailPaths.length; i++) {
        delete res.information[params.detailPaths[i]];
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

  public readyForProduction(consumption?: ConsumptionType): void {
    if (!this.information) {
      throw new SeverError(`Information about ${this.name} is required to access production products.`, 400, 'authorization_error');
    } else if (this.information && (!(this.information.rcNumber) || !(this.information.type) || !(this.information.email))) {
      throw new SeverError(`Some business details for ${this.name} is missing and required to process this request.`, 400, 'invalid_request');
    } else if (!this.billing) {
      throw new SeverError(`${this.name} does not have any valid plans attached to it at the moment. Kindly resolve this to continue into production products.`, 400, 'invalid_request');
    } else if (this.billing && consumption && consumption === 'auth' && !(this.billing.authentication)) {
      throw new SeverError(`${this.name} needs to have a ${productname(consumption)}  subscription plan to achieve this action.`);
    } else if (this.billing && consumption && consumption === 'sign' && !(this.billing.signature)) {
      throw new SeverError(`${this.name} needs to have a ${productname(consumption)}  subscription plan to achieve this action.`);
    } else if (this.billing && consumption && consumption === 'all' && (!(this.billing.signature) && !(this.billing.signature))) {
      throw new SeverError(`${this.name} needs to have a ${productname(consumption)}  subscription plan to achieve this action.`);
    } else {
      return;
    }
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
    this.generateApiKeys();
    callback(this.keyData);
  }

  /**
   * create unique api keys for consumer
   * @param {string} secret cipher key
   * @return {void} generated api keys
   */
  public generateApiKeys(): void {
    var key = generateApiKey({ method: 'string', min: 32, max: 32, batch: 2 });
    this.apis = {
      live: `${ApiKeyPrefix.live}${key[0]}`,
      test: `${ApiKeyPrefix.test}${key[1]}`,
    };
  }

  /**
   * {@deprecated}
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
   * finally encrypt api keys for db storing
   * @return {void} generated api keys
   */
  public encryptAPIKeys(cipher: string): void {
    if (!this.apis) return;
    this.apis = {
      live: FunctionHelpers.bankidCipherString(cipher, this.apis.live),
      test: FunctionHelpers.bankidCipherString(cipher, this.apis.test),
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

  /**
   * Check if user has read write privilege
   * @param {ConsumerUserReference} user  the user in question
   * @param {boolean} ownerOnly  default valuer is false
   * @return {boolean} value
   */
  public static isaPrivilegedUser(user: ConsumerUserReference, ownerOnly: boolean = false): boolean {
    let parm: UserRoles[] = ['admin', 'owner'];
    if (ownerOnly) {
      parm = parm.filter(role => role !== 'admin');
    }
    return parm.includes(user.role);
  }

  public activePlans(): boolean {
    if (!this.billing) return false;
    return this.billing.authentication !== undefined || this.billing.signature !== undefined;
  }
  
  public static initiateDetails(): BusinessDetails {
    return {
      legalName: "",
      domain: "",
      rcNumber: "",
      vat: "",
      type: 'solopreneur',
      description: "",
      email: "",
      address: "",
      country: "",
      industry: "",
      status: 'stale',
    }
  }
}

export interface BusinessDetails {
  legalName: string,
  domain: string,
  rcNumber: string,
  type: "solopreneur" | "enterprise",
  vat?: string,
  description: string,
  email: string,
  address: string,
  country: string,
  industry: string,
  status: VerificationStatus,
}

export interface BillingCycle {
  domain: "test" | "live";
  customer: string; // if paystack - paystack_<customer id>
  authentication: IPlan | null | undefined;
  signature: IPlan | null | undefined;
  authorization: {
    map: Record<string, unknown>,
    keep: string; // authorization code which we will encrypt
  }
}

interface IPlan {
  plan: "basic" | "scale",
  cycle: "monthly" | "yearly",
  next_cycle?: number; // timestamp of next billing
  begun?: number; // timestamp when the subscription became active
  iat: number;
  subscription_code?: string
  token?: string
}


function productname(consumption: ConsumptionType): string {
  switch (consumption) {
    case 'auth':
      return 'authentication';
    case 'sign':
      return 'signature';
    case 'all':
      return 'authentication and signature'
  }
}