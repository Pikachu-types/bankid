import { AppDataSecret, AppServiceJSON } from "../../interfaces/documents";
import { AuthenticateKeysData } from "../superficial/contact";
/**
 * ClientApp class
*/
export declare class ClientApp {
    /**
     * id look like [app_{id}]
     */
    id: string;
    owner: string;
    appName: string;
    type: string;
    displayName: string;
    lut: number;
    created: number;
    secrets: AppDataSecret[];
    keys: Record<string, unknown>;
    keyData: AuthenticateKeysData | undefined;
    /**
     * Change record to ClientApp class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {ClientApp} this class
     */
    static fromJson(obj: Record<string, unknown>): ClientApp;
    /**
     * Helper class function to find one specific object based on id
     *
     * @param {ClientApp[]} list an array to sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {ClientApp | undefined} found object else undefined
     */
    static findOne(list: ClientApp[], id: string): ClientApp | undefined;
    /**
     * create app service json
     * @param {string} secret cipher key
     * @param {string} clientid provide consumer id
     * @return {AppServiceJSON} generated uid
     */
    generateServiceJSON(secret: string, clientid: string): AppServiceJSON;
    /**
     * create unique RSA keys for app
     * @param {string} secret cipher key
     * @return {void} generated uid
     */
    private generateRSA;
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
