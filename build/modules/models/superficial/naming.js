"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamingData = void 0;
const class_transformer_1 = require("class-transformer");
/**
 * User NamingData class
*/
class NamingData {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        this.family = "";
        this.given = "";
        this.middle = "";
        this.nickname = "";
        this.title = "";
        this.name = "";
        this.preferredUsername = "";
    }
    /**
     * Change record to NamingData class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {NamingData} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(NamingData, obj, { excludeExtraneousValues: true });
        return result;
    }
    /**
   * Get specific claims and return them as a record
   * @param {string[]} claims supported claims
   * @param {NamingData} classData this class
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
     * getter
     * @return {string}full name of user
     */
    fullname() {
        return this.given + " " + this.family;
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
], NamingData.prototype, "family", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], NamingData.prototype, "given", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], NamingData.prototype, "middle", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], NamingData.prototype, "nickname", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], NamingData.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], NamingData.prototype, "titlePrefix", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], NamingData.prototype, "titleSuffix", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], NamingData.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], NamingData.prototype, "preferredUsername", void 0);
exports.NamingData = NamingData;
//# sourceMappingURL=naming.js.map