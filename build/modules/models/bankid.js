"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankID = void 0;
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
        * @return {string} returns sender
        */
        static buildLoginLink(token, debug = false) {
            return `${debug ? Links.consoleLocalhost : Links.consoleDomain}` +
                `/magic/${token}`;
        }
    }
    BankID.helpers = helpers;
})(BankID = exports.BankID || (exports.BankID = {}));
//# sourceMappingURL=bankid.js.map