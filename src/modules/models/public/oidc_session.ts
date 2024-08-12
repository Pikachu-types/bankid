import { plainToInstance, Expose } from "class-transformer";
import { equalToIgnoreCase } from "labs-sharable";
import { DocumentTypes } from "../../enums/enums";

/**
 * Get a pasby nin invitation request
*/
export class OIDCSession {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/
  @Expose() id = "";
  @Expose() challenge = "";
  @Expose() exp: number = 0;
  @Expose() iat: number = 0;
  /**
   * national id
   */
  @Expose() sub = "";
  /**
   * consumer
   */
  @Expose() consumer = "";

  @Expose() claims: string[] = [];

  /**
   * Change record to this class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {OIDCSession} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : OIDCSession {
    const result: OIDCSession = plainToInstance(OIDCSession, obj,
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
  
  /**
   * class handler
   */
  public generateID(token: string): void {
    if (this.id.length > 1) return;
    this.id = `${DocumentTypes.oidc}${token}`;
  }

  /**
   * Helper class function to find one specific object based on id
   *
   * @param {OIDCSession[]} list an array to sort from and find given
   * @param {string} id provide the needed id to match for
   * @return {OIDCSession | undefined} found object else undefined
   */
  public static findOne(list: OIDCSession[], id: string)
    : OIDCSession | undefined {
    for (let i = 0; i < list.length; i++) {
      if (equalToIgnoreCase(list[i].id, id)) return list[i];
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
