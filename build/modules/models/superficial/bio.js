"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BioData = void 0;
const class_transformer_1 = require("class-transformer");
/**
 * User BioData class
*/
class BioData {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        this.birthdate = "";
        /**
        * Birth number is saved as a timestamp
        */
        this.birthnumber = 0;
        this.birthplace = "";
        this.maritalStatus = "";
        this.age = 0;
        this.gender = "";
    }
    /**
     * Change record to BioData class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {BioData} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(BioData, obj, { excludeExtraneousValues: true });
        return result;
    }
    /**
     * Get specific claims and return them as a record
     * @param {string[]} claims supported claims
     * @param {BioData} classData this class
     * @return {Record<string, unknown>} record of claims
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
], BioData.prototype, "birthdate", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], BioData.prototype, "birthnumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], BioData.prototype, "birthplace", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], BioData.prototype, "dateOfDeath", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], BioData.prototype, "maritalStatus", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], BioData.prototype, "age", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], BioData.prototype, "gender", void 0);
exports.BioData = BioData;
//# sourceMappingURL=bio.js.map