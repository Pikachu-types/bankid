import { MagicLinkModes } from "../enums/shared";
export declare namespace BankID {
    enum AppIdentifier {
        android = "ng.bankid.mobile",
        uniLink = "pasby://africa.id/",
        ios = "ng.bankid.mobile",
        iosID = "6450365525"
    }
    class ApiFees {
        static live: number;
        static test: number;
    }
    interface Logs {
        id: string;
        title: string;
        description: string;
        link: string;
        tags: string[];
        iat: number;
    }
    enum Links {
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
        authUri = "https://api.pasby.africa/api/v1/flow/authorize"
    }
    class helpers {
        /**
        * generate email sender
        * @param {string} token magic login token
        * @param {boolean} debug set to true if you are using localhost
        * @param {MagicLinkModes} mode set if you like to influence the ui process
        * @return {string} returns sender
        */
        static buildLoginLink(token: string, debug?: boolean, mode?: MagicLinkModes): string;
        /**
        * generate billing verification email sender
        * @param {string} token magic token
        * @param {boolean} debug set to true if you are using localhost
        * @return {string} returns sender
        */
        static buildBillingVerificationLink(token: string, debug?: boolean): string;
        /**
         * Create a request identifier
         * @param {string} token magic verification token
         * @return {string} returns value.
         */
        static buildEmailVerificationLink(token: string): string;
        /**
         * Create a request identifier
         * @return {string} returns value.
         */
        static requestID(): string;
        /**
         * Create a e document verifier link
         * @param {string} id doc id
         * @return {string} returns value.
         */
        static eDocVerifierLink(id: string): string;
        /**
         * Find what collection based on  id
         * @param {string} id doc id
         * @return {string} returns collection
         */
        static whatCollection(id: string): string;
        /**
         * Create BankID linked string
         * @param {string} value the value you like to encrypt
         * @param {string} secret cipher value secret
         * @return {string} return ip  address
         */
        static bankidlinkedstring(value: string, secret: string): string;
    }
}
