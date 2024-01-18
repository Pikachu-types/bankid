import {plainToInstance, Expose} from "class-transformer";

/**
 * User NationalityData class
*/
export class NationalityData {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/
  @Expose() nationalities: string[] = [];
  @Expose() primary = "";
  @Expose() residence = "";
  /**
   * Tax identification number
   */
  @Expose() txn: string | undefined;

  /**
  * Is politically exposed
  */
  @Expose() pep: boolean | undefined;
  @Expose() watchListed: boolean | undefined;

  /**
   * Change record to NationalityData class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {NationalityData} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : NationalityData {
    const result: NationalityData = plainToInstance(NationalityData, obj,
      {excludeExtraneousValues: true});

    return result;
  }

  /**
  * Get specific claims and return them as a record
  * @param {string[]} claims supported claims
  * @param {NationalityData} classData this class
  * @return {Record<string, unknown> | undefined} record of claims
  */
  public static grabClaim(claims: string[], classData: NationalityData)
    : Record<string, unknown> | undefined {
    const data: Record<string, unknown> = {};
    const json = classData.toMap();
    for (let i = 0; i < claims.length; i++) {
      try {
        const value = json[claims[i]];
        if (value === undefined) continue;
        data[claims[i]] = value;
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
  * get document in map format
  * @return { Record<string, unknown>} returns doc map .
  */
  public toMap()
    : Record<string, unknown> {
    return JSON.parse(this.toJsonString());
  }
}
