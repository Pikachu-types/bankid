/**
 * Ping response
 */
export interface PingFlowResponse {
    data: {
        request: {
            reference: string;
            requester: string;
            requestee: string;
            mode: string;
            cancelled: boolean;
            onsession: boolean;
            signed?: boolean;
            signature?: string;
            claims: Record<string, unknown>;
        };
    };
}
