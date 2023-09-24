import { RSAKeys } from "labs-sharable";
import { Requests } from "../models/public/requests";
/**
 * Generator service class
 */
export declare class Generator {
    /**
     * Create a app link
     * @param {string} mode request mode i.e [signature, identification]
     * @param {Requests} request the request
     * @param {string} source what kind of consumer generated this
     * @param {string} nin bankid user
     * @return {string} returns value.
     */
    static appLink(mode: string, request: Requests, source: string, nin?: string): string;
    /**
    * The `generateKeyPairSync` method accepts two arguments:
    * 1. The type ok keys we want, which in this case is "rsa"
    * 2. An object with the properties of the key
    * @return {RSAModel} key pairs
    */
    static createRSAPairString(): RSAKeys;
}
