import {plainToInstance, Expose} from "class-transformer";
import {AuthenticateKeysData, ContactData} from "../superficial/contact";
import {CustomError} from "labs-sharable";
import { Generator } from "../../services/generator";
import { FunctionHelpers } from "../../services/helper";


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
  @Expose() updatedAt: number | undefined;
  @Expose() tier = 1;
  @Expose() contact: Record<string, unknown> = {};
  @Expose() keys: Record<string, unknown> = {};
  @Expose() apis: Record<string, unknown> = {};
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
   * create a pretty unique uid for consumers
   * @param {string} token jwt token
   * @param {string} tin tax identification number
   * @return {string} generated uid
   */
  public static createConsumerID(token: string, tin: string): string {
    const signature = token.split(".");

    if (signature.length != 3) {
      throw new CustomError("Invalid token");
    }

    if (tin.length > 13 || tin.length < 10) {
      throw new CustomError("Invalid Tax Identification Number");
    }

    return "bcn_" + signature[2].replace("h-", "") + "-" +
      tin.substring(0, 4) + tin.substring(10, 12);
  }

  /**
   * create unique keys for consumer
   * @param {string} secret cipher key
   * @return {void} generated uid
   */
  public createIdentifiers(secret:string): void {
    const gen = Generator.createRSAPairString();

    // console.log("Gen returned: ", gen);
    if (gen !== undefined) {
      const publicKey = FunctionHelpers.bankidCipherString(secret,
        gen.public);
      const privateKey = FunctionHelpers.bankidCipherString(secret,
        gen.private);
      this.keys = {
        "public": publicKey,
        "private": privateKey,
      };
    }
    const signable = {
      "name": this.name,
      "created": this.created,
      "email": this.email,
      "regNum": this.regNum,
      "tin": this.tin,
    };
    const source = FunctionHelpers.bankidCipherString(secret,
      JSON.stringify(signable));
    // console.log("Org signature: ", signable);

    try {
      const cryp = FunctionHelpers.
        changeCipherStringToModel(source);
      this.id = "bcn_" + cryp.iv + "-" +
        this.tin.substring(0, 4) + this.tin.substring(10, 12);
      this.apiKey = `bk-live_${cryp.content}`;
      this.apis = {
        "live": this.apiKey,
        "test": `bk-test_${cryp.iv}`,
      };
    } catch (err) {
      console.log("Failed creating credentials");
    }

    this.resolveMaps();
  }
}
