"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EIDUserResource = void 0;
const class_transformer_1 = require("class-transformer");
const labs_sharable_1 = require("labs-sharable");
const consumer_helper_1 = require("../../utils/consumer.helper");
/**
 * Attached to consumers once a user interfaces with any of its apps.
*/
class EIDUserResource {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        this.national = "";
        this.id = "";
        this.region = "";
        /**
         * Last seen
         */
        this.lsn = 0;
        /**
         * Date added
         */
        this.iat = 0;
        /**
         * ID of consumer apps this user has interfaced with
         */
        this.apps = [];
    }
    /**
     * Change record to this class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {EIDUserResource} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(EIDUserResource, obj, { excludeExtraneousValues: true });
        return result;
    }
    /**
     * This class handler to json
     * @return {string} text
     */
    toJsonString() {
        return JSON.stringify(this);
    }
    static generate(nin, region) {
        const resource = new EIDUserResource();
        resource.iat = (0, labs_sharable_1.unixTimeStampNow)();
        resource.id = consumer_helper_1.ConsumerHelper.uniqueID();
        resource.national = nin;
        resource.region = region;
        resource.lsn = (0, labs_sharable_1.unixTimeStampNow)();
        return resource;
    }
    static getMonthlyActiveUsers(users) {
        const currentTime = Date.now() / 1000; // Current time in seconds (UNIX timestamp)
        const thirtyDaysInSeconds = 30 * 24 * 60 * 60; // 30 days in seconds
        // Filter users where last seen (`lsn`) is within the last 30 days
        const activeUsers = users.filter(user => (currentTime - (user.lsn)) <= thirtyDaysInSeconds);
        return activeUsers.length;
    }
    /**
     * Helper class function to find one specific object based on id
     *
     * @param {EIDUserResource[]} list an array to sort from and find given
     * @param {string} nin provide the needed id to match for
     * @return {EIDUserResource | undefined} found object else undefined
     */
    static findOne(list, nin) {
        for (let i = 0; i < list.length; i++) {
            if ((0, labs_sharable_1.equalToIgnoreCase)(list[i].national, nin))
                return list[i];
        }
        return;
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
], EIDUserResource.prototype, "national", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], EIDUserResource.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], EIDUserResource.prototype, "region", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], EIDUserResource.prototype, "lsn", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], EIDUserResource.prototype, "blocked", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], EIDUserResource.prototype, "iat", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], EIDUserResource.prototype, "apps", void 0);
exports.EIDUserResource = EIDUserResource;
//# sourceMappingURL=user_resource.js.map