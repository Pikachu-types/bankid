import { LabsCipher, CustomError, RequestStatus, convertDateToUnix } from "labs-sharable";
import { AuthToken, RequestSignature } from "../interfaces/documents";
import { ActionType, DocumentTypes, IDRequest, RequestMode, Requests, Signing } from "..";
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
      throw new CustomError(code == 401 ? RequestStatus.expiration :
        RequestStatus.tokenMismatch, code);
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
      throw new CustomError("Forbidden request: This is a signature request endpoint", 403);
    }
    if (req.webhook === undefined && req.action === ActionType.sign) {
      throw new CustomError("Requester needs to provide a web-hook map for us to handle such request", 428);
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
      throw new CustomError("Requester needs to state identification claims", 428);
    }
    if (req.mode !== RequestMode.Identification) {
      throw new CustomError("Forbidden request: Mode mismatch", 403);
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
      throw new CustomError("Flow request with such id does not exists", 404);
    }
    if (sign.cancelled) {
      throw new CustomError("Flow request has been cancelled", 208);
    }

    const decode = await this.decodeRequest(sign, { jwt: params.jwt });
    

    if (params.app && decode.app !== params.app.app && !params.admin) {
      throw new CustomError("You are forbidden to make this inquiry", 406);
    }
    if (!params.admin && !params.app) {
      throw new CustomError("You need special privileges to access this resource.");
    }
    return {
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
        throw new CustomError("Request has expired", 401);
      } else {
        throw new CustomError("Request has expired", 401);
      }
    }
  }

}