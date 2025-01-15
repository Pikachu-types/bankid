"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Documents = void 0;
const class_transformer_1 = require("class-transformer");
const enums_1 = require("../../enums/enums");
const uuid_1 = require("uuid");
/**
 * Documents class
*/
class Documents {
    constructor() {
        /* eslint new-cap: ["error", { "capIsNew": false }]*/
        /**
         * doc_[uuid1]
         */
        this.id = "";
        /**
         * nin numbers to sign document
         */
        this.to = [];
        /**
         * User agent
         */
        this.useragent = "";
        /**
         * Request destination [mobile, file, desktop]
         */
        this.destination = "";
        this.lut = 0;
        this.iat = 0;
        this.exp = 0;
        this.handled = false;
        /**
         * document file data
         */
        this.file = {
            source: "",
            name: "",
        };
    }
    /**
     * Change record to Documents class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {Documents} this class
     */
    static fromJson(obj) {
        const result = (0, class_transformer_1.plainToInstance)(Documents, obj, { excludeExtraneousValues: true });
        return result;
    }
    /**
     * Helper class function to find one specific object based on id
     *
     * @param {Documents[]} list an array to sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {Documents | undefined} found object else undefined
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
     * create a pretty unique uid for documents
     * @return {string} generated uid
     */
    static createID() {
        return `${enums_1.DocumentTypes.document}${(0, uuid_1.v1)()}`;
    }
    /**
     * get document reference
     * @return {string} reference id
     */
    reference() {
        return this.id.replace(enums_1.DocumentTypes.document, "");
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
], Documents.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], Documents.prototype, "to", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], Documents.prototype, "useragent", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], Documents.prototype, "mode", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], Documents.prototype, "statusLog", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], Documents.prototype, "signee", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], Documents.prototype, "destination", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], Documents.prototype, "lut", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], Documents.prototype, "iat", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], Documents.prototype, "exp", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], Documents.prototype, "handled", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], Documents.prototype, "signatures", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], Documents.prototype, "request", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], Documents.prototype, "file", void 0);
__decorate([
    (0, class_transformer_1.Expose)()
], Documents.prototype, "hook", void 0);
exports.Documents = Documents;
//# sourceMappingURL=documents.js.map