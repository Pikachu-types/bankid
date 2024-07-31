import { LabsCipher, CustomError, convertDateToUnix } from "labs-sharable";
import { AuthToken, RequestSignature } from "../interfaces/documents";
import {
  ActionType, ClientApp, DocumentTypes,
  IDRequest, RequestMode, Requests, SeverError, Signing
} from "..";
import { DatabaseFunctions } from "../../services";
import { JsonWebTokenError } from "jsonwebtoken";

export class ConsumerHelper {
  /**
   * Validate auth token
   * @param {string} token jwt created token
   * @param {string} jwt jwt encryption key
   * @return {AuthToken} return token value
   */
  public static async validateTokenAlone(token: string, jwt: string)
    : Promise<AuthToken> {
    let decode: AuthToken | undefined;
    try {
      decode = LabsCipher.jwtDecode(
        token, jwt) as AuthToken;
    } catch (error) {
      const code = error instanceof CustomError ? error.getCode() : 500;
      throw new SeverError(code == 401 ? 'authorization is expired' :
        'there is an obvious token mismatch', code);
    }
    return decode;
  }


  /**
   * Validate request
   * @param {SignatureRequest} req signature request
   * @return {void} function
   */
  public static validateSignatureRequest(req: Signing)
    : void {
    if (req.mode !== RequestMode.Signature) {
      throw new SeverError("Forbidden request: This is a signature request endpoint", 403);
    }
    if (req.webhook === undefined && req.action === ActionType.sign) {
      throw new SeverError("Requester needs to provide a web-hook map for us to handle such request", 428);
    }
  }


  /**
   * Validate request
   * @param {IDRequest} req identification request
   * @return {void} function
   */
  public static validateIDRequest(req: IDRequest)
    : void {
    if (req.claims === undefined) {
      throw new SeverError("Requester needs to state identification claims", 428);
    }
    if (req.mode !== RequestMode.Identification) {
      throw new SeverError("Forbidden request: Mode mismatch", 403);
    }
  }

  /**
   * Validate request and return request
   * @param {string} id request id
   * @param {Record<string, unknown>} params arguments
   * @return {Promise<Requests>} returns request if okay
   */
  public static async validateRequest(id: string, params: {
    db: DatabaseFunctions.Getters,
    app?: AuthToken,
    admin?: boolean
    jwt: string
  })
    : Promise<{ signature: RequestSignature, request: Requests}> {
    const sign = Requests.findOne(await
      params.db.retrieveRawIdentificationRequests(),
      id);

    if (sign === undefined) {
      throw new SeverError("Flow request with such id does not exists", 400);
    }
    if (sign.cancelled) {
      throw new SeverError("Flow request has been cancelled", 400);
    }

    const decode = await this.decodeRequest(sign, { jwt: params.jwt });
    

    if (params.app && decode.app !== params.app.app && !params.admin) {
      throw new SeverError("You are forbidden to make this inquiry", 401);
    }
    if (!params.admin && !params.app) {
      throw new SeverError("You need special privileges to access this resource.");
    }
    return {
      signature: decode,
      request: sign,
    };
  }

  /**
   * Validate authentication session
   * @param {string} id request id
   * @param {Record<string, unknown>} params arguments
   * @return {Promise<Requests>} returns request if okay
   */
  public static async manageOidc(id: string, params: {
    db: DatabaseFunctions.Getters,
    jwt: string,
    app: string,
    consumer: string,
  })
    : Promise<{
      signature: RequestSignature,
      app: ClientApp,
      request: Requests
    }> {
    const sign = await
      params.db.retrieveRawIdentificationRequest(id);
    if (sign === undefined) {
      throw new SeverError("Flow request with such id does not exists", 400);
    }

    const decode = await this.decodeRequest(sign, { jwt: params.jwt });
    
    if (decode.app !== params.app) {
      throw new SeverError("Flow was created by another app", 401, 'authorization_error');
    }else if (sign.cancelled) {
      throw new SeverError("Flow request has been cancelled", 400, 'session_cancel');
    }
    
    const app = await params.db.getConsumerApp(decode.consumer, decode.app);

    return {
      app: app,
      signature: decode,
      request: sign,
    };
  }

  /**
   * Create expiration time
   * @param {number} duration length of time
   * @param {boolean} inHours toggle to count
   *  in hours or minutes
   * @return {number} returns unix timestamp
   */
  public static expiration(duration: number,
    inHours = false)
    : number {
    const expirationDate = new Date();
    if (inHours) {
      expirationDate.setHours(new Date().
        getHours() + duration);
    } else {
      expirationDate.setMinutes(new Date().
        getMinutes() + duration);
    }
    return convertDateToUnix(expirationDate);
  }


  /**
   * Stringify NIN number
   * @param {string} nin nin digits
   * @return {string}
   */
  public static stringifyNIN(nin: string)
    : string {
    if (nin.startsWith(DocumentTypes.user)) return nin;
    else return `${DocumentTypes.user}${nin}`;
  }

  /**
   * Decode request
   * @param {Requests} req flow request
   * @param {Record<string, unknown>} params arguments
   * @return {RequestSignature} signature data
   */
  public static async decodeRequest(req: Requests, params: {
    jwt: string
  })
    : Promise<RequestSignature> {
    try {
      return LabsCipher.
        jwtDecode(req.request, params.jwt) as RequestSignature;
    } catch (error) {
      if ((error as JsonWebTokenError).name == "TokenExpiredError") {
        throw new SeverError({
          reason: "Session has expired",
          status: 'expiration',
          type: 'session_expiry'
        }, 401);
      } else {
        throw new SeverError({
          reason: "Session is invalid or is expired",
          status: 'expiration',
          type: 'unknown_error',
        }, 401);
      }
    }
  }

}