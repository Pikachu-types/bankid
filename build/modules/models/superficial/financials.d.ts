/**
 * FinancialData class
*/
export declare class FinancialData {
    paymentAccounts: Record<string, unknown>[];
    primaryAccount: Record<string, unknown>;
    bvn: string;
    bvnBank: string;
    bvnIAT: number | undefined;
    bvnLevel: string;
    /**
     * Change record to FinancialData class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {FinancialData} this class
     */
    static fromJson(obj: Record<string, unknown>): FinancialData;
    /**
    * Get specific claims and return them as a record
    * @param {string[]} claims supported claims
    * @param {FinancialData} classData this class
    * @return {Record<string, unknown> | undefined} record of claims
    */
    static grabClaim(claims: string[], classData: FinancialData): Record<string, unknown> | undefined;
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
