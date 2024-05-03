import { MessageCallback, eDocSignRequests } from "../modules";
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
    private readonly authorizationEndpoint;
    private readonly webIDEndpoint;
    private readonly mobileIDEndpoint;
    private readonly mobileSignatureEndpoint;
    private readonly webSignatureEndpoint;
    private readonly pingEndpoint;
    private readonly cancellationEndpoint;
    private readonly wildcardIdentificationEndpoint;
    private readonly wildcardSignatureEndpoint;
    private readonly documentSigningEndpoint;
    private readonly useReportEndpoint;
    /**
     * Class main constructor
     * @param {string} dbURI initialize with dbURI
     * @param {string} appkey microservice identifier
     */
    constructor(dbURI: string, appkey: string);
    /**
     * Grant api authorization to consumer app
     * @param {AuthorizationGrantRequest} request data map of request
     * @param {MessageCallback} onError get feedback on any error logs
     * @param {string} version what api version would you want to interface with
     * @return {Promise<DefaultResponseAndStatus>} returns response.
     */
    clientAuthorization(request: AuthorizationGrantRequest, onError?: MessageCallback, version?: string): Promise<import("../modules").DefaultResponseAndStatus | undefined>;
    /**
     * Identification flow db backend caller
     * @param {IdentificationFlowRequest} request data map of request
     * @param {MessageCallback} onError get feedback on any error logs
     * @param {string} version what api version would you want to interface with
     * @return {Promise<DefaultResponseAndStatus>} returns response.
     */
    identificationFlow(request: IdentificationFlowRequest, onError?: MessageCallback, version?: string): Promise<import("../modules").DefaultResponseAndStatus | undefined>;
    /**
     * Identification flow for same devices db backend caller
     * @param {IdentificationFlowRequest} request data map of request
     * @param {MessageCallback} onError get feedback on any error logs
     * @param {string} version what api version would you want to interface. [note: do not use v1]
     * @return {Promise<DefaultResponseAndStatus>} returns response.
     */
    mobIdentificationFlow(request: IdentificationFlowRequest, onError?: MessageCallback, version?: string): Promise<import("../modules").DefaultResponseAndStatus | undefined>;
    /**
     * Signature flow for same devices db backend caller
     * @param {SignatureFlowRequest} request data map of request
     * @param {MessageCallback} onError get feedback on any error logs
     * @param {string} version what api version would you want to interface. [note: do not use v1]
     * @return {Promise<DefaultResponseAndStatus>} returns response.
     */
    mobSignatureFlow(request: SignatureFlowRequest, onError?: MessageCallback, version?: string): Promise<import("../modules").DefaultResponseAndStatus | undefined>;
    /**
     * Signature flow for a wildcard audience db backend caller
     * @param {SignatureFlowRequest} request data map of request
     * @param {MessageCallback} onError get feedback on any error logs
     * @param {string} version what api version would you want to interface. [note: do not use v1]
     * @return {Promise<DefaultResponseAndStatus>} returns response.
     */
    wildcardSignatureFlow(request: WildcardSignatureFlowRequest, onError?: MessageCallback, version?: string): Promise<import("../modules").DefaultResponseAndStatus | undefined>;
    /**
     * Cancel a flow db backend caller
     * @param {CancelFlowRequest} request data map of request
     * @param {MessageCallback} onError get feedback on any error logs
     * @param {string} version what api version would you want to interface
     * @return {Promise<DefaultResponseAndStatus>} returns response.
     */
    cancelFlow(request: CancelFlowRequest, onError?: MessageCallback, version?: string): Promise<import("../modules").DefaultResponseAndStatus | undefined>;
    /**
     * Ping a flow db backend caller
     * @param {PingFlowRequest} request data map of request
     * @param {MessageCallback} onError get feedback on any error logs
     * @param {string} version what api version would you want to interface.
     * @return {Promise<DefaultResponseAndStatus>} returns response.
     */
    pingFlow(request: PingFlowRequest, onError?: MessageCallback, version?: string): Promise<import("../modules").DefaultResponseAndStatus | undefined>;
    /**
     * Signature flow db backend caller
     * @param {SignatureFlowRequest} request data map of request
     * @param {MessageCallback} onError get feedback on any error logs
     * @param {string} version what api version would you want to interface with
     * @return {Promise<DefaultResponseAndStatus>} returns response.
     */
    signatureFlow(request: SignatureFlowRequest, onError?: MessageCallback, version?: string): Promise<import("../modules").DefaultResponseAndStatus | undefined>;
    /**
     * Wildcard flow db backend caller
     * @param {IdentificationFlowRequest} request data map of request
     * @param {MessageCallback} onError get feedback on any error logs
     * @param {string} version what api version would you want to interface with
     * @return {Promise<DefaultResponseAndStatus>} returns response.
     */
    wildCardIdentificationFlow(request: IdentificationFlowRequest, onError?: MessageCallback, version?: string): Promise<import("../modules").DefaultResponseAndStatus | undefined>;
    /**
     * Document signing flow db backend caller
     * @param {eDocSignRequests} request data map of request
     * @param {MessageCallback} onError get feedback on any error logs
     * @param {string} version what api version would you want to interface with
     * @return {Promise<DefaultResponseAndStatus>} returns response.
     */
    documentSigningFlow(request: eDocSignRequests, onError?: MessageCallback, version?: string): Promise<import("../modules").DefaultResponseAndStatus | undefined>;
    /**
     * Document signing flow db backend caller
     * @param {UsageRecording} request data map of request
     * @param {MessageCallback} onError get feedback on any error logs
     * @return {Promise<DefaultResponseAndStatus>} returns response.
     */
    logApiUsage(request: UsageRecording, onError?: MessageCallback): Promise<import("../modules").DefaultResponseAndStatus | undefined>;
}
