import {
  CustomError, generateRandomAlphaNumeric,
  unixTimeStampNow
} from "labs-sharable";
import { MagicLinkModes } from "../enums/shared";
import { DocumentReference, DocumentTypes } from "../enums/enums";
import { FunctionHelpers } from "../services/helper";
import { SeverError } from "../utils/server.error";

export namespace BankID {
  export enum AppIdentifier {
    android = "ng.bankid.mobile",
    // uniLink = "ng.bankid://",
    uniLink = "pasby://pasby.africa/",
    ios = "ng.bankid.mobile",
    iosID = "6450365525", /// todo fill when gone live
  }

  export class ApiFees {
    public static live = 0.5;
    public static test = 0.1;
  }

  export interface Logs {
    id: string,
    title: string,
    description: string,
    link: string,
    tags: string[],
    iat: number,
  }
  
  export enum Links {
    ipChecker = "https://ipapi.co",
    oldDomain = "https://mobil.bankid.ng",
    uniDomain = "https://open.pasby.africa",
    oldIpChecker = "https://ipgeolocation.abstractapi.com/v1/",
    consoleLocalhost = "http://localhost:5430",
    debugPortalManagementHost = "http://127.0.0.1:5001/bankid-project/us-central1/portal-api",
    consoleDomain = "https://console.pasby.africa",
    idDomain = "https://ids.pasby.africa",
    commsDomain = "https://comms.pasby.africa",
    portalApiDomain = "https://api.bankid.ng",
    signaturesDomain = "https://in.pasby.africa",
    eDocsDomain = "https://in.pasby.africa/document-checker/",
    connectedDomain = "https://in.pasby.africa/connected/",
    connectUri = "https://connect.bankid.ng/",
    apiUri = "https://api.pasby.africa",
    authUri = `https://api.pasby.africa/api/v1/flow/authorize`,
  }

  export class helpers {
    /**
    * generate email sender
    * @param {string} token magic login token
    * @param {boolean} debug set to true if you are using localhost
    * @param {MagicLinkModes} mode set if you like to influence the ui process
    * @return {string} returns sender
    */
    public static buildLoginLink(token: string,
      debug: boolean = false, mode?: MagicLinkModes): string {
      return `${debug ? Links.consoleLocalhost : Links.consoleDomain}` +
        `/magic/${token}${mode === undefined ? '': `?mode=${mode}`}`;
    }
    
    /**
    * generate billing verification email sender
    * @param {string} token magic token
    * @param {boolean} debug set to true if you are using localhost
    * @return {string} returns sender
    */
    public static buildBillingVerificationLink(token: string,
      debug: boolean = false): string {
      return `${debug ? Links.debugPortalManagementHost : Links.portalApiDomain}` +
        `/billing-contact/v1/verify?token=${token}`;
    }

    /**
     * Create a request identifier
     * @param {string} token magic verification token
     * @return {string} returns value.
     */
    public static buildEmailVerificationLink(token:string): string {
      return `${Links.idDomain}/email-verification/v1?token=${token}`;
    }
    
    /**
     * Create a request identifier
     * @return {string} returns value.
     */
    public static requestID(): string {
      return `${DocumentTypes.requests}${unixTimeStampNow()}-${generateRandomAlphaNumeric(4)}`;
    }

    /**
     * Create a e document verifier link
     * @param {string} id doc id
     * @return {string} returns value.
     */
    public static eDocVerifierLink(id: string): string {
      return `${Links.eDocsDomain}${id.replace(DocumentTypes.document, "")}`;
    }

    /**
     * Find what collection based on  id
     * @param {string} id doc id
     * @return {string} returns collection
     */
    public static whatCollection(id: string): string {
      if (!id.includes("_")) {
        throw new SeverError("Collection does not exist");
      }
      let collection = `${id.split("_")[0]}_`;
      switch (collection) {
        case DocumentTypes.user:
          return DocumentReference.users;
        case DocumentTypes.consoleuser:
          return DocumentReference.console;
        case DocumentTypes.vendor:
          return DocumentReference.vendor;
        case DocumentTypes.consumer:
          return DocumentReference.consumers;
        case DocumentTypes.bankID:
          return DocumentReference.issuedIDs;
        case DocumentTypes.app:
          return DocumentReference.apps;
        case DocumentTypes.session:
          return DocumentReference.sessions;
        default:
          return "na";
      }
    }
    
    /**
     * Create BankID linked string
     * @param {string} value the value you like to encrypt
     * @param {string} secret cipher value secret
     * @return {string} return ip  address
     */
    public static bankidlinkedstring(value: string, secret: string)
      : string {
      const encrypt = FunctionHelpers.bankidCipherString(secret,
        value);
      return `${BankID.AppIdentifier.uniLink}${encrypt}`;
    }
  }
}