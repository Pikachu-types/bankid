"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorModel = void 0;
const class_transformer_1 = require("class-transformer");
const contact_1 = require("../superficial/contact");
const helper_1 = require("../../services/helper");
const generator_1 = require("../../services/generator");
/**
 * VendorModel class
*/
class VendorModel {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        /**
         * id for vendors look like [vnd_{id}]
         */
        this.id = "";
        this.name = "";
        this.domain = "";
        this.regNum = "";
        this.tier = 1;
        this.test = false;
        this.apis = {};
        this.contact = {};
        this.keys = {};
        this.address = {};
    }
    /**
     * Change record to VendorModel class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {VendorModel} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(VendorModel, obj, { excludeExtraneousValues: true });
        result.resolveMaps();
        return result;
    }
    /**
     * resolve maps for certain attributes
     * @return {void} text
     */
    resolveMaps() {
        this.contactData = contact_1.ContactData.fromJson(this.contact);
        this.addressData = contact_1.AddressData.fromJson(this.address);
        this.keyData = contact_1.AuthenticateKeysData.fromJson(this.keys);
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
        if (this.keyData)
            this.keys = this.keyData.toMap();
    }
    /**
     * Helper class function to find one specific object based on id
     *
     * @param {VendorModel[]} list an array to sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {VendorModel | undefined} found object else undefined
     */
    static findOne(list, id) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id)
                return list[i];
        }
        return;
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
        delete res["contactData"];
        delete res["keyData"];
        delete res["addressData"];
        return res;
    }
    /**
     * create unique keys for consumer
     * @param {string} secret cipher key
     * @return {void} generated identifiers
     */
    createIdentifiers(secret) {
        const gen = generator_1.Generator.createRSAPairString();
        // console.log("Gen returned: ", gen);
        if (gen !== undefined) {
            const publicKey = helper_1.FunctionHelpers.bankidCipherString(secret, gen.public);
            const privateKey = helper_1.FunctionHelpers.bankidCipherString(secret, gen.private);
            this.keys = {
                "public": publicKey,
                "private": privateKey,
            };
        }
        const signable = {
            "name": this.name,
            "created": this.created,
            "regNum": this.regNum,
            "domain": this.domain,
        };
        const source = helper_1.FunctionHelpers.bankidCipherString(secret, JSON.stringify(signable));
        // console.log("Org signature: ", signable);
        try {
            const cryp = helper_1.FunctionHelpers.
                changeCipherStringToModel(source);
            this.id = "vnd_" + cryp.iv + "-" +
                this.regNum.substring(0, 4) + this.regNum.substring(10, 12);
            this.apis = {
                "live": `bk-live_${cryp.content}`,
                "test": `bk-test_${cryp.iv}`,
            };
        }
        catch (err) {
            console.log("Failed creating credentials");
        }
        this.resolveMaps();
    }
}
__decorate([
    (0, class_transformer_1.Expose)()
], VendorModel.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], VendorModel.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], VendorModel.prototype, "domain", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], VendorModel.prototype, "regNum", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], VendorModel.prototype, "created", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], VendorModel.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], VendorModel.prototype, "tier", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], VendorModel.prototype, "test", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], VendorModel.prototype, "apis", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], VendorModel.prototype, "contact", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], VendorModel.prototype, "keys", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], VendorModel.prototype, "address", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], VendorModel.prototype, "usage", void 0);
__decorate([
    (0, class_transformer_1.Exclude)()
], VendorModel.prototype, "contactData", void 0);
__decorate([
    (0, class_transformer_1.Exclude)()
], VendorModel.prototype, "addressData", void 0);
exports.VendorModel = VendorModel;
//# sourceMappingURL=vendors.js.map