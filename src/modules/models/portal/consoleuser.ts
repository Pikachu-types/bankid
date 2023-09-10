import { plainToInstance, Expose } from "class-transformer";

/**
 * ConsoleUser class
*/
export class ConsoleUser {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/

  /**
   * id look like [bcn_{id}]
   */
  @Expose() id = "";
  @Expose() naming: Record<string, unknown> = {};
  @Expose() created: number | undefined;
  @Expose() lut: number | undefined;
  @Expose() sessions: Record<string, unknown>[]| undefined;
  @Expose() security: Record<string, unknown>| undefined;
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
      if (list[i].id === id) return list[i];
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
  * @return { Record<string, unknown>} returns doc map .
  */
  public toMap()
    : Record<string, unknown> {
    const res = JSON.parse(this.toJsonString());
    delete res["sessionList"];
    return res;
  }

  /**
   * create a pretty unique uid for consumers
   * @param {string} token jwt token
   * @param {string} tin tax identification number
   * @return {string} generated uid
   */
  public static createConsumerID(token: string, tin: string): string {
    return ''; // todo
  }
}
