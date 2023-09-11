import { plainToInstance, Expose } from "class-transformer";
import { v4 as uuidv4 } from 'uuid';
import { DocumentTypes } from "../../enums/enums";
import { AbstractIPData } from "../superficial/ip";
/**
 * SessionData class
*/
export class SessionData {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/

  @Expose() id = "";
  @Expose() date: number = 0;
  @Expose() exp: number = 0;
  @Expose() ip: Record<string, unknown> | undefined;

  ipData: AbstractIPData | undefined;

  /**
   * Change record to SessionData class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {SessionData} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : SessionData {
    const result: SessionData = plainToInstance(SessionData, obj,
      { excludeExtraneousValues: true });
    result.resolveMaps();
    return result;
  }

  /**
  * resolve maps for certain attributes
  * @return {void} text
  */
  public resolveMaps(): void {
    if(this.ip) this.ipData = AbstractIPData.fromJson(this.ip);
  }

  /**
   * Helper class function to find one specific object based on id
   *
   * @param {SessionData[]} list an array to sort from and find given
   * @param {string} id provide the needed id to match for
   * @return {SessionData | undefined} found object else undefined
   */
  public static findOne(list: SessionData[], id: string)
    : SessionData | undefined {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return;
  }

  /**
   * un-resolve maps for certain attributes
   * @return {void} nothing
   */
  public unResolveMaps(): void {
    if (this.ipData) this.ip = this.ipData.toMap();
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
    const res = JSON.parse(this.toJsonString());
    delete res["ipData"];
    return res;
  }

  /**
   * create a pretty unique uid for consumers
   * @return {string} generated uid
   */
  public static createID(): string {
    return `${DocumentTypes.session}${uuidv4()}`;
  }
}
