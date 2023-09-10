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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = void 0;
const labs_sharable_1 = require("labs-sharable");
// import { generateKeyPair } from "crypto";
const crypto = __importStar(require("crypto"));
/**
 * Generator service class
 */
class Generator {
    /**
     * Create a request identifier
     * @return {string} returns value.
     */
    static requestID() {
        return `req_${(0, labs_sharable_1.unixTimeStampNow)()}-${(0, labs_sharable_1.generateRandomAlphaNumeric)(4)}`;
    }
    /**
     * Create a app link
     * @param {string} mode request mode i.e [signature, identification]
     * @param {string} requestSignature the jwt signed string
     * @param {string} source what kind of consumer generated this
     * @param {string} nin bankid user
     * @return {string} returns value.
     */
    static appLink(mode, requestSignature, source, nin) {
        return `https://mobil.bankid.ng/auth/?mode=${mode}` +
            `&value=${requestSignature}&source=${source}${nin !== undefined ?
                `&nin=${nin}` : ""}`;
    }
    /**
    * The `generateKeyPairSync` method accepts two arguments:
    * 1. The type ok keys we want, which in this case is "rsa"
    * 2. An object with the properties of the key
    * @return {RSAModel} key pairs
    */
    static createRSAPairString() {
        const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
            // The standard secure default length for RSA keys is 2048 bits
            modulusLength: 4096,
            publicKeyEncoding: {
                type: "spki",
                format: "pem",
            },
            privateKeyEncoding: {
                type: "pkcs8",
                format: "pem",
            },
        });
        return {
            private: privateKey,
            public: publicKey,
        };
    }
}
exports.Generator = Generator;
//# sourceMappingURL=generator.js.map