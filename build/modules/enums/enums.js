"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestStatus = exports.RequestSources = exports.DocumentAction = exports.ApiKeyPrefix = exports.AppTypeSecretRef = exports.DocumentTypes = exports.TFAProviders = exports.BankIDTypes = exports.ActionType = exports.RequestMode = exports.DocumentReference = void 0;
/**
 * Default database document references
 */
var DocumentReference;
(function (DocumentReference) {
    /**
     * Collection reference for verified and authorized
     * bankid vendors/sellers/issuers
     */
    DocumentReference["vendor"] = "vendors";
    /**
     * Pending requests
     */
    DocumentReference["pending"] = "pending";
    /**
     * Collection reference for authorized bank id consumers.
     * Meaning folks that can requests bankID information
     */
    DocumentReference["consumers"] = "consumers";
    DocumentReference["consumerUser"] = "eids";
    /**
     * Collection reference for all registered nins with bankIDs
     */
    DocumentReference["users"] = "ids";
    /**
     * SubCollection reference for all registered bankIDs
     */
    DocumentReference["issuedIDs"] = "digital";
    /**
     * Collection reference for bank id requests could be
     * [signature or identification]
     */
    DocumentReference["requests"] = "requests";
    DocumentReference["bill"] = "billing";
    /**
     * New console business model plan invoicing
     */
    DocumentReference["invoicing"] = "invoicing";
    /**
     * Overage cost billing
     */
    DocumentReference["overage"] = "overage";
    /**
     * Collection reference for console users
     * These are real persons who operate a developer-publisher
     * account with BankID
     */
    DocumentReference["console"] = "console";
    /**
     *
     */
    DocumentReference["subscriptions"] = "subscriptions";
    /**
     * Collection reference for auth and console user sessions
     */
    DocumentReference["sessions"] = "sessions";
    /**
     * BankID NIN sessions wrapped in a history
     */
    DocumentReference["history"] = "history";
    /**
     * Console organisation members
     */
    DocumentReference["members"] = "users";
    /**
     * Consumer apps reference
     */
    DocumentReference["apps"] = "apps";
    DocumentReference["documents"] = "documents";
    /**
     * For nin invitation actions
     */
    DocumentReference["invitations"] = "invitations";
    /**
     * Sub collection for documents/signatures
     */
    DocumentReference["signatures"] = "signatures";
    /**
     * Operations logic collection
     */
    DocumentReference["operations"] = "ops";
    DocumentReference["transactions"] = "transactions";
    /**
     * For api handled transfers
     */
    DocumentReference["payouts"] = "payouts";
    DocumentReference["webhookRetries"] = "webhook-retries";
    /**
      * A request has just been handled
      */
    DocumentReference["requestLogged"] = "ids/{users}/history/{doc}";
    DocumentReference["signatureAdded"] = "documents/{doc}/signatures/{identifier}";
    DocumentReference["requestUpdated"] = "requests/{doc}";
    DocumentReference["eDocumentsUpdated"] = "documents/{doc}";
})(DocumentReference = exports.DocumentReference || (exports.DocumentReference = {}));
/**
 * Bankid Request Modes enum
 */
var RequestMode;
(function (RequestMode) {
    RequestMode["Identification"] = "identification";
    RequestMode["Signature"] = "signature";
})(RequestMode = exports.RequestMode || (exports.RequestMode = {}));
/**
 * ActionType
 */
var ActionType;
(function (ActionType) {
    ActionType["login"] = "login";
    ActionType["signup"] = "signup";
    ActionType["confirm"] = "confirm";
    ActionType["link"] = "link";
    ActionType["sign"] = "sign";
})(ActionType = exports.ActionType || (exports.ActionType = {}));
/**
 * Bankid DB Types
 */
var BankIDTypes;
(function (BankIDTypes) {
    BankIDTypes["app"] = "app";
    BankIDTypes["user"] = "user";
    BankIDTypes["consumer"] = "consumer";
    BankIDTypes["console"] = "console-user";
})(BankIDTypes = exports.BankIDTypes || (exports.BankIDTypes = {}));
/**
 * Bankid Two factor providers
 */
var TFAProviders;
(function (TFAProviders) {
    TFAProviders["bankid"] = "bankid";
    TFAProviders["google"] = "google";
    TFAProviders["authy"] = "authy";
})(TFAProviders = exports.TFAProviders || (exports.TFAProviders = {}));
/**
 * Bankid Document types
 */
var DocumentTypes;
(function (DocumentTypes) {
    /**
     * Registered NIN
     */
    DocumentTypes["user"] = "bid_";
    /**
     * Console user
     */
    DocumentTypes["consoleuser"] = "cnu_";
    /**
     * Issuer of BankIDs
     */
    DocumentTypes["vendor"] = "vnd_";
    /**
     * Utilizer of APIs
     */
    DocumentTypes["consumer"] = "bcn_";
    /**
     * BankID requests
     */
    DocumentTypes["requests"] = "req_";
    DocumentTypes["billing"] = "bill_";
    /**
     * Standalone bankids for
     * BankID mobile, desktop and watch
     */
    DocumentTypes["bankID"] = "std_";
    /**
     * Document id for e-signatures on
     * pdf files
     */
    DocumentTypes["document"] = "doc_";
    /**
     * Console registered apps
     */
    DocumentTypes["app"] = "app_";
    /**
     * Console session
     */
    DocumentTypes["session"] = "sess_";
    DocumentTypes["oidc"] = "tk_";
    DocumentTypes["transaction"] = "trx_";
    DocumentTypes["payout"] = "pyt_";
    DocumentTypes["invitation"] = "invite_";
})(DocumentTypes = exports.DocumentTypes || (exports.DocumentTypes = {}));
/**
 * AppType secret key reference on BankID
 */
var AppTypeSecretRef;
(function (AppTypeSecretRef) {
    AppTypeSecretRef["production"] = "prd_";
    AppTypeSecretRef["test"] = "snb_";
})(AppTypeSecretRef = exports.AppTypeSecretRef || (exports.AppTypeSecretRef = {}));
/**
 * Api key prefix
 */
var ApiKeyPrefix;
(function (ApiKeyPrefix) {
    ApiKeyPrefix["live"] = "bk-live_";
    ApiKeyPrefix["test"] = "bk-test_";
})(ApiKeyPrefix = exports.ApiKeyPrefix || (exports.ApiKeyPrefix = {}));
/**
 * Document actions
 */
var DocumentAction;
(function (DocumentAction) {
    DocumentAction["delete"] = "delete";
    DocumentAction["update"] = "update";
    DocumentAction["create"] = "create";
    DocumentAction["get"] = "get";
})(DocumentAction = exports.DocumentAction || (exports.DocumentAction = {}));
/**
 * Document actions
 */
var RequestSources;
(function (RequestSources) {
    RequestSources["mobile"] = "mobile";
    RequestSources["web"] = "web";
    RequestSources["file"] = "file";
})(RequestSources = exports.RequestSources || (exports.RequestSources = {}));
/**
 * Request Status
 */
var RequestStatus;
(function (RequestStatus) {
    RequestStatus["failed"] = "failed";
    RequestStatus["extreme"] = "extreme";
    RequestStatus["expiration"] = "expiration";
    RequestStatus["unauthorized"] = "unauthorized";
    RequestStatus["tokenMismatch"] = "token-mismatch";
    RequestStatus["mismatch"] = "mismatch";
    RequestStatus["success"] = "successful";
})(RequestStatus = exports.RequestStatus || (exports.RequestStatus = {}));
//# sourceMappingURL=enums.js.map