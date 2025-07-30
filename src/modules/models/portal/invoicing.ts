import { plainToInstance, Expose } from "class-transformer";
import { PaymentStatus } from "../../enums/shared";
import { SeverError } from "../../utils/server.error";
import { convertUnixToDate, unixTimeStampNow } from "labs-sharable";

type BillItem = {
  charge: number,
  count: number,
}

/**
 * Overage model class
*/
export class OverageModel {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/
  @Expose() status: PaymentStatus = 'stale';
  /**
   * m-yyyy
   */
  @Expose() total = 0;
  @Expose() paid_at = 0;
  @Expose() timeline = "";
  @Expose() id = "";
  @Expose() type: "authentication" | "signature" = 'authentication';
  @Expose() instrument: {
    reference: string;
    provider: string;
    obj?: Record<string, unknown>
  } | undefined;
  @Expose() lut: number | undefined;
  @Expose() items: BillItem[] = [];

  /**
   * Change record to OverageModel class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {OverageModel} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : OverageModel {
    const result: OverageModel = plainToInstance(OverageModel, obj,
      { excludeExtraneousValues: true });
    return result;
  }

  /**
   * Helper class function to find one specific object based on id
   *
   * @param {OverageModel[]} list an array to sort from and find given
   * @param {string} id provide the needed id to match for
   * @return {OverageModel | undefined} found object else undefined
   */
  public static findOne(list: OverageModel[], id: string)
    : OverageModel | undefined {
    for (let i = 0; i < list.length; i++) {
      if (list[i].timeline === id) return list[i];
    }
    return;
  }

  /**
   * Change timeline to date
   * @param {string} timeline ex [1-2024]
   * @return {Date} text
   */
  public static timelineToDate(timeline: string): Date {
    const values: string[] = timeline.split("-");
    if (values.length !== 2) throw new SeverError("Invalid timeline");

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
    return `${date.getMonth() + 1}-${date.getFullYear()}`;
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
    return res;
  }
}

export class InvoiceModel {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/
  @Expose() status: PaymentStatus = 'stale';
  @Expose() id = "";
  @Expose() trxRef = "";
  @Expose() subscription = ""; // the subscription id on our database
  @Expose() mode: "authentication" | "signature" = 'authentication';
  @Expose() lut = 0;
  /**
   * Charge amount
   */
  @Expose() charge = 0;
  @Expose() paid_at = 0;
  @Expose() period_start = 0;
  @Expose() period_end = 0;
  @Expose() next_cycle = 0;
  @Expose() attempts?: number;

  /**
   * Change record to InvoiceModel class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {InvoiceModel} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : InvoiceModel {
    const result: InvoiceModel = plainToInstance(InvoiceModel, obj,
      { excludeExtraneousValues: true });
    return result;
  }

  public generateInvoiceTitle(): string {
    if (this.period_end === 0 || this.period_start === 0) throw new SeverError("Invoice lacks a valid period start or period end", 400, 'invalid_request');
    const begin = convertUnixToDate(this.period_start);
    const end = convertUnixToDate(this.period_end);
    return `${mYYYY(begin)} x ${mYYYY(end)} | invoice`;
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
    return res;
  }
}

function mYYYY(date: Date) {
  return `${date.getMonth() + 1}-${date.getFullYear()}`;
}