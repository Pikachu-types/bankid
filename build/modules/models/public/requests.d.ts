import { AbstractIPData } from "../superficial/ip";
/**
 * HookData
*/
export interface HookData {
    host: string;
    reference: string;
}
/**
 * IdentificationRequest class
*/
export declare class IdentificationRequest {
    /**
     * request iD look like [req_]
     */
    id: string;
    /**
     * Bank ID consumer id
     */
    consumer: string;
    /**
     * Verification mode [identification or signature]
     */
    mode: string;
    /**
     * Json payload in a string format
     */
    payload: string;
    /**
     * Date request was created (timestamp)
     */
    iat: number;
    /**
     * Exact expiration of request (timestamp)
     */
    exp: number;
    /**
     * Timestamp of signature moment
     */
    signedAt: number | undefined;
    user: string;
    type: string;
    /**
     * Ip address
     */
    ip: string;
    name: string;
    signed: boolean;
    details: Record<string, unknown> | undefined;
    signatureIP: AbstractIPData | undefined;
    signature: string | undefined;
    acquireClaims: string[];
    /**
     * Change record to IdentificationRequest class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {IdentificationRequest} this class
     */
    static fromJson(obj: Record<string, unknown>): IdentificationRequest;
    /**
     * Helper class function to find one specific object based on id
     *
     * @param {IdentificationRequest[]} list an array to sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {IdentificationRequest | undefined} found object else undefined
     */
    static findOne(list: IdentificationRequest[], id: string): IdentificationRequest | undefined;
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
/**
 * Requests class
*/
export declare class Requests {
    request: string;
    mode: string;
    id: string;
    /**
     * nin or cac numbers
     */
    to: string;
    /**
     * This is used to update listeners about signing event
     * has:
     * host: string
     * reference: string
     */
    hook: HookData | undefined;
    /**
     * This tells our servers how to handle the request
     * mobile, web or file
     */
    destination: string;
    /**
     *
     */
    sourceApp: string;
    created: number;
    expires: number;
    signed: boolean;
    cancelled: boolean;
    /**
     * is on session
     */
    onsess: boolean;
    /**
     * Change record to Requests class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {Requests} this class
     */
    static fromJson(obj: Record<string, unknown>): Requests;
    /**
     * Helper class function to find one specific object based on id
     *
     * @param {Requests[]} list an array to sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {Requests | undefined} found object else undefined
     */
    static findOne(list: Requests[], id: string): Requests | undefined;
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
