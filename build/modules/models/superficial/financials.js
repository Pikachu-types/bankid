"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialData = void 0;
const class_transformer_1 = require("class-transformer");
// export interface BVN {
//   bank: string,
//   level: string,
//   iat: number
// }
/**
 * FinancialData class
*/
class FinancialData {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        this.paymentAccounts = [];
        this.primaryAccount = {};
        this.bvn = "";
        this.bvnBank = "";
        this.bvnLevel = "";
    }
    /**
     * Change record to FinancialData class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {FinancialData} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(FinancialData, obj, { excludeExtraneousValues: true });
        return result;
    }
    /**
    * Get specific claims and return them as a record
    * @param {string[]} claims supported claims
    * @param {FinancialData} classData this class
    * @return {Record<string, unknown> | undefined} record of claims
    */
    static grabClaim(claims, classData) {
        const data = {};
        const json = classData.toMap();
        for (let i = 0; i < claims.length; i++) {
            try {
                const value = json[claims[i]];
                if (value === undefined)
                    continue;
                data[`${claims[i]}`] = value;
            }
            catch (_) {
                // invalid key
            }
        }
        return Object.keys(data).length === 0 ? undefined : data;
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
], FinancialData.prototype, "paymentAccounts", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], FinancialData.prototype, "primaryAccount", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], FinancialData.prototype, "bvn", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], FinancialData.prototype, "bvnBank", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], FinancialData.prototype, "bvnIAT", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], FinancialData.prototype, "bvnLevel", void 0);
exports.FinancialData = FinancialData;
//# sourceMappingURL=financials.js.map