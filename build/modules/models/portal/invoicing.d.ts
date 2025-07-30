import { PaymentStatus } from "../../enums/shared";
type BillItem = {
    charge: number;
    count: number;
};
/**
 * Overage model class
*/
export declare class OverageModel {
    status: PaymentStatus;
    /**
     * m-yyyy
     */
    total: number;
    paid_at: number;
    timeline: string;
    id: string;
    type: "authentication" | "signature";
    instrument: {
        reference: string;
        provider: string;
        obj?: Record<string, unknown>;
    } | undefined;
    lut: number | undefined;
    items: BillItem[];
    /**
     * Change record to OverageModel class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {OverageModel} this class
     */
    static fromJson(obj: Record<string, unknown>): OverageModel;
    /**
     * Helper class function to find one specific object based on id
     *
     * @param {OverageModel[]} list an array to sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {OverageModel | undefined} found object else undefined
     */
    static findOne(list: OverageModel[], id: string): OverageModel | undefined;
    /**
     * Change timeline to date
     * @param {string} timeline ex [1-2024]
     * @return {Date} text
     */
    static timelineToDate(timeline: string): Date;
    /**
     * Generate document id
     * @return {string} text
     */
    static generateDocID(): string;
    /**
     * This class handler to json
     * @return {string} text
     */
    toJsonString(): string;
    /**
    * get document in map format
    * @return { Record<string, unknown>} returns doc map .
    */
    toMap(): Record<string, unknown>;
}
export declare class InvoiceModel {
    status: PaymentStatus;
    id: string;
    trxRef: string;
    subscription: string;
    mode: "authentication" | "signature";
    lut: number;
    /**
     * Charge amount
     */
    charge: number;
    paid_at: number;
    period_start: number;
    period_end: number;
    next_cycle: number;
    attempts?: number;
    /**
     * Change record to InvoiceModel class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {InvoiceModel} this class
     */
    static fromJson(obj: Record<string, unknown>): InvoiceModel;
    generateInvoiceTitle(): string;
    /**
     * This class handler to json
     * @return {string} text
     */
    toJsonString(): string;
    /**
    * get document in map format
    * @return { Record<string, unknown>} returns doc map .
    */
    toMap(): Record<string, unknown>;
}
export {};
