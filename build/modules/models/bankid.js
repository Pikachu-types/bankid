"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankID = void 0;
const labs_sharable_1 = require("labs-sharable");
const enums_1 = require("../enums/enums");
const helper_1 = require("../services/helper");
var BankID;
(function (BankID) {
    let AppIdentifier;
    (function (AppIdentifier) {
        AppIdentifier["android"] = "ng.bankid.mobile";
        // uniLink = "ng.bankid://",
        AppIdentifier["uniLink"] = "pasby://africa.id/";
        AppIdentifier["ios"] = "ng.bankid.mobile";
        AppIdentifier["iosID"] = "6450365525";
    })(AppIdentifier = BankID.AppIdentifier || (BankID.AppIdentifier = {}));
    class ApiFees {
    }
    ApiFees.live = 0.5;
    ApiFees.test = 0.1;
    BankID.ApiFees = ApiFees;
    let Links;
    (function (Links) {
        Links["ipChecker"] = "https://ipapi.co";
        Links["oldDomain"] = "https://mobil.bankid.ng";
        Links["uniDomain"] = "https://open.pasby.africa";
        Links["oldIpChecker"] = "https://ipgeolocation.abstractapi.com/v1/";
        Links["consoleLocalhost"] = "http://localhost:5430";
        Links["debugPortalManagementHost"] = "http://127.0.0.1:5001/bankid-project/us-central1/portal-api";
        Links["consoleDomain"] = "https://console.pasby.africa";
        Links["idDomain"] = "https://ids.pasby.africa";
        Links["commsDomain"] = "https://comms.pasby.africa";
        Links["portalApiDomain"] = "https://api.bankid.ng";
        Links["signaturesDomain"] = "https://in.pasby.africa";
        Links["eDocsDomain"] = "https://in.pasby.africa/document-checker/";
        Links["connectedDomain"] = "https://in.pasby.africa/connected/";
        Links["connectUri"] = "https://connect.bankid.ng/";
        Links["apiUri"] = "https://api.pasby.africa";
        Links["authUri"] = "https://api.pasby.africa/api/v1/flow/authorize";
    })(Links = BankID.Links || (BankID.Links = {}));
    class helpers {
        /**
        * generate email sender
        * @param {string} token magic login token
        * @param {boolean} debug set to true if you are using localhost
        * @param {MagicLinkModes} mode set if you like to influence the ui process
        * @return {string} returns sender
        */
        static buildLoginLink(token, debug = false, mode) {
            return `${debug ? Links.consoleLocalhost : Links.consoleDomain}` +
                `/magic/${token}${mode === undefined ? '' : `?mode=${mode}`}`;
        }
        /**
        * generate billing verification email sender
        * @param {string} token magic token
        * @param {boolean} debug set to true if you are using localhost
        * @return {string} returns sender
        */
        static buildBillingVerificationLink(token, debug = false) {
            return `${debug ? Links.debugPortalManagementHost : Links.portalApiDomain}` +
                `/billing-contact/v1/verify?token=${token}`;
        }
        /**
         * Create a request identifier
         * @param {string} token magic verification token
         * @return {string} returns value.
         */
        static buildEmailVerificationLink(token) {
            return `${Links.idDomain}/email-verification/v1?token=${token}`;
        }
        /**
         * Create a request identifier
         * @return {string} returns value.
         */
        static requestID() {
            return `${enums_1.DocumentTypes.requests}${(0, labs_sharable_1.unixTimeStampNow)()}-${(0, labs_sharable_1.generateRandomAlphaNumeric)(4)}`;
        }
        /**
         * Create a e document verifier link
         * @param {string} id doc id
         * @return {string} returns value.
         */
        static eDocVerifierLink(id) {
            return `${Links.eDocsDomain}${id.replace(enums_1.DocumentTypes.document, "")}`;
        }
        /**
         * Find what collection based on  id
         * @param {string} id doc id
         * @return {string} returns collection
         */
        static whatCollection(id) {
            if (id.includes("_") === false) {
                throw new labs_sharable_1.CustomError("");
            }
            let collection = `${id.split("_")[0]}_`;
            switch (collection) {
                case enums_1.DocumentTypes.user:
                    return enums_1.DocumentReference.users;
                case enums_1.DocumentTypes.consoleuser:
                    return enums_1.DocumentReference.console;
                case enums_1.DocumentTypes.vendor:
                    return enums_1.DocumentReference.vendor;
                case enums_1.DocumentTypes.consumer:
                    return enums_1.DocumentReference.consumers;
                case enums_1.DocumentTypes.bankID:
                    return enums_1.DocumentReference.issuedIDs;
                case enums_1.DocumentTypes.app:
                    return enums_1.DocumentReference.apps;
                case enums_1.DocumentTypes.session:
                    return enums_1.DocumentReference.sessions;
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
        static bankidlinkedstring(value, secret) {
            const encrypt = helper_1.FunctionHelpers.bankidCipherString(secret, value);
            return `${BankID.AppIdentifier.uniLink}${encrypt}`;
        }
    }
    BankID.helpers = helpers;
})(BankID = exports.BankID || (exports.BankID = {}));
//# sourceMappingURL=bankid.js.map