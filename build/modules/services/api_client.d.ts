import { AbstractIPData } from "../models/superficial/ip";
/**
 * Api client helper
 */
export declare class ExternalApiClient {
    /**
      * Checkup IP
      * @param {string} apiKey abstractApi key
      * @param {string} ipAddress ip address to look for
      * @return {Promise<AbstractIPData>} returns response.
      */
    static ipChecker(apiKey: string, ipAddress: string): Promise<AbstractIPData>;
}
