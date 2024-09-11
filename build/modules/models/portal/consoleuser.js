"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleUser = void 0;
const class_transformer_1 = require("class-transformer");
const uuid_1 = require("uuid");
const enums_1 = require("../../enums/enums");
const labs_sharable_1 = require("labs-sharable");
/**
 * ConsoleUser class
*/
class ConsoleUser {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        /**
         * id look like [cnu_{id}]
         */
        this.id = "";
        this.email = "";
        this.legalAccepted = false;
        this.campaigns = false;
        this.created = 0;
        this.lut = 0;
        this.organizations = [];
    }
    /**
     * Change record to ConsoleUser class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {ConsoleUser} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(ConsoleUser, obj, { excludeExtraneousValues: true });
        result.resolveMaps();
        return result;
    }
    /**
    * resolve maps for certain attributes
    * @return {void} text
    */
    resolveMaps() {
        // this.contactData = ContactData.fromJson(this.contact);
    }
    /**
     * Helper class function to find one specific object based on id
     *
     * @param {ConsoleUser[]} list an array to sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {ConsoleUser | undefined} found object else undefined
     */
    static findOne(list, id) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id || list[i].email === id)
                return list[i];
        }
        return;
    }
    /**
     * Helper class function to find one specific object based on eid
     *
     * @param {ConsoleUser[]} list an array to sort from and find given
     * @param {string} eid provide the needed id to match for
     * @return {ConsoleUser | undefined} found object else undefined
     */
    static findEID(list, eid) {
        var _a;
        for (let i = 0; i < list.length; i++) {
            if (list[i].security && ((_a = list[i].security) === null || _a === void 0 ? void 0 : _a.nin) === eid)
                return list[i];
        }
        return;
    }
    /**
     * un-resolve maps for certain attributes
     * @return {void} nothing
     */
    unResolveMaps() {
        // if (this.contactData) this.contact = this.contactData.toMap();
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
    * @param {string[]} paths add attributes you'd like to omit from the map
    * @return { Record<string, unknown>} returns doc map .
    */
    toMap(paths) {
        const res = JSON.parse(this.toJsonString());
        if (paths) {
            for (let i = 0; i < paths.length; i++) {
                delete res[paths[i]];
            }
        }
        return res;
    }
    /**
     * create a pretty unique uid for consumers
     * @return {string} generated uid
     */
    static createID() {
        return `${enums_1.DocumentTypes.consoleuser}${(0, uuid_1.v4)()}`;
    }
    static create(data) {
        var _a;
        const user = new ConsoleUser();
        user.id = ConsoleUser.createID();
        user.naming = data.naming;
        user.email = (_a = data.email) !== null && _a !== void 0 ? _a : '';
        user.legalAccepted = data.legalAccepted;
        user.created = (0, labs_sharable_1.unixTimeStampNow)();
        user.lut = (0, labs_sharable_1.unixTimeStampNow)();
        user.security = {
            tFA: false,
            generated: false,
            provider: "",
        };
        user.organizations = [];
        return user;
    }
}
__decorate([
    (0, class_transformer_1.Expose)()
], ConsoleUser.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ConsoleUser.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ConsoleUser.prototype, "legalAccepted", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ConsoleUser.prototype, "campaigns", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ConsoleUser.prototype, "naming", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ConsoleUser.prototype, "created", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ConsoleUser.prototype, "lut", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ConsoleUser.prototype, "security", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], ConsoleUser.prototype, "organizations", void 0);
exports.ConsoleUser = ConsoleUser;
;
//# sourceMappingURL=consoleuser.js.map