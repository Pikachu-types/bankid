"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Requests = exports.IdentificationRequest = void 0;
const class_transformer_1 = require("class-transformer");
/**
 * IdentificationRequest class
*/
class IdentificationRequest {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        /**
         * request iD look like [req_]
         */
        this.id = "";
        /**
         * Bank ID consumer id
         */
        this.consumer = "";
        /**
         * Consumer app id
         */
        this.app = "";
        /**
         * Verification mode [identification or signature]
         */
        this.mode = "";
        /**
         * Json payload in a string format
         */
        this.payload = "";
        /**
         * Date request was created (timestamp)
         */
        this.iat = 0;
        /**
         * Exact expiration of request (timestamp)
         */
        this.exp = 0;
        this.user = "";
        this.type = "";
        /**
         * Ip address
         */
        this.ip = "";
        /**
         * User agent
         */
        this.useragent = "";
        this.name = "";
        this.signed = false;
        this.acquireClaims = [];
    }
    /**
     * Change record to IdentificationRequest class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {IdentificationRequest} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(IdentificationRequest, obj, { excludeExtraneousValues: true });
        return result;
    }
    /**
     * Helper class function to find one specific object based on id
     *
     * @param {IdentificationRequest[]} list an array to sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {IdentificationRequest | undefined} found object else undefined
     */
    static findOne(list, id) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id)
                return list[i];
        }
        return;
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
], IdentificationRequest.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationRequest.prototype, "consumer", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationRequest.prototype, "app", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationRequest.prototype, "mode", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationRequest.prototype, "payload", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationRequest.prototype, "iat", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationRequest.prototype, "exp", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationRequest.prototype, "signedAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationRequest.prototype, "user", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationRequest.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationRequest.prototype, "ip", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationRequest.prototype, "useragent", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationRequest.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationRequest.prototype, "signed", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationRequest.prototype, "details", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationRequest.prototype, "signatureIP", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationRequest.prototype, "signature", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationRequest.prototype, "acquireClaims", void 0);
exports.IdentificationRequest = IdentificationRequest;
/**
 * Requests class
*/
class Requests {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        this.request = "";
        this.mode = "";
        this.id = "";
        /**
         * nin or cac numbers
         */
        this.to = "";
        /**
         * This tells our servers how to handle the request
         * mobile, web or file
         */
        this.destination = "";
        /**
         *
         */
        this.sourceApp = "";
        this.created = 0;
        this.expires = 0;
        this.signed = false;
        this.cancelled = false;
        /**
         * is on session
         */
        this.onsess = false;
    }
    /**
     * Change record to Requests class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {Requests} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(Requests, obj, { excludeExtraneousValues: true });
        return result;
    }
    /**
     * Helper class function to find one specific object based on id
     *
     * @param {Requests[]} list an array to sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {Requests | undefined} found object else undefined
     */
    static findOne(list, id) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id)
                return list[i];
        }
        return;
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
], Requests.prototype, "request", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], Requests.prototype, "mode", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], Requests.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], Requests.prototype, "to", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], Requests.prototype, "hook", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], Requests.prototype, "device", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], Requests.prototype, "destination", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], Requests.prototype, "sourceApp", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], Requests.prototype, "created", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], Requests.prototype, "expires", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], Requests.prototype, "signed", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], Requests.prototype, "cancelled", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], Requests.prototype, "onsess", void 0);
exports.Requests = Requests;
//# sourceMappingURL=requests.js.map