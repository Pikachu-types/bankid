import { plainToInstance, Expose } from "class-transformer";
import { v4 as uuidv4 } from 'uuid';
import { DocumentTypes } from "../../enums/enums";
import { ConsoleAccountSecurity } from "../../interfaces/documents";
import { ConsoleRegAccountRequest } from "../../interfaces/requests";
import { unixTimeStampNow } from "labs-sharable";
import { UserRoles } from "../../enums/shared";
/**
 * ConsoleUser class
*/
export class ConsoleUser {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/

  /**
   * id look like [cnu_{id}]
   */
  @Expose() id = "";
  @Expose() email = "";
  @Expose() legalAccepted = false;
  @Expose() campaigns = false;
  @Expose() naming?: {
    first: string;
    last: string;
  };
  @Expose() created: number = 0;
  @Expose() lut: number = 0;
  @Expose() security: ConsoleAccountSecurity | undefined;
  @Expose() organizations: string[] = [];


  /**
   * Change record to ConsoleUser class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {ConsoleUser} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : ConsoleUser {
    const result: ConsoleUser = plainToInstance(ConsoleUser, obj,
      { excludeExtraneousValues: true });
    result.resolveMaps();
    return result;
  }

  /**
  * resolve maps for certain attributes
  * @return {void} text
  */
  public resolveMaps(): void {
    // this.contactData = ContactData.fromJson(this.contact);
  }

  /**
   * Helper class function to find one specific object based on id
   *
   * @param {ConsoleUser[]} list an array to sort from and find given
   * @param {string} id provide the needed id to match for
   * @return {ConsoleUser | undefined} found object else undefined
   */
  public static findOne(list: ConsoleUser[], id: string)
    : ConsoleUser | undefined {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id || list[i].email === id) return list[i];
    }
    return;
  }

  /**
   * Helper class function to find one specific object based on eid
   *
   * @param {ConsoleUser[]} list an array to sort from and find given
   * @param {string} eid provide the needed id to match for
   * @return {ConsoleUser | undefined} found object else undefined
   */
  public static findEID(list: ConsoleUser[], eid: string)
    : ConsoleUser | undefined {
    for (let i = 0; i < list.length; i++) {
      if (list[i].security && list[i].security?.nin === eid) return list[i];
    }
    return;
  }

  /**
   * un-resolve maps for certain attributes
   * @return {void} nothing
   */
  public unResolveMaps(): void {
    // if (this.contactData) this.contact = this.contactData.toMap();
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
  * @param {string[]} paths add attributes you'd like to omit from the map
  * @return { Record<string, unknown>} returns doc map .
  */
  public toMap(paths?: string[])
    : Record<string, unknown> {
    const res = JSON.parse(this.toJsonString());
    if (paths) {
      for (let i = 0; i < paths.length; i++) {
        delete res[paths[i]];
      }
    }
    return res;
  }

  /**
   * create a pretty unique uid for consumers
   * @return {string} generated uid
   */
  public static createID(): string {
    return `${DocumentTypes.consoleuser}${uuidv4()}`;
  }

  public static create(data: ConsoleRegAccountRequest): ConsoleUser {
    const user = new ConsoleUser();
    user.id = ConsoleUser.createID();
    user.naming = data.naming;
    user.email = data.email ?? '';
    user.legalAccepted = data.legalAccepted;
    user.created = unixTimeStampNow();
    user.lut = unixTimeStampNow();
    user.security = {
      tFA: false,
      generated: false,
      provider: "",
    };
    user.organizations = [];
    return user;
  }
}

/**
 * Consumer user doc model
 */
export interface ConsumerUserReference {
  email: string;
  role: UserRoles;
  name: string;
  id: string;
  tFA: boolean;
};