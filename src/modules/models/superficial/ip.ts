import { plainToInstance, Expose } from "class-transformer";

/**
 * User AbstractIPData class
*/
export class AbstractIPData {
    /* eslint new-cap: ["error", { "capIsNew": false }]*/

    @Expose() ip_address = "";
    @Expose() city = "";
    @Expose() city_geoname_id = 0;
    @Expose() postcode: string | undefined;
    @Expose() region = "";
    @Expose() region_iso_code = "";
    @Expose() continent = "";
    @Expose() country_is_eu = false;
    @Expose() continent_code = "";
    @Expose() country_code = "";
    @Expose() country = "";
    @Expose() latitude = 0;
    @Expose() longitude = 0;
    @Expose() flag: Record<string, unknown> = {};
    @Expose() security: Record<string, unknown> = {};
    @Expose() timezone: Record<string, unknown> = {};
    @Expose() connection: Record<string, unknown> = {};
    @Expose() continent_geoname_id = 0;
    @Expose() country_geoname_id = 0;
    @Expose() region_geoname_id = 0;

    /**
     * Change record to AbstractIPData class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {AbstractIPData} this class
     */
    public static fromJson(obj: Record<string, unknown>)
        : AbstractIPData {
        const result: AbstractIPData = plainToInstance(AbstractIPData, obj,
            { excludeExtraneousValues: true });

        return result;
    }

    /**
     * This class handler to json
     * @return {string} text
     */
    public toJsonString(): string {
        return JSON.stringify(this, null, 4);
    }

    /**
    * get document in map format
    * @return { Record<string, unknown>} returns doc map .
    */
    public toMap()
        : Record<string, unknown> {
        return JSON.parse(this.toJsonString());
    }
}