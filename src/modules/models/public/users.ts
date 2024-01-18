import {plainToInstance, Expose, Exclude} from "class-transformer";
import {AddressData, ContactData} from "../superficial/contact";
import {BioData} from "../superficial/bio";
import {NamingData} from "../superficial/naming";
import {FinancialData} from "../superficial/financials";
import {NationalityData} from "../superficial/nationality";
import {StandaloneBankID} from "./standaloneIds";
import {VendorModel} from "./vendors";
import { IDCardsData } from "../superficial/idcards";

/**
 * Single BankID Model
 *
*/
export type SingleBankIDModel = {
  user: IdentificationModel;
  issued: StandaloneBankID;
  vendor: VendorModel;
}

/**
 * IdentificationModel class
*/
export class IdentificationModel {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/

  /**
   * id look like [bid_{id}]
   */
  @Expose() id = "";
  @Expose() nin = "";
  @Expose() locale = "";
  @Expose() test = false;
  @Expose() created: number | undefined;
  @Expose() validTo: number | undefined;

  /**
   * How was this user verified
   * i.e [passport, bvn, nin]
   */
  @Expose() source: string[] = [];
  /**
   * bankids this user has meaning one nin can own multiple id
   */
  @Expose() iDs: string[] = [];
  /**
   * BankID vendor id
   */
  @Expose() vendor = "";
  @Expose() lut: number | undefined;
  @Expose() contact: Record<string, unknown> = {};
  @Expose() address: Record<string, unknown> = {};
  @Expose() nationality: Record<string, unknown> = {};
  @Expose() bio: Record<string, unknown> = {};
  @Expose() idcards: Record<string, unknown> = {};
  @Expose() financial: Record<string, unknown> | undefined;
  @Expose() naming: Record<string, unknown> = {};

  @Exclude()
  contactData: ContactData | undefined;
  @Exclude()
    idCardData: IDCardsData | undefined;
  @Exclude()
    addressData: AddressData | undefined;
  @Exclude()
    bioData: BioData | undefined;

  @Exclude()
    nameData: NamingData | undefined;

  @Exclude()
    nationalityData: NationalityData | undefined;

  @Exclude()
    financialData: FinancialData | undefined;

  /**
   * Change record to IdentificationModel class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {IdentificationModel} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : IdentificationModel {
    const result: IdentificationModel = plainToInstance(
      IdentificationModel, obj,
      {excludeExtraneousValues: true});
    result.resolveMaps();
    return result;
  }


  /**
   * Helper class function to find one specific id
   *
   * @param {IdentificationModel[]} list an array of bankids to
   *  sort from and find given
   * @param {string} id provide the needed id to match for
   * @return {IdentificationModel | undefined} found object else undefined
   */
  public static findOne(list: IdentificationModel[], id: string)
    : IdentificationModel | undefined {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id || list[i].nin === id) return list[i];
    }
    return;
  }


  /**
   * resolve maps for certain attributes
   * @return {void} nothing
   */
  public resolveMaps(): void {
    this.contactData = ContactData.fromJson(this.contact);
    this.idCardData = IDCardsData.fromJson(this.idcards);
    this.addressData = AddressData.fromJson(this.address);
    if (this.financial) {
      this.financialData = FinancialData.
        fromJson(this.financial);
    }
    this.bioData = BioData.fromJson(this.bio);
    this.nameData = NamingData.fromJson(this.naming);
    this.nationalityData = NationalityData.fromJson(this.nationality);
  }

  /**
   * un-resolve maps for certain attributes
   * @return {void} nothing
   */
  public unResolveMaps(): void {
    if (this.contactData) this.contact = this.contactData.toMap();
    if (this.addressData) this.address = this.addressData.toMap();
    if (this.financialData) this.financial = this.financialData.toMap();
    if (this.bioData) this.bio = this.bioData.toMap();
    if (this.nameData) this.naming = this.nameData.toMap();
    if (this.idCardData) this.idcards = this.idCardData.toMap();
    if (this.nationalityData) this.nationality = this.nationalityData.toMap();
  }

  /**
   * Get registered users claims
   * @param {string[]} claims supported claims
   * @return {void} nothing
   */
  public retrieveClaims(claims: string[]): Record<string, unknown> {
    // console.log("Now searching for ", claims);
    const result: Record<string, unknown> = {};
    const bio: string[] = []; const contact: string[] = [];
    const address: string[] = []; const naming: string[] = [];
    const nationality: string[] = [];
    const cards: string[] = [];
    const financial: string[] = [];

    for (let i = 0; i < claims.length; i++) {
      const word = claims[i];
      if (word.startsWith("bio")) {
        bio.push(word.split(".")[1].trim());
      } else if (word.startsWith("contact")) {
        contact.push(word.split(".")[1].trim());
      } else if (word.startsWith("address")) {
        address.push(word.split(".")[1].trim());
      } else if (word.startsWith("naming")) {
        naming.push(word.split(".")[1].trim());
      } else if (word.startsWith("nationality")) {
        nationality.push(word.split(".")[1].trim());
      }else if (word.startsWith("ids")) {
        cards.push(word.split(".")[1].trim());
      }else if (word.startsWith("finance")) {
        financial.push(word.split(".")[1].trim());
      } else {
        continue;
      }
    }
    const bioclaim = this.bioData ?
      BioData.grabClaim(bio, this.bioData) : undefined;
    const contactclaim = this.contactData ?
      ContactData.grabClaim(contact, this.contactData) : undefined;
    const addressclaim = this.addressData ?
      AddressData.grabClaim(address, this.addressData) : undefined;
    const namingclaim = this.nameData ?
      NamingData.grabClaim(naming, this.nameData) : undefined;
    const nationalityclaim = this.nationalityData ?
      NationalityData.grabClaim(nationality, this.nationalityData) : undefined;
    const idClaims = this.idCardData ?
      IDCardsData.grabClaim(cards, this.idCardData) : undefined;
    const financeClaims = this.financialData ?
      FinancialData.grabClaim(cards, this.financialData) : undefined;

    if (bioclaim) result["bio"] = bioclaim;
    if (contactclaim) result["contact"] = contactclaim;
    if (addressclaim) result["address"] = addressclaim;
    if (namingclaim) result["naming"] = namingclaim;
    if (nationalityclaim) result["nationality"] = nationalityclaim;
    if (idClaims) result["ids"] = idClaims;
    if (financeClaims) result["finance"] = financeClaims;

    // console.log(`Exited with: ${JSON.stringify(result)}`);
    return result;
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
    delete res["addressData"];
    delete res["nameData"];
    delete res["idCardData"];
    delete res["contactData"];
    delete res["bioData"];
    delete res["nationalityData"];
    delete res["financialData"];
    return res;
  }
}
