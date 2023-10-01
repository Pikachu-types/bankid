/**
 * User AbstractIPData class
*/
export declare class AbstractIPData {
    ip: string;
    city: string;
    version: string;
    postal: string;
    region: string;
    region_code: string;
    continent: string;
    in_eu: boolean;
    continent_code: string;
    country_code: string;
    country_code_ios3: string;
    currency: string;
    currency_name: string;
    asn: string;
    country_calling_code: string;
    country: string;
    country_tld: string;
    hostname: string;
    languages: string;
    org: string;
    latitude: number;
    longitude: number;
    timezone: string;
    /**
     * Change record to AbstractIPData class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {AbstractIPData} this class
     */
    static fromJson(obj: Record<string, unknown>): AbstractIPData;
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
} /**
 * User AbstractIPData class
*/
export declare class AbstractIPAdData {
    ip_address: string;
    city: string;
    city_geoname_id: number;
    postcode: string | undefined;
    region: string;
    region_iso_code: string;
    continent: string;
    country_is_eu: boolean;
    continent_code: string;
    country_code: string;
    country: string;
    latitude: number;
    longitude: number;
    flag: Record<string, unknown>;
    security: Record<string, unknown>;
    timezone: Record<string, unknown>;
    connection: Record<string, unknown>;
    continent_geoname_id: number;
    country_geoname_id: number;
    region_geoname_id: number;
    /**
     * Change record to AbstractIPAdData class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {AbstractIPAdData} this class
     */
    static fromJson(obj: Record<string, unknown>): AbstractIPAdData;
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
