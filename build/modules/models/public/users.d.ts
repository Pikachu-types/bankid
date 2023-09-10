import { AddressData, ContactData } from "../superficial/contact";
import { BioData } from "../superficial/bio";
import { NamingData } from "../superficial/naming";
import { FinancialData } from "../superficial/financials";
import { NationalityData } from "../superficial/nationality";
import { StandaloneBankID } from "./standaloneIds";
import { VendorModel } from "./vendors";
/**
 * Single BankID Model
 *
*/
export type SingleBankIDModel = {
    user: IdentificationModel;
    issued: StandaloneBankID;
    vendor: VendorModel;
};
/**
 * IdentificationModel class
*/
export declare class IdentificationModel {
    /**
     * id look like [bid_{id}]
     */
    id: string;
    nin: string;
    locale: string;
    test: boolean;
    created: number | undefined;
    validTo: number | undefined;
    /**
     * Verification claim could be biometrics via nin or bvn
     */
    source: string;
    /**
     * bankids this user has meaning one nin can own multiple id
     */
    iDs: string[];
    /**
     * BankID vendor id
     */
    vendor: string;
    updatedAt: number | undefined;
    contact: Record<string, unknown>;
    address: Record<string, unknown>;
    nationality: Record<string, unknown>;
    bio: Record<string, unknown>;
    financial: Record<string, unknown> | undefined;
    naming: Record<string, unknown>;
    contactData: ContactData | undefined;
    addressData: AddressData | undefined;
    bioData: BioData | undefined;
    nameData: NamingData | undefined;
    nationalityData: NationalityData | undefined;
    financialData: FinancialData | undefined;
    /**
     * Change record to IdentificationModel class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {IdentificationModel} this class
     */
    static fromJson(obj: Record<string, unknown>): IdentificationModel;
    /**
     * Helper class function to find one specific id
     *
     * @param {IdentificationModel[]} list an array of bankids to
     *  sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {IdentificationModel | undefined} found object else undefined
     */
    static findOne(list: IdentificationModel[], id: string): IdentificationModel | undefined;
    /**
     * resolve maps for certain attributes
     * @return {void} nothing
     */
    resolveMaps(): void;
    /**
     * un-resolve maps for certain attributes
     * @return {void} nothing
     */
    unResolveMaps(): void;
    /**
     * Get registered users claims
     * @param {string[]} claims supported claims
     * @return {void} nothing
     */
    retrieveClaims(claims: string[]): Record<string, unknown>;
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
