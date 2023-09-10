/**
 * Bankid approved client end applications for indirect
 * writes and creation to server.
 */
export declare class ApprovedClients {
    /**
     * the backend apis can be directly called by
     * web and mobile applications package with these names
     * for web apps the web-domain, servers as its package name
     */
    static applications: string[];
    /**
     * Our backend apis can-only be called by these micro-services or portals
     */
    static requesters: string[];
    /**
     * For endpoints which require less scrutiny we have
     * these authorized apps by package name and web-domain
     */
    static authorized: string[];
}
