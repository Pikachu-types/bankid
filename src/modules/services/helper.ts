import {CipherType, CustomError, LabsCipher} from "labs-sharable";
import { ApprovedClients } from "../models/public/approvedClients";

/**
 * Callable Function Helper class
 */
export class FunctionHelpers {
  /**
   * Changes string to CipherType model
   * @param {string} source content to get RSA code
   * @param {string} cipherKey designated cipher secret code
   * @return {Buffer} returns value.
   */
  public static decipherRSAKey(source: string,
    cipherKey: string): Buffer {
    const data = FunctionHelpers.changeCipherStringToModel(source);
    return Buffer.from(
      LabsCipher.decrypt(data, cipherKey), "utf-8"
    );
  }

  /**
   * This class handler to RSA keys
   * @param {string} cipherKey  key
   * @param {string} encoded  rsa key written in bcrypt
   * @return {Buffer} buffer value
   */
  public static bcryptToRSAKey(cipherKey: string,
    encoded: string): Buffer | undefined {
    try {
      const pV = FunctionHelpers.
        changeCipherStringToModel(encoded);
      const publicKey = LabsCipher.decrypt(pV, cipherKey);
      return Buffer.from(publicKey, "utf-8");
    } catch (_) {
      return;
    }
  }

  /**
   * Create a proper string from the CipherType model
   * @param {CipherType} source content to string from
   * @return {string} returns value.
   */
  public static createCipherString(source: CipherType): string {
    return `${source.content}-vi(${source.iv})`;
  }

  /**
   * Create a proper string from the CipherType model
   * long function
   * @param {string} cipherKey secret key
   * @param {string} source content
   * @return {string} returns value.
   */
  public static bankidCipherString(cipherKey: string,
    source: string): string {
    return FunctionHelpers.
      createCipherString(LabsCipher.encrypt(source, cipherKey));
  }

  /**
   * Create an api key for BankID consumer
   * @param {string} content use your own content
   * @return {string} returns value.
   */
  public static async generateApiKey(content?: string): Promise<string> {
    const token = content ?? crypto.randomUUID();
    return await LabsCipher.hashWithBcrypt(token, 10);
  }

  /**
   * Revert CipherType model string to readable string
   * long function
   * @param {string} cipherKey secret key
   * @param {string} source content
   * @return {string} returns value.
   */
  public static bankidCipherToString(cipherKey: string,
    source: string): string {
    try {
      const signature = FunctionHelpers.
        changeCipherStringToModel(source);
      return LabsCipher.decrypt(signature, cipherKey);
    } catch (e) {
      throw new CustomError(`${e}`);
    }
  }

  /**
   * Verify Client side app approval
   * @param {string} cipherKey key used to unlock cipher
   * @param {string} source content to string from
   * @return {string} returns value.
   */
  public static verifyAppAuthorization(cipherKey: string,
    source?: string): boolean {
    if (source === undefined) return false;

    let appID;
    try {
      const signature = FunctionHelpers.
        changeCipherStringToModel(source);
      appID = LabsCipher.decrypt(signature, cipherKey);
      return ApprovedClients.applications.includes(appID);
    } catch (_) {
      return false;
    }
  }

  /**
   * Verify Client side app approval
   * @param {string} cipherKey key used to unlock cipher
   * @param {string} source content to string from
   * @return {string} returns value.
   */
  public static verifyAuthorization(cipherKey: string,
    source?: string): boolean {
    if (source === undefined) return false;

    let appID;
    try {
      const signature = FunctionHelpers.
        changeCipherStringToModel(source);
      appID = LabsCipher.decrypt(signature, cipherKey);
      return ApprovedClients.authorized.includes(appID);
    } catch (_) {
      return false;
    }
  }

  /**
   * Create a proper string from the CipherType model
   * @param {CipherType} source content to string from
   * @return {string} returns value.
   */
  public static changeCipherStringToModel(source: string): CipherType {
    const cipher = source.split("-vi");

    if (cipher.length != 2) {
      throw new CustomError("Invalid source string");
    }

    return {
      iv: cipher[1].replace("(", "").replace(")", ""),
      content: cipher[0],
    };
  }


  /**
   * Verify the requester of a http request
   * @param {string} cipherKey cipher secret key
   * @param {string} source authorization key found in header
   * @return {boolean} returns state.
   */
  public static verifyRequester(cipherKey: string, source?: string): boolean {
    if (source === undefined) return false;

    let appID;
    try {
      const signature = FunctionHelpers.
        changeCipherStringToModel(source);
      appID = LabsCipher.decrypt(signature, cipherKey);
      return ApprovedClients.requesters.includes(appID);
    } catch (err) {
      return false;
    }
  }
}
