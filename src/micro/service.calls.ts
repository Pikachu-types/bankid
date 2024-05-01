import axios from "axios";
import {
  DefaultResponse,
  MessageCallback, eDocSignRequests, httpClient
} from "../modules";
import {
  AuthorizationGrantRequest,
  CancelFlowRequest, PingFlowRequest
} from "./interfaces/flow.interfaces";
import { IdentificationFlowRequest } from "./interfaces/identification.interfaces";
import { SignatureFlowRequest } from "./interfaces/signature.interfaces";
import { UsageRecording } from "./interfaces/billing.interfaces";

/**
 * Helper class to handle all needed api communication between
 * our micro-services and the main backend
 */
export class MicroServiceBackendAxios {
  db: string;
  app: string;
  private readonly authorizationEndpoint = "/authenticate";
  private readonly webIDEndpoint = "/identification/different";
  private readonly mobileIDEndpoint = "/identification/same";
  private readonly mobileSignatureEndpoint = "/signing/same";
  private readonly webSignatureEndpoint = "/signing/different";
  private readonly pingEndpoint = "/flow/ping";
  private readonly cancellationEndpoint = "/flow/cancel";
  private readonly wildcardEndpoint = "/identification/wildcard";
  private readonly documentSigningEndpoint = "/signing/document";
  private readonly useReportEndpoint = "/reporting";

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
   * Grant api authorization to consumer app
   * @param {AuthorizationGrantRequest} request data map of request
   * @param {MessageCallback} onError get feedback on any error logs
   * @param {string} version what api version would you want to interface with
   * @return {Promise<DefaultResponseAndStatus>} returns response.
   */
  public async clientAuthorization(
    request: AuthorizationGrantRequest,
    onError?: MessageCallback,
    version: string = "v1",
  ) {
    return await httpClient(async () => {
      let query = `sub=${request.sub}&app=${request.app}` +
        `&apikey=${request.apikey}&secret=${request.secret}`;
      if (request.token) {
        query = query + `&old=${request.token}`;
      }
      const url = `${this.db.replace("[version]", version)}${this.authorizationEndpoint}/?${query}`;
      const { data, status } = await axios.get<DefaultResponse>(
        url,
        {
          headers: {
            'Accept': 'application/json',
            'x-requested-with': this.app
          }
        }
      );
      return {
        response: data,
        status: status,
      };
    }, onError);
  }

  /**
   * Identification flow db backend caller
   * @param {IdentificationFlowRequest} request data map of request
   * @param {MessageCallback} onError get feedback on any error logs
   * @param {string} version what api version would you want to interface with
   * @return {Promise<DefaultResponseAndStatus>} returns response.
   */
  public async identificationFlow(
    request: IdentificationFlowRequest,
    onError?: MessageCallback,
    version: string = "v1") {
    return await httpClient(async () => {
      const url = `${this.db.replace("[version]", version)}${this.webIDEndpoint}/${version}`;
      const { data, status } = await axios.post<DefaultResponse>(
        url, JSON.parse(JSON.stringify(request)),
        {
          headers: {
            'Accept': 'application/json',
            'x-requested-with': this.app,
            'x-access-token': request.token,
            'x-api-key': request.apikey,
            'x-access-secret': request.secret,
          },
        }
      );
      return {
        response: data,
        status: status,
      };
    }, onError);
  }

  /**
   * Identification flow for same devices db backend caller
   * @param {IdentificationFlowRequest} request data map of request
   * @param {MessageCallback} onError get feedback on any error logs
   * @param {string} version what api version would you want to interface. [note: do not use v1]
   * @return {Promise<DefaultResponseAndStatus>} returns response.
   */
  public async mobIdentificationFlow(
    request: IdentificationFlowRequest,
    onError?: MessageCallback,
    version: string = "v1"
  ) {
    return await httpClient(async () => {
      const url = `${this.db.replace("[version]", version)}${this.mobileIDEndpoint}`;
      const { data, status } = await axios.post<DefaultResponse>(
        url, JSON.parse(JSON.stringify(request)),
        {
          headers: {
            'Accept': 'application/json',
            'x-requested-with': this.app,
            'x-access-token': request.token,
            'x-api-key': request.apikey,
            'x-access-secret': request.secret,
          },
        }
      );
      return {
        response: data,
        status: status,
      };
    }, onError);
  }


  /**
   * Signature flow for same devices db backend caller
   * @param {SignatureFlowRequest} request data map of request
   * @param {MessageCallback} onError get feedback on any error logs
   * @param {string} version what api version would you want to interface. [note: do not use v1]
   * @return {Promise<DefaultResponseAndStatus>} returns response.
   */
  public async mobSignatureFlow(
    request: SignatureFlowRequest,
    onError?: MessageCallback,
    version: string = "v1"
  ) {
    return await httpClient(async () => {
      const url = `${this.db.replace("[version]", version)}${this.mobileSignatureEndpoint}`;
      const { data, status } = await axios.post<DefaultResponse>(
        url, JSON.parse(JSON.stringify(request)),
        {
          headers: {
            'Accept': 'application/json',
            'x-requested-with': this.app,
            'x-access-token': request.token,
            'x-api-key': request.apikey,
            'x-access-secret': request.secret,
          },
        }
      );
      return {
        response: data,
        status: status,
      };
    }, onError);
  }


  /**
   * Cancel a flow db backend caller
   * @param {CancelFlowRequest} request data map of request
   * @param {MessageCallback} onError get feedback on any error logs
   * @param {string} version what api version would you want to interface
   * @return {Promise<DefaultResponseAndStatus>} returns response.
   */
  public async cancelFlow(
    request: CancelFlowRequest,
    onError?: MessageCallback,
    version: string = "v1"
  ) {
    return await httpClient(async () => {
      const url = `${this.db.replace("[version]", version)}${this.cancellationEndpoint}`;
      const { data, status } = await axios.post<DefaultResponse>(
        url, JSON.parse(JSON.stringify(request)),
        {
          headers: {
            'Accept': 'application/json',
            'x-requested-with': this.app,
            'x-access-token': request.token,
          },
        }
      );
      return {
        response: data,
        status: status,
      };
    }, onError);
  }

  /**
   * Ping a flow db backend caller
   * @param {PingFlowRequest} request data map of request
   * @param {MessageCallback} onError get feedback on any error logs
   * @param {string} version what api version would you want to interface.
   * @return {Promise<DefaultResponseAndStatus>} returns response.
   */
  public async pingFlow(
    request: PingFlowRequest,
    onError?: MessageCallback,
    version: string = "v1"
  ) {
    return await httpClient(async () => {
      const url = `${this.db.replace("[version]", version)}${this.pingEndpoint}`;
      const { data, status } = await axios.post<DefaultResponse>(
        url, JSON.parse(JSON.stringify(request)),
        {
          headers: {
            'Accept': 'application/json',
            'x-requested-with': this.app,
            'x-access-token': request.token,
          },
        }
      );
      return {
        response: data,
        status: status,
      };
    }, onError);
  }


  /**
   * Signature flow db backend caller
   * @param {SignatureFlowRequest} request data map of request
   * @param {MessageCallback} onError get feedback on any error logs
   * @param {string} version what api version would you want to interface with
   * @return {Promise<DefaultResponseAndStatus>} returns response.
   */
  public async signatureFlow(
    request: SignatureFlowRequest,
    onError?: MessageCallback,
    version: string = "v1"
  ) {
    return await httpClient(async () => {
      const url = `${this.db.replace("[version]", version)}${this.webSignatureEndpoint}`;
      const { data, status } = await axios.post<DefaultResponse>(
        url, JSON.parse(JSON.stringify(request)),
        {
          headers: {
            'Accept': 'application/json',
            'x-requested-with': this.app,
            'x-access-token': request.token,
          },
        }
      );
      return {
        response: data,
        status: status,
      };
    }, onError);
  }


  /**
   * Wildcard flow db backend caller
   * @param {IdentificationFlowRequest} request data map of request
   * @param {MessageCallback} onError get feedback on any error logs
   * @param {string} version what api version would you want to interface with
   * @return {Promise<DefaultResponseAndStatus>} returns response.
   */
  public async wildCardIdentificationFlow(
    request: IdentificationFlowRequest,
    onError?: MessageCallback,
    version: string = "v1"
  ) {
    return await httpClient(async () => {
      const url = `${this.db.replace("[version]", version)}${this.wildcardEndpoint}`;
      const { data, status } = await axios.post<DefaultResponse>(
        url, JSON.parse(JSON.stringify(request)),
        {
          headers: {
            'Accept': 'application/json',
            'x-requested-with': this.app,
            'x-access-token': request.token,
          },
        }
      );
      return {
        response: data,
        status: status,
      };
    }, onError);
  }

  /**
   * Document signing flow db backend caller
   * @param {eDocSignRequests} request data map of request
   * @param {MessageCallback} onError get feedback on any error logs
   * @param {string} version what api version would you want to interface with
   * @return {Promise<DefaultResponseAndStatus>} returns response.
   */
  public async documentSigningFlow(
    request: eDocSignRequests,
    onError?: MessageCallback,
    version: string = "v1"
  ) {
    return await httpClient(async () => {
      const url = `${this.db.replace("[version]", version)}${this.documentSigningEndpoint}`;
      const { data, status } = await axios.post<DefaultResponse>(
        url, JSON.parse(JSON.stringify(request)),
        {
          headers: {
            'Accept': 'application/json',
            'x-requested-with': this.app,
            'x-access-token': request.token,
          },
        }
      );
      return {
        response: data,
        status: status,
      };
    }, onError);
  }

  /**
   * Document signing flow db backend caller
   * @param {UsageRecording} request data map of request
   * @param {MessageCallback} onError get feedback on any error logs
   * @param {string} version what api version would you want to interface with
   * @return {Promise<DefaultResponseAndStatus>} returns response.
   */
  public async logApiUsage(
    request: UsageRecording,
    onError?: MessageCallback,
    version: string = "v1"
  ) {
    return await httpClient(async () => {
      const url = `${this.db.replace("[version]", version)}${this.useReportEndpoint}`;
      const { data, status } = await axios.post<DefaultResponse>(
        url, JSON.parse(JSON.stringify(request)),
        {
          headers: {
            'Accept': 'application/json',
            'x-requested-with': this.app,
          },
        }
      );
      return {
        response: data,
        status: status,
      };
    }, onError);
  }

}