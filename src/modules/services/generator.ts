import {
  RSAKeys,
} from "labs-sharable";
// import { generateKeyPair } from "crypto";
import * as crypto from "crypto";
import { Requests } from "../models/public/requests";

/**
 * Generator service class
 */
export class Generator {
  /**
   * Create a app link
   * @param {string} mode request mode i.e [signature, identification]
   * @param {Requests} request the request
   * @param {string} source what kind of consumer generated this
   * @param {string} nin bankid user
   * @return {string} returns value.
   */
  public static appLink(mode: string,
    request: Requests, source: string, nin?:string): string {
    return `https://mobil.bankid.ng/auth/?mode=${mode}` +
      `&id=${request.id}&source=${source}${nin !== undefined ?
        `&nin=${nin}` :""}`;
  }

  /**
  * The `generateKeyPairSync` method accepts two arguments:
  * 1. The type ok keys we want, which in this case is "rsa"
  * 2. An object with the properties of the key
  * @return {RSAModel} key pairs
  */
  public static createRSAPairString(): RSAKeys {
    const {publicKey, privateKey} = crypto.generateKeyPairSync("rsa", {
      // The standard secure default length for RSA keys is 2048 bits
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      },
    });
    return {
      private: privateKey,
      public: publicKey,
    };
  }
  
}
