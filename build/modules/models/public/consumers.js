"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumerModel = void 0;
const class_transformer_1 = require("class-transformer");
const contact_1 = require("../superficial/contact");
const labs_sharable_1 = require("labs-sharable");
const generator_1 = require("../../services/generator");
const helper_1 = require("../../services/helper");
const enums_1 = require("../../enums/enums");
const uuid_1 = require("uuid");
/**
 * ConsumerModel class
*/
class ConsumerModel {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        /**
         * id look like [bcn_{id}]
         */
        this.id = "";
        this.name = "";
        this.regNum = "";
        this.tin = "";
        this.apiKey = "";
        this.email = "";
        this.test = false;
        this.tier = 1;
        this.contact = {};
        this.keys = {};
        this.apis = {};
    }
    /**
     * Change record to ConsumerModel class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {ConsumerModel} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(ConsumerModel, obj, { excludeExtraneousValues: true });
        result.resolveMaps();
        return result;
    }
    /**
    * resolve maps for certain attributes
    * @return {void} text
    */
    resolveMaps() {
        this.contactData = contact_1.ContactData.fromJson(this.contact);
        this.keyData = contact_1.AuthenticateKeysData.fromJson(this.keys);
    }
    /**
     * Helper class function to find one specific object based on id
     *
     * @param {ConsumerModel[]} list an array to sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {ConsumerModel | undefined} found object else undefined
     */
    static findOne(list, id) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id)
                return list[i];
        }
        return;
    }
    /**
     * un-resolve maps for certain attributes
     * @return {void} nothing
     */
    unResolveMaps() {
        if (this.contactData)
            this.contact = this.contactData.toMap();
        if (this.keyData)
            this.keys = this.keyData.toMap();
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
        return res;
    }
    /**
     * creates a new consumer model
     * @param {ConsoleRegAccountRequest} request organisation create requester
     * @return {ConsumerModel} new Consumer
     */
    static createConsumer(request) {
        const template = {
            "tier": 1,
            "test": false,
            "regNum": "",
            "created": 1688536369,
            "usage": 0,
            "contact": {
                "emailVerified": false,
                "phone": "",
                "phoneVerified": false,
                "email": "",
            },
            "name": "",
            "tin": "",
            "id": "",
            "email": "",
            "updatedAt": 1688536369,
            "keys": {
                "public": "",
            },
            "apis": {
                "live": "",
                "test": "",
            },
            "apiKey": "",
        };
        if (request.email == undefined) {
            throw new labs_sharable_1.CustomError("Cannot create organisation with no reference to owner");
        }
        const data = ConsumerModel.fromJson(template);
        data.name = request.org;
        data.email = request.email;
        data.id = `${enums_1.DocumentTypes.consumer}${(0, uuid_1.v4)()}`;
        data.created = (0, labs_sharable_1.unixTimeStampNow)();
        data.lut = (0, labs_sharable_1.unixTimeStampNow)();
        data.test = request.debug;
        return data;
    }
    /**
     * create unique keys for consumer
     * @param {string} secret cipher key
     * @return {void} generated uid
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
            "email": this.email,
            "regNum": this.regNum,
            "tin": this.tin,
        };
        const source = helper_1.FunctionHelpers.bankidCipherString(secret, JSON.stringify(signable));
        // console.log("Org signature: ", signable);
        try {
            const cryp = helper_1.FunctionHelpers.
                changeCipherStringToModel(source);
            this.id = "bcn_" + cryp.iv + "-" +
                this.tin.substring(0, 4) + this.tin.substring(10, 12);
            this.apiKey = `bk-live_${cryp.content}`;
            this.apis = {
                "live": this.apiKey,
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
], ConsumerModel.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ConsumerModel.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ConsumerModel.prototype, "regNum", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ConsumerModel.prototype, "tin", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ConsumerModel.prototype, "apiKey", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ConsumerModel.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ConsumerModel.prototype, "test", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ConsumerModel.prototype, "created", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ConsumerModel.prototype, "lut", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ConsumerModel.prototype, "tier", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ConsumerModel.prototype, "contact", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ConsumerModel.prototype, "keys", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ConsumerModel.prototype, "apis", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ConsumerModel.prototype, "usage", void 0);
exports.ConsumerModel = ConsumerModel;
//# sourceMappingURL=consumers.js.map