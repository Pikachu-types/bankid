import { plainToInstance, Expose } from "class-transformer";
import { HookData } from "./requests";
import { DocumentTypes } from "../../enums/enums";
import { v1 as uuidv1 } from 'uuid';


export type Signee = {
  title?: string | null | undefined;
  name: string;
  type: "business" | "person";
  email: string;
  nin: string;
  ip?: string;
  representing: string;
  signedAt?: number;
}

interface ISignatureStatus {
  nin: string;
  status: "viewing" | "signed" | "stale",
  lut: number
}

/**
 * Documents class
*/
export class Documents {
  /* eslint new-cap: ["error", { "capIsNew": false }]*/
  /**
   * doc_[uuid1]
   */
  @Expose() id = "";
  /**
   * nin numbers to sign document
   */
  @Expose() to: string[] = [];

  /**
   * User agent
   */
  @Expose() useragent = "";

  /**
   * Tells pasby hoe to handle this document signing request
   */
  @Expose() mode?: "interface" | "api";
  
  /**
   * Would be the same length as the [to] object
   * and we match a user using the nin 
   */
  @Expose() statusLog?: ISignatureStatus[];


  /**
   * Must be present if the mode is "interface"
   */
  @Expose() signee?: Signee[];

  /**
   * Request destination [mobile, file, desktop]
   */
  @Expose() destination = "";
  
  @Expose() lut = 0;
  @Expose() iat = 0;
  @Expose() exp = 0;
  @Expose() handled = false;
  /**
   * signatures of requested parties
   */
  @Expose() signatures: eSignature[] | undefined;

  @Expose() request: clientRequest | undefined;
  /**
   * document file data 
   */
  @Expose() file: eDocument = {
    source: "",
    name: "",
  };

  /**
   * This is used to update listeners about signing event
   * has:
   * host: string
   * reference: string
   */
  @Expose() hook: HookData | undefined;

  /**
   * Change record to Documents class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {Documents} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : Documents {
    const result: Documents = plainToInstance(Documents, obj,
      { excludeExtraneousValues: true });

    return result;
  }

  /**
   * Helper class function to find one specific object based on id
   *
   * @param {Documents[]} list an array to sort from and find given
   * @param {string} id provide the needed id to match for
   * @return {Documents | undefined} found object else undefined
   */
  public static findOne(list: Documents[], id: string)
    : Documents | undefined {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return;
  }

  /**
   * This class handler to json
   * @return {string} text
   */
  public toJsonString(): string {
    return JSON.stringify(this);
  }

  /**
   * create a pretty unique uid for documents
   * @return {string} generated uid
   */
  public static createID(): string {
    return `${DocumentTypes.document}${uuidv1()}`;
  }
  
  /**
   * get document reference
   * @return {string} reference id
   */
  public reference(): string {
    return this.id.replace(DocumentTypes.document, "");
  }

  /**
  * get document in map format
  * @return { Record<string, unknown>} returns doc map .
  */
  public toMap()
    : Record<string, unknown> {
    return JSON.parse(this.toJsonString());
  }
}

/**
 * File data structure for e-signatures 
*/
export interface eDocument {
  source: string,
  name: string,
  stamped?: string,
}

/**
 * e-signature
*/
export interface eSignature {
  iat: number,
  signature?: string,
  nin: string,
  name: string,
  identification: string,
}

/**
 * Consumer structure
*/
export interface clientRequest {
  client: string,
  app: string,
  ip: string,
}
