import {plainToInstance, Expose} from "class-transformer";

/**
 * AuthenticationResponse class
*/
export class AuthenticationResponse {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/

  /**
   * request iD
   */
  @Expose() reference = "";
  /**
   * consumer id
   */
  @Expose() requester = "";

  /**
   * registered bankid user
   */
  @Expose() requestee = "";
  /**
   * Verification mode [identification or signature]
   */
  @Expose() mode = "";

  /**
   * signed data in a string format
   */
  @Expose() data = "";
  /**
   * request cancelled
   */
  @Expose() cancelled = false;
  /**
   * on session
   */
  @Expose() onsession = false;

  /**
   * Date request was created (timestamp)
   */
  @Expose() iat = 0;

  /**
   * Timestamp of signature moment
   */
  @Expose() signedAt: number | undefined;


  @Expose() signature: string | undefined;

  /**
   * Supported claims requested for
   */
  @Expose() claims: Record<string, unknown> = {};

  /**
   * Change record to AuthenticationResponse class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {AuthenticationResponse} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : AuthenticationResponse {
    const result: AuthenticationResponse = plainToInstance(
      AuthenticationResponse, obj,
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
