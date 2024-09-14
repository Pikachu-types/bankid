import { plainToInstance, Expose } from "class-transformer";
import { v4 as uuidv4, v1 as uuidv1 } from 'uuid';
import { AppTypeSecretRef, DocumentTypes } from "../../enums/enums";
import { AppDataSecret } from "../../interfaces/documents";
import { AuthenticateKeysData } from "../superficial/contact";
import { Generator } from "../../services/generator";
import { FunctionHelpers } from "../../services/helper";
import { delay, generateRandomAlphaNumeric, unixTimeStampNow } from "labs-sharable";
import { SeverError } from "../../utils/server.error";
import { AppFrameworkType, AppType, AppVerificationStatus, ClientScope, ConsumptionType } from "../..";
/**
 * ClientApp class
*/
export class ClientApp {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/

  /**
   * id look like [app_{id}]
   */
  @Expose() id = "";
  @Expose() owner = "";
  @Expose() technology?: {
    type: AppFrameworkType,
    framework: string,
  };
  @Expose() appName = "";
  @Expose() type: AppType = 'test';
  @Expose() consumption?: ConsumptionType;
  @Expose() verificationStatus: AppVerificationStatus = 'stale';
  @Expose() displayName = "";
  @Expose() lut = 0;
  @Expose() created = 0;
  @Expose() information?: AppVerificationInfoModel;
  @Expose() secrets: AppDataSecret[] = [];
  /**
   * Whitelisted urls
   */
  @Expose() urls: string[] = [];
  @Expose() scopes: ClientScope[] = [];
  @Expose() keys?: {
    private?: string;
    public: string;
  };
  
  keyData: AuthenticateKeysData | undefined;


  /**
   * Change record to ClientApp class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {ClientApp} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : ClientApp {
    const result: ClientApp = plainToInstance(ClientApp, obj,
      { excludeExtraneousValues: true });
    result.resolveMaps();
    return result;
  }

  /**
   * un-resolve maps for certain attributes
   * @return {void} nothing
   */
  public unResolveMaps(): void {
    if (this.keyData) this.keys = {
      private: this.keyData.private ?? '',
      public: this.keyData.public,
    };
  }


  /**
  * resolve maps for certain attributes
  * @return {void} text
  */
  public resolveMaps(): void {
    if (this.keys && this.keys.public && this.keys.public.length > 10) {
      this.keyData = AuthenticateKeysData.fromJson(this.keys);
    }
  }


  /**
   * Validate if secret is valid
   * @param {string} other string value to compare
   * @param {string} cipher provide the secret for cipher process
   * @return {boolean} valid or not
   */
  public validateSecret(other: string, cipher:string): boolean {
    if (this.secrets === undefined) {
      return false;
    }
    let flag = false;
    for (let i = 0; i < this.secrets.length; i++){
      var secret = FunctionHelpers.bankidCipherToString(cipher,
        this.secrets[i].secret);
      if (secret === other && !this.secrets[i].revoked) {
        flag = true;
        break;
      }
    }
    return flag;
  }

  /**
   * Helper class function to find one specific object based on id
   *
   * @param {ConsumerModel[]} list an array to sort from and find given
   * @param {string} secret provide app secret needed to match for
   * @param {string} cipher provide the secret for cipher process
   * @return {ClientApp | undefined} found object else undefined
   */
  public static matchSecretKey(list: ClientApp[], secret: string, cipher: string)
    : ClientApp | undefined {
    for (let i = 0; i < list.length; i++) {
      var a = list[i];
      if (a.validateSecret(secret, cipher)) {
        return a;
      }
    }
    return;
  }

  /**
   * Helper class function to find one specific object based on id
   *
   * @param {ClientApp[]} list an array to sort from and find given
   * @param {string} id provide the needed id to match for
   * @return {ClientApp | undefined} found object else undefined
   */
  public static findOne(list: ClientApp[], id: string)
    : ClientApp | undefined {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return;
  }
  
  /**
   * create unique RSA keys for app
   * @param {string} secret aes cipher key
   * @return {void} generated uid
   */
  public async generateRSA(secret: string, callback: (keys: AuthenticateKeysData) => void): Promise<void> {
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
    callback(this.keyData);
  }

  /**
   * This class handler to json
   * @return {string} text
   */
  public toJsonString(): string {
    return JSON.stringify(this);
  }
  
  /**
   * Create new app secret
   * @param {string} secret aes cipher key
   * @param {AppType} type app type
   * @return {string} text
   */
  public static generateSecret(secret: string, type: AppType): AppDataSecret {
    return {
      id: generateRandomAlphaNumeric(12),
      secret: FunctionHelpers.bankidCipherString(secret,
        `${type === 'production' ?
          AppTypeSecretRef.production :
          AppTypeSecretRef.test}${uuidv1()}`),
      created: unixTimeStampNow(),
      revoked: false,
    };
  }

  /**
  * get document in map format
  * @param {string[]} paths add attributes you'd like to omit from the map
  * @return { Record<string, unknown>} returns doc map .
  */
  public toMap(paths?: string[])
    : Record<string, unknown> {
    const res = JSON.parse(this.toJsonString());
    delete res["keyData"];
    if (paths) {
      for (let i = 0; i < paths.length; i++) {
        delete res[paths[i]];
      }
    }
    return res;
  }

  /**
   * create a pretty unique uid for consumers
   * @return {string} generated uid
   */
  public static createID(): string {
    return `${DocumentTypes.app}${uuidv4()}`;
  }
  
  /**
   * Check if app is safe to return real nin-data
   * @return {boolean} generated uid
   */
  public safeApp(): boolean {
    return this.verificationStatus === 'verified'
      && this.type === 'production';
  }  

  /**
   * Check if app is a test app
   * @return {boolean} generated uid
   */
  public testApp(): boolean {
    return this.type === 'test';
  }
}

/**
 * App Verification InfoModel
 */
export interface AppVerificationInfoModel {
  description: string,
  category?: string,
  regulated?: boolean,
  verified: boolean,
  requestsCount?: string,
}