"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ESignatures = void 0;
const bwip_js_1 = __importDefault(require("bwip-js"));
const labs_sharable_1 = require("labs-sharable");
const pdf_lib_1 = require("pdf-lib");
const uuid_1 = require("uuid");
const http_1 = require("../services/http");
var ESignatures;
(function (ESignatures) {
    const namespace = "60f2c8a8-9844-11ee-b9d1-0242ac120002";
    const stampurl = "https://firebasestorage.googleapis.com/v0/b/" +
        "bankid-project.appspot.com/o/defaults%2Fpasby%20stamp.png?alt=media&" +
        "token=ef24f76b-b4da-4fe4-8f53-f16c7d556934";
    const pasbyLogo = "https://firebasestorage.googleapis.com/v0/b/bankid-project.appspot.com" +
        "/o/defaults%2Fpasby_colored.png?alt=media&token=0d37824e-1942-4680-961b-21c2d2e968a4";
    class helpers {
        static encryptSignerID(nin) {
            return (0, uuid_1.v3)(nin, namespace);
        }
        /**
        * create data matrix code
        * @param {string} msg message to be stored within matrix string
        * @param {void} callback a function to return data matrix Buffer
        * @return {void} generated matrix
        */
        static generateDataMatrix(msg, callback) {
            return __awaiter(this, void 0, void 0, function* () {
                bwip_js_1.default.toBuffer({
                    bcid: 'datamatrix',
                    text: msg,
                    scale: 3,
                    height: 80, // Bar height, in millimeters
                }).then((png) => {
                    callback(png);
                }).catch((err) => {
                    throw new labs_sharable_1.CustomError(`Matrix error - ${err}`);
                });
            });
        }
        /**
        * stamp f
        * @param {string} data signature request
        * @param {void} callback a function to return pdf data
        * @return {void} stamped pdf document
        */
        static stampOnlinePDF(data, callback) {
            return __awaiter(this, void 0, void 0, function* () {
                const existingPdfBytes = yield (0, http_1.download)(data.pdf);
                const stampBytes = yield (0, http_1.download)(stampurl);
                const logoBytes = yield (0, http_1.download)(pasbyLogo);
                const pdfDoc = yield pdf_lib_1.PDFDocument.load(existingPdfBytes);
                const pages = pdfDoc.getPages();
                const stamp = yield pdfDoc.embedPng(stampBytes);
                const stampDim = stamp.size();
                const helveticaFont = yield pdfDoc.embedFont(pdf_lib_1.StandardFonts.Helvetica);
                const logo = yield pdfDoc.embedPng(logoBytes);
                const logoDim = logo.size();
                const textSize = 8.2;
                const textWidth = helveticaFont.widthOfTextAtSize(data.reference, textSize);
                const textHeight = helveticaFont.heightAtSize(textSize);
                helpers.generateDataMatrix(data.matrix, (png) => __awaiter(this, void 0, void 0, function* () {
                    const matrix = yield pdfDoc.embedPng(png);
                    for (let i = 0; i < pages.length; i++) {
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
                            color: (0, pdf_lib_1.rgb)(0.67, 0.67, 0.73),
                        });
                        page.drawRectangle({
                            x: (width * 0.68) * 0.30,
                            y: 10,
                            width: textWidth + 10,
                            height: textHeight + 4,
                            color: (0, pdf_lib_1.rgb)(0.97, 0.97, 0.99),
                        });
                        page.drawText(data.reference, {
                            x: (width * 0.68) * 0.312,
                            y: 14,
                            size: textSize,
                            font: helveticaFont,
                            color: (0, pdf_lib_1.rgb)(0.67, 0.67, 0.73),
                        });
                    }
                    pdfDoc.setCreator('pasby™ by Finsel DGI Limited(https://pasby.africa)');
                    pdfDoc.setCreationDate((0, labs_sharable_1.convertUnixToDate)(data.iat));
                    pdfDoc.setModificationDate((0, labs_sharable_1.convertUnixToDate)((0, labs_sharable_1.unixTimeStampNow)()));
                    callback(yield pdfDoc.save());
                }));
            });
        }
    }
    ESignatures.helpers = helpers;
})(ESignatures = exports.ESignatures || (exports.ESignatures = {}));
//# sourceMappingURL=e_signatures.js.map