import { plainToInstance, Expose } from "class-transformer";
import { DocumentTypes } from "../../enums/enums";
import { v1 as uuidv1 } from "uuid";
import { unixTimeStampNow } from "labs-sharable";

export class PayoutsModel {
  @Expose() id = ""; /// pyt_{{uuid1}}
  @Expose() iat: number = 0;
  @Expose() reference: string = "";
  @Expose() amount: number = 0;
  @Expose() debug: boolean = false;
  @Expose() redirects?: {
    success: string;
    failed: string;
  };
  @Expose() status: "paid" | "failed" | "refunded" | "stale" = 'stale';
  @Expose() provider?: "stripe" | "paystack" | "alatpay";

  /**
  * Change record to PayoutsModel class
  *
  * @param {Record<string, unknown>} obj  json object from db
  * @return {PayoutsModel} this class
  */
  public static fromJson(obj: Record<string, unknown>)
    : PayoutsModel {
    const result: PayoutsModel = plainToInstance(PayoutsModel, obj,
      { excludeExtraneousValues: true });
    return result;
  }

  public static findOne(list: PayoutsModel[], id: string)
    : PayoutsModel | undefined {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return;
  }


  /**
   * This class handler to json
   * @return {string} text
   */
  public toJsonString(): string {
    return JSON.stringify(this.toMap());
  }

  public toMap()
    : Record<string, unknown> {
    const res = JSON.parse(JSON.stringify(this));
    return res;
  }

  public static generateID(): string {
    return `${DocumentTypes.payout}${uuidv1()}`;
  }
  
  public generateID(): void {
    this.id = `${DocumentTypes.payout}${uuidv1()}`;
  }

  public static generate(params: {
    redirects?: {
      success: string;
      failed: string;
    },
    debug?: boolean;
    amount: number;
    reference?: string;
    provider: "stripe" | "paystack" | "alatpay",
  }): PayoutsModel {
    const model = new PayoutsModel();
    model.iat = unixTimeStampNow();
    model.generateID();
    model.amount = params.amount;
    model.reference = params.reference ?? '';
    model.debug = params.debug ?? false;
    model.provider = params.provider;
    model.redirects = params.redirects;
    model.status = 'stale';
    return model;
  }
}