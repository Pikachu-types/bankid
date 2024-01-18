/**
 * User BioData class
*/
export declare class BioData {
    birthdate: string;
    photo: string;
    /**
    * Birth number is saved as a timestamp
    */
    birthnumber: number;
    /**
     * Local government area
     */
    birthplace: string;
    /**
     * State of origin
     */
    birthstate: string;
    dateOfDeath: number | undefined;
    maritalStatus: string;
    gender: string;
    /**
     * Change record to BioData class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {BioData} this class
     */
    static fromJson(obj: Record<string, unknown>): BioData;
    /**
     * Get specific claims and return them as a record
     * @param {string[]} claims supported claims
     * @param {BioData} classData this class
     * @return {Record<string, unknown>} record of claims
     */
    static grabClaim(claims: string[], classData: BioData): Record<string, unknown> | undefined;
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
