"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceInfoData = exports.StandaloneBankID = void 0;
const class_transformer_1 = require("class-transformer");
/**
 * StandaloneBankID class
*/
class StandaloneBankID {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        /**
         * id format ["std_{nin}-{generated 6 length alpha numeric string id}"]
         */
        this.id = "";
        this.vendor = "";
        this.created = 0;
        /**
         * last updated time
         */
        this.lut = 0;
        this.test = false;
        this.activated = false;
        this.disabled = false;
    }
    /**
     * Change record to StandaloneBankID class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {StandaloneBankID} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(StandaloneBankID, obj, { excludeExtraneousValues: true });
        return result;
    }
    /**
     * Helper class function to find one specific id
     *
     * @param {StandaloneBankID[]} list an array of bankids to
     *  sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {StandaloneBankID | undefined} found object else undefined
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
        return JSON.parse(this.toJsonString());
    }
}
__decorate([
    (0, class_transformer_1.Expose)()
], StandaloneBankID.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], StandaloneBankID.prototype, "vendor", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], StandaloneBankID.prototype, "validTo", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], StandaloneBankID.prototype, "created", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], StandaloneBankID.prototype, "dateActivated", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], StandaloneBankID.prototype, "dateDisabled", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], StandaloneBankID.prototype, "deactivationIP", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], StandaloneBankID.prototype, "lut", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], StandaloneBankID.prototype, "deviceInfo", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], StandaloneBankID.prototype, "test", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], StandaloneBankID.prototype, "activated", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], StandaloneBankID.prototype, "disabled", void 0);
exports.StandaloneBankID = StandaloneBankID;
/**
 * DeviceInfoData class
*/
class DeviceInfoData {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        /**
         * id format ["std_{nin}-{generated 6 length alpha numeric string id}"]
         */
        this.model = "";
        this.deviceID = "";
        this.platform = "";
    }
    /**
     * Change record to DeviceInfoData class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {DeviceInfoData} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(DeviceInfoData, obj, { excludeExtraneousValues: true });
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
        return JSON.parse(this.toJsonString());
    }
}
__decorate([
    (0, class_transformer_1.Expose)()
], DeviceInfoData.prototype, "model", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], DeviceInfoData.prototype, "deviceID", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], DeviceInfoData.prototype, "platform", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], DeviceInfoData.prototype, "serialNumber", void 0);
exports.DeviceInfoData = DeviceInfoData;
//# sourceMappingURL=standaloneIds.js.map