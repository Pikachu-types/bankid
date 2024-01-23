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
const axios_1 = require("axios");
const labs_sharable_1 = require("labs-sharable");
const httpClient = (request, onError) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        return yield request();
    }
    catch (error) {
        if ((0, axios_1.isAxiosError)(error)) {
            const response = error.response;
            if (onError) {
                onError(`Axios error of status code: ${(_a = error.response) === null || _a === void 0 ? void 0 : _a.status} ||` +
                    ` Body : ${JSON.stringify((_b = error.response) === null || _b === void 0 ? void 0 : _b.data)}`);
            }
            const body = JSON.parse(JSON.stringify((_c = error.response) === null || _c === void 0 ? void 0 : _c.data));
            if (response && body.reason) {
                throw new labs_sharable_1.CustomError("", response.status, undefined, body);
            }
            else {
                throw new labs_sharable_1.CustomError(error.message, (_d = error.status) !== null && _d !== void 0 ? _d : 500);
            }
        }
        else {
            if (onError) {
                onError(`Unexpected error: ${error}`);
            }
            throw new labs_sharable_1.CustomError("An unexpected error occurred", 500);
        }
    }
});
exports.default = httpClient;
//# sourceMappingURL=client.js.map