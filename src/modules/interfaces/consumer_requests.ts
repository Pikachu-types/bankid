import { RequestMode } from "../enums/enums";

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
  device: Record<string, unknown>;
  /**
   * Standalone bankid identifier
   */
  bankid: string;
}