import {plainToInstance, Expose} from "class-transformer";

/**
 * User BioData class
*/
export class BioData {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/

  @Expose() birthdate = "";
  @Expose() photo = "";

  /**
  * Birth number is saved as a timestamp
  */
  @Expose() birthnumber = 0;
  /**
   * Local government area
   */
  @Expose() birthplace = "";
  /**
   * State of origin
   */
  @Expose() birthstate = "";
  @Expose() dateOfDeath: number | undefined;
  @Expose() maritalStatus = "";
  @Expose() gender = "";
  /**
   * Change record to BioData class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {BioData} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : BioData {
    const result: BioData = plainToInstance(BioData, obj,
      {excludeExtraneousValues: true});

    return result;
  }

  /**
   * Get specific claims and return them as a record
   * @param {string[]} claims supported claims
   * @param {BioData} classData this class
   * @return {Record<string, unknown>} record of claims
   */
  public static grabClaim(claims: string[], classData:BioData)
    : Record<string, unknown> | undefined {
    const data: Record<string, unknown> = {};
    const json = classData.toMap();
    for (let i = 0; i < claims.length; i++) {
      try {
        const value = json[claims[i]];
        if (value === undefined) continue;
        data[`${claims[i]}`] = value;
      } catch (_) {
        // invalid key
      }
    }
    return Object.keys(data).length === 0 ? undefined : data;
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
