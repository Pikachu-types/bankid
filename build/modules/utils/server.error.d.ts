import { CustomError } from "labs-sharable";
import { RequestStatus } from "..";
/**
 * error response
 */
export type ErrorType = {
    status: RequestStatus | string;
    reason: string;
    code?: number;
    type?: 'api_error' | 'param_error' | 'db_error' | 'external_service_error';
    label?: string;
    body?: Record<string, unknown>;
    helper_url?: string;
};
/**
 * SeverError class
*/
export declare class SeverError extends Error {
    private errorResponse;
    /**
     * SeverError constructor
     * @param {ErrorType} err error type
     */
    constructor(err: ErrorType);
    /**
     * get message
     * @return {string} returns doc map .
     */
    getMessage(): string;
    /**
     * get error code
     * @return {string} returns code .
     */
    getCode(): number;
    /**
     * get error response
     * @return {string} returns doc map .
     */
    getErrorResponse(): ErrorType;
    /**
     * get error
     * @return {string} returns doc map .
     */
    getError(): Record<string, unknown>;
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
