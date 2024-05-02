import { LabsCipher, CustomError, RequestStatus, convertDateToUnix } from "labs-sharable";
import { AuthToken } from "../interfaces/documents";
import { ActionType, DocumentTypes, IDRequest, RequestMode, Requests, SignatureRequest } from "..";
import { DatabaseFunctions } from "../../services";

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
  public static validateSignatureRequest(req: SignatureRequest)
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
   * @param {Record<string, unknown>} param arguments
   * @return {Promise<Requests>} returns request if okay
   */
  public static async validateRequest(id: string, params: {
    db: DatabaseFunctions.Getters
  })
    : Promise<Requests> {
    const sign = Requests.findOne(await
      params.db.retrieveRawIdentificationRequests(),
      id);

    if (sign === undefined) {
      throw new CustomError("Request with such id does not exists", 404);
    }
    if (sign.cancelled) {
      throw new CustomError("Request has been cancelled", 208);
    }
    return sign;
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
  
}