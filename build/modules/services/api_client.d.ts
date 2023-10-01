import { AbstractIPAdData, AbstractIPData } from "../models/superficial/ip";
/**
 * Api client helper
 */
export declare class ExternalApiClient {
    /**
      * Checkup IP
      * @param {string} apiKey abstractApi key
      * @param {string} ipAddress ip address to look for
      * @return {Promise<AbstractIPAdData>} returns response.
      */
    static oldIpChecker(apiKey: string, ipAddress: string): Promise<AbstractIPAdData>;
    /**
      * Checkup IP
      * @param {string} apiKey abstractApi key
      * @param {string} ipAddress ip address to look for
      * @param {boolean} debug toggle if use apikey
      * @return {Promise<AbstractIPData>} returns response.
      */
    static ipChecker(apiKey: string, ipAddress: string, debug?: boolean): Promise<AbstractIPData>;
}
