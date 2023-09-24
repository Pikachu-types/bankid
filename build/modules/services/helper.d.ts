/// <reference types="node" />
import { CipherType } from "labs-sharable";
/**
 * Callable Function Helper class
 */
export declare class FunctionHelpers {
    /**
     * Changes string to CipherType model
     * @param {string} source content to get RSA code
     * @param {string} cipherKey designated cipher secret code
     * @return {Buffer} returns value.
     */
    static decipherRSAKey(source: string, cipherKey: string): Buffer;
    /**
     * This class handler to RSA keys
     * @param {string} cipherKey  key
     * @param {string} encoded  rsa key written in bcrypt
     * @return {Buffer} buffer value
     */
    static bcryptToRSAKey(cipherKey: string, encoded: string): Buffer | undefined;
    /**
     * Create a proper string from the CipherType model
     * @param {CipherType} source content to string from
     * @return {string} returns value.
     */
    static createCipherString(source: CipherType): string;
    /**
     * Create a proper string from the CipherType model
     * long function
     * @param {string} cipherKey secret key
     * @param {string} source content
     * @return {string} returns value.
     */
    static bankidCipherString(cipherKey: string, source: string): string;
    /**
     * Create an api key for BankID consumer
     * @param {string} content use your own content
     * @return {string} returns value.
     */
    static generateApiKey(content?: string): Promise<string>;
    /**
     * Revert CipherType model string to readable string
     * long function
     * @param {string} cipherKey secret key
     * @param {string} source content
     * @return {string} returns value.
     */
    static bankidCipherToString(cipherKey: string, source: string): string;
    /**
     * Verify Client side app approval
     * @param {string} cipherKey key used to unlock cipher
     * @param {string} source content to string from
     * @return {string} returns value.
     */
    static verifyAppAuthorization(cipherKey: string, source?: string): boolean;
    /**
     * Verify Client side app approval
     * @param {string} cipherKey key used to unlock cipher
     * @param {string} source content to string from
     * @return {string} returns value.
     */
    static verifyAuthorization(cipherKey: string, source?: string): boolean;
    /**
     * Create a proper string from the CipherType model
     * @param {CipherType} source content to string from
     * @return {string} returns value.
     */
    static changeCipherStringToModel(source: string): CipherType;
    /**
     * Verify the requester of a http request
     * @param {string} cipherKey cipher secret key
     * @param {string} source authorization key found in header
     * @return {boolean} returns state.
     */
    static verifyRequester(cipherKey: string, source?: string): boolean;
    /**
     * Change JSON to BankID string
     * @param {Record<string, unknown>} source json content
     * @param {string} secret designated cipher secret code
     * @return {string} returns aes value.
     */
    static encryptJSON(source: Record<string, unknown>, secret: string): string;
}
