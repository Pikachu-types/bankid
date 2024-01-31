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
        /**
         * month-year
         */
        this.timeline = "";
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
     * Helper class function to find one specific object based on id
     *
     * @param {BillingModel[]} list an array to sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {BillingModel | undefined} found object else undefined
     */
    static findOne(list, id) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].timeline === id)
                return list[i];
        }
        return;
    }
    /**
     * Helper class function to return timeline
     *
     * @param {BillingModel[]} list an array to sort from and find given
     * @param {Date} begin provide beginning
     * @param {Date} end provide ending
     * @return {BillingModel[]} found objects
     */
    static returnTimeline(list, begin, end) {
        let res = [];
        for (let i = 0; i < list.length; i++) {
            const bill = list[i];
            var date = this.timelineToDate(bill.timeline);
            if (date <= end && date >= begin) {
                res.push(bill);
            }
        }
        return res;
    }
    /**
     * This class handler to json
     * @return {string} text
     */
    toJsonString() {
        return JSON.stringify(this);
    }
    /**
     * Change timeline to date
     * @param {string} timeline ex [1-2024]
     * @return {Date} text
     */
    static timelineToDate(timeline) {
        const values = timeline.split("-");
        if (values.length !== 2)
            throw new labs_sharable_1.CustomError("Invalid timeline");
        const month = values[0];
        const year = values[1];
        const date = `${year}-${month}-01`;
        return new Date(date);
    }
    /**
     * Generate document id
     * @return {string} text
     */
    static generateDocID() {
        const date = (0, labs_sharable_1.convertUnixToDate)((0, labs_sharable_1.unixTimeStampNow)());
        return `${date.getMonth() + 1}-${date.getFullYear()}`;
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
], BillingModel.prototype, "timeline", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], BillingModel.prototype, "lut", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], BillingModel.prototype, "paidAt", void 0);
exports.BillingModel = BillingModel;
//# sourceMappingURL=billing.js.map