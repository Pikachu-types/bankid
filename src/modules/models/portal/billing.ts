import { plainToInstance, Expose } from "class-transformer";
import { CustomError, convertUnixToDate, unixTimeStampNow } from "labs-sharable";

// <100 calls are free each month

export interface BillInvoice {
  id: number;
  iat: number;
  due: number;
  url: string;
  /**
   * Checkout url
   */
  checkout: string,
  paystack: {
    id: number;
    code: string;
    customer: string;
    due_date: string;
    amount: number;
  }
}

/**
 * Billing model class
*/
export class BillingModel {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/
  @Expose() paid = false;
  @Expose() invoice?: BillInvoice | undefined;
  @Expose() endpoints: Record<string, number> = {};
  /**
   * Total racked up now
   */
  @Expose() cost = 0;
  @Expose() count = 0;
  /**
   * month-year
   */
  @Expose() timeline = "";
  @Expose() lut: number | undefined;
  @Expose() paidAt: number | undefined;
  
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
   * Helper class function to find one specific object based on id
   *
   * @param {BillingModel[]} list an array to sort from and find given
   * @param {string} id provide the needed id to match for
   * @return {BillingModel | undefined} found object else undefined
   */
  public static findOne(list: BillingModel[], id: string)
    : BillingModel | undefined {
    for (let i = 0; i < list.length; i++) {
      if (list[i].timeline === id) return list[i];
    }
    return;
  }

  /**
   * Helper class function to return timeline
   *
   * @param {BillingModel[]} list an array to sort from and find given
   * @param {Date} begin provide beginning
   * @param {Date} end provide ending
   * @return {BillingModel[]} found objects
   */
  public static returnTimeline(list: BillingModel[], begin: Date, end: Date)
    : BillingModel[] {
    let res: BillingModel[] = [];
    for (let i = 0; i < list.length; i++) {
      const bill = list[i];
      var date = this.timelineToDate(bill.timeline);
      if (date <= end && date >= begin) {
        res.push(bill);
      }
    }
    return res;
  }

  /**
   * This class handler to json
   * @return {string} text
   */
  public toJsonString(): string {
    return JSON.stringify(this);
  }

  /**
   * Change timeline to date
   * @param {string} timeline ex [1-2024]
   * @return {Date} text
   */
  public static timelineToDate(timeline: string): Date {
    const values: string[] = timeline.split("-");
    if (values.length !== 2) throw new CustomError("Invalid timeline");

    const month = values[0];
    const year = values[1];
    const date = `${year}-${month}-01`;
    return new Date(date);
  }

  /**
   * Generate document id
   * @return {string} text
   */
  public static generateDocID(): string {
    const date = convertUnixToDate(unixTimeStampNow());
    return `${date.getMonth()+1}-${date.getFullYear()}`;
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

