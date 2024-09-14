/// <reference types="node" />
/**
 * ContactData class
*/
export declare class ContactData {
    email: string;
    emailVerified: boolean;
    phone: string;
    phoneVerified: boolean;
    /**
     * Change record to ContactData class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {ContactData} this class
     */
    static fromJson(obj: Record<string, unknown>): ContactData;
    /**
     * Get specific claims and return them as a record
     * @param {string[]} claims supported claims
     * @param {ContactData} classData this class
     * @return {Record<string, unknown>} record of claims
     */
    static grabClaim(claims: string[], classData: ContactData): Record<string, unknown>;
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
/**
 * AddressData class
*/
export declare class AddressData {
    /**
     * Local government of residence
     */
    city: string;
    postCode: string;
    /**
     * State of residence
     */
    state: string;
    /**
     * A2 country code ex. [NG, ZA, GB]
     */
    countryCode: string;
    /**
     * Country name ex [Nigeria, Gambia, Namibia, Zimbabwe]
     */
    country: string;
    /**
     * Residential Address
     */
    place: string;
    /**
     * Formatted address (place, state, country)
     */
    formatted: string;
    longitude: number | undefined;
    latitude: number | undefined;
    /**
     * Change record to AddressData class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {AddressData} this class
     */
    static fromJson(obj: Record<string, unknown>): AddressData;
    /**
     * Get specific claims and return them as a record
     * @param {string[]} claims supported claims
     * @param {AddressData} classData this class
     * @return {Record<string, unknown> | undefined} record of claims
     */
    static grabClaim(claims: string[], classData: AddressData): Record<string, unknown> | undefined;
    /**
     * This class handler to json
     * @return {string} text
     */
    toJsonString(): string;
    /**
     * This class handler to address
     * @return {string} text
     */
    toString(): string;
    /**
    * get document in map format
    * @return { Record<string, unknown>} returns doc map .
    */
    toMap(): Record<string, unknown>;
}
/**
 * AuthenticateKeysData class
*/
export declare class AuthenticateKeysData {
    public: string;
    private: string | undefined;
    /**
     * Change record to AuthenticateKeysData class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {AuthenticateKeysData} this class
     */
    static fromJson(obj: Record<string, unknown>): AuthenticateKeysData;
    /**
     * This class handler to json
     * @return {string} text
     */
    toJsonString(): string;
    /**
     * This class handler to RSA keys
     * @param {string} cipherKey  key
     * @return {string} text
     */
    getPublicKey(cipherKey: string): Buffer | undefined;
    /**
     * This class handler to RSA keys
     * @param {string} cipherKey  key
     * @return {string} text
     */
    getPrivateKey(cipherKey: string): Buffer | undefined;
    toJson(cipherKey: string): {
        public: string;
        private: string;
    } | undefined;
    /**
    * get document in map format
    * @return { Record<string, unknown>} returns doc map .
    */
    toMap(): Record<string, unknown>;
}
