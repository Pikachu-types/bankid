"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeLogs = void 0;
const class_transformer_1 = require("class-transformer");
const labs_sharable_1 = require("labs-sharable");
/**
 * ChangeLogs class
*/
class ChangeLogs {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        this.header = "";
        this.changelog = "";
    }
    /**
     * Change record to ChangeLogs class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {ChangeLogs} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(ChangeLogs, obj, { excludeExtraneousValues: true });
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
     * Create log id
     * @return {string} text
     */
    static generateLogID() {
        return `log_${(0, labs_sharable_1.generateRandomAlphaNumeric)(10)}`;
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
], ChangeLogs.prototype, "header", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ChangeLogs.prototype, "changelog", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ChangeLogs.prototype, "logs", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ChangeLogs.prototype, "lut", void 0);
exports.ChangeLogs = ChangeLogs;
//# sourceMappingURL=dash_content.js.map