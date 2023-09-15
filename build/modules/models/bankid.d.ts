export declare namespace BankID {
    enum AppIdentifier {
        android = "ng.bankid.mobile",
        ios = "ng.bankid.mobile",
        iosID = ""
    }
    enum Links {
        ipChecker = "https://ipgeolocation.abstractapi.com/v1/",
        consoleLocalhost = "http://localhost:5430",
        consoleDomain = "https://console.bankid.ng",
        connectUri = "https://connect.bankid.ng/v1/",
        authUri = "https://connect.bankid.ng/v1/o-auth"
    }
    class helpers {
        /**
        * generate email sender
        * @param {string} token magic login token
        * @param {boolean} debug set to true if you are using localhost
        * @return {string} returns sender
        */
        static buildLoginLink(token: string, debug?: boolean): string;
    }
}
