import { BankIDTypes } from "../enums/enums";
import { ClientApp } from "../models/portal/apps";
import { ConsumerModel } from "../models/public/consumers";
import { StandaloneBankID } from "../models/public/standaloneIds";
import { IdentificationModel } from "../models/public/users";


export interface WebhookRetry {
  id: string;
  url: string;
  body: Record<string, unknown>;
  createdAt: number;
  lastAttempt: number;
  attempts: number;
  maxAttempts: number;
  documentId: string;
  documentType: "identification" | "edoc" | "signature" | "payment";
}

/**
 * BookingEmailNotify
*/
export interface EnrolmentMade {
  user: IdentificationModel,
  bankid: StandaloneBankID,
  generated: string,
}

/**
 * AppConsumerReturn
*/
export interface AppConsumerReturn {
  consumer: ConsumerModel,
  app: ClientApp,
}

/**
 * Console purpose solely
*/
export interface QuestionStructure {
  question: string,
  identifier: string
}

/**
 * API reference
 */
export interface ApiReference {
  app: string,
  public: string,
  private: string,
}

/**
 * RSA Model
 *
*/
export type RSAKeys = {
  private: string,
  public: string
}

/**
 * Generalized Posting Service helper type
 */
export type PostRequest = {
  url: string;
  body: Record<string, unknown> | undefined;
};


/**
 * Default response interface
 */
export type DefaultResponse = {
  status: string;
  reason?: string;
  cost?: number;
  version?: string;
  data?: Record<string, unknown>;
};

/**
 * Console account security
 */
export interface ConsoleAccountSecurity {
  tFA: boolean;
  generated?: boolean;
  provider?: string
  nin?: string
};

/**
 * Console account security
 */
export interface ConsumerProfile {
  logo: string;
};

/**
 * App profile
 */
export interface AppProfile {
  client: ConsumerModel;
  app: ClientApp;
};

/**
 * Device profile
 */
export interface DeviceProfile {
  model: string;
  deviceID: string;
  platform: string;
  serialNumber?: number;
  app: {
    build: number,
    version: string,
  }
};

/**
 * App data secrets
 */
export interface AppDataSecret {
  secret: string;
  id: string;
  created: number;
  lut?: number;
  revoked: boolean;
};

/**
 * App keys
 */
export interface APIKeys {
  live: string,
  test: string,
};

/**
 * App service json
 */
export interface AppServiceJSON {
  type: BankIDTypes;
  appid: string;
  consumer: string;
  privatekey: string | undefined;
  publickey: string;
  authUri: string;
};

/**
 * App service json
 */
export interface ConsumerServiceJSON {
  type: BankIDTypes;
  clientid: string;
  privatekey: string | undefined;
  publickey: string;
  apikeys: APIKeys;
  authUri: string;
};

/**
 * Pending Invitation reference
 */
export interface PendingInvitation {
  id: string;
  email: string;
  invitation: string;
};

/**
 * Auth Token data
 */
export interface AuthToken {
  /**
   * Consumer id this was made on behalf
   */
  sub: string;
  /**
   * Date created
   */
  iat: number;
  /**
   * Expires when
   */
  exp: number;
  /**
   * App ID
   */
  app: string;
  /**
   * 
   */
  name: string;
  /**
   * Acquired scopes
   */
  scopes?: string[];
  /**
   * app secret
   */
  secret: string;
};

/**
 * Request Signature
 */
export interface RequestSignature {
  id: string,
  iat: number;
  exp: number;
  mode: string;
  action: string,
  useragent: string;
  payload: string;
  ip: string;
  name: string;
  consumer: string;
  app: string;
  user: string;
  sandbox: boolean;
  acquireClaims?: string[];
}

/**
 * EdenModel
 */
export interface EdenModel {
  status: string,
  items: EdenConfidenceModel[],
  cost: number,
}

/**
 * EdenConfidenceModel
 */
export interface EdenConfidenceModel {
  confidence: number,
  bounding_box: {
    top: number,
    left: number,
    height: number,
    width: number,
  }
}