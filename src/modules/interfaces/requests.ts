import { DocumentAction, UserRoles } from "../enums/enums";
import { MagicLinkModes } from "../enums/shared";
import { DojahBVNResponse, DojahNINResponse } from "../services/dojah";
import { EdenModel } from "./documents";

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



/**
 * Setup Requests
 */
export interface SetupRequest {
  phone: {
    mobile: string,
    verified: boolean,
  },
  identification: {
    country: string,
    methods: string[],
  },
  passport: {
    // first name
    given: string,
    surname: string,
    gender: string,
    // country code
    a3Code: string,
    // passport number
    docID: string,
    // nin
    personalNumber: string,
    dob: number,
    exp: number,
  },
  bvn: string,
  image: string
};

/**
 * Face match request
 */
export interface FaceMatchingRequest{
  // bvn image
  bvn: string,
  // nin image
  nin: string,
  // selfie
  query: string,
};

/**
 * Commit integrity test on id data request
 */
export interface CommitIntegrityTestRequest{
  setup: SetupRequest,
  registry: {
    nin: DojahNINResponse,
    bvn: DojahBVNResponse,
  },
  liveliness: EdenModel
};

/**
 * Text messages
 */
export interface SMSRequest{
  // mobile number
  to: string,
  // message
  message: string
};
