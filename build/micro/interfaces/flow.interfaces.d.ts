/**
 * Authorization grant request
 */
export interface AuthorizationGrantRequest {
    /**
     * This is usually an organisation
     * Would be referenced as "sub" in request query
     */
    sub: string;
    /**
     * Consumer app id
     */
    app: string;
    /**
     * Consumer api key
     */
    apikey: string;
    /**
     * App secret key
     */
    secret: string;
    /**
     * Any old auth token already injected previously
     */
    token?: string;
}
/**
 * Cancel any kind of flow request
 */
export type CancelFlowRequest = {
    /**
     * request identifier
     */
    request: string;
    /**
    * attach any old tokens
    */
    token: string;
};
/**
 * Ping any flow request
 */
export type PingFlowRequest = {
    /**
     * request identifier
     */
    request: string;
    /**
    * attach any old tokens
    */
    token: string;
};
