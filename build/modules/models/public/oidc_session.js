"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OIDCSession = void 0;
const class_transformer_1 = require("class-transformer");
const labs_sharable_1 = require("labs-sharable");
const enums_1 = require("../../enums/enums");
/**
 * Get a pasby nin invitation request
*/
class OIDCSession {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        this.id = "";
        this.challenge = "";
        this.exp = 0;
        this.iat = 0;
        /**
         * national id
         */
        this.sub = "";
        /**
         * consumer
         */
        this.consumer = "";
        this.claims = [];
    }
    /**
     * Change record to this class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {OIDCSession} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(OIDCSession, obj, { excludeExtraneousValues: true });
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
     * class handler
     */
    generateID(token) {
        if (this.id.length > 1)
            return;
        this.id = `${enums_1.DocumentTypes.oidc}${token}`;
    }
    /**
     * Helper class function to find one specific object based on id
     *
     * @param {OIDCSession[]} list an array to sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {OIDCSession | undefined} found object else undefined
     */
    static findOne(list, id) {
        for (let i = 0; i < list.length; i++) {
            if ((0, labs_sharable_1.equalToIgnoreCase)(list[i].id, id))
                return list[i];
        }
        return;
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
], OIDCSession.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], OIDCSession.prototype, "challenge", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], OIDCSession.prototype, "exp", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], OIDCSession.prototype, "iat", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], OIDCSession.prototype, "sub", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], OIDCSession.prototype, "consumer", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], OIDCSession.prototype, "claims", void 0);
exports.OIDCSession = OIDCSession;
//# sourceMappingURL=oidc_session.js.map