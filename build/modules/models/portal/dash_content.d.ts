import { BankID } from "../bankid";
/**
 * ChangeLogs class
*/
export declare class ChangeLogs {
    header: string;
    changelog: string;
    logs: BankID.Logs[] | undefined;
    lut: number | undefined;
    /**
     * Change record to ChangeLogs class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {ChangeLogs} this class
     */
    static fromJson(obj: Record<string, unknown>): ChangeLogs;
    /**
     * This class handler to json
     * @return {string} text
     */
    toJsonString(): string;
    /**
     * Create log id
     * @return {string} text
     */
    static generateLogID(): string;
    /**
    * get document in map format
    * @return { Record<string, unknown>} returns doc map .
    */
    toMap(): Record<string, unknown>;
}
