import { isAxiosError } from "axios";
import { CustomError } from "labs-sharable";
import { DefaultResponse } from "../interfaces/documents";

/**
 *  Define a type alias for http calls
 */
export type HttpCallback = () => Promise<DefaultResponseAndStatus>;

export type MessageCallback = (error: {message: string, statusCode?: number}) => Promise<unknown>;

/**
 * Authorization grant request
 */
export interface DefaultResponseAndStatus {
  response: DefaultResponse;
  status: number;
}

const httpClient = async (request: HttpCallback, onError?: MessageCallback):
  Promise<DefaultResponseAndStatus | undefined> => {
  try {
    return await request();
  } catch (error) {
    if (isAxiosError(error)) {
      const response = error.response;
      if (onError) {
        onError({
          message: response?.data ?
            JSON.stringify(response?.data): "Http request errored",
          statusCode: response?.status,
        });
      }
    } else {
      if (onError) {
        onError({
          message: `Unexpected error: ${error}`,
          statusCode: 500,
        });
      }
    }
  }
  return undefined;
}

export default httpClient;