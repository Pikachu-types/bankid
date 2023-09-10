/**
 * User NationalityData class
*/
export declare class NationalityData {
    nationalities: string[];
    primary: string;
    residence: string;
    /**
     * Tax identification number
     */
    txn: string | undefined;
    /**
    * Is politically exposed
    */
    pep: boolean;
    /**
     * Change record to NationalityData class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {NationalityData} this class
     */
    static fromJson(obj: Record<string, unknown>): NationalityData;
    /**
    * Get specific claims and return them as a record
    * @param {string[]} claims supported claims
    * @param {NationalityData} classData this class
    * @return {Record<string, unknown> | undefined} record of claims
    */
    static grabClaim(claims: string[], classData: NationalityData): Record<string, unknown> | undefined;
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
