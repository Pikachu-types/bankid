"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceModel = exports.OverageModel = void 0;
const class_transformer_1 = require("class-transformer");
const server_error_1 = require("../../utils/server.error");
const labs_sharable_1 = require("labs-sharable");
/**
 * Overage model class
*/
class OverageModel {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        this.status = 'stale';
        /**
         * m-yyyy
         */
        this.total = 0;
        this.paid_at = 0;
        this.timeline = "";
        this.id = "";
        this.type = 'authentication';
        this.items = [];
    }
    /**
     * Change record to OverageModel class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {OverageModel} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(OverageModel, obj, { excludeExtraneousValues: true });
        return result;
    }
    /**
     * Helper class function to find one specific object based on id
     *
     * @param {OverageModel[]} list an array to sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {OverageModel | undefined} found object else undefined
     */
    static findOne(list, id) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].timeline === id)
                return list[i];
        }
        return;
    }
    /**
     * Change timeline to date
     * @param {string} timeline ex [1-2024]
     * @return {Date} text
     */
    static timelineToDate(timeline) {
        const values = timeline.split("-");
        if (values.length !== 2)
            throw new server_error_1.SeverError("Invalid timeline");
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
        const res = JSON.parse(this.toJsonString());
        return res;
    }
}
__decorate([
    (0, class_transformer_1.Expose)()
], OverageModel.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], OverageModel.prototype, "total", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], OverageModel.prototype, "paid_at", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], OverageModel.prototype, "timeline", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], OverageModel.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], OverageModel.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], OverageModel.prototype, "instrument", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], OverageModel.prototype, "lut", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], OverageModel.prototype, "items", void 0);
exports.OverageModel = OverageModel;
class InvoiceModel {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        this.status = 'stale';
        this.id = "";
        this.trxRef = "";
        this.subscription = ""; // the subscription id on our database
        this.mode = 'authentication';
        this.lut = 0;
        /**
         * Charge amount
         */
        this.charge = 0;
        this.paid_at = 0;
        this.period_start = 0;
        this.period_end = 0;
        this.next_cycle = 0;
    }
    /**
     * Change record to InvoiceModel class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {InvoiceModel} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(InvoiceModel, obj, { excludeExtraneousValues: true });
        return result;
    }
    generateInvoiceTitle() {
        if (this.period_end === 0 || this.period_start === 0)
            throw new server_error_1.SeverError("Invoice lacks a valid period start or period end", 400, 'invalid_request');
        const begin = (0, labs_sharable_1.convertUnixToDate)(this.period_start);
        const end = (0, labs_sharable_1.convertUnixToDate)(this.period_end);
        return `${mYYYY(begin)} x ${mYYYY(end)} | invoice`;
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
        const res = JSON.parse(this.toJsonString());
        return res;
    }
}
__decorate([
    (0, class_transformer_1.Expose)()
], InvoiceModel.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], InvoiceModel.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], InvoiceModel.prototype, "trxRef", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], InvoiceModel.prototype, "subscription", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], InvoiceModel.prototype, "mode", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], InvoiceModel.prototype, "lut", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], InvoiceModel.prototype, "charge", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], InvoiceModel.prototype, "paid_at", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], InvoiceModel.prototype, "period_start", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], InvoiceModel.prototype, "period_end", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], InvoiceModel.prototype, "next_cycle", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], InvoiceModel.prototype, "attempts", void 0);
exports.InvoiceModel = InvoiceModel;
function mYYYY(date) {
    return `${date.getMonth() + 1}-${date.getFullYear()}`;
}
//# sourceMappingURL=invoicing.js.map