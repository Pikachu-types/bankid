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
exports.MicroServiceBackendAxios = void 0;
const modules_1 = require("../modules");
const endpoints = {
    identification: {
        same: "/identification/same",
        different: "/identification/different",
        wildcard: "/identification/wildcard"
    },
    signature: {
        same: "/signing/same",
        different: "/signing/different",
        wildcard: "/signing/wildcard",
        doc: "/signing/document",
        interface: "/signing/document-interface",
    },
    flow: {
        authorize: "/authenticate",
        cancel: "/flow/cancel",
        ping: "/flow/ping",
    },
    logic: {
        usage: "/reporting",
        billing: "/billing/validate"
    }
};
/**
 * Helper class to handle all needed api communication between
 * our micro-services and the main backend
 */
class MicroServiceBackendAxios {
    /**
     * Class main constructor
     * @param {string} dbURI initialize with dbURI
     * @param {string} appkey microservice identifier
     */
    constructor(dbURI, appkey) {
        this.db = dbURI;
        this.app = appkey;
    }
    /**
     * Builds a request to the backend
     * @param {string} url
     * @param {Record<string, string>} headers
     * @param {Record<string, unknown>} body
     * @param {string} method
     * @returns {Promise<AxiosResponse<any, any>>}
     */
    requestBuilder({ url, headers, body, method, version }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, modules_1.apiRequest)(method !== null && method !== void 0 ? method : 'POST', `${this.db.replace("[version]", version)}${url}`, {
                headers,
                body
            });
        });
    }
    authorization(request, version = "v1") {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `sub=${request.sub}&app=${request.app}` +
                `&apikey=${request.apikey}&secret=${request.secret}`;
            if (request.token) {
                query = query + `&old=${request.token}`;
            }
            return yield this.requestBuilder({
                url: endpoints.flow.authorize + `/?${query}`,
                version: version,
                headers: {
                    'Accept': 'application/json',
                    'x-requested-with': this.app
                },
                method: "GET",
            });
        });
    }
    identification(request, mode, version = "v1") {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.requestBuilder({
                url: endpoints.identification[mode],
                version: version,
                headers: {
                    'Accept': 'application/json',
                    'x-requested-with': this.app,
                    'x-access-token': (_a = request.token) !== null && _a !== void 0 ? _a : '',
                    'x-api-key': (_b = request.apikey) !== null && _b !== void 0 ? _b : '',
                    'x-access-secret': (_c = request.secret) !== null && _c !== void 0 ? _c : '',
                },
                method: "POST",
                body: (0, modules_1.parseInterface)(request)
            });
        });
    }
    flow(request, mode, version = "v1") {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.requestBuilder({
                url: endpoints.flow[mode],
                version: version,
                headers: {
                    'Accept': 'application/json',
                    'x-requested-with': this.app,
                    'x-access-token': (_a = request.token) !== null && _a !== void 0 ? _a : '',
                    'x-api-key': (_b = request.apikey) !== null && _b !== void 0 ? _b : '',
                    'x-access-secret': (_c = request.secret) !== null && _c !== void 0 ? _c : '',
                },
                method: "POST",
                body: (0, modules_1.parseInterface)(request)
            });
        });
    }
    /**
     * PS - Wildcard signature does not have a v1
     * @param request
     * @param mode
     * @param version
     * @returns
     */
    signature(request, mode, version = "v1") {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.requestBuilder({
                url: endpoints.signature[mode],
                version: version,
                headers: {
                    'Accept': 'application/json',
                    'x-requested-with': this.app,
                    'x-access-token': (_a = request.token) !== null && _a !== void 0 ? _a : '',
                    'x-api-key': (_b = request.apikey) !== null && _b !== void 0 ? _b : '',
                    'x-access-secret': (_c = request.secret) !== null && _c !== void 0 ? _c : '',
                },
                method: "POST",
                body: (0, modules_1.parseInterface)(request)
            });
        });
    }
    logic(request, mode) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.requestBuilder({
                url: endpoints.logic[mode],
                version: "v2",
                headers: {
                    'Accept': 'application/json',
                    'x-requested-with': this.app,
                },
                method: "POST",
                body: (0, modules_1.parseInterface)(request)
            });
        });
    }
}
exports.MicroServiceBackendAxios = MicroServiceBackendAxios;
//# sourceMappingURL=service.calls.js.map