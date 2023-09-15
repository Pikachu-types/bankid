"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientApp = void 0;
const class_transformer_1 = require("class-transformer");
const uuid_1 = require("uuid");
const enums_1 = require("../../enums/enums");
const bankid_1 = require("../bankid");
const generator_1 = require("../../services/generator");
const helper_1 = require("../../services/helper");
const labs_sharable_1 = require("labs-sharable");
/**
 * ClientApp class
*/
class ClientApp {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        /**
         * id look like [app_{id}]
         */
        this.id = "";
        this.owner = "";
        this.appName = "";
        this.type = "";
        this.displayName = "";
        this.lut = 0;
        this.created = 0;
        this.secrets = [];
        this.keys = {};
    }
    /**
     * Change record to ClientApp class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {ClientApp} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(ClientApp, obj, { excludeExtraneousValues: true });
        return result;
    }
    /**
     * Helper class function to find one specific object based on id
     *
     * @param {ClientApp[]} list an array to sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {ClientApp | undefined} found object else undefined
     */
    static findOne(list, id) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id)
                return list[i];
        }
        return;
    }
    /**
     * create app service json
     * @param {string} secret cipher key
     * @param {string} clientid provide consumer id
     * @return {AppServiceJSON} generated uid
     */
    generateServiceJSON(secret, clientid) {
        var _a, _b;
        if (this.keyData === undefined)
            this.generateRSA(secret);
        if (this.keyData === undefined) {
            throw new labs_sharable_1.CustomError("Could not still generate RSA keys.");
        }
        return {
            type: enums_1.BankIDTypes.app,
            appid: this.id,
            clientid: clientid,
            privatekey: (_a = this.keyData) === null || _a === void 0 ? void 0 : _a.private,
            publickey: (_b = this.keyData) === null || _b === void 0 ? void 0 : _b.public,
            authUri: `${bankid_1.BankID.Links.authUri}?sub=${clientid}&app=${this.id}`,
        };
    }
    /**
     * create unique RSA keys for app
     * @param {string} secret cipher key
     * @return {void} generated uid
     */
    generateRSA(secret) {
        const gen = generator_1.Generator.createRSAPairString();
        if (gen !== undefined) {
            const publicKey = helper_1.FunctionHelpers.bankidCipherString(secret, gen.public);
            const privateKey = helper_1.FunctionHelpers.bankidCipherString(secret, gen.private);
            this.keys = {
                public: publicKey,
                private: privateKey,
            };
        }
        else {
            throw new labs_sharable_1.CustomError("Could not generate RSA keys.");
        }
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
        delete res["keyData"];
        return res;
    }
    /**
     * create a pretty unique uid for consumers
     * @return {string} generated uid
     */
    static createID() {
        return `${enums_1.DocumentTypes.app}${(0, uuid_1.v4)()}`;
    }
}
__decorate([
    (0, class_transformer_1.Expose)()
], ClientApp.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ClientApp.prototype, "owner", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ClientApp.prototype, "appName", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ClientApp.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ClientApp.prototype, "displayName", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ClientApp.prototype, "lut", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ClientApp.prototype, "created", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ClientApp.prototype, "secrets", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ClientApp.prototype, "keys", void 0);
exports.ClientApp = ClientApp;
//# sourceMappingURL=apps.js.map