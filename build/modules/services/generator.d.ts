import { RSAKeys } from "labs-sharable";
/**
 * Generator service class
 */
export declare class Generator {
    /**
     * Create a request identifier
     * @return {string} returns value.
     */
    static requestID(): string;
    /**
     * Create a app link
     * @param {string} mode request mode i.e [signature, identification]
     * @param {string} requestSignature the jwt signed string
     * @param {string} source what kind of consumer generated this
     * @param {string} nin bankid user
     * @return {string} returns value.
     */
    static appLink(mode: string, requestSignature: string, source: string, nin?: string): string;
    /**
    * The `generateKeyPairSync` method accepts two arguments:
    * 1. The type ok keys we want, which in this case is "rsa"
    * 2. An object with the properties of the key
    * @return {RSAModel} key pairs
    */
    static createRSAPairString(): RSAKeys;
}
