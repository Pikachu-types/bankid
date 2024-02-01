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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicroServiceBackendAxios = void 0;
const axios_1 = __importDefault(require("axios"));
const modules_1 = require("../modules");
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
        this.authorizationEndpoint = "/authenticate";
        this.webIDEndpoint = "/web-identification";
        this.mobileIDEndpoint = "/mobile-identification";
        this.mobileSignatureEndpoint = "/mobile-signature";
        this.webSignatureEndpoint = "/web-signature";
        this.pingEndpoint = "/request-ping";
        this.cancellationEndpoint = "/request-cancellation";
        this.wildcardEndpoint = "/wildcard-identification";
        this.documentSigningEndpoint = "/doc-signature";
        this.useReportEndpoint = "/usage-report";
        this.db = dbURI;
        this.app = appkey;
    }
    /**
     * Grant api authorization to consumer app
     * @param {AuthorizationGrantRequest} request data map of request
     * @param {MessageCallback} onError get feedback on any error logs
     * @param {string} version what api version would you want to interface with
     * @return {Promise<DefaultResponseAndStatus>} returns response.
     */
    clientAuthorization(request, onError, version = "v1") {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, modules_1.httpClient)(() => __awaiter(this, void 0, void 0, function* () {
                let query = `sub=${request.sub}&app=${request.app}` +
                    `&apikey=${request.apikey}&secret=${request.secret}`;
                if (request.token) {
                    query = query + `&old=${request.token}`;
                }
                const url = `${this.db}${this.authorizationEndpoint}/${version}?${query}`;
                const { data, status } = yield axios_1.default.get(url, {
                    headers: {
                        'Accept': 'application/json',
                        'x-requested-with': this.app
                    }
                });
                return {
                    response: data,
                    status: status,
                };
            }), onError);
        });
    }
    /**
     * Identification flow db backend caller
     * @param {IdentificationFlowRequest} request data map of request
     * @param {MessageCallback} onError get feedback on any error logs
     * @param {string} version what api version would you want to interface with
     * @return {Promise<DefaultResponseAndStatus>} returns response.
     */
    identificationFlow(request, onError, version = "v1") {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, modules_1.httpClient)(() => __awaiter(this, void 0, void 0, function* () {
                const url = `${this.db}${this.webIDEndpoint}/${version}`;
                const { data, status } = yield axios_1.default.post(url, JSON.parse(JSON.stringify(request)), {
                    headers: {
                        'Accept': 'application/json',
                        'x-requested-with': this.app,
                        'x-access-token': request.token,
                        'x-api-key': request.apikey,
                        'x-access-secret': request.secret,
                    },
                });
                return {
                    response: data,
                    status: status,
                };
            }), onError);
        });
    }
    /**
     * Identification flow for same devices db backend caller
     * @param {IdentificationFlowRequest} request data map of request
     * @param {MessageCallback} onError get feedback on any error logs
     * @param {string} version what api version would you want to interface. [note: do not use v1]
     * @return {Promise<DefaultResponseAndStatus>} returns response.
     */
    mobIdentificationFlow(request, onError, version = "v2") {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, modules_1.httpClient)(() => __awaiter(this, void 0, void 0, function* () {
                const url = `${this.db}${this.mobileIDEndpoint}/${version}`;
                const { data, status } = yield axios_1.default.post(url, JSON.parse(JSON.stringify(request)), {
                    headers: {
                        'Accept': 'application/json',
                        'x-requested-with': this.app,
                        'x-access-token': request.token,
                        'x-api-key': request.apikey,
                        'x-access-secret': request.secret,
                    },
                });
                return {
                    response: data,
                    status: status,
                };
            }), onError);
        });
    }
    /**
     * Signature flow for same devices db backend caller
     * @param {SignatureFlowRequest} request data map of request
     * @param {MessageCallback} onError get feedback on any error logs
     * @param {string} version what api version would you want to interface. [note: do not use v1]
     * @return {Promise<DefaultResponseAndStatus>} returns response.
     */
    mobSignatureFlow(request, onError, version = "v2") {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, modules_1.httpClient)(() => __awaiter(this, void 0, void 0, function* () {
                const url = `${this.db}${this.mobileSignatureEndpoint}/${version}`;
                const { data, status } = yield axios_1.default.post(url, JSON.parse(JSON.stringify(request)), {
                    headers: {
                        'Accept': 'application/json',
                        'x-requested-with': this.app,
                        'x-access-token': request.token,
                        'x-api-key': request.apikey,
                        'x-access-secret': request.secret,
                    },
                });
                return {
                    response: data,
                    status: status,
                };
            }), onError);
        });
    }
    /**
     * Cancel a flow db backend caller
     * @param {CancelFlowRequest} request data map of request
     * @param {MessageCallback} onError get feedback on any error logs
     * @param {string} version what api version would you want to interface
     * @return {Promise<DefaultResponseAndStatus>} returns response.
     */
    cancelFlow(request, onError, version = "v1") {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, modules_1.httpClient)(() => __awaiter(this, void 0, void 0, function* () {
                const url = `${this.db}${this.cancellationEndpoint}/${version}`;
                const { data, status } = yield axios_1.default.post(url, JSON.parse(JSON.stringify(request)), {
                    headers: {
                        'Accept': 'application/json',
                        'x-requested-with': this.app,
                        'x-access-token': request.token,
                    },
                });
                return {
                    response: data,
                    status: status,
                };
            }), onError);
        });
    }
    /**
     * Ping a flow db backend caller
     * @param {PingFlowRequest} request data map of request
     * @param {MessageCallback} onError get feedback on any error logs
     * @param {string} version what api version would you want to interface.
     * @return {Promise<DefaultResponseAndStatus>} returns response.
     */
    pingFlow(request, onError, version = "v1") {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, modules_1.httpClient)(() => __awaiter(this, void 0, void 0, function* () {
                const url = `${this.db}${this.pingEndpoint}/${version}`;
                const { data, status } = yield axios_1.default.post(url, JSON.parse(JSON.stringify(request)), {
                    headers: {
                        'Accept': 'application/json',
                        'x-requested-with': this.app,
                        'x-access-token': request.token,
                    },
                });
                return {
                    response: data,
                    status: status,
                };
            }), onError);
        });
    }
    /**
     * Signature flow db backend caller
     * @param {SignatureFlowRequest} request data map of request
     * @param {MessageCallback} onError get feedback on any error logs
     * @param {string} version what api version would you want to interface with
     * @return {Promise<DefaultResponseAndStatus>} returns response.
     */
    signatureFlow(request, onError, version = "v1") {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, modules_1.httpClient)(() => __awaiter(this, void 0, void 0, function* () {
                const url = `${this.db}${this.webSignatureEndpoint}/${version}`;
                const { data, status } = yield axios_1.default.post(url, JSON.parse(JSON.stringify(request)), {
                    headers: {
                        'Accept': 'application/json',
                        'x-requested-with': this.app,
                        'x-access-token': request.token,
                    },
                });
                return {
                    response: data,
                    status: status,
                };
            }), onError);
        });
    }
    /**
     * Wildcard flow db backend caller
     * @param {IdentificationFlowRequest} request data map of request
     * @param {MessageCallback} onError get feedback on any error logs
     * @param {string} version what api version would you want to interface with
     * @return {Promise<DefaultResponseAndStatus>} returns response.
     */
    wildCardIdentificationFlow(request, onError, version = "v1") {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, modules_1.httpClient)(() => __awaiter(this, void 0, void 0, function* () {
                const url = `${this.db}${this.wildcardEndpoint}/${version}`;
                const { data, status } = yield axios_1.default.post(url, JSON.parse(JSON.stringify(request)), {
                    headers: {
                        'Accept': 'application/json',
                        'x-requested-with': this.app,
                        'x-access-token': request.token,
                    },
                });
                return {
                    response: data,
                    status: status,
                };
            }), onError);
        });
    }
    /**
     * Document signing flow db backend caller
     * @param {eDocSignRequests} request data map of request
     * @param {MessageCallback} onError get feedback on any error logs
     * @param {string} version what api version would you want to interface with
     * @return {Promise<DefaultResponseAndStatus>} returns response.
     */
    documentSigningFlow(request, onError, version = "v1") {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, modules_1.httpClient)(() => __awaiter(this, void 0, void 0, function* () {
                const url = `${this.db}${this.documentSigningEndpoint}/${version}`;
                const { data, status } = yield axios_1.default.post(url, JSON.parse(JSON.stringify(request)), {
                    headers: {
                        'Accept': 'application/json',
                        'x-requested-with': this.app,
                        'x-access-token': request.token,
                    },
                });
                return {
                    response: data,
                    status: status,
                };
            }), onError);
        });
    }
    /**
     * Document signing flow db backend caller
     * @param {UsageRecording} request data map of request
     * @param {MessageCallback} onError get feedback on any error logs
     * @param {string} version what api version would you want to interface with
     * @return {Promise<DefaultResponseAndStatus>} returns response.
     */
    logApiUsage(request, onError, version = "v1") {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, modules_1.httpClient)(() => __awaiter(this, void 0, void 0, function* () {
                const url = `${this.db}${this.useReportEndpoint}/${version}`;
                const { data, status } = yield axios_1.default.post(url, JSON.parse(JSON.stringify(request)), {
                    headers: {
                        'Accept': 'application/json',
                        'x-requested-with': this.app,
                    },
                });
                return {
                    response: data,
                    status: status,
                };
            }), onError);
        });
    }
}
exports.MicroServiceBackendAxios = MicroServiceBackendAxios;
//# sourceMappingURL=service.calls.js.map