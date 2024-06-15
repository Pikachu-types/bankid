"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeverError = void 0;
const labs_sharable_1 = require("labs-sharable");
const __1 = require("..");
/**
 * SeverError class
*/
class SeverError extends Error {
    /**
     * SeverError constructor
     * @param {ErrorType} err error type
     */
    constructor(err) {
        super(err.reason);
        this.errorResponse = err;
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, SeverError.prototype);
    }
    /**
     * get message
     * @return {string} returns doc map .
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
        return (_a = this.errorResponse.code) !== null && _a !== void 0 ? _a : 400;
    }
    /**
     * get error response
     * @return {string} returns doc map .
     */
    getErrorResponse() {
        return this.errorResponse;
    }
    /**
     * get error
     * @return {string} returns doc map .
     */
    getError() {
        return (0, __1.parseInterface)(this.errorResponse);
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
        if (err instanceof labs_sharable_1.CustomError) {
            return this.changeCustomErrorToServerError(err);
        }
        return new SeverError({
            reason: `${err}`,
            status: __1.RequestStatus.extreme,
            code: 412,
            type: 'api_error',
        });
    }
    /**
     * Convert from CustomError to ServerError
     * @param {Object} err the object
     * @returns {SeverError} returns this class
     */
    static changeCustomErrorToServerError(err) {
        var _a, _b;
        return new SeverError({
            reason: err.getMessage(),
            status: (_b = (_a = err.getErrorResponse()) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : __1.RequestStatus.failed,
            code: err.getCode(),
            type: 'api_error'
        });
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