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
exports.ConsumerHelper = void 0;
const labs_sharable_1 = require("labs-sharable");
const __1 = require("..");
const uuid_1 = require("uuid");
class ConsumerHelper {
    /**
     * Validate auth token
     * @param {string} token jwt created token
     * @param {string} jwt jwt encryption key
     * @return {AuthToken} return token value
     */
    static validateTokenAlone(token, jwt) {
        return __awaiter(this, void 0, void 0, function* () {
            let decode;
            try {
                decode = labs_sharable_1.LabsCipher.jwtDecode(token, jwt);
            }
            catch (error) {
                const code = error instanceof labs_sharable_1.CustomError ? error.getCode() : 500;
                throw new __1.SeverError(code == 401 ? 'authorization is expired' :
                    'there is an obvious token mismatch', code);
            }
            return decode;
        });
    }
    /**
     * Validate request
     * @param {SignatureRequest} req signature request
     * @return {void} function
     */
    static validateSignatureRequest(req) {
        if (req.mode !== __1.RequestMode.Signature) {
            throw new __1.SeverError("Forbidden request: This is a signature request endpoint", 403);
        }
        if (req.webhook === undefined && req.action === __1.ActionType.sign) {
            throw new __1.SeverError("Requester needs to provide a web-hook map for us to handle such request", 428);
        }
    }
    /**
     * Validate request
     * @param {IDRequest} req identification request
     * @return {void} function
     */
    static validateIDRequest(req) {
        if (req.claims === undefined) {
            throw new __1.SeverError("Requester needs to state identification claims", 428);
        }
        if (req.mode !== __1.RequestMode.Identification) {
            throw new __1.SeverError("Forbidden request: Mode mismatch", 403);
        }
    }
    /**
     * Validate request and return request
     * @param {string} id request id
     * @param {Record<string, unknown>} params arguments
     * @return {Promise<Requests>} returns request if okay
     */
    static validateRequest(id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const sign = __1.Requests.findOne(yield params.db.retrieveRawIdentificationRequests(), id);
            if (sign === undefined) {
                throw new __1.SeverError("Flow request with such id does not exists", 400);
            }
            if (sign.cancelled) {
                throw new __1.SeverError("Flow request has been cancelled", 400);
            }
            const decode = yield this.decodeRequest(sign, { jwt: params.jwt });
            if (params.app && decode.app !== params.app.app && !params.admin) {
                throw new __1.SeverError("You are forbidden to make this inquiry", 401);
            }
            if (!params.admin && !params.app) {
                throw new __1.SeverError("You need special privileges to access this resource.");
            }
            return {
                signature: decode,
                request: sign,
            };
        });
    }
    /**
     * Validate authentication session
     * @param {string} id request id
     * @param {Record<string, unknown>} params arguments
     * @return {Promise<Requests>} returns request if okay
     */
    static manageOidc(id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const sign = yield params.db.retrieveRawIdentificationRequest(id);
            if (sign === undefined) {
                throw new __1.SeverError("Flow request with such id does not exists", 400);
            }
            const decode = yield this.decodeRequest(sign, { jwt: params.jwt });
            if (decode.app !== params.app) {
                throw new __1.SeverError("Flow was created by another app", 401, 'authorization_error');
            }
            else if (sign.cancelled) {
                throw new __1.SeverError("Flow request has been cancelled", 400, 'session_cancel');
            }
            const app = yield params.db.getConsumerApp(decode.consumer, decode.app);
            return {
                app: app,
                signature: decode,
                request: sign,
            };
        });
    }
    /**
     * Create expiration time
     * @param {number} duration length of time
     * @param {boolean} inHours toggle to count
     *  in hours or minutes
     * @return {number} returns unix timestamp
     */
    static expiration(duration, inHours = false) {
        const expirationDate = new Date();
        if (inHours) {
            expirationDate.setHours(new Date().
                getHours() + duration);
        }
        else {
            expirationDate.setMinutes(new Date().
                getMinutes() + duration);
        }
        return (0, labs_sharable_1.convertDateToUnix)(expirationDate);
    }
    /**
     * Stringify NIN number
     * @param {string} nin nin digits
     * @return {string}
     */
    static stringifyNIN(nin) {
        if (nin.startsWith(__1.DocumentTypes.user))
            return nin;
        else
            return `${__1.DocumentTypes.user}${nin}`;
    }
    static uniqueID() {
        return (0, uuid_1.v4)().replace(/-/g, "");
    }
    /**
     * Decode request
     * @param {Requests} req flow request
     * @param {Record<string, unknown>} params arguments
     * @return {RequestSignature} signature data
     */
    static decodeRequest(req, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return labs_sharable_1.LabsCipher.
                    jwtDecode(req.request, params.jwt);
            }
            catch (error) {
                if (error.name == "TokenExpiredError") {
                    throw new __1.SeverError({
                        reason: "Session has expired",
                        status: 'expiration',
                        type: 'session_expiry'
                    }, 401);
                }
                else {
                    throw new __1.SeverError({
                        reason: "Session is invalid or is expired",
                        status: 'expiration',
                        type: 'unknown_error',
                    }, 401);
                }
            }
        });
    }
}
exports.ConsumerHelper = ConsumerHelper;
//# sourceMappingURL=consumer.helper.js.map