import { plainToInstance, Expose } from "class-transformer";

/**
 * IDCardsData class
*/
export class IDCardsData {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/

  @Expose() passport: string = "";
  
  /**
   * Change record to IDCardsData class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {IDCardsData} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : IDCardsData {
    const result: IDCardsData = plainToInstance(IDCardsData, obj,
      { excludeExtraneousValues: true });

    return result;
  }

  /**
  * Get specific claims and return them as a record
  * @param {string[]} claims supported claims
  * @param {IDCardsData} classData this class
  * @return {Record<string, unknown> | undefined} record of claims
  */
  public static grabClaim(claims: string[], classData: IDCardsData)
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
  * get document in map format
  * @return { Record<string, unknown>} returns doc map .
  */
  public toMap()
    : Record<string, unknown> {
    return JSON.parse(this.toJsonString());
  }
}
