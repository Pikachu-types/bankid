export type MagicLinkModes = keyof typeof mts;
export type UserRoles = keyof typeof roles;
export type VerificationStatus = keyof typeof status;
export type AppFrameworkType = keyof typeof appT;
export type AppType = keyof typeof aType;
export type ConsumptionType = keyof typeof consumptions;
export type ClientScope = keyof typeof scopes;
export type SubscriptionPlan = keyof typeof plans;
export type Period = keyof typeof period;
export type PaymentChannels = keyof typeof channels;
declare const mts: {
    readonly login: "login";
    readonly session: "session";
    readonly invitation: "invitation";
    readonly registration: "registration";
};
declare const plans: {
    readonly basic: "basic";
    readonly scale: "scale";
};
declare const period: {
    readonly monthly: "monthly";
    readonly yearly: "yearly";
};
export declare const roles: {
    readonly owner: "owner";
    readonly admin: "admin";
    readonly viewer: "viewer";
};
declare const status: {
    readonly verified: "verified";
    readonly waiting: "waiting";
    readonly unverified: "unverified";
    readonly stale: "stale";
};
export declare const appT: {
    readonly backend: "backend";
    readonly frontend: "frontend";
};
export declare const aType: {
    readonly production: "production";
    readonly test: "test";
};
export declare const scopes: {
    readonly "identification:same": "identification:same";
    readonly "identification:different": "identification:another";
    readonly "identification:wildcard": "identification:wildcard";
    readonly "signing:wildcard": "signing:wildcard";
    readonly "signing:different": "signing:another";
    readonly "signing:same": "signing:same";
    readonly "flow:ping": "flow:ping";
    readonly "flow:authorize": "flow:authorize";
    readonly "flow:poll": "flow:poll";
    readonly "flow:cancel": "flow:cancel";
    readonly "document:sign": "document:sign";
    readonly "identity:read": "identity:read";
    readonly "identity:write": "identity:write";
    readonly "payment:read": "payment:read";
    readonly "session:host": "session:host";
    /**
     * Hosted OIDC token swap
     */
    readonly "session:shake": "session:shake";
    /**
     * Check if oidc token is still active
     */
    readonly "session:validate": "session:validate";
};
export declare const consumptions: {
    readonly auth: "auth";
    readonly sign: "sign";
    readonly all: "all";
};
declare const channels: {
    card: "card";
    bank: "bank";
    ussd: "ussd";
    qr: "qr";
    mobile_money: "mobile_money";
    bank_transfer: "bank_transfer";
    eft: "eft";
};
export {};
