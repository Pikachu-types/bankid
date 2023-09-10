import { AddressData, AuthenticateKeysData, ContactData } from "../superficial/contact";
/**
 * VendorModel class
*/
export declare class VendorModel {
    /**
     * id for vendors look like [vnd_{id}]
     */
    id: string;
    name: string;
    domain: string;
    regNum: string;
    created: number | undefined;
    updatedAt: number | undefined;
    tier: number;
    test: boolean;
    apis: Record<string, unknown>;
    contact: Record<string, unknown>;
    keys: Record<string, unknown>;
    address: Record<string, unknown>;
    /**
     * monthly usage counter
     */
    usage: number | undefined;
    contactData: ContactData | undefined;
    addressData: AddressData | undefined;
    keyData: AuthenticateKeysData | undefined;
    /**
     * Change record to VendorModel class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {VendorModel} this class
     */
    static fromJson(obj: Record<string, unknown>): VendorModel;
    /**
     * resolve maps for certain attributes
     * @return {void} text
     */
    resolveMaps(): void;
    /**
     * un-resolve maps for certain attributes
     * @return {void} nothing
     */
    unResolveMaps(): void;
    /**
     * Helper class function to find one specific object based on id
     *
     * @param {VendorModel[]} list an array to sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {VendorModel | undefined} found object else undefined
     */
    static findOne(list: VendorModel[], id: string): VendorModel | undefined;
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
    /**
     * create unique keys for consumer
     * @param {string} secret cipher key
     * @return {void} generated identifiers
     */
    createIdentifiers(secret: string): void;
}
