"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelGenerator = void 0;
/**
 * Model generation helper
 */
class ModelGenerator {
    /**
     * Generate a pasby user document model skeleton
     * @returns {Record<string, unknown>} map
     */
    static id() {
        return {
            "medical": null,
            "address": {
                "country": "Nigeria",
                "city": "",
                "countryCode": "NG",
                "formatted": "",
                "state": "",
                "latitude": null,
                "postCode": "",
                "place": "",
                "longitude": null,
            },
            "created": 111111111,
            "financial": {
                "bvn": "",
                "bvnBank": "",
                "bvnLevel": "",
                "bvnIAT": null,
            },
            "source": [],
            "locale": "en",
            "nationality": {
                "pep": null,
                "nationalities": [],
                "residence": "",
                "primary": "",
            },
            "vendor": "vnd_osgcq5i8n379axrbtlkd0eh4v1mufj",
            "contact": {
                "emailVerified": false,
                "phone": "",
                "phoneVerified": false,
                "email": "",
            },
            "naming": {
                "titleSuffix": null,
                "given": "",
                "middle": "",
                "preferredUsername": "",
                "nickname": "",
                "name": "",
                "titlePrefix": null,
                "family": "",
                "title": "Mr",
            },
            "iDs": [],
            "idcards": {
                "passport": ""
            },
            "id": "",
            "updatedAt": 111111111,
            "nin": "",
            "bio": {
                "birthdate": "",
                "gender": "",
                "dateOfDeath": null,
                "birthnumber": 111111111,
                "maritalStatus": "single",
                "birthplace": "", // to be modified urgent (same as lga of origin)
            },
        };
    }
    /**
     * Generate a standalone pasby model skeleton
     * @returns {Record<string, unknown>} map
     */
    static pasby() {
        return {
            "created": 111111111,
            "id": "",
            "validTo": 111111111,
            "vendor": "vnd_osgcq5i8n379axrbtlkd0eh4v1mufj",
            "test": false,
            "deviceInfo": null,
            "lut": 111111111,
            "activated": false,
        };
    }
}
exports.ModelGenerator = ModelGenerator;
//# sourceMappingURL=model_generator.js.map