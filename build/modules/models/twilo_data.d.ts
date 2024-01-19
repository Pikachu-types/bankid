/**
 * Buka TwiloData class
*/
export declare class TwiloData {
    to: string;
    dateCreated: string;
    sid: string;
    errorCode: string;
    from: string;
    messagingServiceSid: string;
    dateSent: string;
    status: string;
    price: number;
    /**
     * Change record to TwiloData class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {TwiloData} this class
     */
    static fromJson(obj: Record<string, unknown>): TwiloData;
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
