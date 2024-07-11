import { plainToInstance, Expose } from "class-transformer";
import { VendorModel } from "./vendors";
import { CustomError } from "labs-sharable";

export interface IReleaseInformation {
  place: string;
  ip: string;
}

export interface IPassRecentHistory {
  /**
   * Last time used in unixtimestamp
   */
  lu: number;
  ip: string;
}

export interface IDeviceForPass {
  platform: string;
  model: string;
  identifier: string;
}

interface ManagePassResponse {
  device: IDeviceForPass;
  issuer: string;
  activity?: IPassRecentHistory;
  release?: IReleaseInformation;
  id: string;
  pass: {
    iat: number,
    exp: number
  }
}

/**
 * StandaloneBankID class
*/
export class StandaloneBankID {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/
  /**
   * id format ["std_{nin}-{generated 6 length alpha numeric string id}"]
   */
  @Expose() id = "";
  @Expose() vendor = "";
  @Expose() validTo: number | undefined;
  @Expose() created = 0;         
  @Expose() dateActivated: number | undefined;
  @Expose() dateDisabled: number | undefined;
  /**
   * Where did the deactivation occur from
   */
  @Expose() deactivationIP: string | undefined;
  /**
   * last updated time
   */
  @Expose() lut = 0;
  @Expose() deviceInfo: Record<string, unknown> | undefined;
  @Expose() activity: IPassRecentHistory | undefined;
  @Expose() release: IReleaseInformation | undefined;
  @Expose() test = false;
  @Expose() activated = false;
  @Expose() disabled = false;

  /**
   * Change record to StandaloneBankID class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {StandaloneBankID} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : StandaloneBankID {
    const result: StandaloneBankID = plainToInstance(StandaloneBankID, obj,
      { excludeExtraneousValues: true });
    return result;
  }

  /**
   * Helper class function to find one specific id
   *
   * @param {StandaloneBankID[]} list an array of bankids to
   *  sort from and find given
   * @param {string} id provide the needed id to match for
   * @return {StandaloneBankID | undefined} found object else undefined
   */
  public static findOne(list: StandaloneBankID[], id: string)
    : StandaloneBankID | undefined {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return;
  }

  /**
   * This affects cu.pasby.africa
   * @param {VendorModel[]} vendors recognised vendors
   * @returns {ManagePassResponse}
   */
  public manageObject(vendors: VendorModel[]): ManagePassResponse {
    if (!this.activated || this.disabled) throw new CustomError("This pass is no longer valid");
    const id = this.id.split("-")[1];
    const device = DeviceInfoData.fromJson(this.deviceInfo ?? {});
    return {
      id: id,
      activity: this.activity,
      release: this.release,
      device: {
        platform: device.platform,
        identifier: device.deviceID,
        model: device.model
      },
      pass: {
        iat: this.created,
        exp: this.validTo ?? 0
      },
      issuer: VendorModel.findOne(vendors, this.vendor)?.name ?? ''
    };
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
 * DeviceInfoData class
*/
export class DeviceInfoData {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/
  /**
   * id format ["std_{nin}-{generated 6 length alpha numeric string id}"]
   */
  @Expose() model = "";
  @Expose() deviceID = "";
  @Expose() platform = "";
  @Expose() serialNumber: number | undefined;

  /**
   * Change record to DeviceInfoData class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {DeviceInfoData} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : DeviceInfoData {
    const result: DeviceInfoData = plainToInstance(DeviceInfoData, obj,
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
  * get document in map format
  * @return { Record<string, unknown>} returns doc map .
  */
  public toMap()
    : Record<string, unknown> {
    return JSON.parse(this.toJsonString());
  }
}
