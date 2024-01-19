import {plainToInstance, Expose} from "class-transformer";

/**
 * Buka TwiloData class
*/
export class TwiloData {
    /* eslint new-cap: ["error", { "capIsNew": false }]*/
    @Expose() to = "";
    @Expose() dateCreated = "";
    @Expose() sid = "";
    @Expose() errorCode = "";
    @Expose() from = "";
    @Expose() messagingServiceSid = "";
    @Expose() dateSent = "";
    @Expose() status = "";
    @Expose() price = 0;

    /**
     * Change record to TwiloData class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {TwiloData} this class
     */
    public static fromJson(obj: Record<string, unknown>)
        : TwiloData {
      const result: TwiloData = plainToInstance(TwiloData, obj,
          {excludeExtraneousValues: true});
      return result;
    }

    /**
     * This class handler to json
     * @return {string} text
     */
    public toJsonString(): string {
      return JSON.stringify(this);
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
