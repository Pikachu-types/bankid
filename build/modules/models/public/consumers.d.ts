import { AuthenticateKeysData, ContactData } from "../superficial/contact";
import { ConsoleRegAccountRequest } from "../../interfaces/requests";
import { APIKeys, ConsumerServiceJSON } from "../../interfaces/documents";
import { AppType } from "../../enums/shared";
/**
 * ConsumerModel class
*/
export declare class ConsumerModel {
    /**
     * id look like [bcn_{id}]
     */
    id: string;
    name: string;
    image: string;
    regNum: string;
    tin: string;
    apiKey: string;
    email: string;
    test: boolean;
    created: number | undefined;
    lut: number | undefined;
    tier: number;
    information?: ConsumerVerificationInfoModel;
    stats?: {
        /**
         * Monthly eSign count
         */
        mec: number;
        /**
         * Monthly auth count
         */
        mac: number;
    };
    contact: Record<string, unknown>;
    keys: Record<string, unknown>;
    apis: APIKeys;
    usage: number | undefined;
    contactData: ContactData | undefined;
    keyData: AuthenticateKeysData | undefined;
    /**
     * Change record to ConsumerModel class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {ConsumerModel} this class
     */
    static fromJson(obj: Record<string, unknown>): ConsumerModel;
    /**
    * resolve maps for certain attributes
    * @return {void} text
    */
    resolveMaps(): void;
    /**
     * Helper class function to validate if org name already exists
     *
     * @param {ConsumerModel[]} list an array to sort from and find given
     * @param {string} name provide the needed id to match for
     * @return {ConsumerModel | undefined} found object else undefined
     */
    static exists(list: ConsumerModel[], name: string): ConsumerModel | undefined;
    /**
     * Helper class function to find one specific object based on id
     *
     * @param {ConsumerModel[]} list an array to sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {ConsumerModel | undefined} found object else undefined
     */
    static findOne(list: ConsumerModel[], id: string): ConsumerModel | undefined;
    findApiKey(env: AppType): string;
    /**
     * Helper class function to find one specific object based on id
     *
     * @param {ConsumerModel[]} list an array to sort from and find given
     * @param {string} key provide api key needed to match for
     * @return {ConsumerModel | undefined} found object else undefined
     */
    static matchApiKey(list: ConsumerModel[], key: string): ConsumerModel | undefined;
    /**
     * un-resolve maps for certain attributes
     * @return {void} nothing
     */
    unResolveMaps(): void;
    hasApiKeys(): boolean;
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
     * creates a new consumer model
     * @param {ConsoleRegAccountRequest} request organisation create requester
     * @return {ConsumerModel} new Consumer
     */
    static createConsumer(request: ConsoleRegAccountRequest): ConsumerModel;
    /**
     * generates consumer service json
     * @return {void} generated uid
     */
    generateServiceJSON(): ConsumerServiceJSON;
    /**
      * create unique RSA keys for app
      * @param {string} secret aes cipher key
      * @return {void} generated uid
      */
    generateRSA(secret: string, callback: (keys: AuthenticateKeysData) => void): Promise<void>;
    /**
     * create unique api keys for consumer
     * @param {string} secret cipher key
     * @return {void} generated api keys
     */
    generateApiKeys(): void;
    /**
     * finally hash api keys for db storing
     * @return {void} generated api keys
     */
    hashAPIKeys(): void;
    /**
     * Validate if api key is valid
     * @param {string} other string value to compare
     * @return {boolean} valid or not
     */
    validateApiKey(other: string): boolean;
}
/**
 * App Verification InfoModel
 */
export interface ConsumerVerificationInfoModel {
    legalName: string;
    domain: string;
    rcNumber: string;
    vat: string;
    description: string;
    address: string;
    country?: string;
    industry?: string;
    verified: boolean;
}
