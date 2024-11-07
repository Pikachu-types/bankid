import { plainToInstance, Expose } from "class-transformer";
import { DocumentTypes } from "../../enums/enums";
import { v1 as uuidv1 } from "uuid";
import { unixTimeStampNow } from "labs-sharable";

export type TSubPlan = {
  product: "authentication" | "signature",
  plan: "basic" | "scale",
  period: "monthly" | "yearly",
}

export type LocalTransaction = {
  debug: boolean
} & TSubPlan;

/**
 * TransactionModel class
*/
export class TransactionModel {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/
  @Expose() id = ""; /// trx_{{uuid1}}
  @Expose() reference = "";
  @Expose() iat: number = 0;
  @Expose() debug: boolean = false;
  @Expose() status: "paid" | "failed" | "refunded" | "stale" = 'stale';
  @Expose() provider?: "stripe" | "paystack" | "alatpay";
  @Expose() relationship: {
    consumer: string;
    type: "subscription" | "setup" | "checkout",
    details?: TSubPlan,
    redirects?: {
      success: string;
      failed: string;
    }
  } = {
      consumer: "",
      type: "setup",
      details: {
        period: "monthly",
        plan: "basic",
        product: "authentication"
      }
    };

  /**
  * Change record to TransactionModel class
  *
  * @param {Record<string, unknown>} obj  json object from db
  * @return {TransactionModel} this class
  */
  public static fromJson(obj: Record<string, unknown>)
    : TransactionModel {
    const result: TransactionModel = plainToInstance(TransactionModel, obj,
      { excludeExtraneousValues: true });
    return result;
  }

  public static findOne(list: TransactionModel[], id: string)
    : TransactionModel | undefined {
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
    return `${DocumentTypes.transaction}${uuidv1()}`;
  }

  public static generate(params: {
    request?: LocalTransaction,
    redirects?: {
      success: string;
      failed: string;
    },
    debug?: boolean;
    provider: "stripe" | "paystack" | "alatpay",
    reference: string, consumer?: string,
    type: "subscription" | "setup" | "checkout"
  }): TransactionModel {
    const transaction = new TransactionModel();
    transaction.id = this.generateID();
    transaction.debug = params?.request?.debug ?? params.debug ?? false;
    transaction.iat = unixTimeStampNow();
    transaction.provider = params.provider;
    transaction.reference = params.reference;
    transaction.relationship = {
      consumer: params.consumer ?? '',
      type: params.type,
      details: params.request,
      redirects: params.redirects
    }
    transaction.status = 'stale';
    return transaction;
  }
}