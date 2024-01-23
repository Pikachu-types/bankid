import {plainToInstance, Expose} from "class-transformer";
import { AbstractIPData } from "../superficial/ip";
import { DeviceProfile } from "../../interfaces/documents";

/**
 * HookData
*/
export interface HookData {
  host: string,
  reference: string,
}

/**
 * IdentificationRequest class
*/
export class IdentificationRequest {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/

  /**
   * request iD look like [req_]
   */
  @Expose() id = "";
  /**
   * If flow request was created on behalf of a subtype process like [document signing]
   */
  @Expose() reference: string | undefined;
  /**
   * Bank ID consumer id
   */
  @Expose() consumer = "";
  /**
   * Consumer app id
   */
  @Expose() app = "";
  /**
   * Verification mode [identification or signature]
   */
  @Expose() mode = "";

  /**
   * ActionType [login, signup, confirm, link, sign]
   */
  @Expose() action = "";

  /**
   * Json payload in a string format
   */
  @Expose() payload = "";

  /**
   * Date request was created (timestamp)
   */
  @Expose() iat = 0;

  /**
   * Exact expiration of request (timestamp)
   */
  @Expose() exp = 0;

  /**
   * Timestamp of signature moment
   */
  @Expose() signedAt: number| undefined;

  @Expose() user = "";

  @Expose() type = "";

  /**
   * Ip address
   */
  @Expose() ip = "";
  
  /**
   * User agent
   */
  @Expose() useragent = "";

  @Expose() name = "";

  @Expose() signed = false;

  @Expose() details: Record<string, unknown> | undefined;

  @Expose() signatureIP: AbstractIPData | undefined;

  @Expose() signature: string | undefined;

  @Expose() acquireClaims: string[] = [];

  /**
   * Change record to IdentificationRequest class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {IdentificationRequest} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : IdentificationRequest {
    const result: IdentificationRequest = plainToInstance(
      IdentificationRequest, obj,
      {excludeExtraneousValues: true});
    return result;
  }

  /**
   * Helper class function to find one specific object based on id
   *
   * @param {IdentificationRequest[]} list an array to sort from and find given
   * @param {string} id provide the needed id to match for
   * @return {IdentificationRequest | undefined} found object else undefined
   */
  public static findOne(list: IdentificationRequest[], id: string)
    : IdentificationRequest | undefined {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return;
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

/**
 * Requests class
*/
export class Requests {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/
  @Expose() request = "";
  @Expose() mode = "";
  @Expose() id = "";
  @Expose() reference: string | undefined;
  /**
   * nin or cac numbers
   */
  @Expose() to = "";

  /**
   * This is used to update listeners about signing event
   * has:
   * host: string
   * reference: string
   */
  @Expose() hook: HookData | undefined;
  /**
   * Tells which bankid device picked request first
   */
  @Expose() device: DeviceProfile | undefined;
  /**
   * This tells our servers how to handle the request
   * mobile, web or file
   */
  @Expose() destination = "";
  /**
   *
   */
  @Expose() sourceApp = "";
  @Expose() created = 0;
  @Expose() expires = 0;
  @Expose() signed = false;
  @Expose() cancelled = false;
  /**
   * is on session
   */
  @Expose() onsess = false;

  /**
   * Change record to Requests class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {Requests} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : Requests {
    const result: Requests = plainToInstance(Requests, obj,
      {excludeExtraneousValues: true});

    return result;
  }

  /**
   * Helper class function to find one specific object based on id
   *
   * @param {Requests[]} list an array to sort from and find given
   * @param {string} id provide the needed id to match for
   * @return {Requests | undefined} found object else undefined
   */
  public static findOne(list: Requests[], id: string)
    : Requests | undefined {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return;
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
