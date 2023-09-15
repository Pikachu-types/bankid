import { MagicLinkModes } from "../enums/shared";

/**
 * Magic Login RequestModel
 */
export interface MagicLoginRequest {
  email: string;
  debug: boolean;
};

/**
 * Create app request
 */
export interface CreateAppRequest {
  clientid: string;
  data: Record<string, unknown>;
};

/**
 * Validate Token Request
 */
export interface MagicTokenValidate {
  token: string;
};

/**
 * Magic Login Verification
 */
export interface MagicLoginVerification {
  token: string;
  debug?: boolean;
};

/**
 * Magic token structure
 */
export interface MagicToken {
  /**
   * Usually the email
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
   * Type of Magic token
   */
  mode: MagicLinkModes | string;
  /**
   * Would be undefined if created for login only
   * else registration parses all reg data here 
   */
  data?: ConsoleRegAccountRequest;
  /**
   * Session information
   */
  session: Record<string, unknown>;
};

/**
 * Create BankID Console account RequestModel
 */
export interface ConsoleRegAccountRequest {
  email?: string;
  debug: boolean;
  legalAccepted: boolean;
  org: string;
  naming?: {
    first: string;
    last: string;
  };
};
