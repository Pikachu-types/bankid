"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PendingApprovals = exports.InvitationRequest = void 0;
const class_transformer_1 = require("class-transformer");
const crypto_1 = require("crypto");
const labs_sharable_1 = require("labs-sharable");
const enums_1 = require("../../enums/enums");
const consumer_helper_1 = require("../../utils/consumer.helper");
/**
 * Get a pasby nin invitation request
*/
class InvitationRequest {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        this.nin = "";
        this.name = "";
        this.id = "";
        this.admin = ""; // bid_ of admin
        this.iat = 0;
        this.exp = 0;
        this.used = false;
    }
    /**
     * Change record to this class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {InvitationRequest} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(InvitationRequest, obj, { excludeExtraneousValues: true });
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
     * Helper class function to find one specific object based on id
     *
     * @param {InvitationRequest[]} list an array to sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {InvitationRequest | undefined} found object else undefined
     */
    static findOne(list, id) {
        for (let i = 0; i < list.length; i++) {
            if ((0, labs_sharable_1.equalToIgnoreCase)(list[i].id, id))
                return list[i];
        }
        return;
    }
    /**
     * Helper class function to create invitation
     *
     * @param {string} nin identity to invite
     * @param {string} admin admin identity who created invite
     * @param {string} name naming info
     * @return {InvitationRequest} created
     */
    static create(nin, admin, name) {
        const res = new InvitationRequest();
        res.iat = (0, labs_sharable_1.unixTimeStampNow)();
        res.admin = admin;
        res.nin = nin;
        res.name = name;
        res.id = `${enums_1.DocumentTypes.invitation}${(0, crypto_1.randomUUID)()}`;
        res.exp = consumer_helper_1.ConsumerHelper.expiration(30);
        return res;
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
], InvitationRequest.prototype, "nin", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], InvitationRequest.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], InvitationRequest.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], InvitationRequest.prototype, "admin", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], InvitationRequest.prototype, "iat", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], InvitationRequest.prototype, "exp", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], InvitationRequest.prototype, "used", void 0);
exports.InvitationRequest = InvitationRequest;
/**
 * Get a pasby nin invitation request
*/
class PendingApprovals {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        this.nin = "";
        this.pending = true;
    }
    /**
     * Change record to this class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {PendingApprovals} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(PendingApprovals, obj, { excludeExtraneousValues: true });
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
     * Helper class function to find one specific object based on id
     *
     * @param {PendingApprovals[]} list an array to sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {PendingApprovals | undefined} found object else undefined
     */
    static findOne(list, id) {
        for (let i = 0; i < list.length; i++) {
            if ((0, labs_sharable_1.equalToIgnoreCase)(list[i].nin, id))
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
], PendingApprovals.prototype, "nin", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], PendingApprovals.prototype, "source", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], PendingApprovals.prototype, "pending", void 0);
exports.PendingApprovals = PendingApprovals;
//# sourceMappingURL=invitation:request.js.map