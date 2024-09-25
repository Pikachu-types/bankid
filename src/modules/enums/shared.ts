export type MagicLinkModes = keyof typeof mts;
export type UserRoles = keyof typeof roles;
export type VerificationStatus = keyof typeof status;
export type PaymentStatus = keyof typeof payment;
export type AppFrameworkType = keyof typeof appT;
export type AppType = keyof typeof aType;
export type ConsumptionType = keyof typeof consumptions;
export type ClientScope = keyof typeof scopes;
export type SubscriptionPlan = keyof typeof plans;
export type Period = keyof typeof period;
export type PaymentChannels = keyof typeof channels;

const mts = {
  login: 'login',
  session: 'session',
  invitation: 'invitation',
  registration: 'registration'
} as const;

const plans = {
  basic: 'basic',
  scale: 'scale',
} as const;

const period = {
  monthly: 'monthly',
  yearly: 'yearly',
} as const;

export const roles = {
  owner: "owner",
  admin: "admin",
  viewer: "viewer"
} as const;

const status = {
  verified : "verified",
  waiting : "waiting",
  unverified : "unverified",
  stale : "stale",
} as const

const payment = {
  stale : "stale",
  paid : "paid",
  failed : "failed",
} as const

export const appT = {
  backend : "backend",
  frontend : "frontend",
} as const

export const aType = {
  production : "production",
  test : "test",
} as const

export const scopes = {
  "identification:same" : "identification:same",
  "identification:different" : "identification:another",
  "identification:wildcard" : "identification:wildcard",
  "signing:wildcard" : "signing:wildcard",
  "signing:different" : "signing:another",
  "signing:same" : "signing:same",
  "flow:ping": "flow:ping",
  "flow:authorize": "flow:authorize",
  "flow:poll": "flow:poll",
  "flow:cancel": "flow:cancel",
  "document:sign": "document:sign",
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
  "session:validate":"session:validate"
} as const

export const consumptions = {
  auth : "auth",
  sign: "sign",
  all: "all"
} as const

const channels = strEnum(["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer", "eft"])

function strEnum<T extends string>(o: Array<T>): { [K in T]: K } {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}