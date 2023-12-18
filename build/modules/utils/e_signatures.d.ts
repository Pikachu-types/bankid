/// <reference types="node" />
export declare namespace ESignatures {
    interface SignatureRequest {
        /**
         * Document ID
         */
        reference: string;
        /**
         * url of pdf file
         */
        pdf: string;
        /**
         * pasby document checker url
         */
        checker: string;
        /**
         * pasby-signature
         */
        signature: string;
        /**
         * key to decipher signature with
         */
        vi: string;
        /**
         * when was document request created
         */
        iat: number;
    }
    class helpers {
        static encryptSignerID(nin: string): string;
        /**
        * create data matrix code
        * @param {string} msg message to be stored within matrix string
        * @param {void} callback a function to return data matrix Buffer
        * @return {void} generated matrix
        */
        static generateDataMatrix(msg: string, callback: (matrix: Buffer) => void): Promise<void>;
        /**
        * stamp f
        * @param {string} data signature request
        * @param {void} callback a function to return pdf data
        * @return {void} stamped pdf document
        */
        static stampOnlinePDF(data: SignatureRequest, callback: (matrix: Uint8Array) => void): Promise<void>;
    }
}
