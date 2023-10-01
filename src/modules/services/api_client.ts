import axios, { isAxiosError } from "axios";
import { AbstractIPAdData, AbstractIPData } from "../models/superficial/ip";
import { CustomError } from "labs-sharable";
import { BankID } from "../models/bankid";

/**
 * Api client helper
 */
export class ExternalApiClient {
  /**
    * Checkup IP
    * @param {string} apiKey abstractApi key
    * @param {string} ipAddress ip address to look for
    * @return {Promise<AbstractIPAdData>} returns response.
    */
  public static async oldIpChecker(apiKey: string, ipAddress: string)
    : Promise<AbstractIPAdData> {
    try {
      const { data, status } = await axios.get<Record<string, unknown>>(
        BankID.Links.ipChecker + "?api_key="
        + apiKey + "&ip_address=" + ipAddress,
        {
          headers: {
            Accept: 'application/json',
          }
        }
      );

      console.log(JSON.stringify(data, null, 4));

      if (status == 200) {
        return AbstractIPAdData.fromJson(data);
      } else {
        throw new CustomError(JSON.stringify(data), status);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log("error message: ", error.message);
        const response = error.response;
        if (response) {
          throw new CustomError("", response.status, response.data);
        } else {
          throw new CustomError(error.message, error.status ?? 500);
        }
      } else {
        throw new CustomError("An unexpected error occurred", 500);
      }
    }

  }
  
  /**
    * Checkup IP
    * @param {string} apiKey abstractApi key
    * @param {string} ipAddress ip address to look for
    * @param {boolean} debug toggle if use apikey
    * @return {Promise<AbstractIPData>} returns response.
    */
  public static async ipChecker(apiKey: string, ipAddress: string, debug = false)
    : Promise<AbstractIPData> {
    try {
      const { data, status } = await axios.get<Record<string, unknown>>(
        `${BankID.Links.ipChecker}/${ipAddress}/json/${debug ? '' : `?key=${apiKey}`}`,
        {
          headers: {
            Accept: 'application/json',
          }
        }
      );

      console.log(JSON.stringify(data, null, 4));

      if (status == 200) {
        return AbstractIPData.fromJson(data);
      } else {
        throw new CustomError(JSON.stringify(data), status);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log("error message: ", error.message);
        const response = error.response;
        if (response) {
          throw new CustomError("", response.status, response.data);
        } else {
          throw new CustomError(error.message, error.status ?? 500);
        }
      } else {
        throw new CustomError("An unexpected error occurred", 500);
      }
    }

  }
}