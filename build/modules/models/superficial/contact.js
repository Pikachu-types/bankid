"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateKeysData = exports.AddressData = exports.ContactData = void 0;
const class_transformer_1 = require("class-transformer");
const labs_sharable_1 = require("labs-sharable");
const helper_1 = require("../../services/helper");
/**
 * ContactData class
*/
class ContactData {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        this.email = "";
        this.emailVerified = false;
        this.phone = "";
        this.phoneVerified = false;
    }
    /**
     * Change record to ContactData class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {ContactData} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(ContactData, obj, { excludeExtraneousValues: true });
        return result;
    }
    /**
     * Get specific claims and return them as a record
     * @param {string[]} claims supported claims
     * @param {ContactData} classData this class
     * @return {Record<string, unknown>} record of claims
     */
    static grabClaim(claims, classData) {
        const data = {};
        const json = classData.toMap();
        for (let i = 0; i < claims.length; i++) {
            try {
                const value = json[claims[i]];
                if (!value)
                    continue;
                data[`${claims[i]}`] = value;
            }
            catch (_) {
                // invalid key
            }
        }
        return data;
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
], ContactData.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ContactData.prototype, "emailVerified", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ContactData.prototype, "phone", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ContactData.prototype, "phoneVerified", void 0);
exports.ContactData = ContactData;
/**
 * AddressData class
*/
class AddressData {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        /**
         * Local government of residence
         */
        this.city = "";
        this.postCode = "";
        /**
         * State of residence
         */
        this.state = "";
        /**
         * A2 country code ex. [NG, ZA, GB]
         */
        this.countryCode = "";
        /**
         * Country name ex [Nigeria, Gambia, Namibia, Zimbabwe]
         */
        this.country = "";
        /**
         * Residential Address
         */
        this.place = "";
        /**
         * Formatted address (place, state, country)
         */
        this.formatted = "";
    }
    /**
     * Change record to AddressData class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {AddressData} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(AddressData, obj, { excludeExtraneousValues: true });
        return result;
    }
    /**
     * Get specific claims and return them as a record
     * @param {string[]} claims supported claims
     * @param {AddressData} classData this class
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
     * This class handler to address
     * @return {string} text
     */
    toString() {
        return this.place + " " + this.city + " " +
            this.postCode + ", " + this.country;
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
], AddressData.prototype, "city", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AddressData.prototype, "postCode", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AddressData.prototype, "state", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AddressData.prototype, "countryCode", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AddressData.prototype, "country", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AddressData.prototype, "place", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AddressData.prototype, "formatted", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AddressData.prototype, "longitude", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AddressData.prototype, "latitude", void 0);
exports.AddressData = AddressData;
/**
 * AuthenticateKeysData class
*/
class AuthenticateKeysData {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        this.public = "";
    }
    /**
     * Change record to AuthenticateKeysData class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {AuthenticateKeysData} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(AuthenticateKeysData, obj, { excludeExtraneousValues: true });
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
     * This class handler to RSA keys
     * @param {string} cipherKey  key
     * @return {string} text
     */
    getPublicKey(cipherKey) {
        try {
            const pV = helper_1.FunctionHelpers.
                changeCipherStringToModel(this.public);
            const publicKey = labs_sharable_1.LabsCipher.decrypt(pV, cipherKey);
            return Buffer.from(publicKey);
        }
        catch (_) {
            return;
        }
    }
    /**
     * This class handler to RSA keys
     * @param {string} cipherKey  key
     * @return {string} text
     */
    getPrivateKey(cipherKey) {
        if (this.private === undefined)
            return;
        try {
            const pV = helper_1.FunctionHelpers.
                changeCipherStringToModel(this.private);
            const key = labs_sharable_1.LabsCipher.decrypt(pV, cipherKey);
            return Buffer.from(key);
        }
        catch (_) {
            return;
        }
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
], AuthenticateKeysData.prototype, "public", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], AuthenticateKeysData.prototype, "private", void 0);
exports.AuthenticateKeysData = AuthenticateKeysData;
//# sourceMappingURL=contact.js.map