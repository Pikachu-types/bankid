import { AbstractIPData } from "../superficial/ip";
/**
 * SessionData class
*/
export declare class SessionData {
    id: string;
    date: number;
    exp: number;
    ip: Record<string, unknown> | undefined;
    ipData: AbstractIPData | undefined;
    /**
     * Change record to SessionData class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {SessionData} this class
     */
    static fromJson(obj: Record<string, unknown>): SessionData;
    /**
    * resolve maps for certain attributes
    * @return {void} text
    */
    resolveMaps(): void;
    /**
     * Helper class function to find one specific object based on id
     *
     * @param {SessionData[]} list an array to sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {SessionData | undefined} found object else undefined
     */
    static findOne(list: SessionData[], id: string): SessionData | undefined;
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
