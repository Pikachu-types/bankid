export declare class PayoutsModel {
    id: string;
    iat: number;
    reference: string;
    amount: number;
    debug: boolean;
    redirects?: {
        success: string;
        failed: string;
    };
    status: "paid" | "failed" | "refunded" | "stale";
    provider?: "stripe" | "paystack" | "alatpay";
    /**
    * Change record to PayoutsModel class
    *
    * @param {Record<string, unknown>} obj  json object from db
    * @return {PayoutsModel} this class
    */
    static fromJson(obj: Record<string, unknown>): PayoutsModel;
    static findOne(list: PayoutsModel[], id: string): PayoutsModel | undefined;
    /**
     * This class handler to json
     * @return {string} text
     */
    toJsonString(): string;
    toMap(): Record<string, unknown>;
    static generateID(): string;
    generateID(): void;
    static generate(params: {
        redirects?: {
            success: string;
            failed: string;
        };
        debug?: boolean;
        amount: number;
        reference?: string;
        provider: "stripe" | "paystack" | "alatpay";
    }): PayoutsModel;
}
