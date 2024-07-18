import { CustomError } from "labs-sharable";
import { parseInterface } from "../services/helper";

export type errorType = 'api_error' | 'param_error' | 'db_error' |
  'external_service_error' | 'session_cancel' | 'unknown_error' |
  'authorization_error' | 'session_expiry' | 'invalid_request';

export type status = 'successful' | 'handled' |
  'mismatch' | 'token-mismatch' | 'unauthorized' |
  'expiration' | 'failed' | 'extreme'; 


interface ErrorDetails {
  status: status;
  reason: string;
  type?: errorType;
  label?: string;
  code?: number;
  body?: Record<string, unknown>,
  helper_url?: string;
  trace?: string;
}

export class SeverError extends Error {
  private errorResponse: ErrorDetails;
  code: number;

  constructor(param: string | ErrorDetails, code?: number, type?: errorType) {
    // Call the parent class constructor
    if (typeof param === 'string') {
      super(param);
      this.code = code as number;
      this.errorResponse = {
        status: 'handled',
        reason: param,
        type: type ?? 'unknown_error',
      };
    } else {
      super(param.reason);
      this.errorResponse = param;
    }

    this.code = code ?? 400;

    this.name = 'SeverError'
    // Set the prototype explicitly (required for extending built-ins in TypeScript)
    Object.setPrototypeOf(this, SeverError.prototype);
  }

  /**
   * get message
   * @return {string} returns error message .
   */
  getMessage(): string {
    return this.message;
  }

  /**
   * get error code
   * @return {string} returns code .
   */
  getCode(): number {
    return this.errorResponse.code ?? this.code;
  }

  /**
   * get error response
   * @return {ErrorDetails} returns doc map .
   */
  getErrorResponse(): ErrorDetails {
    return this.errorResponse;
  }

  /**
  * get error
  * @return {Record<string, unknown>} returns doc map .
  */
  getError(): Record<string, unknown> {
    return parseInterface(this.errorResponse);
  }
  
  /**
  * get error log
  * @return {string} returns doc map .
  */
  logError(): ErrorDetails {
    if (!this.errorResponse.trace) {
      var err = new Error();
      this.errorResponse.trace = err.stack;
    }
    return this.errorResponse; 
  }

  /**
   * Check if error type class
   * @param {Object} error the object
   * @returns {boolean} returns true or false
   */
  public static isSeverError(error: Object | unknown): boolean {
    return error instanceof SeverError;
  }

  /**
   * Handles unknown error
   * @param {Object} err the object
   * @returns {SeverError} returns this class
   */
  public static handleError(err: unknown): SeverError {

    if (this.isSeverError(err)) return err as SeverError;

    if (CustomError.isCustomError(err)) {
      return this.changeCustomErrorToServerError(err as CustomError);
    }

    return new SeverError({
      reason: `${err}`,
      status: 'failed',
      type: 'unknown_error',
    });
  }

  /**
   * Convert from CustomError to ServerError
   * @param {Object} err the object
   * @returns {SeverError} returns this class
   */
  public static changeCustomErrorToServerError(err: CustomError): SeverError {
    return new SeverError({
      reason: err.getMessage(),
      status: 'failed',
      type: 'api_error'
    }, err.getCode());
  }

  /**
   * This class handler to json
   * @return {string} text
   */
  public toJsonString(): string {
    return JSON.stringify(this.errorResponse);
  }
}