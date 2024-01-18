/**
 * Model generation helper
 */
export class ModelGenerator {
  /**
   * Generate a pasby user document model skeleton
   * @returns {Record<string, unknown>} map
   */
  static id(): Record<string, unknown> {
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
      "created": 111111111, // to be modified urgent
      "financial": {
        "bvn": "",
        "bvnBank": "",
        "bvnLevel": "",
        "bvnIAT": null,
      },
      "source": [], // to be modified urgent
      "locale": "en",
      "nationality": {
        "pep": null,
        "nationalities": [],
        "residence": "",
        "primary": "",
      },
      "vendor": "vnd_osgcq5i8n379axrbtlkd0eh4v1mufj", // official Finsel vendor identifier
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
      "id": "", // to be updated [bid_...]
      "updatedAt": 111111111, // to be modified urgent
      "nin": "", // to be modified
      "bio": {
        "birthdate": "",
        "gender": "",
        "dateOfDeath": null,
        "birthnumber": 111111111, // to be modified urgent
        "maritalStatus": "single",
        "birthplace": "", // to be modified urgent (same as lga of origin)
      },
    };
  }
  
  /**
   * Generate a standalone pasby model skeleton
   * @returns {Record<string, unknown>} map
   */
  static pasby(): Record<string, unknown> {
    return {
      "created": 111111111, // to be modified urgent
      "id": "", // to be modified urgent [std_...]
      "validTo": 111111111, // to be modified urgent
      "vendor": "vnd_osgcq5i8n379axrbtlkd0eh4v1mufj", // default Finsel vendor id
      "test": false, // update this if needed
      "deviceInfo": null,
      "lut": 111111111, // to be modified urgent
      "activated": false,
    };
  }
}