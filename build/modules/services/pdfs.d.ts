/// <reference types="node" />
/**
 * Callable for PDF checks
 */
export declare class PDFCheck {
    static isPDF(buffer: Buffer): Promise<{
        isPDF: boolean;
        info: null;
    } | {
        isPDF: boolean;
        info: any;
    }>;
    static testPDF(url: string): Promise<boolean>;
}
