/**
 * AuthenticationResponse class
*/
export declare class AuthenticationResponse {
    /**
     * request iD
     */
    reference: string;
    /**
     * consumer id
     */
    requester: string;
    /**
     * registered bankid user
     */
    requestee: string;
    /**
     * Verification mode [identification or signature]
     */
    mode: string;
    /**
     * signed data in a string format
     */
    data: string;
    /**
     * request cancelled
     */
    cancelled: boolean;
    /**
     * on session
     */
    onsession: boolean;
    /**
     * Date request was created (timestamp)
     */
    iat: number;
    /**
     * Timestamp of signature moment
     */
    signedAt: number | undefined;
    signature: string | undefined;
    /**
     * Supported claims requested for
     */
    claims: Record<string, unknown>;
    /**
     * Change record to AuthenticationResponse class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {AuthenticationResponse} this class
     */
    static fromJson(obj: Record<string, unknown>): AuthenticationResponse;
    /**
     * This class handler to json
     * @return {string} text
     */
    toJsonString(): string;
    /**
    * get document in map format
    * @return { Record<string, unknown>} returns doc map .
    */
    toMap(): Record<string, unknown>;
}
