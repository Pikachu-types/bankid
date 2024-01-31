"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientApp = void 0;
const class_transformer_1 = require("class-transformer");
const uuid_1 = require("uuid");
const enums_1 = require("../../enums/enums");
const contact_1 = require("../superficial/contact");
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
        this.type = enums_1.AppType.test;
        this.verificationStatus = enums_1.AppVerificationStatus.stale;
        this.displayName = "";
        this.lut = 0;
        this.created = 0;
        this.secrets = [];
        this.keys = { private: "", public: "" };
    }
    /**
     * Change record to ClientApp class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {ClientApp} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(ClientApp, obj, { excludeExtraneousValues: true });
        result.resolveMaps();
        return result;
    }
    /**
     * un-resolve maps for certain attributes
     * @return {void} nothing
     */
    unResolveMaps() {
        var _a;
        if (this.keyData)
            this.keys = {
                private: (_a = this.keyData.private) !== null && _a !== void 0 ? _a : '',
                public: this.keyData.public,
            };
    }
    /**
    * resolve maps for certain attributes
    * @return {void} text
    */
    resolveMaps() {
        this.keyData = contact_1.AuthenticateKeysData.fromJson(this.keys);
    }
    /**
     * Validate if secret is valid
     * @param {string} other string value to compare
     * @param {string} cipher provide the secret for cipher process
     * @return {boolean} valid or not
     */
    validateSecret(other, cipher) {
        if (this.secrets === undefined) {
            return false;
        }
        let flag = false;
        for (let i = 0; i < this.secrets.length; i++) {
            var secret = helper_1.FunctionHelpers.bankidCipherToString(cipher, this.secrets[i].secret);
            if (secret === other) {
                flag = true;
                break;
            }
        }
        return flag;
    }
    /**
     * Helper class function to find one specific object based on id
     *
     * @param {ConsumerModel[]} list an array to sort from and find given
     * @param {string} secret provide app secret needed to match for
     * @param {string} cipher provide the secret for cipher process
     * @return {ClientApp | undefined} found object else undefined
     */
    static matchSecretKey(list, secret, cipher) {
        for (let i = 0; i < list.length; i++) {
            var a = list[i];
            if (a.validateSecret(secret, cipher)) {
                return a;
            }
        }
        return;
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
     * create unique RSA keys for app
     * @param {string} secret aes cipher key
     * @return {void} generated uid
     */
    generateRSA(secret, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const gen = generator_1.Generator.createRSAPairString();
            yield (0, labs_sharable_1.delay)(400);
            if (gen === undefined || !gen.private || !gen.public) {
                throw new labs_sharable_1.CustomError("Could not generate RSA keys.");
            }
            const publicKey = helper_1.FunctionHelpers.bankidCipherString(secret, gen.public);
            const privateKey = helper_1.FunctionHelpers.bankidCipherString(secret, gen.private);
            this.keys = {
                public: publicKey,
                private: privateKey,
            };
            this.keyData = contact_1.AuthenticateKeysData.fromJson(this.keys);
            callback(this.keyData);
        });
    }
    /**
     * This class handler to json
     * @return {string} text
     */
    toJsonString() {
        return JSON.stringify(this);
    }
    /**
     * Create new app secret
     * @param {string} secret aes cipher key
     * @param {AppType} type app type
     * @return {string} text
     */
    static generateSecret(secret, type) {
        return {
            id: (0, labs_sharable_1.generateRandomAlphaNumeric)(12),
            secret: helper_1.FunctionHelpers.bankidCipherString(secret, `${type === enums_1.AppType.production ?
                enums_1.AppTypeSecretRef.production :
                enums_1.AppTypeSecretRef.test}${(0, uuid_1.v1)()}`),
            created: (0, labs_sharable_1.unixTimeStampNow)(),
            revoked: false,
        };
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
    /**
     * Check if app is safe to return real nin-data
     * @return {boolean} generated uid
     */
    safeApp() {
        return this.verificationStatus === enums_1.AppVerificationStatus.verified
            && this.type === enums_1.AppType.production;
    }
    /**
     * Check if app is a test app
     * @return {boolean} generated uid
     */
    testApp() {
        return this.type === enums_1.AppType.test;
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
], ClientApp.prototype, "verificationStatus", void 0);
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
], ClientApp.prototype, "information", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ClientApp.prototype, "secrets", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ClientApp.prototype, "keys", void 0);
exports.ClientApp = ClientApp;
//# sourceMappingURL=apps.js.map