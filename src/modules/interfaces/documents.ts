import { StandaloneBankID } from "../models/public/standaloneIds";
import { IdentificationModel } from "../models/public/users";

/**
 * BookingEmailNotify
*/
export interface EnrolmentMade {
  user: IdentificationModel,
  bankid: StandaloneBankID,
  generated: string,
}

/**
 * Console purpose solely
*/
export interface QuestionStructure {
  question: string,
  identifier: string
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
export interface DefaultResponse {
  status: string;
  reason?: string;
  data?: Record<string, unknown>;
};

/**
 * Console account security
 */
export interface ConsoleAccountSecurity {
  tFA: boolean;
  generated?: boolean;
};
