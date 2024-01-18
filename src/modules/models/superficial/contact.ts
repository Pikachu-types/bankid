import {plainToInstance, Expose} from "class-transformer";
import {LabsCipher} from "labs-sharable";
import { FunctionHelpers } from "../../services/helper";

/**
 * ContactData class
*/
export class ContactData {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/
  @Expose() email = "";
  @Expose() emailVerified = false;
  @Expose() phone = "";
  @Expose() phoneVerified = false;

  /**
   * Change record to ContactData class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {ContactData} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : ContactData {
    const result: ContactData = plainToInstance(ContactData, obj,
      {excludeExtraneousValues: true});
    return result;
  }

  /**
   * Get specific claims and return them as a record
   * @param {string[]} claims supported claims
   * @param {ContactData} classData this class
   * @return {Record<string, unknown>} record of claims
   */
  public static grabClaim(claims: string[], classData: ContactData)
    : Record<string, unknown> {
    const data: Record<string, unknown> = {};
    const json = classData.toMap();
    for (let i = 0; i < claims.length; i++) {
      try {
        const value = json[claims[i]];
        if (!value) continue;
        data[`${claims[i]}`] = value;
      } catch (_) {
        // invalid key
      }
    }
    return data;
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
    return JSON.parse(this.toJsonString());
  }
}

/**
 * AddressData class
*/
export class AddressData {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/
  /**
   * Local government of residence
   */
  @Expose() city = "";
  @Expose() postCode = "";
  /**
   * State of residence
   */
  @Expose() state = "";
  /**
   * A2 country code ex. [NG, ZA, GB]
   */
  @Expose() countryCode = "";
  /**
   * Country name ex [Nigeria, Gambia, Namibia, Zimbabwe]
   */
  @Expose() country = "";
  /**
   * Residential Address
   */
  @Expose() place = "";
  /**
   * Formatted address (place, state, country)
   */
  @Expose() formatted = "";
  @Expose() longitude: number | undefined;
  @Expose() latitude: number | undefined;
  /**
   * Change record to AddressData class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {AddressData} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : AddressData {
    const result: AddressData = plainToInstance(AddressData, obj,
      {excludeExtraneousValues: true});

    return result;
  }

  /**
   * Get specific claims and return them as a record
   * @param {string[]} claims supported claims
   * @param {AddressData} classData this class
   * @return {Record<string, unknown> | undefined} record of claims
   */
  public static grabClaim(claims: string[], classData: AddressData)
    : Record<string, unknown> | undefined {
    const data: Record<string, unknown> = {};
    const json = classData.toMap();
    for (let i = 0; i < claims.length; i++) {
      try {
        const value = json[claims[i]];
        if (value === undefined) continue;
        data[`${claims[i]}`] = value;
      } catch (_) {
        // invalid key
      }
    }
    return Object.keys(data).length === 0 ? undefined : data;
  }

  /**
   * This class handler to json
   * @return {string} text
   */
  public toJsonString(): string {
    return JSON.stringify(this);
  }

  /**
   * This class handler to address
   * @return {string} text
   */
  public toString(): string {
    return this.place + " " + this.city + " " +
      this.postCode + ", " + this.country;
  }

  /**
  * get document in map format
  * @return { Record<string, unknown>} returns doc map .
  */
  public toMap()
    : Record<string, unknown> {
    return JSON.parse(this.toJsonString());
  }
}

/**
 * AuthenticateKeysData class
*/
export class AuthenticateKeysData {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/
  @Expose() public = "";
  @Expose() private: string | undefined;
  /**
   * Change record to AuthenticateKeysData class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {AuthenticateKeysData} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : AuthenticateKeysData {
    const result: AuthenticateKeysData =
      plainToInstance(AuthenticateKeysData, obj,
        {excludeExtraneousValues: true});

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
   * This class handler to RSA keys
   * @param {string} cipherKey  key
   * @return {string} text
   */
  public getPublicKey(cipherKey: string): Buffer | undefined {
    try {
      const pV = FunctionHelpers.
        changeCipherStringToModel(this.public);
      const publicKey = LabsCipher.decrypt(pV, cipherKey);
      return Buffer.from(publicKey);
    } catch (_) {
      return;
    }
  }

  /**
   * This class handler to RSA keys
   * @param {string} cipherKey  key
   * @return {string} text
   */
  public getPrivateKey(cipherKey: string): Buffer | undefined {
    if (this.private === undefined) return;
    try {
      const pV = FunctionHelpers.
        changeCipherStringToModel(this.private);
      const key = LabsCipher.decrypt(pV, cipherKey);
      return Buffer.from(key);
    } catch (_) {
      return;
    }
  }

  /**
  * get document in map format
  * @return { Record<string, unknown>} returns doc map .
  */
  public toMap()
    : Record<string, unknown> {
    return JSON.parse(this.toJsonString());
  }
}
