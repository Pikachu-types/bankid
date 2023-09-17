import { BankIDTypes } from "../enums/enums";
import { ClientApp } from "../models/portal/apps";
import { ConsumerModel } from "../models/public/consumers";
import { StandaloneBankID } from "../models/public/standaloneIds";
import { IdentificationModel } from "../models/public/users";
/**
 * BookingEmailNotify
*/
export interface EnrolmentMade {
    user: IdentificationModel;
    bankid: StandaloneBankID;
    generated: string;
}
/**
 * Console purpose solely
*/
export interface QuestionStructure {
    question: string;
    identifier: string;
}
/**
 * RSA Model
 *
*/
export type RSAKeys = {
    private: string;
    public: string;
};
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
}
/**
 * Console account security
 */
export interface ConsoleAccountSecurity {
    tFA: boolean;
    generated?: boolean;
    provider?: string;
}
/**
 * Console account security
 */
export interface ConsumerProfile {
    logo: string;
}
/**
 * App profile
 */
export interface AppProfile {
    client: ConsumerModel;
    app: ClientApp;
}
/**
 * App data secrets
 */
export interface AppDataSecret {
    secret: string;
    created: number;
    revoked: boolean;
}
/**
 * App keys
 */
export interface APIKeys {
    live: string;
    test: string;
}
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
}
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
}
