import { ConsoleAccountSecurity } from "../../interfaces/documents";
import { ConsoleRegAccountRequest } from "../../interfaces/requests";
import { UserRoles } from "../../enums/shared";
/**
 * ConsoleUser class
*/
export declare class ConsoleUser {
    /**
     * id look like [cnu_{id}]
     */
    id: string;
    email: string;
    legalAccepted: boolean;
    campaigns: boolean;
    naming?: {
        first: string;
        last: string;
    };
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
    name(): string;
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
     * Helper class function to find one specific object based on eid
     *
     * @param {ConsoleUser[]} list an array to sort from and find given
     * @param {string} eid provide the needed id to match for
     * @return {ConsoleUser | undefined} found object else undefined
     */
    static findEID(list: ConsoleUser[], eid: string): ConsoleUser | undefined;
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
    * @param {string[]} paths add attributes you'd like to omit from the map
    * @return { Record<string, unknown>} returns doc map .
    */
    toMap(paths?: string[]): Record<string, unknown>;
    /**
     * create a pretty unique uid for consumers
     * @return {string} generated uid
     */
    static createID(): string;
    static create(data: ConsoleRegAccountRequest): ConsoleUser;
}
/**
 * Consumer user doc model
 */
export interface ConsumerUserReference {
    email: string;
    role: UserRoles;
    name: string;
    id: string;
    tFA: boolean;
}
