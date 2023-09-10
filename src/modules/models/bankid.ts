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
  }

  export class helpers {
    /**
    * generate email sender
    * @param {string} token magic login token
    * @param {boolean} debug set to true if you are using localhost
    * @return {string} returns sender
    */
    public static buildLoginLink(token: string,
      debug: boolean = false): string {
      return `${debug ? Links.consoleLocalhost : Links.consoleDomain}` +
        `/magic/${token}`;
    }    
  }
}