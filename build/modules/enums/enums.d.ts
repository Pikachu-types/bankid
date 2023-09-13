/**
 * Default database document references
 */
export declare enum DocumentReference {
    /**
     * Collection reference for verified and authorized
     * bankid vendors/sellers/issuers
     */
    vendor = "vendors",
    /**
     * Collection reference for authorized bank id consumers.
     * Meaning folks that can requests bankID information
     */
    consumers = "consumers",
    /**
     * Collection reference for all registered nins with bankIDs
     */
    users = "bankids",
    /**
     * SubCollection reference for all registered bankIDs
     */
    issuedIDs = "digital",
    /**
     * Collection reference for bank id requests could be
     * [signature or identification]
     */
    requests = "requests",
    /**
     * Collection reference for console users
     * These are real persons who operate a developer-publisher
     * account with BankID
     */
    console = "console",
    /**
     * Collection reference for console sessions by console users
     */
    sessions = "sessions",
    /**
     * BankID NIN sessions wrapped in a history
     */
    history = "history",
    userRef = "users",
    /**
      * A request has just been handled
      */
    requestLogged = "bankids/{users}/history/{doc}",
    requestUpdated = "requests/{doc}"
}
/**
 * Bankid Request Modes enum
 */
export declare enum VerificationMode {
    identification = "identification",
    signature = "signature"
}
/**
 * Bankid Document types
 */
export declare enum DocumentTypes {
    /**
     * Registered NIN
     */
    user = "bid_",
    /**
     * Issuer of BankIDs
     */
    vendor = "vnd_",
    /**
     * Utilizer of APIs
     */
    consumer = "bcn_",
    /**
     * BankID requests
     */
    requests = "req_",
    /**
     * Standalone bankids for
     * BankID mobile, desktop and watch
     */
    bankID = "std_",
    /**
     * Console registered apps
     */
    app = "app_",
    /**
     * Console session
     */
    session = "sess_"
}
/**
 * Document actions
 */
export declare enum DocumentAction {
    delete = "delete",
    update = "update",
    create = "create"
}
/**
 * User roles
 */
export declare enum UserRoles {
    admin = "admin",
    owner = "owner",
    editor = "editor",
    viewer = "viewer"
}
/**
 * Document actions
 */
export declare enum RequestSources {
    mobile = "mobile",
    web = "web",
    file = "file"
}
/**
 * Request Status
 */
export declare enum RequestStatus {
    failed = "failed",
    expiration = "expiration",
    unauthorized = "unauthorized",
    tokenMismatch = "token-mismatch",
    success = "successful"
}
