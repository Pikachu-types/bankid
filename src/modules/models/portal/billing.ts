import { plainToInstance, Expose } from "class-transformer";
import { convertUnixToDate, unixTimeStampNow } from "labs-sharable";

// each month first 100 calls free

/**
 * Billing model class
*/
export class BillingModel {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/
  @Expose() paid = false;
  @Expose() endpoints: Record<string, unknown> = {};
  /**
   * Total racked up now
   */
  @Expose() cost = 0;
  @Expose() count = 0;
  @Expose() lut: number | undefined;
  
  /**
   * Change record to BillingModel class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {BillingModel} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : BillingModel {
    const result: BillingModel = plainToInstance(BillingModel, obj,
      { excludeExtraneousValues: true });
    // result.resolveMaps();
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
   * Generate document id
   * @return {string} text
   */
  public static generateDocID(): string {
    const date = convertUnixToDate(unixTimeStampNow());
    return `${date.getMonth()}-${date.getFullYear()}`;
  }

  /**
  * get document in map format
  * @return { Record<string, unknown>} returns doc map .
  */
  public toMap()
    : Record<string, unknown> {
    const res = JSON.parse(this.toJsonString());
    return res;
  }

}

