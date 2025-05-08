"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutsModel = void 0;
const class_transformer_1 = require("class-transformer");
const enums_1 = require("../../enums/enums");
const uuid_1 = require("uuid");
const labs_sharable_1 = require("labs-sharable");
class PayoutsModel {
    constructor() {
        this.id = ""; /// pyt_{{uuid1}}
        this.iat = 0;
        this.reference = "";
        this.amount = 0;
        this.debug = false;
        this.status = 'stale';
    }
    /**
    * Change record to PayoutsModel class
    *
    * @param {Record<string, unknown>} obj  json object from db
    * @return {PayoutsModel} this class
    */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(PayoutsModel, obj, { excludeExtraneousValues: true });
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
        return `${enums_1.DocumentTypes.payout}${(0, uuid_1.v1)()}`;
    }
    generateID() {
        this.id = `${enums_1.DocumentTypes.payout}${(0, uuid_1.v1)()}`;
    }
    static generate(params) {
        var _a, _b;
        const model = new PayoutsModel();
        model.iat = (0, labs_sharable_1.unixTimeStampNow)();
        model.generateID();
        model.amount = params.amount;
        model.reference = (_a = params.reference) !== null && _a !== void 0 ? _a : '';
        model.debug = (_b = params.debug) !== null && _b !== void 0 ? _b : false;
        model.provider = params.provider;
        model.redirects = params.redirects;
        model.status = 'stale';
        return model;
    }
}
__decorate([
    (0, class_transformer_1.Expose)()
], PayoutsModel.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], PayoutsModel.prototype, "iat", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], PayoutsModel.prototype, "reference", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], PayoutsModel.prototype, "amount", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], PayoutsModel.prototype, "debug", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], PayoutsModel.prototype, "redirects", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], PayoutsModel.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], PayoutsModel.prototype, "provider", void 0);
exports.PayoutsModel = PayoutsModel;
//# sourceMappingURL=payment.transfer.js.map