import { plainToInstance, Expose } from "class-transformer";
import { equalToIgnoreCase, unixTimeStampNow } from "labs-sharable";
import { ConsumerHelper } from "../../utils/consumer.helper";

/**
 * Attached to consumers once a user interfaces with any of its apps. 
*/
export class EIDUserResource {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/
  @Expose() national = "";
  @Expose() id = "";
  @Expose() region = "";
  /**
   * Last seen
   */
  @Expose() lsn: number = 0;

  @Expose() blocked: boolean | undefined;
  /**
   * Date added
   */
  @Expose() iat: number = 0;
  /**
   * ID of consumer apps this user has interfaced with
   */
  @Expose() apps: string[] = [];

  /**
   * Change record to this class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {EIDUserResource} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : EIDUserResource {
    const result: EIDUserResource = plainToInstance(EIDUserResource, obj,
      { excludeExtraneousValues: true });
    return result;
  }

  /**
   * This class handler to json
   * @return {string} text
   */
  public toJsonString(): string {
    return JSON.stringify(this);
  }

  public static generate(nin: string, region: string): EIDUserResource {
    const resource = new EIDUserResource();

    resource.iat = unixTimeStampNow();
    resource.id = ConsumerHelper.uniqueID();
    resource.national = nin;
    resource.region = region;
    resource.lsn = unixTimeStampNow();

    return resource;
  }


  public static getMonthlyActiveUsers(users: EIDUserResource[]): number {
    const currentTime = Date.now() / 1000; // Current time in seconds (UNIX timestamp)
    const thirtyDaysInSeconds = 30 * 24 * 60 * 60; // 30 days in seconds

    // Filter users where last seen (`lsn`) is within the last 30 days
    const activeUsers = users.filter(user => (currentTime - (user.lsn)) <= thirtyDaysInSeconds);

    return activeUsers.length;
  }

  /**
   * Helper class function to find one specific object based on id
   *
   * @param {EIDUserResource[]} list an array to sort from and find given
   * @param {string} nin provide the needed id to match for
   * @return {EIDUserResource | undefined} found object else undefined
   */
  public static findOne(list: EIDUserResource[], nin: string)
    : EIDUserResource | undefined {
    for (let i = 0; i < list.length; i++) {
      if (equalToIgnoreCase(list[i].national, nin)) return list[i];
    }
    return;
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
