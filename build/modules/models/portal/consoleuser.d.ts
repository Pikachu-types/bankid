import { ConsoleAccountSecurity } from "../../interfaces/documents";
/**
 * ConsoleUser class
*/
export declare class ConsoleUser {
    /**
     * id look like [bcn_{id}]
     */
    id: string;
    email: string;
    legalAccepted: boolean;
    naming: Record<string, unknown>;
    created: number;
    lut: number;
    security: ConsoleAccountSecurity | undefined;
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
     * @return {string} generated uid
     */
    static createID(): string;
}
/**
 * Consumer user doc model
 */
export interface ConsumerUserReference {
    email: string;
    role: string;
    name: string;
    id: string;
}
