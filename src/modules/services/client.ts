import { isAxiosError } from "axios";
import { CustomError } from "labs-sharable";
import { DefaultResponse } from "../interfaces/documents";

/**
 *  Define a type alias for http calls
 */
export type HttpCallback = () => Promise<DefaultResponseAndStatus>;

export type MessageCallback = (error: string) => Promise<unknown>;

/**
 * Authorization grant request
 */
export interface DefaultResponseAndStatus {
  response: DefaultResponse;
  status: number;
}

const httpClient = async (request: HttpCallback, onError?: MessageCallback):
  Promise<DefaultResponseAndStatus> => {
  try {
    return await request();
  } catch (error) {
    if (isAxiosError(error)) {
      const response = error.response;
      if (onError) {
        onError(`Axios error of status code: ${error.response?.status} ||` +
          ` Body : ${JSON.stringify(error.response?.data)}`);
      }
      const body = JSON.parse(JSON.stringify(error.response?.data));
      if (response && body.reason) {
        throw new CustomError(
          "", response.status, undefined, body);
      } else {
        throw new CustomError(error.message, error.status ?? 500);
      }
    } else {
      if (onError) {
        onError(`Unexpected error: ${error}`);
      }
      throw new CustomError("An unexpected error occurred", 500);
    }
  }
}

export default httpClient;