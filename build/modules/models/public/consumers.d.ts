import { AuthenticateKeysData, ContactData } from "../superficial/contact";
/**
 * ConsumerModel class
*/
export declare class ConsumerModel {
    /**
     * id look like [bcn_{id}]
     */
    id: string;
    name: string;
    regNum: string;
    tin: string;
    apiKey: string;
    email: string;
    test: boolean;
    created: number | undefined;
    updatedAt: number | undefined;
    tier: number;
    contact: Record<string, unknown>;
    keys: Record<string, unknown>;
    apis: Record<string, unknown>;
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
     * Helper class function to find one specific object based on id
     *
     * @param {ConsumerModel[]} list an array to sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {ConsumerModel | undefined} found object else undefined
     */
    static findOne(list: ConsumerModel[], id: string): ConsumerModel | undefined;
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
    /**
     * create unique keys for consumer
     * @param {string} secret cipher key
     * @return {void} generated uid
     */
    createIdentifiers(secret: string): void;
}
