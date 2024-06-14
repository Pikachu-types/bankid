import { CustomError } from "labs-sharable";
import { RequestStatus, parseInterface } from "..";

/**
 * error response
 */
export type ErrorType = {
  status: RequestStatus | string;
  reason: string;
  code?: number;
  type?: 'api_error' | 'param_error' | 'db_error' | 'external_service_error';
  label?: string;
  body?: Record<string, unknown>,
  helper_url?: string
};

/**
 * SeverError class
*/
export class SeverError extends Error {
  private errorResponse: ErrorType;

  /**
   * SeverError constructor
   * @param {ErrorType} err error type 
   */
  constructor(err: ErrorType) {
    super(err.reason);
    this.errorResponse = err;
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, SeverError.prototype);
  }

  /**
   * get message
   * @return {string} returns doc map .
   */
  getMessage(): string {
    return this.message;
  }

  /**
   * get error code
   * @return {string} returns code .
   */
  getCode(): number {
    return this.errorResponse.code ?? 400;
  }

  /**
   * get error response
   * @return {string} returns doc map .
   */
  getErrorResponse(): ErrorType {
    return this.errorResponse;
  }

  /**
   * get error
   * @return {string} returns doc map .
   */
  getError(): Record<string, unknown> {
    return parseInterface(this.errorResponse);
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

    if (CustomError.isCustomError(err as Object)) {
      return this.changeCustomErrorToServerError(err as CustomError);
    }

    return new SeverError({
      reason: `${err}`,
      status: RequestStatus.extreme,
      code: 412,
      type: 'api_error',
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
      status: err.getErrorResponse()?.status
        ?? RequestStatus.failed,
      code: err.getCode(),
      type: 'api_error'
    });
  }

  /**
   * This class handler to json
   * @return {string} text
   */
  public toJsonString(): string {
    return JSON.stringify(this.errorResponse);
  }

}
