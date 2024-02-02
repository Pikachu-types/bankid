export interface BillInvoice {
    id: number;
    iat: number;
    due: number;
    url: string;
    /**
     * Checkout url
     */
    checkout: string;
    paystack: {
        id: number;
        code: string;
        customer: string;
        due_date: string;
        amount: number;
    };
}
/**
 * Billing model class
*/
export declare class BillingModel {
    paid: boolean;
    invoice?: BillInvoice | undefined;
    endpoints: Record<string, number>;
    /**
     * Total racked up now
     */
    cost: number;
    count: number;
    /**
     * month-year
     */
    timeline: string;
    lut: number | undefined;
    paidAt: number | undefined;
    /**
     * Change record to BillingModel class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {BillingModel} this class
     */
    static fromJson(obj: Record<string, unknown>): BillingModel;
    /**
     * Helper class function to find one specific object based on id
     *
     * @param {BillingModel[]} list an array to sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {BillingModel | undefined} found object else undefined
     */
    static findOne(list: BillingModel[], id: string): BillingModel | undefined;
    /**
     * Helper class function to return timeline
     *
     * @param {BillingModel[]} list an array to sort from and find given
     * @param {Date} begin provide beginning
     * @param {Date} end provide ending
     * @return {BillingModel[]} found objects
     */
    static returnTimeline(list: BillingModel[], begin: Date, end: Date): BillingModel[];
    /**
     * This class handler to json
     * @return {string} text
     */
    toJsonString(): string;
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
    * get document in map format
    * @return { Record<string, unknown>} returns doc map .
    */
    toMap(): Record<string, unknown>;
}
