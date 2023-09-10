/**
 * User NamingData class
*/
export declare class NamingData {
    family: string;
    given: string;
    middle: string;
    nickname: string;
    title: string;
    titlePrefix: string | undefined;
    titleSuffix: string | undefined;
    name: string;
    preferredUsername: string;
    /**
     * Change record to NamingData class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {NamingData} this class
     */
    static fromJson(obj: Record<string, unknown>): NamingData;
    /**
   * Get specific claims and return them as a record
   * @param {string[]} claims supported claims
   * @param {NamingData} classData this class
   * @return {Record<string, unknown> | undefined} record of claims
   */
    static grabClaim(claims: string[], classData: NamingData): Record<string, unknown> | undefined;
    /**
     * getter
     * @return {string}full name of user
     */
    fullname(): string;
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
