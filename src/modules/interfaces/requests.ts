import { DocumentAction, UserRoles } from "../enums/enums";
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
  consumer: string;
  data: Record<string, unknown>;
};

/**
 * Modify app request
 */
export interface ModifyAppRequest {
  consumer: string;
  appID: string;
  action?: DocumentAction,
  secretid?:string
};

/**
 * Org Request
 */
export interface OrgRequest {
  consumer: string;
};

/**
 * Org Request create
 */
export interface CreateConsumerRequest {
  name: string;
  userID: string;
  debug: boolean;
};

/**
 * Org Invitation user
 */
export interface UserInvitation {
  consumer: string;
  email: string;
  role: UserRoles;
  debug: boolean
};

/**
 * Validate Token Request
 */
export interface MagicTokenValidate {
  token: string;
};

/**
 * Database Action Request
 */
export interface DatabaseActionRequest {
  action: DocumentAction;
  /**
   * Data to update document with
   */
  data: Record<string, unknown>;
  /**
   * Doc ID
   * we figure out what collection from the id
   */
  id: string;
  /**
   * Consumer ID
   */
  consumer?: string;
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
   * Organisation attached to
   */
  org?: string;
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
   * Wouldn't be undefined if created for invitation only
   * else registration parses all reg data here 
   */
  invitation?: UserInvitation;
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
  role?: string;
  naming?: {
    first: string;
    last: string;
  };
};
