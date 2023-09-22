"use strict";
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
exports.FunctionHelpers = void 0;
const labs_sharable_1 = require("labs-sharable");
const approvedClients_1 = require("../models/public/approvedClients");
/**
 * Callable Function Helper class
 */
class FunctionHelpers {
    /**
     * Changes string to CipherType model
     * @param {string} source content to get RSA code
     * @param {string} cipherKey designated cipher secret code
     * @return {Buffer} returns value.
     */
    static decipherRSAKey(source, cipherKey) {
        const data = FunctionHelpers.changeCipherStringToModel(source);
        return Buffer.from(labs_sharable_1.LabsCipher.decrypt(data, cipherKey), "utf-8");
    }
    /**
     * This class handler to RSA keys
     * @param {string} cipherKey  key
     * @param {string} encoded  rsa key written in bcrypt
     * @return {Buffer} buffer value
     */
    static bcryptToRSAKey(cipherKey, encoded) {
        try {
            const pV = FunctionHelpers.
                changeCipherStringToModel(encoded);
            const publicKey = labs_sharable_1.LabsCipher.decrypt(pV, cipherKey);
            return Buffer.from(publicKey, "utf-8");
        }
        catch (_) {
            return;
        }
    }
    /**
     * Create a proper string from the CipherType model
     * @param {CipherType} source content to string from
     * @return {string} returns value.
     */
    static createCipherString(source) {
        return `${source.content}-vi(${source.iv})`;
    }
    /**
     * Create a proper string from the CipherType model
     * long function
     * @param {string} cipherKey secret key
     * @param {string} source content
     * @return {string} returns value.
     */
    static bankidCipherString(cipherKey, source) {
        return FunctionHelpers.
            createCipherString(labs_sharable_1.LabsCipher.encrypt(source, cipherKey));
    }
    /**
     * Create an api key for BankID consumer
     * @param {string} content use your own content
     * @return {string} returns value.
     */
    static generateApiKey(content) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = content !== null && content !== void 0 ? content : crypto.randomUUID();
            return yield labs_sharable_1.LabsCipher.hashWithBcrypt(token, 10);
        });
    }
    /**
     * Revert CipherType model string to readable string
     * long function
     * @param {string} cipherKey secret key
     * @param {string} source content
     * @return {string} returns value.
     */
    static bankidCipherToString(cipherKey, source) {
        try {
            const signature = FunctionHelpers.
                changeCipherStringToModel(source);
            return labs_sharable_1.LabsCipher.decrypt(signature, cipherKey);
        }
        catch (e) {
            throw new labs_sharable_1.CustomError(`${e}`);
        }
    }
    /**
     * Verify Client side app approval
     * @param {string} cipherKey key used to unlock cipher
     * @param {string} source content to string from
     * @return {string} returns value.
     */
    static verifyAppAuthorization(cipherKey, source) {
        if (source === undefined)
            return false;
        let appID;
        try {
            const signature = FunctionHelpers.
                changeCipherStringToModel(source);
            appID = labs_sharable_1.LabsCipher.decrypt(signature, cipherKey);
            return approvedClients_1.ApprovedClients.applications.includes(appID);
        }
        catch (_) {
            return false;
        }
    }
    /**
     * Verify Client side app approval
     * @param {string} cipherKey key used to unlock cipher
     * @param {string} source content to string from
     * @return {string} returns value.
     */
    static verifyAuthorization(cipherKey, source) {
        if (source === undefined)
            return false;
        let appID;
        try {
            const signature = FunctionHelpers.
                changeCipherStringToModel(source);
            appID = labs_sharable_1.LabsCipher.decrypt(signature, cipherKey);
            return approvedClients_1.ApprovedClients.authorized.includes(appID);
        }
        catch (_) {
            return false;
        }
    }
    /**
     * Create a proper string from the CipherType model
     * @param {CipherType} source content to string from
     * @return {string} returns value.
     */
    static changeCipherStringToModel(source) {
        const cipher = source.split("-vi");
        if (cipher.length != 2) {
            throw new labs_sharable_1.CustomError("Invalid source string");
        }
        return {
            iv: cipher[1].replace("(", "").replace(")", ""),
            content: cipher[0],
        };
    }
    /**
     * Verify the requester of a http request
     * @param {string} cipherKey cipher secret key
     * @param {string} source authorization key found in header
     * @return {boolean} returns state.
     */
    static verifyRequester(cipherKey, source) {
        if (source === undefined)
            return false;
        let appID;
        try {
            const signature = FunctionHelpers.
                changeCipherStringToModel(source);
            appID = labs_sharable_1.LabsCipher.decrypt(signature, cipherKey);
            return approvedClients_1.ApprovedClients.requesters.includes(appID);
        }
        catch (err) {
            return false;
        }
    }
}
exports.FunctionHelpers = FunctionHelpers;
//# sourceMappingURL=helper.js.map