import { plainToInstance, Expose } from "class-transformer";
import { v4 as uuidv4 } from 'uuid';
import { BankIDTypes, DocumentTypes } from "../../enums/enums";
import { AppDataSecret, AppServiceJSON } from "../../interfaces/documents";
import { AuthenticateKeysData } from "../superficial/contact";
import { BankID } from "../bankid";
import { Generator } from "../../services/generator";
import { FunctionHelpers } from "../../services/helper";
import { CustomError } from "labs-sharable";
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
  @Expose() type = "";
  @Expose() displayName = "";
  @Expose() lut = 0;
  @Expose() created = 0;
  @Expose() secrets: AppDataSecret[] = [];
  @Expose() keys: Record<string, unknown> = {};
  // tod once back modify tojson not to show this key dat nad then add service file generation
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
   * create app service json
   * @param {string} secret cipher key
   * @param {string} clientid provide consumer id
   * @return {AppServiceJSON} generated uid
   */
  public generateServiceJSON(secret: string, clientid: string): AppServiceJSON {
    if (this.keyData === undefined) this.generateRSA(secret);
    if (this.keyData === undefined) {
      throw new CustomError("Could not still generate RSA keys."); 
    }
    return {
      type: BankIDTypes.app,
      appid: this.id,
      clientid: clientid,
      privatekey: this.keyData?.private,
      publickey: this.keyData?.public,
      authUri: `${BankID.Links.authUri}?sub=${clientid}&app=${this.id}`,
    }
  }
  
  /**
   * create unique RSA keys for app
   * @param {string} secret cipher key
   * @return {void} generated uid
   */
  private generateRSA(secret: string): void {
    const gen = Generator.createRSAPairString();
    if (gen !== undefined) {
      const publicKey = FunctionHelpers.bankidCipherString(secret,
        gen.public);
      const privateKey = FunctionHelpers.bankidCipherString(secret,
        gen.private);
      this.keys = {
        public: publicKey,
        private: privateKey,
      };
    } else {
      throw new CustomError("Could not generate RSA keys.")
    }
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
