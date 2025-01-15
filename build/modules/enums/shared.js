"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumptions = exports.scopes = exports.aType = exports.appT = exports.roles = void 0;
const mts = {
    login: 'login',
    session: 'session',
    invitation: 'invitation',
    registration: 'registration'
};
const plans = {
    basic: 'basic',
    scale: 'scale',
};
const period = {
    monthly: 'monthly',
    yearly: 'yearly',
};
exports.roles = {
    owner: "owner",
    admin: "admin",
    viewer: "viewer"
};
const status = {
    verified: "verified",
    waiting: "waiting",
    unverified: "unverified",
    stale: "stale",
};
const payment = {
    stale: "stale",
    paid: "paid",
    failed: "failed",
};
exports.appT = {
    backend: "backend",
    frontend: "frontend",
};
exports.aType = {
    production: "production",
    test: "test",
};
exports.scopes = {
    "identification:same": "identification:same",
    "identification:different": "identification:another",
    "identification:wildcard": "identification:wildcard",
    "signing:wildcard": "signing:wildcard",
    "signing:different": "signing:another",
    "signing:same": "signing:same",
    "flow:ping": "flow:ping",
    "flow:authorize": "flow:authorize",
    "flow:poll": "flow:poll",
    "flow:cancel": "flow:cancel",
    "document:sign": "document:sign",
    /**
     * For interface use
     */
    "document:review": "document:review",
    "identity:read": "identity:read",
    "identity:write": "identity:write",
    "payment:read": "payment:read",
    "session:host": "session:host",
    /**
     * Hosted OIDC token swap
     */
    "session:shake": "session:shake",
    /**
     * Check if oidc token is still active
     */
    "session:validate": "session:validate"
};
exports.consumptions = {
    auth: "auth",
    sign: "sign",
    all: "all"
};
const channels = strEnum(["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer", "eft"]);
function strEnum(o) {
    return o.reduce((res, key) => {
        res[key] = key;
        return res;
    }, Object.create(null));
}
//# sourceMappingURL=shared.js.map