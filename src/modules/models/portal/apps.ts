import { plainToInstance, Expose } from "class-transformer";
import { v4 as uuidv4, v1 as uuidv1 } from 'uuid';
import { AppType, AppTypeSecretRef, BankIDTypes, DocumentTypes } from "../../enums/enums";
import { AppDataSecret, AppServiceJSON } from "../../interfaces/documents";
import { AuthenticateKeysData } from "../superficial/contact";
import { BankID } from "../bankid";
import { Generator } from "../../services/generator";
import { FunctionHelpers } from "../../services/helper";
import { CustomError, RSAKeys, delay, generateRandomAlphaNumeric, unixTimeStampNow } from "labs-sharable";
import { ActionCallback } from "../../interfaces/type_modules";
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
  @Expose() appName = "";
  @Expose() type: AppType = AppType.test;
  @Expose() displayName = "";
  @Expose() lut = 0;
  @Expose() created = 0;
  @Expose() secrets: AppDataSecret[] = [];
  @Expose() keys: RSAKeys = {private: "", public: ""};

  
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
    return result;
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
        `${type === AppType.production ?
          AppTypeSecretRef.production :
          AppTypeSecretRef.test}${uuidv1()}`),
      created: unixTimeStampNow(),
      revoked: false,
    };
  }

  /**
  * get document in map format
  * @return { Record<string, unknown>} returns doc map .
  */
  public toMap()
    : Record<string, unknown> {
    const res = JSON.parse(this.toJsonString());
    delete res["keyData"];
    return res;
  }

  /**
   * create a pretty unique uid for consumers
   * @return {string} generated uid
   */
  public static createID(): string {
    return `${DocumentTypes.app}${uuidv4()}`;
  }
}
