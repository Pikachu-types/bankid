import { CustomError } from "labs-sharable";
export type errorType = 'api_error' | 'param_error' | 'db_error' | 'external_service_error' | 'session_cancel' | 'unknown_error' | 'authorization_error' | 'session_expiry' | 'invalid_request';
export type status = 'successful' | 'handled' | 'mismatch' | 'token-mismatch' | 'unauthorized' | 'expiration' | 'failed' | 'extreme';
interface ErrorDetails {
    status: status;
    reason: string;
    type?: errorType;
    label?: string;
    code?: number;
    body?: Record<string, unknown>;
    helper_url?: string;
    trace?: string;
}
export declare class SeverError extends Error {
    private errorResponse;
    code: number;
    constructor(param: string | ErrorDetails, code?: number, type?: errorType);
    /**
     * get message
     * @return {string} returns error message .
     */
    getMessage(): string;
    /**
     * get error code
     * @return {string} returns code .
     */
    getCode(): number;
    /**
     * get error response
     * @return {ErrorDetails} returns doc map .
     */
    getErrorResponse(): ErrorDetails;
    /**
    * get error
    * @return {Record<string, unknown>} returns doc map .
    */
    getError(): Record<string, unknown>;
    /**
    * get error log
    * @return {string} returns doc map .
    */
    logError(): ErrorDetails;
    /**
     * Check if error type class
     * @param {Object} error the object
     * @returns {boolean} returns true or false
     */
    static isSeverError(error: Object | unknown): boolean;
    /**
     * Handles unknown error
     * @param {Object} err the object
     * @returns {SeverError} returns this class
     */
    static handleError(err: unknown): SeverError;
    /**
     * Convert from CustomError to ServerError
     * @param {Object} err the object
     * @returns {SeverError} returns this class
     */
    static changeCustomErrorToServerError(err: CustomError): SeverError;
    /**
     * This class handler to json
     * @return {string} text
     */
    toJsonString(): string;
}
export {};
