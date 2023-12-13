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
exports.PDFCheck = void 0;
const pdf_parse_1 = __importDefault(require("pdf-parse"));
/**
 * Callable for PDF checks
 */
class PDFCheck {
    static isPDF(buffer) {
        return (0, pdf_parse_1.default)(buffer).then(function (data) {
            return { isPDF: true, info: data.info };
        }, () => {
            return { isPDF: false, info: null };
        });
    }
    static testPDF(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let pdf = yield fetch(url).then(res => res.arrayBuffer());
            let result = yield this.isPDF(Buffer.from(pdf));
            return result.isPDF;
        });
    }
}
exports.PDFCheck = PDFCheck;
//# sourceMappingURL=pdfs.js.map