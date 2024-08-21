/**
 * Doc
*/
export declare class OIDCSession {
    id: string;
    challenge: string;
    exp: number;
    iat: number;
    /**
     * national id
     */
    sub: string;
    /**
     * consumer
     */
    consumer: string;
    claims: string[];
    /**
     * Change record to this class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {OIDCSession} this class
     */
    static fromJson(obj: Record<string, unknown>): OIDCSession;
    /**
     * This class handler to json
     * @return {string} text
     */
    toJsonString(): string;
    /**
     * class handler
     */
    generateID(token: string): void;
    /**
     * Helper class function to find one specific object based on id
     *
     * @param {OIDCSession[]} list an array to sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {OIDCSession | undefined} found object else undefined
     */
    static findOne(list: OIDCSession[], id: string): OIDCSession | undefined;
    /**
    * get document in map format
    * @return { Record<string, unknown>} returns doc map .
    */
    toMap(): Record<string, unknown>;
}
