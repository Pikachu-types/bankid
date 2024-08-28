/**
 * Attached to Consumers [apps] once a user links their profile to the app.
*/
export declare class UserResource {
    national: string;
    id: string;
    region: string;
    /**
     * Last seen
     */
    lsn: number | undefined;
    blocked: boolean | undefined;
    /**
     * Date added
     */
    iat: number;
    /**
     * Change record to this class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {UserResource} this class
     */
    static fromJson(obj: Record<string, unknown>): UserResource;
    /**
     * This class handler to json
     * @return {string} text
     */
    toJsonString(): string;
    static generate(nin: string, region: string): UserResource;
    /**
     * Helper class function to find one specific object based on id
     *
     * @param {UserResource[]} list an array to sort from and find given
     * @param {string} nin provide the needed id to match for
     * @return {UserResource | undefined} found object else undefined
     */
    static findOne(list: UserResource[], nin: string): UserResource | undefined;
    /**
    * get document in map format
    * @return { Record<string, unknown>} returns doc map .
    */
    toMap(): Record<string, unknown>;
}
