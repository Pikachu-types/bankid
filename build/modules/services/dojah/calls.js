"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.DojahIdentityCheck = void 0;
const axios_1 = __importStar(require("axios"));
const labs_sharable_1 = require("labs-sharable");
class DojahIdentityCheck {
    /**
      * BVN check
      * @param {ApiReference} keys api keys
      * @param {string} bvn bvn identifier
      * @return {Promise<DojahBVNResponse>} returns response.
      */
    static bvn(keys, bvn) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, status } = yield axios_1.default.get(`${this.baseURl}/api/v1/kyc/bvn/advance?bvn=${bvn}`, {
                    headers: {
                        Accept: 'application/json',
                        AppId: keys.app,
                        Authorization: keys.private
                    }
                });
                if (status == 200) {
                    const entity = data['entity'];
                    return entity;
                }
                else {
                    throw new labs_sharable_1.CustomError(JSON.stringify(data), status);
                }
            }
            catch (error) {
                if ((0, axios_1.isAxiosError)(error)) {
                    console.log("BVN extract error message: ", error.message);
                    const response = error.response;
                    if (response && response.data['error'].includes('not found')) {
                        throw new labs_sharable_1.CustomError("BVN not found", 404);
                    }
                    else if (response) {
                        throw new labs_sharable_1.CustomError("", response.status, response.data);
                    }
                    else {
                        throw new labs_sharable_1.CustomError(error.message, (_a = error.status) !== null && _a !== void 0 ? _a : 500);
                    }
                }
                else {
                    throw new labs_sharable_1.CustomError("Critical ID extract error", 500);
                }
            }
        });
    }
    /**
      * NIN check
      * @param {ApiReference} keys api keys
      * @param {string} nin nin identifier
      * @return {Promise<DojahNINResponse>} returns response.
      */
    static nin(keys, nin) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, status } = yield axios_1.default.get(`${this.baseURl}/api/v1/kyc/nin?nin=${nin}`, {
                    headers: {
                        Accept: 'application/json',
                        AppId: keys.app,
                        Authorization: keys.private
                    }
                });
                if (status == 200) {
                    const entity = data['entity'];
                    return entity;
                }
                else {
                    throw new labs_sharable_1.CustomError(JSON.stringify(data), status);
                }
            }
            catch (error) {
                if ((0, axios_1.isAxiosError)(error)) {
                    console.log("NIN extract error message: ", error.message);
                    const response = error.response;
                    if (response && response.data['error'].includes('not found')) {
                        throw new labs_sharable_1.CustomError("NIN not found", 404);
                    }
                    else if (response) {
                        throw new labs_sharable_1.CustomError("", response.status, response.data);
                    }
                    else {
                        throw new labs_sharable_1.CustomError(error.message, (_a = error.status) !== null && _a !== void 0 ? _a : 500);
                    }
                }
                else {
                    throw new labs_sharable_1.CustomError("Critical ID extract error", 500);
                }
            }
        });
    }
}
exports.DojahIdentityCheck = DojahIdentityCheck;
DojahIdentityCheck.baseURl = "https://api.dojah.io";
//# sourceMappingURL=calls.js.map