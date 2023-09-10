/**
 * Magic Login RequestModel
 */
export interface MagicLoginRequest {
    email: string;
    debug: boolean;
}
/**
 * Create BankID Console account RequestModel
 */
export interface ConsoleRegAccountRequest {
    email?: string;
    debug: boolean;
    org: string;
    naming?: {
        first: string;
        last: string;
    };
}
