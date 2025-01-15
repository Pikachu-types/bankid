import { DefaultResponse, eDocSignRequests } from "../modules";
import { AuthorizationGrantRequest, CancelFlowRequest, PingFlowRequest } from "./interfaces/flow.interfaces";
import { IdentificationFlowRequest } from "./interfaces/identification.interfaces";
import { SignatureFlowRequest, WildcardSignatureFlowRequest } from "./interfaces/signature.interfaces";
import { UsageRecording } from "./interfaces/billing.interfaces";
/**
 * Helper class to handle all needed api communication between
 * our micro-services and the main backend
 */
export declare class MicroServiceBackendAxios {
    db: string;
    app: string;
    /**
     * Class main constructor
     * @param {string} dbURI initialize with dbURI
     * @param {string} appkey microservice identifier
     */
    constructor(dbURI: string, appkey: string);
    /**
     * Builds a request to the backend
     * @param {string} url
     * @param {Record<string, string>} headers
     * @param {Record<string, unknown>} body
     * @param {string} method
     * @returns {Promise<AxiosResponse<any, any>>}
     */
    private requestBuilder;
    authorization(request: AuthorizationGrantRequest, version?: string): Promise<{
        data: DefaultResponse;
        statusCode: number;
    }>;
    identification(request: IdentificationFlowRequest, mode: "same" | "wildcard" | "different", version?: string): Promise<{
        data: DefaultResponse;
        statusCode: number;
    }>;
    flow(request: PingFlowRequest | CancelFlowRequest, mode: "cancel" | "ping", version?: string): Promise<{
        data: DefaultResponse;
        statusCode: number;
    }>;
    /**
     * PS - Wildcard signature does not have a v1
     * @param request
     * @param mode
     * @param version
     * @returns
     */
    signature(request: SignatureFlowRequest | eDocSignRequests | WildcardSignatureFlowRequest, mode: "same" | "wildcard" | "different" | "doc" | "interface", version?: string): Promise<{
        data: DefaultResponse;
        statusCode: number;
    }>;
    logic(request: UsageRecording | {
        apikey: string;
        type: "authentication" | "signature";
    }, mode: "usage" | "billing"): Promise<{
        data: DefaultResponse;
        statusCode: number;
    }>;
}
