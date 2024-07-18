"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeverError = void 0;
const labs_sharable_1 = require("labs-sharable");
const helper_1 = require("../services/helper");
class SeverError extends Error {
    constructor(param, code, type) {
        // Call the parent class constructor
        if (typeof param === 'string') {
            super(param);
            this.code = code;
            this.errorResponse = {
                status: 'handled',
                reason: param,
                type: type !== null && type !== void 0 ? type : 'unknown_error',
            };
        }
        else {
            super(param.reason);
            this.errorResponse = param;
        }
        this.code = code !== null && code !== void 0 ? code : 400;
        this.name = 'SeverError';
        // Set the prototype explicitly (required for extending built-ins in TypeScript)
        Object.setPrototypeOf(this, SeverError.prototype);
    }
    /**
     * get message
     * @return {string} returns error message .
     */
    getMessage() {
        return this.message;
    }
    /**
     * get error code
     * @return {string} returns code .
     */
    getCode() {
        var _a;
        return (_a = this.errorResponse.code) !== null && _a !== void 0 ? _a : this.code;
    }
    /**
     * get error response
     * @return {ErrorDetails} returns doc map .
     */
    getErrorResponse() {
        return this.errorResponse;
    }
    /**
    * get error
    * @return {Record<string, unknown>} returns doc map .
    */
    getError() {
        return (0, helper_1.parseInterface)(this.errorResponse);
    }
    /**
    * get error log
    * @return {string} returns doc map .
    */
    logError() {
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
    static isSeverError(error) {
        return error instanceof SeverError;
    }
    /**
     * Handles unknown error
     * @param {Object} err the object
     * @returns {SeverError} returns this class
     */
    static handleError(err) {
        if (this.isSeverError(err))
            return err;
        if (labs_sharable_1.CustomError.isCustomError(err)) {
            return this.changeCustomErrorToServerError(err);
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
    static changeCustomErrorToServerError(err) {
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
    toJsonString() {
        return JSON.stringify(this.errorResponse);
    }
}
exports.SeverError = SeverError;
//# sourceMappingURL=server.error.js.map