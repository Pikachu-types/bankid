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
exports.ExternalApiClient = void 0;
const axios_1 = __importStar(require("axios"));
const ip_1 = require("../models/superficial/ip");
const labs_sharable_1 = require("labs-sharable");
const bankid_1 = require("../models/bankid");
/**
 * Api client helper
 */
class ExternalApiClient {
    /**
      * Checkup IP
      * @param {string} apiKey abstractApi key
      * @param {string} ipAddress ip address to look for
      * @return {Promise<AbstractIPData>} returns response.
      */
    static ipChecker(apiKey, ipAddress) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, status } = yield axios_1.default.get(bankid_1.BankID.Links.ipChecker + "?api_key="
                    + apiKey + "&ip_address=" + ipAddress, {
                    headers: {
                        Accept: 'application/json',
                    }
                });
                console.log(JSON.stringify(data, null, 4));
                if (status == 200) {
                    return ip_1.AbstractIPData.fromJson(data);
                }
                else {
                    throw new labs_sharable_1.CustomError(JSON.stringify(data), status);
                }
            }
            catch (error) {
                if ((0, axios_1.isAxiosError)(error)) {
                    console.log("error message: ", error.message);
                    const response = error.response;
                    if (response) {
                        throw new labs_sharable_1.CustomError("", response.status, response.data);
                    }
                    else {
                        throw new labs_sharable_1.CustomError(error.message, (_a = error.status) !== null && _a !== void 0 ? _a : 500);
                    }
                }
                else {
                    throw new labs_sharable_1.CustomError("An unexpected error occurred", 500);
                }
            }
        });
    }
}
exports.ExternalApiClient = ExternalApiClient;
//# sourceMappingURL=api_client.js.map