/**
 * Attached to consumers once a user interfaces with any of its apps.
*/
export declare class EIDUserResource {
    national: string;
    id: string;
    region: string;
    /**
     * Last seen
     */
    lsn: number;
    blocked: boolean | undefined;
    /**
     * Date added
     */
    iat: number;
    /**
     * ID of consumer apps this user has interfaced with
     */
    apps: string[];
    /**
     * Change record to this class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {EIDUserResource} this class
     */
    static fromJson(obj: Record<string, unknown>): EIDUserResource;
    /**
     * This class handler to json
     * @return {string} text
     */
    toJsonString(): string;
    static generate(nin: string, region: string): EIDUserResource;
    static getMonthlyActiveUsers(users: EIDUserResource[]): number;
    /**
     * Helper class function to find one specific object based on id
     *
     * @param {EIDUserResource[]} list an array to sort from and find given
     * @param {string} nin provide the needed id to match for
     * @return {EIDUserResource | undefined} found object else undefined
     */
    static findOne(list: EIDUserResource[], nin: string): EIDUserResource | undefined;
    /**
    * get document in map format
    * @return { Record<string, unknown>} returns doc map .
    */
    toMap(): Record<string, unknown>;
}
