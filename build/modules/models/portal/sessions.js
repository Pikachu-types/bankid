"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionData = void 0;
const class_transformer_1 = require("class-transformer");
const uuid_1 = require("uuid");
const enums_1 = require("../../enums/enums");
const ip_1 = require("../superficial/ip");
/**
 * SessionData class
*/
class SessionData {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        this.id = "";
        this.date = 0;
        this.exp = 0;
    }
    /**
     * Change record to SessionData class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {SessionData} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(SessionData, obj, { excludeExtraneousValues: true });
        result.resolveMaps();
        return result;
    }
    /**
    * resolve maps for certain attributes
    * @return {void} text
    */
    resolveMaps() {
        if (this.ip)
            this.ipData = ip_1.AbstractIPData.fromJson(this.ip);
    }
    /**
     * Helper class function to find one specific object based on id
     *
     * @param {SessionData[]} list an array to sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {SessionData | undefined} found object else undefined
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
        if (this.ipData)
            this.ip = this.ipData.toMap();
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
        delete res["ipData"];
        return res;
    }
    /**
     * create a pretty unique uid for consumers
     * @return {string} generated uid
     */
    static createID() {
        return `${enums_1.DocumentTypes.session}${(0, uuid_1.v4)()}`;
    }
}
__decorate([
    (0, class_transformer_1.Expose)()
], SessionData.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], SessionData.prototype, "date", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], SessionData.prototype, "exp", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], SessionData.prototype, "ip", void 0);
exports.SessionData = SessionData;
//# sourceMappingURL=sessions.js.map