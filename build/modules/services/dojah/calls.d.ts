import { ApiReference } from "../../interfaces/documents";
import { DojahBVNResponse, DojahNINResponse } from "./responses";
export declare class DojahIdentityCheck {
    private static baseURl;
    /**
      * BVN check
      * @param {ApiReference} keys api keys
      * @param {string} bvn bvn identifier
      * @return {Promise<DojahBVNResponse>} returns response.
      */
    static bvn(keys: ApiReference, bvn: string): Promise<DojahBVNResponse>;
    /**
      * NIN check
      * @param {ApiReference} keys api keys
      * @param {string} nin nin identifier
      * @return {Promise<DojahNINResponse>} returns response.
      */
    static nin(keys: ApiReference, nin: string): Promise<DojahNINResponse>;
}
