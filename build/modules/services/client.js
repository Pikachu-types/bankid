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
exports.httpVastClient = exports.httpClient = void 0;
const axios_1 = require("axios");
const httpClient = (request, onError) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield request();
    }
    catch (error) {
        if ((0, axios_1.isAxiosError)(error)) {
            const response = error.response;
            if (onError) {
                onError({
                    message: (response === null || response === void 0 ? void 0 : response.data) ?
                        JSON.stringify(response === null || response === void 0 ? void 0 : response.data) : "Http request errored",
                    statusCode: response === null || response === void 0 ? void 0 : response.status,
                });
            }
        }
        else {
            if (onError) {
                onError({
                    message: `Unexpected error: ${error}`,
                    statusCode: 500,
                });
            }
        }
    }
    return undefined;
});
exports.httpClient = httpClient;
const httpVastClient = (request, onError) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield request();
    }
    catch (error) {
        if ((0, axios_1.isAxiosError)(error)) {
            const response = error.response;
            if (onError) {
                onError({
                    message: (response === null || response === void 0 ? void 0 : response.data) ?
                        JSON.stringify(response === null || response === void 0 ? void 0 : response.data) : "Http request errored",
                    statusCode: response === null || response === void 0 ? void 0 : response.status,
                });
            }
        }
        else {
            if (onError) {
                onError({
                    message: `Unexpected error: ${error}`,
                    statusCode: 500,
                });
            }
        }
    }
    return undefined;
});
exports.httpVastClient = httpVastClient;
// export default {httpClient, httpVastClient};
//# sourceMappingURL=client.js.map