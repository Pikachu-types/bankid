/**
 * StandaloneBankID class
*/
export declare class StandaloneBankID {
    /**
     * id format ["std_{nin}-{generated 6 length alpha numeric string id}"]
     */
    id: string;
    vendor: string;
    validTo: number | undefined;
    created: number;
    dateActivated: number | undefined;
    dateDisabled: number | undefined;
    /**
     * last updated time
     */
    lut: number;
    deviceInfo: Record<string, unknown> | undefined;
    test: boolean;
    activated: boolean;
    disabled: boolean;
    /**
     * Change record to StandaloneBankID class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {StandaloneBankID} this class
     */
    static fromJson(obj: Record<string, unknown>): StandaloneBankID;
    /**
     * Helper class function to find one specific id
     *
     * @param {StandaloneBankID[]} list an array of bankids to
     *  sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {StandaloneBankID | undefined} found object else undefined
     */
    static findOne(list: StandaloneBankID[], id: string): StandaloneBankID | undefined;
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
 * DeviceInfoData class
*/
export declare class DeviceInfoData {
    /**
     * id format ["std_{nin}-{generated 6 length alpha numeric string id}"]
     */
    model: string;
    deviceID: string;
    platform: string;
    serialNumber: number | undefined;
    /**
     * Change record to DeviceInfoData class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {DeviceInfoData} this class
     */
    static fromJson(obj: Record<string, unknown>): DeviceInfoData;
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
