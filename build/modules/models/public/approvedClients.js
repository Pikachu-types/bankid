"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovedClients = void 0;
/**
 * Bankid approved client end applications for indirect
 * writes and creation to server.
 */
class ApprovedClients {
}
exports.ApprovedClients = ApprovedClients;
/**
 * the backend apis can be directly called by
 * web and mobile applications package with these names
 * for web apps the web-domain, servers as its package name
 */
ApprovedClients.applications = ["ng.bankid.mobile", "console.bankid.ng,", "console.pasby.africa"];
/**
 * Our backend apis can-only be called by these micro-services or clients
 */
ApprovedClients.requesters = [
    "api.bankid.ng",
    "connect.bankid.ng",
    "api.pasby.africa",
    "138141d7-87fd-40d7-9b82-20ec85ada807",
    "b49932e5-5776-44af-883f-39fd5f1c7761",
    "ng.bankid.mobile",
    "c4532dac-d889-4a68-9b3a-e54850d93750", // front-end-api client
];
/**
 * For endpoints which require less scrutiny we have
 * these authorized apps by package name and web-domain
 */
ApprovedClients.authorized = ["api.bankid.ng", "console.bankid.ng", "ng.bankid.mobile"];
//# sourceMappingURL=approvedClients.js.map