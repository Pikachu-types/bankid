import { plainToInstance, Expose } from "class-transformer";
import { equalToIgnoreCase, unixTimeStampNow } from "labs-sharable";
import { ConsumerHelper } from "../../utils/consumer.helper";

/**
 * Attached to Consumers [apps] once a user links their profile to the app. 
*/
export class UserResource {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/
  @Expose() national = "";
  @Expose() id = "";
  @Expose() region = "";
  /**
   * Last seen
   */
  @Expose() lsn: number | undefined;
  /**
   * Date added
   */
  @Expose() iat: number = 0;

  /**
   * Change record to this class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {UserResource} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : UserResource {
    const result: UserResource = plainToInstance(UserResource, obj,
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

  public static generate(nin: string, region: string): UserResource {
    const resource = new UserResource();

    resource.iat = unixTimeStampNow();
    resource.id = ConsumerHelper.uniqueID();
    resource.national = nin;
    resource.region = region;
    resource.lsn = unixTimeStampNow();

    return resource;
  }

  /**
   * Helper class function to find one specific object based on id
   *
   * @param {UserResource[]} list an array to sort from and find given
   * @param {string} nin provide the needed id to match for
   * @return {UserResource | undefined} found object else undefined
   */
  public static findOne(list: UserResource[], nin: string)
    : UserResource | undefined {
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
