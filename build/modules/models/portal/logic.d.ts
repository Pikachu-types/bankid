export interface CompanyLogic {
    billing: Billing;
}
export interface Billing {
    setup: number;
    currency: string;
    authentication: TPlan[];
    signature: TPlan[];
}
export interface TPlan {
    name: string;
    min: number;
    price: number;
    monthly: Period;
    yearly: Period;
}
interface Period {
    base: number;
    discount?: number;
}
export {};
