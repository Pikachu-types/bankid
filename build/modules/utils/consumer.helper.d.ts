import { AuthToken, RequestSignature } from "../interfaces/documents";
import { ClientApp, IDRequest, Requests, Signing } from "..";
import { DatabaseFunctions } from "../../services";
export declare class ConsumerHelper {
    /**
     * Validate auth token
     * @param {string} token jwt created token
     * @param {string} jwt jwt encryption key
     * @return {AuthToken} return token value
     */
    static validateTokenAlone(token: string, jwt: string): Promise<AuthToken>;
    /**
     * Validate request
     * @param {SignatureRequest} req signature request
     * @return {void} function
     */
    static validateSignatureRequest(req: Signing): void;
    /**
     * Validate request
     * @param {IDRequest} req identification request
     * @return {void} function
     */
    static validateIDRequest(req: IDRequest): void;
    /**
     * Validate request and return request
     * @param {string} id request id
     * @param {Record<string, unknown>} params arguments
     * @return {Promise<Requests>} returns request if okay
     */
    static validateRequest(id: string, params: {
        db: DatabaseFunctions.Getters;
        app?: AuthToken;
        admin?: boolean;
        jwt: string;
    }): Promise<{
        signature: RequestSignature;
        request: Requests;
    }>;
    /**
     * Validate authentication session
     * @param {string} id request id
     * @param {Record<string, unknown>} params arguments
     * @return {Promise<Requests>} returns request if okay
     */
    static manageOidc(id: string, params: {
        db: DatabaseFunctions.Getters;
        jwt: string;
        app: string;
        consumer: string;
    }): Promise<{
        signature: RequestSignature;
        app: ClientApp;
        request: Requests;
    }>;
    /**
     * Create expiration time
     * @param {number} duration length of time
     * @param {boolean} inHours toggle to count
     *  in hours or minutes
     * @return {number} returns unix timestamp
     */
    static expiration(duration: number, inHours?: boolean): number;
    /**
     * Stringify NIN number
     * @param {string} nin nin digits
     * @return {string}
     */
    static stringifyNIN(nin: string): string;
    /**
     * Decode request
     * @param {Requests} req flow request
     * @param {Record<string, unknown>} params arguments
     * @return {RequestSignature} signature data
     */
    static decodeRequest(req: Requests, params: {
        jwt: string;
    }): Promise<RequestSignature>;
}
