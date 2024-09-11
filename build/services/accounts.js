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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Accounts = void 0;
const labs_sharable_1 = require("labs-sharable");
const fakeNINs = require("../jsons/fake-nin.json");
const __1 = require("..");
const consumer_helper_1 = require("../modules/utils/consumer.helper");
/**
 * Service class for
 */
class Accounts {
    constructor(getter) {
        this.getter = getter;
    }
    /**
     * Get a some bankid account
     * @param {Record<string, unknown>} params arguments
     * @return {Promise<BAccount | undefined>} values
     */
    retrieve(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let accounts = [];
            if (params.id.startsWith(__1.DocumentTypes.consumer)) {
                accounts = yield this.getter.retrieveConsumers();
            }
            else if (params.id.startsWith(__1.DocumentTypes.app) && params.reference) {
                accounts = yield this.getter.getConsumerApps(params.reference);
            }
            else if (params.id.startsWith(__1.DocumentTypes.user) && params.reference) {
                accounts = yield this.getter.retrieveRegisteredNINs(params.cipher);
            }
            else {
                throw new __1.SeverError("Invalid account identifier");
            }
            if (accounts.length < 1) {
                throw new __1.SeverError("Found no accounts for such identifier");
            }
            if (accounts[0] instanceof __1.IdentificationModel) {
                return __1.IdentificationModel.findOne(accounts, params.id);
            }
            else if (accounts[0] instanceof __1.ConsumerModel) {
                return __1.ConsumerModel.findOne(accounts, params.id);
            }
            else if (accounts[0] instanceof __1.ClientApp) {
                return __1.ClientApp.findOne(accounts, params.id);
            }
            else {
                return;
            }
        });
    }
    /**
     * A clamp function to get a specific registered user
     * @param {Record<string, unknown>} params required arguments
     * @return {Promise<IdentificationModel>} gotten model containing need content
     */
    getRegisteredUser(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.id.startsWith("bid_")) {
                throw new __1.SeverError("Invalid identifier");
            }
            const registeredNINs = yield this.getter.retrieveRegisteredNINs(params.cipher);
            const user = __1.IdentificationModel.findOne(registeredNINs, params.id);
            if (!user) {
                throw new __1.SeverError("National does not have a pasby™ digital ID", 404);
            }
            return user;
        });
    }
    /**
     * Generate fake nin information for test consumer
     * @return {IdentificationModel} gotten model containing need content
     */
    static fakeUser() {
        const user = __1.IdentificationModel.fromJson(fakeNINs[0]);
        user.resolveMaps();
        user.unResolveMaps();
        return user;
    }
    /**
     * A clamp function to get a validate app credentials
     * @param {Record<string, unknown>} params arguments
     * @return {Promise<AppConsumerReturn | undefined>} valid or not
     */
    validateAuthRequest(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (params.data.app === undefined) {
                throw new __1.SeverError("Missing app identifier", 403);
            }
            const consumer = yield this.getConsumer(params.data.consumer, params.cipher);
            const app = yield this.getApp(params.data.app, params.data.consumer, params.cipher);
            const valid = consumer.validateApiKey(params.data.key) &&
                app.validateSecret(params.data.secret, params.cipher);
            if (!valid) {
                throw new __1.SeverError("Requester is not authorized", 401);
            }
            if (params.data.key.startsWith(__1.ApiKeyPrefix.test) &&
                app.type === 'production') {
                throw new __1.SeverError("Cannot apply a test key to a production type application", 403);
            }
            return {
                consumer: consumer,
                app: app,
            };
        });
    }
    /**
       * Validates the provided API key against the list of consumers.
       * @param params - An object containing the API key to validate.
       * @param params.apikey - The consumer API key to validate.
       * @returns The consumer associated with the provided API key if valid.
       * @throws {SeverError} If the API key is not valid.
       */
    validateConsumer(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const consumer = __1.ConsumerModel.
                matchApiKey(yield this.getter.retrieveConsumers(), params.apikey);
            if (!consumer) {
                throw new __1.SeverError("Request forbidden: Api key not valid", 403);
            }
            const app = __1.ClientApp.
                matchSecretKey(yield this.getter.getConsumerApps(consumer.id), params.appSecret, params.cipher);
            if (!app) {
                throw new __1.SeverError("Request forbidden: App secret not valid", 403);
            }
            return {
                consumer: consumer,
                app: app,
            };
        });
    }
    /**
    * Authenticate mobile applications
    * @param {Record<string, unknown>} params required arguments
    * @return {Promise<ConsumerAppsResponse>} returns auth token
    */
    authenticateApp(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const consumer = __1.ConsumerModel.
                matchApiKey(yield this.getter.retrieveConsumers(), params.apikey);
            if (consumer === undefined) {
                throw new __1.SeverError("Request forbidden: Api key not valid", 403);
            }
            const app = __1.ClientApp.
                matchSecretKey(yield this.getter.getConsumerApps(consumer.id), params.appSecret, params.cipher);
            if (app === undefined) {
                throw new __1.SeverError("Request forbidden: App secret not valid", 403);
            }
            if (params.apikey.startsWith(__1.ApiKeyPrefix.test) &&
                app.type === 'production') {
                throw new __1.SeverError("Cannot apply a test key to a production type application", 403);
            }
            const data = {
                sub: consumer.id,
                app: app.id,
                secret: params.appSecret,
                iat: (0, labs_sharable_1.unixTimeStampNow)(),
                name: app.displayName,
            };
            const token = labs_sharable_1.LabsCipher.jwtSign(data, params.jwt, "10min");
            const result = yield consumer_helper_1.ConsumerHelper.validateTokenAlone(token, params.jwt);
            return {
                token: token,
                model: result,
            };
        });
    }
    /**
    * Validate consumer existence
    * @param {string} id account id
    * @return {Promise<boolean>} returns true or false
    */
    consumerExist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield this.getter.doesDocumentExist(id, __1.DocumentReference.
                consumers);
            if (!exists)
                throw new __1.SeverError("Client does not exist", 400);
            else
                return true;
        });
    }
    /**
   * A clamp function to get a specific issued bank id
   * @param {string} params arguments
   * @return {Promise<SingleBankIDModel>} gotten model containing need content
   */
    getIssuedBankID(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.id.startsWith("std_") || (params.id.split("-").length != 2)) {
                throw new __1.SeverError("Invalid standalone identifier");
            }
            const nin = params.id.split("-")[0].split("_")[1];
            const bid = `bid_${nin}`;
            const registeredNINs = yield this.getter.retrieveRegisteredNINs(params.cipher);
            const vendors = yield this.getter.retrieveVendors(params.cipher);
            const issuedIDs = yield this.getter.retrieveIssuedBankIDs(bid);
            // console.log("Found ids: ", issuedIDs.map((value) => {
            //   return value.id;
            // }).join(", "));
            const user = __1.IdentificationModel.findOne(registeredNINs, bid);
            const issued = __1.StandaloneBankID.findOne(issuedIDs, params.id);
            if (!user) {
                throw new __1.SeverError("User not found");
            }
            if (!issued) {
                throw new __1.SeverError("No such issued pasby");
            }
            const vendor = __1.VendorModel.findOne(vendors, issued.vendor);
            if (!vendor) {
                throw new __1.SeverError("This was issued by an unknown vendor");
            }
            return {
                issued: issued,
                user: user,
                vendor: vendor,
            };
        });
    }
    /**
     * Get a consumer
     * @param {string} id account retrieval
     * @param {string} cipher encryption key
     * @return {Promise<ConsumerModel>} returns consumer
     */
    getConsumer(id, cipher) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.retrieve({
                id: id,
                cipher: cipher,
            });
            if (client === undefined || !(client instanceof __1.ConsumerModel)) {
                throw new __1.SeverError("No such consumer", 400);
            }
            else {
                return client;
            }
        });
    }
    /**
    * Get a consumer
    * @param {string} id account retrieval
    * @param {string} clientid id of consumer
    * @param {string} cipher encryption key
    * @return {Promise<ClientApp>} returns app
    */
    getApp(id, clientid, cipher) {
        return __awaiter(this, void 0, void 0, function* () {
            const app = yield this.retrieve({
                id: id,
                reference: clientid,
                cipher: cipher,
            });
            if (app === undefined || !(app instanceof __1.ClientApp)) {
                throw new __1.SeverError(`App id: ${id} no longer or never existed`, 400);
            }
            else {
                return app;
            }
        });
    }
    /**
     * A clamp function to register api usage
     * @param {UsageRecording} request usage data
     * @param {ConsumerModel} consumer consumer
     * @param {DatabaseFunctions.Management} database handle any document updates
     * @return {Promise<BillingModel>} action carried
     */
    logApiUsage(request, consumer, database) {
        return __awaiter(this, void 0, void 0, function* () {
            // validate we creating a new bill
            const timeline = __1.BillingModel.generateDocID();
            let billing;
            let create = false;
            const b = __1.BillingModel.
                findOne(yield this.getter.getApiBillingUsages(consumer.id), timeline);
            if (!b) {
                billing = new __1.BillingModel();
                billing.timeline = timeline;
                create = true;
            }
            else {
                billing = b;
            }
            billing.count = billing.count +
                (request.action === "increment" ? +1 : -1);
            billing.cost = billing.cost + request.cost;
            billing.lut = (0, labs_sharable_1.unixTimeStampNow)();
            const route = `${request.mode} ${request.route}`;
            billing.endpoints[route] = billing.endpoints[route] ?
                (billing.endpoints[route]) + 1 : 1;
            // upload
            yield database.updateConsumerBillingHistory(billing, consumer, create);
            return billing;
        });
    }
}
exports.Accounts = Accounts;
//# sourceMappingURL=accounts.js.map