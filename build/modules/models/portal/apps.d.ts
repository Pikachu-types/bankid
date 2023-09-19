import { AppType, AppVerificationStatus } from "../../enums/enums";
import { AppDataSecret } from "../../interfaces/documents";
import { AuthenticateKeysData } from "../superficial/contact";
import { RSAKeys } from "labs-sharable";
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
    type: AppType;
    verificationStatus: AppVerificationStatus;
    displayName: string;
    lut: number;
    created: number;
    secrets: AppDataSecret[];
    keys: RSAKeys;
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
     * create unique RSA keys for app
     * @param {string} secret aes cipher key
     * @return {void} generated uid
     */
    generateRSA(secret: string, callback: (keys: AuthenticateKeysData) => void): Promise<void>;
    /**
     * This class handler to json
     * @return {string} text
     */
    toJsonString(): string;
    /**
     * Create new app secret
     * @param {string} secret aes cipher key
     * @param {AppType} type app type
     * @return {string} text
     */
    static generateSecret(secret: string, type: AppType): AppDataSecret;
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
