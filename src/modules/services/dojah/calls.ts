import axios, { isAxiosError } from "axios";
import { ApiReference } from "../../interfaces/documents";
import { DojahBVNResponse, DojahNINResponse } from "./responses";
import { SeverError } from "../../utils/server.error";

export class DojahIdentityCheck {
  private static baseURl = "https://api.dojah.io";

  /**
    * BVN check
    * @param {ApiReference} keys api keys
    * @param {string} bvn bvn identifier
    * @return {Promise<DojahBVNResponse>} returns response.
    */
  public static async bvn(keys: ApiReference, bvn: string)
    : Promise<DojahBVNResponse> {
    try {
      const { data, status } = await axios.get<Record<string, unknown>>(
        `${this.baseURl}/api/v1/kyc/bvn/advance?bvn=${bvn}`,
        {
          headers: {
            Accept: 'application/json',
            AppId: keys.app,
            Authorization: keys.private
          }
        }
      );
      if (status == 200) {
        const entity = data['entity'];
        return entity as DojahBVNResponse;
      } else {
        throw new SeverError(JSON.stringify(data), status);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log("BVN extract error message: ", error.message);
        const response = error.response;
        if (response && (response.data['error'] as string).includes('not found')) {
          throw new SeverError("BVN not found", 404);
        }else if (response) {
          throw new SeverError({
            body: response.data,
            reason: "Axios unknown error caught",
            status: 'failed'
          }, response.status);
        } else {
          throw new SeverError(error.message, error.status ?? 500);
        }
      } else {
        throw new SeverError("Critical ID extract error", 500);
      }
    }
  }

  /**
    * NIN check
    * @param {ApiReference} keys api keys
    * @param {string} nin nin identifier
    * @return {Promise<DojahNINResponse>} returns response.
    */
  public static async nin(keys: ApiReference, nin: string)
    : Promise<DojahNINResponse> {
    try {
      const { data, status } = await axios.get<Record<string, unknown>>(
        `${this.baseURl}/api/v1/kyc/nin?nin=${nin}`,
        {
          headers: {
            Accept: 'application/json',
            AppId: keys.app,
            Authorization: keys.private
          }
        }
      );

      if (status == 200) {
        const entity = data['entity'];
        return entity as DojahNINResponse;
      } else {
        throw new SeverError(JSON.stringify(data), status);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log("NIN extract error message: ", error.message);
        const response = error.response;
        if (response && (response.data['error'] as string).includes('not found')) {
          throw new SeverError("NIN not found");
        } else if (response) {
          throw new SeverError({
            body: response.data,
            reason: "Axios unknown error caught",
            status: 'failed'
          }, response.status);
        } else {
          throw new SeverError(error.message, error.status ?? 500);
        }
      } else {
        throw new SeverError("Critical ID extract error", 500);
      }
    }
  }

}