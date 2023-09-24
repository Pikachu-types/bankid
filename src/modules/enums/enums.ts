/**
 * Default database document references
 */
export enum DocumentReference {
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
   * Consumer apps reference
   */
  apps = "apps",
  /**
    * A request has just been handled
    */
  requestLogged = "bankids/{users}/history/{doc}",
  requestUpdated = "requests/{doc}",
}

/**
 * Bankid Request Modes enum
 */
export enum RequestMode {
  Identification = "identification",
  Signature = "signature"
}

/**
 * Bankid DB Types
 */
export enum BankIDTypes {
  app = "app",
  user = "user",
  consumer = "consumer",
  console = "console-user",
}

/**
 * Bankid Two factor providers
 */
export enum TFAProviders {
  bankid = "bankid",
  google = "google",
  authy = "authy"
}

/**
 * Bankid Document types
 */
export enum DocumentTypes {
  /**
   * Registered NIN
   */
  user = "bid_",
  /**
   * Console user
   */
  consoleuser = "cnu_",
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
  session = "sess_",
}

/**
 * AppTypes on BankID
 */
export enum AppType {
  production = "production",
  test = "test",
}

/**
 * App Verification status
 */
export enum AppVerificationStatus {
  verified = "verified",
  waiting = "waiting",
  unverified = "unverified",
  stale = "stale",
}
/**
 * AppType secret key reference on BankID
 */
export enum AppTypeSecretRef {
  production = "prd_",
  test = "snb_",
}

/**
 * Api key prefix
 */
export enum ApiKeyPrefix {
  live = "bk-live_",
  test = "bk-test_",
}

/**
 * Document actions
 */
export enum DocumentAction {
  delete = "delete",
  update = "update",
  create = "create",
  get = "get",
}

/**
 * User roles
 */
export enum UserRoles {
  admin = "admin",
  owner = "owner",
  editor = "editor",
  viewer = "viewer"
}

/**
 * Document actions
 */
export enum RequestSources {
  mobile = "mobile",
  web = "web",
  file = "file"
}

/**
 * Request Status
 */
export enum RequestStatus {
  failed = "failed",
  expiration = "expiration",
  unauthorized = "unauthorized",
  tokenMismatch = "token-mismatch",
  success = "successful",
}

