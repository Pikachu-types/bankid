/**
 * User AbstractIPData class
*/
export declare class AbstractIPData {
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
}
