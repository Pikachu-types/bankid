"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractIPAdData = exports.AbstractIPData = void 0;
const class_transformer_1 = require("class-transformer");
/**
 * User AbstractIPData class
*/
class AbstractIPData {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        this.ip = "";
        this.city = "";
        this.version = "";
        this.postal = "";
        this.region = "";
        this.region_code = "";
        this.continent = "";
        this.in_eu = false;
        this.continent_code = "";
        this.country_code = "";
        this.country_code_ios3 = "";
        this.currency = "";
        this.currency_name = "";
        this.asn = "";
        this.country_calling_code = "";
        this.country = "";
        this.country_tld = "";
        this.hostname = "";
        this.languages = "";
        this.org = "";
        this.latitude = 0;
        this.longitude = 0;
        this.timezone = "";
    }
    /**
     * Change record to AbstractIPData class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {AbstractIPData} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(AbstractIPData, obj, { excludeExtraneousValues: true });
        return result;
    }
    /**
     * This class handler to json
     * @return {string} text
     */
    toJsonString() {
        return JSON.stringify(this, null, 4);
    }
    /**
    * get document in map format
    * @return { Record<string, unknown>} returns doc map .
    */
    toMap() {
        return JSON.parse(this.toJsonString());
    }
} /**
 * User AbstractIPData class
*/
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPData.prototype, "ip", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPData.prototype, "city", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPData.prototype, "version", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPData.prototype, "postal", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPData.prototype, "region", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPData.prototype, "region_code", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPData.prototype, "continent", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPData.prototype, "in_eu", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPData.prototype, "continent_code", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPData.prototype, "country_code", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPData.prototype, "country_code_ios3", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPData.prototype, "currency", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPData.prototype, "currency_name", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPData.prototype, "asn", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPData.prototype, "country_calling_code", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPData.prototype, "country", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPData.prototype, "country_tld", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPData.prototype, "hostname", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPData.prototype, "languages", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPData.prototype, "org", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPData.prototype, "latitude", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPData.prototype, "longitude", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPData.prototype, "timezone", void 0);
exports.AbstractIPData = AbstractIPData;
class AbstractIPAdData {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        this.ip_address = "";
        this.city = "";
        this.city_geoname_id = 0;
        this.region = "";
        this.region_iso_code = "";
        this.continent = "";
        this.country_is_eu = false;
        this.continent_code = "";
        this.country_code = "";
        this.country = "";
        this.latitude = 0;
        this.longitude = 0;
        this.flag = {};
        this.security = {};
        this.timezone = {};
        this.connection = {};
        this.continent_geoname_id = 0;
        this.country_geoname_id = 0;
        this.region_geoname_id = 0;
    }
    /**
     * Change record to AbstractIPAdData class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {AbstractIPAdData} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(AbstractIPAdData, obj, { excludeExtraneousValues: true });
        return result;
    }
    /**
     * This class handler to json
     * @return {string} text
     */
    toJsonString() {
        return JSON.stringify(this, null, 4);
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
], AbstractIPAdData.prototype, "ip_address", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPAdData.prototype, "city", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPAdData.prototype, "city_geoname_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPAdData.prototype, "postcode", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPAdData.prototype, "region", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPAdData.prototype, "region_iso_code", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPAdData.prototype, "continent", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPAdData.prototype, "country_is_eu", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPAdData.prototype, "continent_code", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPAdData.prototype, "country_code", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPAdData.prototype, "country", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPAdData.prototype, "latitude", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPAdData.prototype, "longitude", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPAdData.prototype, "flag", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPAdData.prototype, "security", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPAdData.prototype, "timezone", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPAdData.prototype, "connection", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPAdData.prototype, "continent_geoname_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPAdData.prototype, "country_geoname_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AbstractIPAdData.prototype, "region_geoname_id", void 0);
exports.AbstractIPAdData = AbstractIPAdData;
//# sourceMappingURL=ip.js.map