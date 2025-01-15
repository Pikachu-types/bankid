import {
  DefaultResponse,
  apiRequest, eDocSignRequests,
  parseInterface
} from "../modules";
import {
  AuthorizationGrantRequest,
  CancelFlowRequest, PingFlowRequest
} from "./interfaces/flow.interfaces";
import { IdentificationFlowRequest } from "./interfaces/identification.interfaces";
import { SignatureFlowRequest, WildcardSignatureFlowRequest } from "./interfaces/signature.interfaces";
import { UsageRecording } from "./interfaces/billing.interfaces";


const endpoints = {
  identification: {
    same: "/identification/same",
    different: "/identification/different",
    wildcard: "/identification/wildcard"
  },
  signature: {
    same: "/signing/same",
    different: "/signing/different",
    wildcard: "/signing/wildcard",
    doc: "/signing/document",
    interface: "/signing/document-interface",
  },
  flow: {
    authorize: "/authenticate",
    cancel: "/flow/cancel",
    ping: "/flow/ping",
  },
  logic: {
    usage: "/reporting",
    billing: "/billing/validate"
  }
}

/**
 * Helper class to handle all needed api communication between
 * our micro-services and the main backend
 */
export class MicroServiceBackendAxios {
  db: string;
  app: string;
  

  /**
   * Class main constructor
   * @param {string} dbURI initialize with dbURI
   * @param {string} appkey microservice identifier
   */
  constructor(dbURI: string, appkey: string) {
    this.db = dbURI;
    this.app = appkey;
  }

/**
 * Builds a request to the backend
 * @param {string} url 
 * @param {Record<string, string>} headers 
 * @param {Record<string, unknown>} body
 * @param {string} method
 * @returns {Promise<AxiosResponse<any, any>>}
 */
  private async requestBuilder({ url, headers, body, method, version }: {
    url: string,
    headers?: Record<string, string>,
    body?: Record<string, unknown>,
    method?: "POST" | "GET",
    version: string
  }) {
    return await apiRequest<DefaultResponse>(method ?? 'POST',
      `${this.db.replace("[version]", version)}${url}`, {
    headers,
    body
  });
}

  public async authorization(
    request: AuthorizationGrantRequest,
    version: string = "v1",
  ) {
    let query = `sub=${request.sub}&app=${request.app}` +
      `&apikey=${request.apikey}&secret=${request.secret}`;
    if (request.token) {
      query = query + `&old=${request.token}`;
    }
    return await this.requestBuilder({
      url: endpoints.flow.authorize + `/?${query}`,
      version: version,
      headers: {
        'Accept': 'application/json',
        'x-requested-with': this.app
      },
      method: "GET",
    });
  }

  public async identification(
    request: IdentificationFlowRequest,
    mode: "same" | "wildcard" | "different",
    version: string = "v1",
  ) {
    return await this.requestBuilder({
      url: endpoints.identification[mode],
      version: version,
      headers: {
        'Accept': 'application/json',
        'x-requested-with': this.app,
        'x-access-token': request.token ?? '',
        'x-api-key': request.apikey ?? '',
        'x-access-secret': request.secret ?? '',
      },
      method: "POST",
      body: parseInterface(request)
    });
  }

  public async flow(
    request: PingFlowRequest | CancelFlowRequest,
    mode: "cancel" | "ping",
    version: string = "v1",
  ) {
    return await this.requestBuilder({
      url: endpoints.flow[mode],
      version: version,
      headers: {
        'Accept': 'application/json',
        'x-requested-with': this.app,
        'x-access-token': request.token ?? '',
        'x-api-key': request.apikey ?? '',
        'x-access-secret': request.secret ?? '',
      },
      method: "POST",
      body: parseInterface(request)
    });
  }

  /**
   * PS - Wildcard signature does not have a v1
   * @param request 
   * @param mode 
   * @param version 
   * @returns 
   */
  public async signature(
    request: SignatureFlowRequest | eDocSignRequests | WildcardSignatureFlowRequest,
    mode: "same" | "wildcard" | "different" | "doc" | "interface",
    version: string = "v1",
  ) {
    return await this.requestBuilder({
      url: endpoints.signature[mode],
      version: version,
      headers: {
        'Accept': 'application/json',
        'x-requested-with': this.app,
        'x-access-token': request.token ?? '',
        'x-api-key': request.apikey ?? '',
        'x-access-secret': request.secret ?? '',
      },
      method: "POST",
      body: parseInterface(request)
    });
  }

  public async logic(
    request: UsageRecording | {apikey: string, type: "authentication" | "signature"},
    mode: "usage" | "billing",
  ) {
    return await this.requestBuilder({
      url: endpoints.logic[mode],
      version: "v2",
      headers: {
        'Accept': 'application/json',
        'x-requested-with': this.app,
      },
      method: "POST",
      body: parseInterface(request)
    });
  }

}