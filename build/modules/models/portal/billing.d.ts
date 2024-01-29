/**
 * Billing model class
*/
export declare class BillingModel {
    paid: boolean;
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
     * This class handler to json
     * @return {string} text
     */
    toJsonString(): string;
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
