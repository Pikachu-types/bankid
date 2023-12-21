/**
 * Bankid approved client end applications for indirect
 * writes and creation to server.
 */
export class ApprovedClients {
  /**
   * the backend apis can be directly called by
   * web and mobile applications package with these names
   * for web apps the web-domain, servers as its package name
   */
  static applications = ["ng.bankid.mobile", "console.bankid.ng"];
  /**
   * Our backend apis can-only be called by these micro-services or clients
   */
  static requesters = ["api.bankid.ng", "connect.bankid.ng", "api.pasby.africa",
    "138141d7-87fd-40d7-9b82-20ec85ada807",
    "b49932e5-5776-44af-883f-39fd5f1c7761", "ng.bankid.mobile"];
  
  /**
   * For endpoints which require less scrutiny we have
   * these authorized apps by package name and web-domain
   */
  static authorized = ["api.bankid.ng", "console.bankid.ng", "ng.bankid.mobile"];
}
