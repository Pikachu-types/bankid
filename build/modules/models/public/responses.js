"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationResponse = void 0;
const class_transformer_1 = require("class-transformer");
/**
 * AuthenticationResponse class
*/
class AuthenticationResponse {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        /**
         * request iD
         */
        this.reference = "";
        /**
         * consumer id
         */
        this.requester = "";
        /**
         * registered bankid user
         */
        this.requestee = "";
        /**
         * Verification mode [identification or signature]
         */
        this.mode = "";
        /**
         * signed data in a string format
         */
        this.data = "";
        /**
         * request cancelled
         */
        this.cancelled = false;
        /**
         * on session
         */
        this.onsession = false;
        /**
         * Date request was created (timestamp)
         */
        this.iat = 0;
        /**
         * Supported claims requested for
         */
        this.claims = {};
    }
    /**
     * Change record to AuthenticationResponse class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {AuthenticationResponse} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(AuthenticationResponse, obj, { excludeExtraneousValues: true });
        return result;
    }
    /**
     * This class handler to json
     * @return {string} text
     */
    toJsonString() {
        return JSON.stringify(this);
    }
    /**
    * get document in map format
    * @return { Record<string, unknown>} returns doc map .
    */
    toMap() {
        return JSON.parse(this.toJsonString());
    }
}
__decorate([
    (0, class_transformer_1.Expose)()
], AuthenticationResponse.prototype, "reference", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AuthenticationResponse.prototype, "requester", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AuthenticationResponse.prototype, "requestee", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AuthenticationResponse.prototype, "mode", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AuthenticationResponse.prototype, "data", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AuthenticationResponse.prototype, "cancelled", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AuthenticationResponse.prototype, "onsession", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AuthenticationResponse.prototype, "iat", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AuthenticationResponse.prototype, "signedAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AuthenticationResponse.prototype, "signature", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AuthenticationResponse.prototype, "claims", void 0);
exports.AuthenticationResponse = AuthenticationResponse;
//# sourceMappingURL=responses.js.map