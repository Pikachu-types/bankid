"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingModel = void 0;
const class_transformer_1 = require("class-transformer");
const labs_sharable_1 = require("labs-sharable");
// each month first 100 calls free
/**
 * Billing model class
*/
class BillingModel {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        this.paid = false;
        this.endpoints = {};
        /**
         * Total racked up now
         */
        this.cost = 0;
        this.count = 0;
    }
    /**
     * Change record to BillingModel class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {BillingModel} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(BillingModel, obj, { excludeExtraneousValues: true });
        // result.resolveMaps();
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
     * Generate document id
     * @return {string} text
     */
    static generateDocID() {
        const date = (0, labs_sharable_1.convertUnixToDate)((0, labs_sharable_1.unixTimeStampNow)());
        return `${date.getMonth()}-${date.getFullYear()}`;
    }
    /**
    * get document in map format
    * @return { Record<string, unknown>} returns doc map .
    */
    toMap() {
        const res = JSON.parse(this.toJsonString());
        return res;
    }
}
__decorate([
    (0, class_transformer_1.Expose)()
], BillingModel.prototype, "paid", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], BillingModel.prototype, "endpoints", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], BillingModel.prototype, "cost", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], BillingModel.prototype, "count", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], BillingModel.prototype, "lut", void 0);
exports.BillingModel = BillingModel;
//# sourceMappingURL=billing.js.map