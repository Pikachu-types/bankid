"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModel = void 0;
const class_transformer_1 = require("class-transformer");
const enums_1 = require("../../enums/enums");
const uuid_1 = require("uuid");
const labs_sharable_1 = require("labs-sharable");
/**
 * TransactionModel class
*/
class TransactionModel {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        this.id = ""; /// trx_{{uuid1}}
        this.reference = "";
        this.iat = 0;
        this.debug = false;
        this.status = 'stale';
        this.relationship = {
            consumer: "",
            type: "setup",
            details: {
                period: "monthly",
                plan: "basic",
                product: "authentication"
            }
        };
    }
    /**
    * Change record to TransactionModel class
    *
    * @param {Record<string, unknown>} obj  json object from db
    * @return {TransactionModel} this class
    */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(TransactionModel, obj, { excludeExtraneousValues: true });
        return result;
    }
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
        return JSON.stringify(this.toMap());
    }
    toMap() {
        const res = JSON.parse(JSON.stringify(this));
        return res;
    }
    static generateID() {
        return `${enums_1.DocumentTypes.transaction}${(0, uuid_1.v1)()}`;
    }
    static generate(params) {
        var _a, _b, _c, _d;
        const transaction = new TransactionModel();
        transaction.id = this.generateID();
        transaction.debug = (_c = (_b = (_a = params === null || params === void 0 ? void 0 : params.request) === null || _a === void 0 ? void 0 : _a.debug) !== null && _b !== void 0 ? _b : params.debug) !== null && _c !== void 0 ? _c : false;
        transaction.iat = (0, labs_sharable_1.unixTimeStampNow)();
        transaction.provider = params.provider;
        transaction.reference = params.reference;
        transaction.relationship = {
            consumer: (_d = params.consumer) !== null && _d !== void 0 ? _d : '',
            type: params.type,
            details: params.request,
            redirects: params.redirects
        };
        transaction.status = 'stale';
        return transaction;
    }
}
__decorate([
    (0, class_transformer_1.Expose)()
], TransactionModel.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], TransactionModel.prototype, "reference", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], TransactionModel.prototype, "iat", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], TransactionModel.prototype, "debug", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], TransactionModel.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], TransactionModel.prototype, "provider", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], TransactionModel.prototype, "relationship", void 0);
exports.TransactionModel = TransactionModel;
//# sourceMappingURL=payment.request.js.map