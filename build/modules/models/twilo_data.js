"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwiloData = void 0;
const class_transformer_1 = require("class-transformer");
/**
 * Buka TwiloData class
*/
class TwiloData {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        this.to = "";
        this.dateCreated = "";
        this.sid = "";
        this.errorCode = "";
        this.from = "";
        this.messagingServiceSid = "";
        this.dateSent = "";
        this.status = "";
        this.price = 0;
    }
    /**
     * Change record to TwiloData class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {TwiloData} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(TwiloData, obj, { excludeExtraneousValues: true });
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
], TwiloData.prototype, "to", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], TwiloData.prototype, "dateCreated", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], TwiloData.prototype, "sid", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], TwiloData.prototype, "errorCode", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], TwiloData.prototype, "from", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], TwiloData.prototype, "messagingServiceSid", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], TwiloData.prototype, "dateSent", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], TwiloData.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], TwiloData.prototype, "price", void 0);
exports.TwiloData = TwiloData;
//# sourceMappingURL=twilo_data.js.map