import { RequestMode } from "../enums/enums";
import { DeviceProfile } from "./documents";

/**
 * Authentication request
 */
export interface AuthRequest {
  /**
   * Any old tokens
   */
  old?: string;
  /**
   * Consumer id
   */
  consumer: string;
  /**
   * app identifier
   */
  app?: string;
  /**
   * app secret
   */
  secret: string;
  /**
   * api key
   */
  key: string;
};

/**
 * ID request
 */
export interface IDRequest {
  claims: string[];
  mode: RequestMode;
  user: string;
  payload: string;
  ip: string;
  useragent: string;
  seeds?: number;
}

/**
 * Signature request
 */
export interface SignatureRequest {
  mode: RequestMode;
  nin: string;
  webhook: {
    host: string;
    reference: string;
  };
  useragent: string;
  payload: string;
  ip: string;
}

/**
 * Ping request
 */
export interface PingRequest {
  /**
   * Request Identifier
   */
  request: string;
}

/**
 * Sign request
 */
export interface SignRequest {
  /**
   * Request id
   */
  request: string;
  /**
   * Device information
   */
  device: DeviceProfile;
  /**
   * Standalone bankid identifier
   */
  bankid: string;
}

/**
 * Handle client request
 */
export interface ClientRequest {
  /**
   * Request id
   */
  request: string;
  /**
    * Device information
   */
  device: DeviceProfile;
  /**
   * NIN bankid identifier
   */
  user: string;
}

/**
 * RetrieveBankiD request
 */
export interface RetrieveBankiD {
  /**
   * Ciphered string
   */
  code: string;
}

/**
 * ModifyBankiD request
 */
export interface ModifyBankiD {
  /**
   * Standalone BankID identifier
   */
  issued: string;
  /**
   * Device information
   */
  device?: DeviceProfile;
}