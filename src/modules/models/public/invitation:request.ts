import { plainToInstance, Expose } from "class-transformer";
import { randomUUID } from "crypto";
import { equalToIgnoreCase, unixTimeStampNow } from "labs-sharable";
import { DocumentTypes } from "../../enums/enums";
import { ConsumerHelper } from "../../utils/consumer.helper";

/**
 * Get a pasby nin invitation request
*/
export class InvitationRequest {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/
  @Expose() nin = "";
  @Expose() name = "";
  @Expose() id = "";
  @Expose() admin = ""; // bid_ of admin
  @Expose() iat = 0;
  @Expose() exp = 0;
  @Expose() used = false;

  /**
   * Change record to this class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {InvitationRequest} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : InvitationRequest {
    const result: InvitationRequest = plainToInstance(InvitationRequest, obj,
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
   * Helper class function to find one specific object based on id
   *
   * @param {InvitationRequest[]} list an array to sort from and find given
   * @param {string} id provide the needed id to match for
   * @return {InvitationRequest | undefined} found object else undefined
   */
  public static findOne(list: InvitationRequest[], id: string)
    : InvitationRequest | undefined {
    for (let i = 0; i < list.length; i++) {
      if (equalToIgnoreCase(list[i].id, id)) return list[i];
    }
    return;
  }

  /**
   * Helper class function to create invitation
   *
   * @param {string} nin identity to invite
   * @param {string} admin admin identity who created invite
   * @param {string} name naming info
   * @return {InvitationRequest} created
   */
  public static create(nin: string, admin: string, name: string)
    : InvitationRequest {
    const res = new InvitationRequest();
    res.iat = unixTimeStampNow();
    res.admin = admin;
    res.nin = nin;
    res.name = name;
    res.id = `${DocumentTypes.invitation}${randomUUID()}`;
    res.exp = ConsumerHelper.expiration(30);

    return res;
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
