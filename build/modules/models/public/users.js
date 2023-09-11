"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentificationModel = void 0;
const class_transformer_1 = require("class-transformer");
const contact_1 = require("../superficial/contact");
const bio_1 = require("../superficial/bio");
const naming_1 = require("../superficial/naming");
const financials_1 = require("../superficial/financials");
const nationality_1 = require("../superficial/nationality");
/**
 * IdentificationModel class
*/
class IdentificationModel {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        /**
         * id look like [bid_{id}]
         */
        this.id = "";
        this.nin = "";
        this.locale = "";
        this.test = false;
        /**
         * Verification claim could be biometrics via nin or bvn
         */
        this.source = "";
        /**
         * bankids this user has meaning one nin can own multiple id
         */
        this.iDs = [];
        /**
         * BankID vendor id
         */
        this.vendor = "";
        this.contact = {};
        this.address = {};
        this.nationality = {};
        this.bio = {};
        this.naming = {};
    }
    /**
     * Change record to IdentificationModel class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {IdentificationModel} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(IdentificationModel, obj, { excludeExtraneousValues: true });
        result.resolveMaps();
        return result;
    }
    /**
     * Helper class function to find one specific id
     *
     * @param {IdentificationModel[]} list an array of bankids to
     *  sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {IdentificationModel | undefined} found object else undefined
     */
    static findOne(list, id) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id || list[i].nin === id)
                return list[i];
        }
        return;
    }
    /**
     * resolve maps for certain attributes
     * @return {void} nothing
     */
    resolveMaps() {
        this.contactData = contact_1.ContactData.fromJson(this.contact);
        this.addressData = contact_1.AddressData.fromJson(this.address);
        if (this.financial) {
            this.financialData = financials_1.FinancialData.
                fromJson(this.financial);
        }
        this.bioData = bio_1.BioData.fromJson(this.bio);
        this.nameData = naming_1.NamingData.fromJson(this.naming);
        this.nationalityData = nationality_1.NationalityData.fromJson(this.nationality);
    }
    /**
     * un-resolve maps for certain attributes
     * @return {void} nothing
     */
    unResolveMaps() {
        if (this.contactData)
            this.contact = this.contactData.toMap();
        if (this.addressData)
            this.address = this.addressData.toMap();
        if (this.financialData)
            this.financial = this.financialData.toMap();
        if (this.bioData)
            this.bio = this.bioData.toMap();
        if (this.nameData)
            this.naming = this.nameData.toMap();
        if (this.nationalityData)
            this.nationality = this.nationalityData.toMap();
    }
    /**
     * Get registered users claims
     * @param {string[]} claims supported claims
     * @return {void} nothing
     */
    retrieveClaims(claims) {
        // console.log("Now searching for ", claims);
        const result = {};
        const bio = [];
        const contact = [];
        const address = [];
        const naming = [];
        const nationality = [];
        for (let i = 0; i < claims.length; i++) {
            const word = claims[i];
            if (word.startsWith("bio")) {
                bio.push(word.split(".")[1].trim());
            }
            else if (word.startsWith("contact")) {
                contact.push(word.split(".")[1].trim());
            }
            else if (word.startsWith("address")) {
                address.push(word.split(".")[1].trim());
            }
            else if (word.startsWith("naming")) {
                naming.push(word.split(".")[1].trim());
            }
            else if (word.startsWith("nationality")) {
                nationality.push(word.split(".")[1].trim());
            }
            else {
                continue;
            }
        }
        const bioclaim = this.bioData ?
            bio_1.BioData.grabClaim(bio, this.bioData) : undefined;
        const contactclaim = this.contactData ?
            contact_1.ContactData.grabClaim(contact, this.contactData) : undefined;
        const addressclaim = this.addressData ?
            contact_1.AddressData.grabClaim(address, this.addressData) : undefined;
        const namingclaim = this.nameData ?
            naming_1.NamingData.grabClaim(naming, this.nameData) : undefined;
        const nationalityclaim = this.nationalityData ?
            nationality_1.NationalityData.grabClaim(nationality, this.nationalityData) : undefined;
        if (bioclaim)
            result["bio"] = bioclaim;
        if (contactclaim)
            result["contact"] = contactclaim;
        if (addressclaim)
            result["address"] = addressclaim;
        if (namingclaim)
            result["naming"] = namingclaim;
        if (nationalityclaim)
            result["nationality"] = nationalityclaim;
        // console.log(`Exited with: ${JSON.stringify(result)}`);
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
        const res = JSON.parse(this.toJsonString());
        delete res["addressData"];
        delete res["nameData"];
        delete res["contactData"];
        delete res["bioData"];
        delete res["nationalityData"];
        delete res["financialData"];
        return res;
    }
}
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationModel.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationModel.prototype, "nin", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationModel.prototype, "locale", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationModel.prototype, "test", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationModel.prototype, "created", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationModel.prototype, "validTo", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationModel.prototype, "source", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationModel.prototype, "iDs", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationModel.prototype, "vendor", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationModel.prototype, "lut", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationModel.prototype, "contact", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationModel.prototype, "address", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationModel.prototype, "nationality", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationModel.prototype, "bio", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationModel.prototype, "financial", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], IdentificationModel.prototype, "naming", void 0);
__decorate([
    (0, class_transformer_1.Exclude)()
], IdentificationModel.prototype, "contactData", void 0);
__decorate([
    (0, class_transformer_1.Exclude)()
], IdentificationModel.prototype, "addressData", void 0);
__decorate([
    (0, class_transformer_1.Exclude)()
], IdentificationModel.prototype, "bioData", void 0);
__decorate([
    (0, class_transformer_1.Exclude)()
], IdentificationModel.prototype, "nameData", void 0);
__decorate([
    (0, class_transformer_1.Exclude)()
], IdentificationModel.prototype, "nationalityData", void 0);
__decorate([
    (0, class_transformer_1.Exclude)()
], IdentificationModel.prototype, "financialData", void 0);
exports.IdentificationModel = IdentificationModel;
//# sourceMappingURL=users.js.map