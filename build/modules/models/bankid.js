"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankID = void 0;
const labs_sharable_1 = require("labs-sharable");
const enums_1 = require("../enums/enums");
var BankID;
(function (BankID) {
    let AppIdentifier;
    (function (AppIdentifier) {
        AppIdentifier["android"] = "ng.bankid.mobile";
        AppIdentifier["ios"] = "ng.bankid.mobile";
        AppIdentifier["iosID"] = "";
    })(AppIdentifier = BankID.AppIdentifier || (BankID.AppIdentifier = {}));
    let Links;
    (function (Links) {
        Links["ipChecker"] = "https://ipgeolocation.abstractapi.com/v1/";
        Links["consoleLocalhost"] = "http://localhost:5430";
        Links["consoleDomain"] = "https://console.bankid.ng";
        Links["connectUri"] = "https://connect.bankid.ng/v1/";
        Links["authUri"] = "https://connect.bankid.ng/v1/o-auth";
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
    }
    BankID.helpers = helpers;
})(BankID = exports.BankID || (exports.BankID = {}));
//# sourceMappingURL=bankid.js.map