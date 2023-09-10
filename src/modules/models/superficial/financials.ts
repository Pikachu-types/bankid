import {plainToInstance, Expose} from "class-transformer";

/**
 * FinancialData class
*/
export class FinancialData {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/

  @Expose() paymentAccounts: Record<string, unknown>[] = [];
  @Expose() primaryAccount: Record<string, unknown> = {};

  /**
   * Change record to FinancialData class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {FinancialData} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : FinancialData {
    const result: FinancialData = plainToInstance(FinancialData, obj,
      {excludeExtraneousValues: true});

    return result;
  }

  /**
  * Get specific claims and return them as a record
  * @param {string[]} claims supported claims
  * @param {FinancialData} classData this class
  * @return {Record<string, unknown> | undefined} record of claims
  */
  public static grabClaim(claims: string[], classData: FinancialData)
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
