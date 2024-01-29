/**
 * Billing model class
*/
export declare class BillingModel {
    paid: boolean;
    endpoints: Record<string, unknown>;
    /**
     * Total racked up now
     */
    cost: number;
    count: number;
    lut: number | undefined;
    /**
     * Change record to BillingModel class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {BillingModel} this class
     */
    static fromJson(obj: Record<string, unknown>): BillingModel;
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
