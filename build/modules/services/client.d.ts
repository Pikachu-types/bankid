import { DefaultResponse } from "../interfaces/documents";
/**
 *  Define a type alias for http calls
 */
export type HttpCallback = () => Promise<DefaultResponseAndStatus>;
export type MessageCallback = (error: {
    message: string;
    statusCode?: number;
}) => Promise<unknown>;
/**
 * Authorization grant request
 */
export interface DefaultResponseAndStatus {
    response: DefaultResponse;
    status: number;
}
declare const httpClient: (request: HttpCallback, onError?: MessageCallback) => Promise<DefaultResponseAndStatus | undefined>;
export default httpClient;
