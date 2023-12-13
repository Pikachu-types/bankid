import pdf from "pdf-parse";


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
    let pdf = await fetch(url).then(res => res.arrayBuffer());
    let result = await this.isPDF(Buffer.from(pdf));

    return result.isPDF;
  }
}