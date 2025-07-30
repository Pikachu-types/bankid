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
   * Pending requests
   */
  pending = "pending",
  /**
   * Collection reference for authorized bank id consumers.
   * Meaning folks that can requests bankID information
   */
  consumers = "consumers",
  consumerUser = "eids",
  /**
   * Collection reference for all registered nins with bankIDs
   */
  users = "ids",
  /**
   * SubCollection reference for all registered bankIDs
   */
  issuedIDs = "digital",
  /**
   * Collection reference for bank id requests could be
   * [signature or identification]
   */
  requests = "requests",
  bill = "billing",

  /**
   * New console business model plan invoicing
   */
  invoicing = "invoicing",
  /**
   * Overage cost billing
   */
  overage = "overage",
  /**
   * Collection reference for console users
   * These are real persons who operate a developer-publisher
   * account with BankID 
   */
  console = "console",

  /**
   * 
   */
  subscriptions = "subscriptions",
  
  /**
   * Collection reference for auth and console user sessions
   */
  sessions = "sessions",
  /**
   * BankID NIN sessions wrapped in a history
   */
  history = "history",

  /**
   * Console organisation members
   */
  members = "users",
  /**
   * Consumer apps reference
   */
  apps = "apps",
  documents = "documents",
  /**
   * For nin invitation actions
   */
  invitations = "invitations",
  /**
   * Sub collection for documents/signatures
   */
  signatures = "signatures",
  /**
   * Operations logic collection
   */
  operations = "ops",
  transactions = "transactions",
  
  /**
   * For api handled transfers
   */
  payouts = "payouts",

  webhookRetries = "webhook-retries",
  /**
    * A request has just been handled
    */
  requestLogged = "ids/{users}/history/{doc}",
  signatureAdded = "documents/{doc}/signatures/{identifier}",
  requestUpdated = "requests/{doc}",
  eDocumentsUpdated = "documents/{doc}",
}

/**
 * Bankid Request Modes enum
 */
export enum RequestMode {
  Identification = "identification",
  Signature = "signature"
}

/**
 * ActionType
 */
export enum ActionType {
  login = "login",
  signup = "signup",
  confirm = "confirm",
  link = "link",
  sign = "sign"
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

  billing = "bill_",
  /**
   * Standalone bankids for
   * BankID mobile, desktop and watch
   */
  bankID = "std_",
  /**
   * Document id for e-signatures on
   * pdf files
   */
  document = "doc_",
  /**
   * Console registered apps
   */
  app = "app_",
  /**
   * Console session
   */
  session = "sess_",

  oidc = "tk_",

  transaction = "trx_",

  payout = "pyt_",

  invitation = "invite_",
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
  extreme = "extreme",
  expiration = "expiration",
  unauthorized = "unauthorized",
  tokenMismatch = "token-mismatch",
  mismatch = "mismatch",
  success = "successful",
}

