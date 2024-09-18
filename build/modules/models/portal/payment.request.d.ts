export type TSubPlan = {
    product: "authentication" | "signature";
    plan: "basic" | "scale";
    period: "monthly" | "yearly";
};
export type LocalTransaction = {
    debug: boolean;
} & TSubPlan;
/**
 * TransactionModel class
*/
export declare class TransactionModel {
    id: string;
    reference: string;
    iat: number;
    debug: boolean;
    status: "paid" | "failed" | "refunded" | "stale";
    provider?: "stripe" | "paystack" | "alatpay";
    relationship: {
        consumer: string;
        type: "subscription" | "setup";
        details: TSubPlan;
    };
    /**
    * Change record to TransactionModel class
    *
    * @param {Record<string, unknown>} obj  json object from db
    * @return {TransactionModel} this class
    */
    static fromJson(obj: Record<string, unknown>): TransactionModel;
    static findOne(list: TransactionModel[], id: string): TransactionModel | undefined;
    /**
     * This class handler to json
     * @return {string} text
     */
    toJsonString(): string;
    toMap(): Record<string, unknown>;
    static generateID(): string;
    static generate(params: {
        request: LocalTransaction;
        provider: "stripe" | "paystack" | "alatpay";
        reference: string;
        consumer: string;
        type: "subscription" | "setup";
    }): TransactionModel;
}
