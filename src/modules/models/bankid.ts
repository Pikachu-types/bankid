import { CustomError } from "labs-sharable";
import { MagicLinkModes } from "../enums/shared";
import { DocumentReference, DocumentTypes } from "../enums/enums";

export namespace BankID {
  export enum AppIdentifier {
    android = "ng.bankid.mobile",
    ios = "ng.bankid.mobile",
    iosID = "", /// todo fill when gone live
  }
  export enum Links {
    ipChecker = "https://ipgeolocation.abstractapi.com/v1/",
    consoleLocalhost = "http://localhost:5430",
    consoleDomain = "https://console.bankid.ng",
    connectUri = "https://connect.bankid.ng/v1/",
    authUri = "https://connect.bankid.ng/v1/o-auth",
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
     * Find what collection based on  id
     * @param {string} id doc id
     * @return {string} returns collection
     */
    public static whatCollection(id: string): string {
      if (id.includes("_") === false) {
        throw new CustomError("");
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
  }
}