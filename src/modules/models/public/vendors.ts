import {plainToInstance, Expose, Exclude} from "class-transformer";
import {
  AddressData,
  AuthenticateKeysData,
  ContactData
} from "../superficial/contact";
import { FunctionHelpers } from "../../services/helper";
import { Generator } from "../../services/generator";

/**
 * VendorModel class
*/
export class VendorModel {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/

  /**
   * id for vendors look like [vnd_{id}]
   */
  @Expose() id = "";
  @Expose() name = "";
  @Expose() domain = "";
  @Expose() regNum = "";
  // @Expose() verificationDomain = "";
  @Expose() created: number | undefined;
  @Expose() lut: number | undefined;
  @Expose() tier = 1;
  @Expose() test = false;
  @Expose() apis: Record<string, unknown> = {};
  @Expose() contact: Record<string, unknown> = {};
  @Expose() keys: Record<string, unknown> = {};
  @Expose() address: Record<string, unknown> = {};
  /**
   * monthly usage counter
   */
  @Expose()
    usage: number | undefined;

  @Exclude()
    contactData: ContactData | undefined;
  @Exclude()
  addressData: AddressData | undefined;
  
  keyData: AuthenticateKeysData | undefined;


  /**
   * Change record to VendorModel class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {VendorModel} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : VendorModel {
    const result: VendorModel = plainToInstance(VendorModel, obj,
      {excludeExtraneousValues: true});
    result.resolveMaps();
    return result;
  }

  /**
   * resolve maps for certain attributes
   * @return {void} text
   */
  public resolveMaps(): void {
    this.contactData = ContactData.fromJson(this.contact);
    this.addressData = AddressData.fromJson(this.address);
    this.keyData = AuthenticateKeysData.fromJson(this.keys);
  }

  /**
   * un-resolve maps for certain attributes
   * @return {void} nothing
   */
  public unResolveMaps(): void {
    if (this.contactData) this.contact = this.contactData.toMap();
    if (this.addressData) this.address = this.addressData.toMap();
    if (this.keyData) this.keys = this.keyData.toMap();
  }

  /**
   * Helper class function to find one specific object based on id
   *
   * @param {VendorModel[]} list an array to sort from and find given
   * @param {string} id provide the needed id to match for
   * @return {VendorModel | undefined} found object else undefined
   */
  public static findOne(list: VendorModel[], id: string)
    : VendorModel | undefined {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return;
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
    delete res["addressData"];
    return res;
  }

  /**
   * create unique keys for consumer
   * @param {string} secret cipher key
   * @return {void} generated identifiers
   */
  public createIdentifiers(secret: string): void {
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
      "regNum": this.regNum,
      "domain": this.domain,
    };
    const source = FunctionHelpers.bankidCipherString(secret,
      JSON.stringify(signable));
    // console.log("Org signature: ", signable);

    try {
      const cryp = FunctionHelpers.
        changeCipherStringToModel(source);
      this.id = "vnd_" + cryp.iv + "-" +
        this.regNum.substring(0, 4) + this.regNum.substring(10, 12);
      this.apis = {
        "live": `bk-live_${cryp.content}`,
        "test": `bk-test_${cryp.iv}`,
      };
    } catch (err) {
      console.log("Failed creating credentials");
    }
    this.resolveMaps();
  }
}
