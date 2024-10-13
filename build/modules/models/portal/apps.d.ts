import { AppDataSecret } from "../../interfaces/documents";
import { AuthenticateKeysData } from "../superficial/contact";
import { AppFrameworkType, AppType, VerificationStatus, ClientScope, ConsumptionType } from "../..";
/**
 * ClientApp class
*/
export declare class ClientApp {
    /**
     * id look like [app_{id}]
     */
    id: string;
    owner: string;
    technology?: {
        type: AppFrameworkType;
        framework: string;
    };
    appName: string;
    type: AppType;
    consumption?: ConsumptionType;
    verificationStatus: VerificationStatus;
    displayName: string;
    lut: number;
    created: number;
    information?: AppVerificationInfoModel;
    secrets: AppDataSecret[];
    /**
     * Whitelisted urls
     */
    urls: string[];
    scopes: ClientScope[];
    keys?: {
        private?: string;
        public: string;
    };
    keyData: AuthenticateKeysData | undefined;
    /**
     * Change record to ClientApp class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {ClientApp} this class
     */
    static fromJson(obj: Record<string, unknown>): ClientApp;
    /**
     * un-resolve maps for certain attributes
     * @return {void} nothing
     */
    unResolveMaps(): void;
    /**
    * resolve maps for certain attributes
    * @return {void} text
    */
    resolveMaps(): void;
    /**
     * Validate if secret is valid
     * @param {string} other string value to compare
     * @param {string} cipher provide the secret for cipher process
     * @return {boolean} valid or not
     */
    validateSecret(other: string, cipher: string): boolean;
    /**
     * Helper class function to find one specific object based on id
     *
     * @param {ConsumerModel[]} list an array to sort from and find given
     * @param {string} secret provide app secret needed to match for
     * @param {string} cipher provide the secret for cipher process
     * @return {ClientApp | undefined} found object else undefined
     */
    static matchSecretKey(list: ClientApp[], secret: string, cipher: string): ClientApp | undefined;
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
    * @param {string[]} paths add attributes you'd like to omit from the map
    * @return { Record<string, unknown>} returns doc map .
    */
    toMap(paths?: string[]): Record<string, unknown>;
    /**
     * create a pretty unique uid for consumers
     * @return {string} generated uid
     */
    static createID(): string;
    /**
     * Check if app is safe to return real nin-data
     * @return {boolean} generated uid
     */
    safeApp(): boolean;
    /**
     * Check if app is a test app
     * @return {boolean} generated uid
     */
    testApp(): boolean;
    validateScope({ mode, variation }: {
        mode: "identification" | "signature" | "flow";
        variation: "nin" | "wildcard";
    }): void;
}
/**
 * App Verification InfoModel
 */
export interface AppVerificationInfoModel {
    description: string;
    category?: string;
    regulated?: boolean;
    verified: boolean;
    requestsCount?: string;
}
