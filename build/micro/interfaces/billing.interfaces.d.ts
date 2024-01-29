/**
 * Recording api usage
 */
export type UsageRecording = {
    quantity: number;
    cost: number;
    timestamp: number;
    action: 'increment' | 'decrement';
    mode: 'live' | 'test';
    apikey: string;
    /**
    * e.g GET /stats/ 200
    */
    route: string;
};
