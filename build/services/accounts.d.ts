import { AppConsumerReturn, AuthRequest, BAccount, BillingModel, ClientApp, ConsumerAppsResponse, ConsumerModel, IdentificationModel, SingleBankIDModel, UsageRecording } from "..";
import { DatabaseFunctions } from "./database";
/**
 * Service class for
 */
export declare class Accounts {
    readonly getter: DatabaseFunctions.Getters;
    constructor(getter: DatabaseFunctions.Getters);
    /**
     * Get a some bankid account
     * @param {Record<string, unknown>} params arguments
     * @return {Promise<BAccount | undefined>} values
     */
    retrieve(params: {
        id: string;
        /**
         * if looking for consumer app/user reference add reference id
         */
        reference?: string;
        cipher: string;
    }): Promise<BAccount | undefined>;
    /**
     * A clamp function to get a specific registered user
     * @param {Record<string, unknown>} params required arguments
     * @return {Promise<IdentificationModel>} gotten model containing need content
     */
    getRegisteredUser(params: {
        /**
         * possible reference to a registered nin
         */
        id: string;
        /**
         * encryption key
         */
        cipher: string;
    }): Promise<IdentificationModel>;
    /**
     * Generate fake nin information for test consumer
     * @return {IdentificationModel} gotten model containing need content
     */
    static fakeUser(): IdentificationModel;
    /**
     * A clamp function to get a validate app credentials
     * @param {Record<string, unknown>} params arguments
     * @return {Promise<AppConsumerReturn | undefined>} valid or not
     */
    validateAuthRequest(params: {
        data: AuthRequest;
        cipher: string;
    }): Promise<AppConsumerReturn | undefined>;
    /**
    * Authenticate mobile applications
    * @param {Record<string, unknown>} params required arguments
    * @return {Promise<ConsumerAppsResponse>} returns auth token
    */
    authenticateApp(params: {
        /**
         * Consumer api key
         */
        apikey: string;
        /**
         * client secret key
         */
        appSecret: string;
        /**
         * Finsel DGI pasby jwt encryption key
         */
        jwt: string;
        cipher: string;
    }): Promise<ConsumerAppsResponse>;
    /**
    * Validate consumer existence
    * @param {string} id account id
    * @return {Promise<boolean>} returns true or false
    */
    consumerExist(id: string): Promise<boolean>;
    /**
   * A clamp function to get a specific issued bank id
   * @param {string} params arguments
   * @return {Promise<SingleBankIDModel>} gotten model containing need content
   */
    getIssuedBankID(params: {
        /**
         * possible reference to an issued bank id
         */
        id: string;
        cipher: string;
    }): Promise<SingleBankIDModel>;
    /**
     * Get a consumer
     * @param {string} id account retrieval
     * @param {string} cipher encryption key
     * @return {Promise<ConsumerModel>} returns consumer
     */
    getConsumer(id: string, cipher: string): Promise<ConsumerModel>;
    /**
    * Get a consumer
    * @param {string} id account retrieval
    * @param {string} clientid id of consumer
    * @param {string} cipher encryption key
    * @return {Promise<ClientApp>} returns app
    */
    getApp(id: string, clientid: string, cipher: string): Promise<ClientApp>;
    /**
     * A clamp function to register api usage
     * @param {UsageRecording} request usage data
     * @param {ConsumerModel} consumer consumer
     * @param {DatabaseFunctions.Management} database handle any document updates
     * @return {Promise<BillingModel>} action carried
     */
    logApiUsage(request: UsageRecording, consumer: ConsumerModel, database: DatabaseFunctions.Management): Promise<BillingModel>;
}
