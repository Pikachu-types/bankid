/**
 * ConsoleUser class
*/
export declare class ConsoleUser {
    /**
     * id look like [bcn_{id}]
     */
    id: string;
    naming: Record<string, unknown>;
    created: number | undefined;
    lut: number | undefined;
    sessions: Record<string, unknown>[] | undefined;
    security: Record<string, unknown> | undefined;
    organizations: string[];
    /**
     * Change record to ConsoleUser class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {ConsoleUser} this class
     */
    static fromJson(obj: Record<string, unknown>): ConsoleUser;
    /**
    * resolve maps for certain attributes
    * @return {void} text
    */
    resolveMaps(): void;
    /**
     * Helper class function to find one specific object based on id
     *
     * @param {ConsoleUser[]} list an array to sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {ConsoleUser | undefined} found object else undefined
     */
    static findOne(list: ConsoleUser[], id: string): ConsoleUser | undefined;
    /**
     * un-resolve maps for certain attributes
     * @return {void} nothing
     */
    unResolveMaps(): void;
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
    /**
     * create a pretty unique uid for consumers
     * @param {string} token jwt token
     * @param {string} tin tax identification number
     * @return {string} generated uid
     */
    static createConsumerID(token: string, tin: string): string;
}
