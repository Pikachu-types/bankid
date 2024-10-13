import pdf from "pdf-parse";
import { download } from "./http";
import { SeverError } from "../utils/server.error";

/**
 * Callable for PDF checks
 */
export class PDFCheck {
  static isPDF(buffer: Buffer) {
    return pdf(buffer).then(function (data) {
      return { isPDF: true, info: data.info };
    }, () => {
      return { isPDF: false, info: null };
    });
  }

  public static async testPDF(url: string): Promise<boolean> {
    try {
      let pdf = await download(url);
      let result = await this.isPDF(pdf);
      return result.isPDF;
    } catch {
      throw new SeverError("The url provided does not contain a valid pdf file", 400, 'invalid_request');
    }
  }
}