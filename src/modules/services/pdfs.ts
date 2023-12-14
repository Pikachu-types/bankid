import pdf from "pdf-parse";
import { download } from "./http";


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
    let pdf = await download(url);
    let result = await this.isPDF(pdf);
    return result.isPDF;
  }
}