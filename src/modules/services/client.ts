import axios, { AxiosResponse, isAxiosError } from "axios";
import { DefaultResponse } from "../interfaces/documents";
import { SeverError } from "../utils/server.error";

type HTTP_METHOD = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';


/**
 *  Define a type alias for http calls
 */
export type HttpCallback = () => Promise<DefaultResponseAndStatus>;

export type HttpVastCallback<T> = () => Promise<T>;

export type MessageCallback = (error: {message: string, statusCode?: number}) => Promise<unknown>;

/**
 * Authorization grant request
 */
export interface DefaultResponseAndStatus {
  response: DefaultResponse;
  status: number;
}

export const httpClient = async (request: HttpCallback, onError?: MessageCallback):
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

export const httpVastClient = async <T>(request: HttpVastCallback<T>,
  onError?: MessageCallback) => {
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

export async function apiRequest<T>(
  method: HTTP_METHOD,
  url: string,
  param: Request
): Promise<{ data: T, statusCode: number }> {
  const axiosOptions = {
    headers: param.headers
      ? JSON.parse(JSON.stringify(param.headers))
      : { 'Accept': 'application/json' },
    ...((method === 'POST' || method === 'PUT' || method === 'PATCH') && { data: param.body }),
  };
  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url,
      ...axiosOptions,
    });
    // console.log(`Response returned - - ${response.data}`);
    return { data: response.data, statusCode: response.status };
  } catch (error) {
    // Check if the error is an Axios error
    if (axios.isAxiosError(error)) {
      // console.log(`Axios error - - ${JSON.stringify((error as AxiosError).response?.data)}`);
      const statusCode = error.response?.status ?? 500;
      const errorMessage = error.response?.data?.reason || error.message;
      throw new SeverError({
        reason: errorMessage,
        status: error.response?.data?.status ?? 'failed',
        code: statusCode,
        type: error.response?.data?.type ??  'api_error',
      }, statusCode);
    }

    // If the error is not Axios-specific, handle it as a generic unknown error
    throw SeverError.handleError(error);
  }
}

type Request = {
  body?: Record<string, unknown>,
  headers?: Record<string, unknown>,
}