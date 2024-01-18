import {plainToInstance, Expose} from "class-transformer";

/**
 * User NamingData class
*/
export class NamingData {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/
  @Expose() family = "";
  @Expose() given = "";
  @Expose() middle = "";
  @Expose() nickname = "";
  @Expose() title = "";
  @Expose() titlePrefix: string | undefined;
  @Expose() titleSuffix: string | undefined;
  @Expose() name = "";
  @Expose() preferredUsername = "";

  /**
   * Change record to NamingData class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {NamingData} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : NamingData {
    const result: NamingData = plainToInstance(NamingData, obj,
      {excludeExtraneousValues: true});

    return result;
  }

  /**
 * Get specific claims and return them as a record
 * @param {string[]} claims supported claims
 * @param {NamingData} classData this class
 * @return {Record<string, unknown> | undefined} record of claims
 */
  public static grabClaim(claims: string[], classData: NamingData)
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
   * getter
   * @return {string}full name of user
   */
  fullname(): string {
    return `${this.given}${this.middle.length > 0? `${this.middle} `:" "}${this.family}`;
    // return this.given + " " + this.family;
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
