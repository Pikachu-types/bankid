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
exports.pkceChallenge = void 0;
function generateCodeVerifier() {
    const array = new Uint32Array(56 / 2);
    crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
}
function generateCodeChallenge(codeVerifier) {
    return __awaiter(this, void 0, void 0, function* () {
        const encoder = new TextEncoder();
        const data = encoder.encode(codeVerifier);
        const digest = yield crypto.subtle.digest('SHA-256', data);
        const digestArray = Array.from(new Uint8Array(digest));
        return btoa(String.fromCharCode(...digestArray))
            .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    });
}
function pkceChallenge() {
    return __awaiter(this, void 0, void 0, function* () {
        const verifier = generateCodeVerifier();
        const code = yield generateCodeChallenge(verifier);
        return {
            verifier: verifier,
            challenge: code
        };
    });
}
exports.pkceChallenge = pkceChallenge;
//# sourceMappingURL=pkce.js.map