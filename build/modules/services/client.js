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
exports.apiRequest = exports.httpVastClient = exports.httpClient = void 0;
const axios_1 = __importStar(require("axios"));
const server_error_1 = require("../utils/server.error");
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
function apiRequest(method, url, param) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        const axiosOptions = Object.assign({ headers: param.headers
                ? JSON.parse(JSON.stringify(param.headers))
                : { 'Accept': 'application/json' } }, ((method === 'POST' || method === 'PUT' || method === 'PATCH') && { data: param.body }));
        try {
            const response = yield (0, axios_1.default)(Object.assign({ method,
                url }, axiosOptions));
            return response.data;
        }
        catch (error) {
            // Check if the error is an Axios error
            if (axios_1.default.isAxiosError(error)) {
                const statusCode = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : 500;
                const errorMessage = ((_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message) || error.message;
                throw new server_error_1.SeverError({
                    reason: errorMessage,
                    status: 'failed',
                    code: statusCode,
                    type: 'api_error',
                }, statusCode);
            }
            // If the error is not Axios-specific, handle it as a generic unknown error
            throw server_error_1.SeverError.handleError(error);
        }
    });
}
exports.apiRequest = apiRequest;
//# sourceMappingURL=client.js.map