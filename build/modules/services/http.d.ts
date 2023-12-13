import { PostRequest } from "../interfaces/documents";
/**
 * HTTP client class
 */
export declare class Http {
    /**
   * post request to webhooks endpoints
   * @param {PostRequest} request data map of post
   * @return {Promise<void>} returns response.
   */
    static post(request: PostRequest): Promise<void>;
}
