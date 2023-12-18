import bwipjs from 'bwip-js';
import {
  CustomError,
  convertUnixToDate, unixTimeStampNow
} from 'labs-sharable';
import {
  PDFDocument,
  StandardFonts, rgb
} from 'pdf-lib';
import { v3 as uuidv3, } from 'uuid';
import { download } from '../services/http';

export namespace ESignatures {
  export interface SignatureRequest {
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

  const namespace = "60f2c8a8-9844-11ee-b9d1-0242ac120002";

  const stampurl = "https://firebasestorage.googleapis.com/v0/b/" +
    "bankid-project.appspot.com/o/defaults%2Fpasby%20stamp.png?alt=media&" +
    "token=ef24f76b-b4da-4fe4-8f53-f16c7d556934";
  const pasbyLogo = "https://firebasestorage.googleapis.com/v0/b/bankid-project.appspot.com" +
    "/o/defaults%2Fpasby_colored.png?alt=media&token=0d37824e-1942-4680-961b-21c2d2e968a4";

  export class helpers {

    public static encryptSignerID(nin: string): string {
      return uuidv3(nin, namespace);
    }

    /**
    * create data matrix code
    * @param {string} msg message to be stored within matrix string
    * @param {void} callback a function to return data matrix Buffer
    * @return {void} generated matrix
    */
    public static async generateDataMatrix(msg: string, callback: (matrix: Buffer) => void): Promise<void> {
      bwipjs.toBuffer({
        bcid: 'datamatrix',       // Barcode type
        text: msg,    // Text to encode
        scale: 3,               // 3x scaling factor
        height: 80,              // Bar height, in millimeters
      }).then((png) => {
        callback(png);
      }).catch((err) => {
        throw new CustomError(`Matrix error - ${err}`);
      });
    }

    /**
    * stamp f
    * @param {string} data signature request
    * @param {void} callback a function to return pdf data
    * @return {void} stamped pdf document
    */
    public static async stampOnlinePDF(data: SignatureRequest, callback: (matrix: Uint8Array) => void): Promise<void> {
      const existingPdfBytes = await download(data.pdf);
      const stampBytes = await download(stampurl);
      const logoBytes = await download(pasbyLogo);
      const pdfDoc = await PDFDocument.load(existingPdfBytes)
      const pages = pdfDoc.getPages();
      const stamp = await pdfDoc.embedPng(stampBytes);
      const stampDim = stamp.size();
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const logo = await pdfDoc.embedPng(logoBytes);
      const logoDim = logo.size();
      const textSize = 8.2;
      const textWidth = helveticaFont.widthOfTextAtSize(data.reference, textSize);
      const textHeight = helveticaFont.heightAtSize(textSize);

      helpers.generateDataMatrix(data.signature, async (png) => {
        const matrix = await pdfDoc.embedPng(png);

        for (let i = 0; i < pages.length; i++){
          const page = pages[i];
          const { width, height } = page.getSize();

          page.drawImage(stamp, {
            x: width * 0.86,
            y: i == 0 ? height * 0.9 : 10,
            width: stampDim.width * 0.04,
            height: stampDim.width * 0.04,
          });

          page.drawImage(matrix, {
            x: width * 0.928,
            y: i == 0 ? height * 0.895 : 5,
            width: stampDim.width * 0.024,
            height: stampDim.width * 0.024,
          });

          page.drawImage(logo, {
            x: (width * 0.68) * 0.2,
            y: 10,
            width: logoDim.width * 0.03,
            height: logoDim.width * 0.03,
          });

          page.drawText("ID:", {
            x: (width * 0.68) * 0.26,
            y: 14,
            size: 8,
            font: helveticaFont,
            color: rgb(0.67, 0.67, 0.73),
          });

          page.drawText(data.checker, {
            x: (width * 0.68) * 0.2,
            y: 28,
            size: 8,
            font: helveticaFont,
            color: rgb(0.67, 0.67, 0.73),
          });

          page.drawRectangle({
            x: (width * 0.68) * 0.30,
            y: 10,
            width: textWidth + 10,
            height: textHeight + 4,
            color: rgb(0.97, 0.97, 0.99),
          });

          page.drawText(data.reference, {
            x: (width * 0.68) * 0.312,
            y: 14,
            size: textSize,
            font: helveticaFont,
            color: rgb(0.67, 0.67, 0.73),
          });
        }

        pdfDoc.setCreator('pasby™ by Finsel DGI Limited(https://pasby.africa)');
        pdfDoc.setAuthor(`pasby™ - ${data.vi}`);
        pdfDoc.setCreationDate(convertUnixToDate(data.iat));
        pdfDoc.setModificationDate(convertUnixToDate(unixTimeStampNow()));
        callback(await pdfDoc.save());
      });
    }

  }
} 