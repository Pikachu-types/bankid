/**
 * Identification flow request
 */
export type IdentificationFlowRequest = {
    /**
     * social security number
     */
    user: string;
    /**
     * string payload of this request
     */
    payload: string;
    /**
     * request claims
     */
    claims: string[];
    /**
     * Request mode
     */
    mode: string;
    /**
     * Request action type
     */
    action: string;
    /**
     * attach any old tokens
     */
    token?: string;
    /**
     * Number of id seed for wild identification
     * purposes only
     */
    seeds?: string;
    /**
     * Request origin ip
     */
    ip: string;
    /**
     * Service agent
     */
    useragent: string;
    /**
     * App secret from header (v2 and above)
     */
    secret?: string;
    /**
     * Consumer api key (v2 and above)
     */
    apikey?: string;
};
