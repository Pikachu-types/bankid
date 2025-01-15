import { HookData } from "./requests";
export type Signee = {
    title?: string | null | undefined;
    name: string;
    type: "business" | "person";
    email: string;
    nin: string;
    ip?: string;
    representing: string;
    signedAt?: number;
};
interface ISignatureStatus {
    nin: string;
    status: "viewing" | "signed" | "stale";
    lut: number;
}
/**
 * Documents class
*/
export declare class Documents {
    /**
     * doc_[uuid1]
     */
    id: string;
    /**
     * nin numbers to sign document
     */
    to: string[];
    /**
     * User agent
     */
    useragent: string;
    /**
     * Tells pasby hoe to handle this document signing request
     */
    mode?: "interface" | "api";
    /**
     * Would be the same length as the [to] object
     * and we match a user using the nin
     */
    statusLog?: ISignatureStatus[];
    /**
     * Must be present if the mode is "interface"
     */
    signee?: Signee[];
    /**
     * Request destination [mobile, file, desktop]
     */
    destination: string;
    lut: number;
    iat: number;
    exp: number;
    handled: boolean;
    /**
     * signatures of requested parties
     */
    signatures: eSignature[] | undefined;
    request: clientRequest | undefined;
    /**
     * document file data
     */
    file: eDocument;
    /**
     * This is used to update listeners about signing event
     * has:
     * host: string
     * reference: string
     */
    hook: HookData | undefined;
    /**
     * Change record to Documents class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {Documents} this class
     */
    static fromJson(obj: Record<string, unknown>): Documents;
    /**
     * Helper class function to find one specific object based on id
     *
     * @param {Documents[]} list an array to sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {Documents | undefined} found object else undefined
     */
    static findOne(list: Documents[], id: string): Documents | undefined;
    /**
     * This class handler to json
     * @return {string} text
     */
    toJsonString(): string;
    /**
     * create a pretty unique uid for documents
     * @return {string} generated uid
     */
    static createID(): string;
    /**
     * get document reference
     * @return {string} reference id
     */
    reference(): string;
    /**
    * get document in map format
    * @return { Record<string, unknown>} returns doc map .
    */
    toMap(): Record<string, unknown>;
}
/**
 * File data structure for e-signatures
*/
export interface eDocument {
    source: string;
    name: string;
    stamped?: string;
}
/**
 * e-signature
*/
export interface eSignature {
    iat: number;
    signature?: string;
    nin: string;
    name: string;
    identification: string;
}
/**
 * Consumer structure
*/
export interface clientRequest {
    client: string;
    app: string;
    ip: string;
}
export {};
