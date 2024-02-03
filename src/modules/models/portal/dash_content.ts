import { plainToInstance, Expose, Exclude } from "class-transformer";
import { BankID } from "../bankid";
import { generateRandomAlphaNumeric } from "labs-sharable";

/**
 * ChangeLogs class
*/
export class ChangeLogs {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/

  @Expose() header = "";
  @Expose() changelog = "";
  @Expose() logs: BankID.Logs[] | undefined;
  @Expose() lut: number | undefined;

  /**
   * Change record to ChangeLogs class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {ChangeLogs} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : ChangeLogs {
    const result: ChangeLogs = plainToInstance(
      ChangeLogs, obj,
      { excludeExtraneousValues: true });
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
   * Create log id
   * @return {string} text
   */
  public static generateLogID(): string {
    return `log_${generateRandomAlphaNumeric(10)}`;
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