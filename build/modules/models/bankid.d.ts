import { MagicLinkModes } from "../enums/shared";
export declare namespace BankID {
    enum AppIdentifier {
        android = "ng.bankid.mobile",
        uniLink = "pasby://",
        ios = "ng.bankid.mobile",
        iosID = ""
    }
    enum Links {
        ipChecker = "https://ipapi.co",
        oldIpChecker = "https://ipgeolocation.abstractapi.com/v1/",
        consoleLocalhost = "http://localhost:5430",
        consoleDomain = "https://console.bankid.ng",
        signaturesDomain = "https://in.pasby.africa",
        eDocsDomain = "https://in.pasby.africa/document-checker/",
        connectedDomain = "https://in.pasby.africa/connected/",
        connectUri = "https://connect.bankid.ng/",
        authUri = "https://connect.bankid.ng/authorization/grant/v1"
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
