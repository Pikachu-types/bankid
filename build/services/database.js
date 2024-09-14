"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.DatabaseFunctions = void 0;
const admin = __importStar(require("firebase-admin"));
const __1 = require("..");
const labs_sharable_1 = require("labs-sharable");
const oidc_session_1 = require("../modules/models/public/oidc_session");
var DatabaseFunctions;
(function (DatabaseFunctions) {
    /**
    * Database helper class
    */
    class Getters {
        constructor(admin) {
            this.db = admin;
        }
        /**
         * Go to database vendor collection and get all
         * available vendors
         * @param {string} cipher encryption key
         * @return {Promise<VendorModel[]>} returns list.
         */
        retrieveVendors(cipher) {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db.collection(__1.DocumentReference.vendor).get();
                return source.docs.map((e) => {
                    if (e.data()["content"] !== undefined) {
                        const data = __1.FunctionHelpers.
                            bankidCipherToString(cipher, e.data()["content"]);
                        return __1.VendorModel.fromJson(JSON.parse(data));
                    }
                    else {
                        return __1.VendorModel.fromJson(e.data());
                    }
                });
            });
        }
        /**
         * Go to database invitations collection and get all
         * @return {Promise<VendorModel[]>} returns list.
         */
        retrieveNINInvitations() {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db.collection(__1.DocumentReference.invitations).get();
                return source.docs.map((e) => __1.InvitationRequest.fromJson(e.data()));
            });
        }
        /**
         * Go to database registration requests collection and get all
         * @return {Promise<VendorModel[]>} returns list.
         */
        retrieveRegistrationRequests() {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db.collection(__1.DocumentReference.pending).get();
                return source.docs.map((e) => __1.PendingApprovals.fromJson(e.data()));
            });
        }
        /**
         * Go to database ids collection and get all
         * registered social security numbers nin
         * @param {string} cipher encryption key
         * @return {Promise<IdentificationModel[]>} returns list.
         */
        retrieveRegisteredNINs(cipher) {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db.collection(__1.DocumentReference.users).get();
                return source.docs.map((e) => {
                    if (e.data()["content"] !== undefined) {
                        const data = __1.FunctionHelpers.
                            bankidCipherToString(cipher, e.data()["content"]);
                        return __1.IdentificationModel.fromJson(JSON.parse(data));
                    }
                    else {
                        return __1.IdentificationModel.fromJson(e.data());
                    }
                });
            });
        }
        /**
         * Go to database ids collection and get all
         * issued bankids
         * @param {string} ref registered nin to check for issued bank ids
         * @return {Promise<StandaloneBankID[]>} returns list.
         */
        retrieveIssuedBankIDs(ref) {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db.collection(__1.DocumentReference.users)
                    .doc(ref).collection(__1.DocumentReference.issuedIDs).get();
                return source.docs.map((e) => __1.StandaloneBankID.fromJson(e.data()));
            });
        }
        /**
         * Go to database ids collection and get
         * @param {string} ref registered nin to check for issued bank ids
         * @param {string} pass standalone identifier
         * @return {Promise<StandaloneBankID>} returns list.
         */
        getStandalonePass(ref, pass) {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db.collection(__1.DocumentReference.users)
                    .doc(ref).collection(__1.DocumentReference.issuedIDs).doc(pass).get();
                if (!source.data())
                    throw new __1.SeverError("The request pasby pass is invalid.");
                return __1.StandaloneBankID.fromJson(source.data());
            });
        }
        /**
         * Go to database consumer collection and get all
         * available consumers
         * @return {Promise<ConsumerModel[]>} returns list.
         */
        retrieveConsumers() {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db.collection(__1.DocumentReference.consumers).get();
                return source.docs.map((e) => __1.ConsumerModel.fromJson(e.data()));
            });
        }
        /**
         * Get consumer apps
         * @param {string} id consumer id
         * @param {string} environment type of apps to retrieve i.e production or test
         * @return {Promise<ClientApp[]>} returns list.
         */
        getConsumerApps(id, environment) {
            return __awaiter(this, void 0, void 0, function* () {
                let s;
                if (environment) {
                    s = this.db.
                        collection(__1.DocumentReference.consumers).doc(id)
                        .collection(__1.DocumentReference.apps).where('type', '==', environment);
                }
                else {
                    s = this.db.
                        collection(__1.DocumentReference.consumers).doc(id)
                        .collection(__1.DocumentReference.apps);
                }
                const source = yield s.get();
                return source.docs.map((e) => __1.ClientApp.fromJson(e.data()));
            });
        }
        /**
         * Get consumer app
         * @param {string} consumer organisation on console
         * @param {string} app consumer app
         * @return {Promise<ClientApp>} returns list.
         */
        getConsumerApp(consumer, app) {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db.
                    collection(__1.DocumentReference.consumers).doc(consumer)
                    .collection(__1.DocumentReference.apps).doc(app).get();
                if (!source.exists)
                    throw new __1.SeverError("The requested app does not exists.", 400);
                return __1.ClientApp.fromJson(source.data());
            });
        }
        /**
         * Get consumer app
         * @param {string} consumer organisation on console
         * @return {Promise<ConsumerModel>} returns list.
         */
        getConsumer(consumer) {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db.
                    collection(__1.DocumentReference.consumers).doc(consumer).get();
                if (!source.exists)
                    throw new __1.SeverError("The requested consumer does not exists.", 400);
                return __1.ConsumerModel.fromJson(source.data());
            });
        }
        /**
         * Go to database request collection and
         * encrypted identification request
         * @param {string} jwt provide encryption key for jwt decoding
         * @return {Promise<IdentificationRequest[]>} returns list.
         */
        retrieveIdentificationRequests(jwt) {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db.collection(__1.DocumentReference.requests).get();
                return source.docs.map((e) => {
                    const content = labs_sharable_1.LabsCipher.jwtDecode(e.data().request, jwt);
                    const identification = __1.IdentificationRequest
                        .fromJson(content);
                    identification.signed = e.data().signed;
                    return identification;
                });
            });
        }
        /**
         * Go to database request collection and get raw requests
         * @return {Promise<Requests[]>} returns list.
         */
        retrieveRawIdentificationRequests() {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db.collection(__1.DocumentReference.requests).get();
                return source.docs.map((e) => __1.Requests.fromJson(e.data()));
            });
        }
        retrieveOIDCSessions() {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db.collection(__1.DocumentReference.sessions).get();
                return source.docs.map((e) => oidc_session_1.OIDCSession.fromJson(e.data()));
            });
        }
        /**
         * Grab flow session
         * @param {string} id the identifier
         * @return {Promise<Requests>} returns list.
         */
        retrieveRawIdentificationRequest(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db.collection(__1.DocumentReference.requests)
                    .doc(id).get();
                if (!source.exists) {
                    return;
                }
                return __1.Requests.fromJson(source.data());
            });
        }
        /**
        * Grab flow session
        * @param {string} id the identifier
        * @param {string} user identify the national
        * @return {Promise<IdentificationRequest>} returns list.
        */
        getSignedFlowRequest(id, user) {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db.collection(__1.DocumentReference.users).doc(user).collection(__1.DocumentReference.history)
                    .doc(id).get();
                if (!source.exists) {
                    return;
                }
                return __1.IdentificationRequest.fromJson(source.data());
            });
        }
        /**
         * Get users signing history
         * @param {string} user registered user
         * @return {Promise<IdentificationRequest[]>} returns list.
         */
        getSigningHistory(user, options) {
            return __awaiter(this, void 0, void 0, function* () {
                let val = this.db.
                    collection(__1.DocumentReference.users).doc(user)
                    .collection(__1.DocumentReference.history);
                if (options) {
                    if (options.startAt) {
                        const docRef = this.db.collection(__1.DocumentReference.users).doc(user)
                            .collection(__1.DocumentReference.history).doc(options.startAt);
                        const snapshot = yield docRef.get();
                        val.startAt(snapshot);
                    }
                    val.limit(options.limit);
                }
                const source = yield val.get();
                return source.docs.map((e) => __1.IdentificationRequest.fromJson(e.data()));
            });
        }
        /**
         * Retrieves an OIDC session from the database using the provided token.
         *
         * @param token - The token used to identify the OIDC session.
         * @returns A promise that resolves to an OIDCSession object if found, or undefined if not.
         * @throws ServerError if the session does not exist or has expired.
         */
        getOIDCSession(token) {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db.
                    collection(__1.DocumentReference.sessions).doc(token).get();
                if (!source.exists)
                    throw new __1.SeverError("Resource session must be invalid or has expired", 400);
                return oidc_session_1.OIDCSession.fromJson(source.data());
            });
        }
        /**
         * Retrieves a confirmed session for a specific user and flow from the database.
         * @param user The user identifier.
         * @param flow The flow identifier.
         * @returns A Promise that resolves to an IdentificationRequest object if found, otherwise undefined.
         * @throws {SeverError} If the flow request does not exist or has not been processed by any national.
         */
        getConfirmedSession(user, flow) {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db
                    .collection(__1.DocumentReference.users).doc(user)
                    .collection(__1.DocumentReference.history).doc(flow).get();
                if (!source.exists)
                    throw new __1.SeverError("No such flow request or it has not been processed by any national.", 400);
                return __1.IdentificationRequest.fromJson(source.data());
            });
        }
        /**
         * Get consumers billing history
         * @param {string} consumer registered is
         * @return {Promise<IdentificationRequest[]>} returns list.
         */
        getApiBillingUsages(consumer) {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db.
                    collection(__1.DocumentReference.consumers).doc(consumer)
                    .collection(__1.DocumentReference.bill).get();
                return source.docs.map((e) => __1.BillingModel.fromJson(e.data()));
            });
        }
        /**
         * Get e-documents
         * @return {Promise<Documents[]>} returns list.
         */
        getEDocs() {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db.
                    collection(__1.DocumentReference.documents).get();
                return source.docs.map((e) => __1.Documents.fromJson(e.data()));
            });
        }
        isUserAttachedToConsumer(params) {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db.
                    collection(__1.DocumentReference.consumers).doc(params.org)
                    .collection(__1.DocumentReference.consumerUser)
                    .where('national', '==', params.nin).get();
                if (source.empty)
                    return;
                return source.docs.map((e) => __1.EIDUserResource.fromJson(e.data()))[0];
            });
        }
        eidsAttachedToThisConsumer(org) {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db.
                    collection(__1.DocumentReference.consumers).doc(org)
                    .collection(__1.DocumentReference.consumerUser).get();
                return source.docs.map((e) => __1.EIDUserResource.fromJson(e.data()));
            });
        }
        /**
         * A power function used to check if firestore document exist
         * @param {string} docID reference id
         * @param {string} collectionPath string path of collection
         *  i.e users/{user}/notification
         * @return {Promise<boolean>} nothing
         */
        doesDocumentExist(docID, collectionPath) {
            return __awaiter(this, void 0, void 0, function* () {
                const query = yield this.db.
                    collection(collectionPath).doc(docID).get();
                return query.exists;
            });
        }
        /**
         * A power function used to check if firestore sub document exist
         * i.e consumers/{docID}/apps/{subID}
         * @param {string} subID main document in sub collection being looked for
         * @param {string} docID reference id
         * @param {string} collectionPath string path of collection
         * @param {string} subCollectionPath string path of sub collection
         * @return {Promise<boolean>} nothing
         */
        doesSubDocumentExist(subID, docID, collectionPath, subCollectionPath) {
            return __awaiter(this, void 0, void 0, function* () {
                const query = yield this.db.
                    collection(collectionPath).doc(docID).
                    collection(subCollectionPath).doc(subID).get();
                return query.exists;
            });
        }
    }
    DatabaseFunctions.Getters = Getters;
    /**
     * Database management setters, updates and deletes
     */
    class Management {
        constructor(admin) {
            this.db = admin;
        }
        /**
         * Upload identification request to database
         * @param {Record<string, unknown>} data model structure
         * @param {DocumentAction} action type of document action
         * @return {Promise<void>} void.
         */
        manageIdentificationRequest(data, action) {
            return __awaiter(this, void 0, void 0, function* () {
                if (data.id === undefined) {
                    throw new __1.SeverError("Internal error: Invalid map object. No id found");
                }
                const ref = this.db.
                    collection(__1.DocumentReference.requests)
                    .doc(data.id);
                if (action === __1.DocumentAction.create) {
                    yield ref.set(data.toMap());
                }
                else if (action === __1.DocumentAction.update &&
                    data.to === undefined || data.to.length < 1) {
                    yield ref.update({
                        "signed": data.signed,
                        "cancelled": data.cancelled,
                        "onsess": data.onsess,
                    });
                }
                else if (action === __1.DocumentAction.update && (data.to !== undefined &&
                    data.to.length > 1)) {
                    yield ref.update({
                        "signed": data.signed,
                        "cancelled": data.cancelled,
                        "to": data.to,
                        "onsess": data.onsess,
                    });
                }
                else {
                    yield ref.delete();
                }
            });
        }
        /**
         * Enrol a new nin for BankIDs
         * @param {Record<string, unknown>} params required arguments
         * @return {Promise<void>} returns list.
         */
        enrolNIN(params) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const getter = new Getters(this.db);
                    const exists = yield getter.doesDocumentExist(params.person.id, __1.DocumentReference.users);
                    if (exists)
                        throw new __1.SeverError("NIN already exists");
                    yield this.db.
                        collection(__1.DocumentReference.users).doc(params.person.id)
                        .update({
                        "content": __1.FunctionHelpers.encryptJSON(params.person.toMap(), params.cipher),
                    });
                }
                catch (_) {
                    params.person.unResolveMaps();
                    yield this.db.
                        collection(__1.DocumentReference.users).doc(params.person.id)
                        .set({
                        "content": __1.FunctionHelpers.encryptJSON(params.person.toMap(), params.cipher),
                    });
                }
            });
        }
        /**
         * Create a standalone
          * @param {IdentificationModel} person owner of the new BankID
          * @param {StandaloneBankID} id BankID to be created
         * @return {Promise<void>} returns list.
         */
        createBankID(person, id) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.db.
                    collection(__1.DocumentReference.users).doc(person.id)
                    .collection(__1.DocumentReference.issuedIDs).doc(id.id)
                    .set(id.toMap());
            });
        }
        attachUserToConsumer(params, modify = false) {
            return __awaiter(this, void 0, void 0, function* () {
                const query = this.db.
                    collection(__1.DocumentReference.consumers).doc(params.org)
                    .collection(__1.DocumentReference.consumerUser)
                    .doc(params.resource.id);
                if (modify) {
                    yield query.update(params.resource.toMap());
                }
                else {
                    yield query.set(params.resource.toMap());
                }
            });
        }
        /**
         * Creates a new OIDC session in the database.
         * @param data - The OIDC session object to be created.
         * @throws {SeverError} If the provided OIDC session object has an invalid ID.
         * @returns A Promise that resolves when the OIDC session is successfully created.
         */
        createOIDCSession(data) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!data.id.startsWith(__1.DocumentTypes.oidc))
                    throw new __1.SeverError("Invalid OIDC session object");
                yield this.db
                    .collection(__1.DocumentReference.sessions).doc(data.id)
                    .set(data.toMap());
            });
        }
        /**
         * Create nin invitation request
          * @param {InvitationRequest} person owner of the new BankID
         * @return {Promise<void>} returns list.
         */
        manageNINInvitationRequest(person, modify = false) {
            return __awaiter(this, void 0, void 0, function* () {
                const query = this.db.collection(__1.DocumentReference.invitations).doc(person.id);
                if (modify) {
                    yield query.update(person.toMap());
                }
                else {
                    yield query.set(person.toMap());
                }
            });
        }
        /**
         * Create pasby request
          * @param {PendingApprovals} person owner of the new BankID
         * @return {Promise<void>} returns list.
         */
        manageRegistrationRequests(person, modify = false) {
            return __awaiter(this, void 0, void 0, function* () {
                const query = this.db.collection(__1.DocumentReference.pending).doc(person.nin);
                if (modify) {
                    yield query.update(person.toMap());
                }
                else {
                    yield query.set(person.toMap());
                }
            });
        }
        /**
         * Change pending to false for pasby with nin request
          * @param {PendingApprovals} person owner of the new BankID
         * @return {Promise<void>} returns list.
         */
        markRegistrationRequest(nin, completed) {
            return __awaiter(this, void 0, void 0, function* () {
                const query = this.db.collection(__1.DocumentReference.pending).doc(nin);
                yield query.update({
                    pending: completed,
                });
            });
        }
        /**
         * Log image of stored nin
          * @param {IdentificationModel} person owner of the new BankID
          * @param {string} image base 64 content
         * @return {Promise<void>} returns list.
         */
        logRegisteredNinImage(person, image) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.db.
                    collection(__1.DocumentReference.users).doc(person.id)
                    .collection("image").doc("image_01")
                    .set({
                    "photo": image,
                });
            });
        }
        /**
         * Modify identification request in database
         * @param {IdentificationRequest} data model structure
         * @param {boolean} setter leave as true if
         * function is to create a new instance of
         * document else edit the request
         * @return {Promise<void>} void.
         */
        updateFlowHistory(data, setter = true) {
            return __awaiter(this, void 0, void 0, function* () {
                const query = this.db.
                    collection(__1.DocumentReference.users).doc(data.user)
                    .collection(__1.DocumentReference.history).doc(data.id);
                if (setter) {
                    yield query.set(data.toMap());
                }
                else {
                    yield query.update(data.toMap());
                }
            });
        }
        /// Consumer & Console relationship 
        /**
         * Modify consumer billing history on console
         * @param {BillingModel} data model structure
         * @param {ConsumerModel} consumer model structure
         * @param {boolean} setter leave as true if function is to create a new instance of document else edit the request
         * @return {Promise<void>} void.
         */
        updateConsumerBillingHistory(data, consumer, setter) {
            return __awaiter(this, void 0, void 0, function* () {
                const query = this.db.
                    collection(__1.DocumentReference.consumers).doc(consumer.id)
                    .collection(__1.DocumentReference.bill).doc(data.timeline);
                if (setter) {
                    yield query.set(data.toMap());
                }
                else {
                    yield query.update(data.toMap());
                }
            });
        }
        /**
         * Add e-signature for document sign flow
         * @param {string} id document id
         * @param {eSignature} data map entry
         * @return {Promise<void>} void.
         */
        addEDocSign(id, data) {
            return __awaiter(this, void 0, void 0, function* () {
                const query = this.db.
                    collection(__1.DocumentReference.documents).doc(id);
                yield query.update({
                    "signatures": admin.firestore.FieldValue.arrayUnion(data),
                });
            });
        }
        /**
         * Modify e-signature request in database
         * @param {Documents} data model structure
         * @param {boolean} setter leave as true if
         * function is to create a new instance of
         * document else edit the request
         * @return {Promise<void>} void.
         */
        modifyEDocument(data, setter = false) {
            return __awaiter(this, void 0, void 0, function* () {
                const query = this.db.
                    collection(__1.DocumentReference.documents).doc(data.id);
                if (setter) {
                    yield query.set(data.toMap());
                }
                else {
                    yield query.update(data.toMap());
                }
            });
        }
        /**
         * Manage new issued digital BankID/pasby
         * @param {string} ref registered nin to check for issued bank ids
         * @param {StandaloneBankID} data model structure
         * @param {boolean} modify true if create new doc else false
         * @return {Promise<void>} void.
         */
        manageIssuedBankID(ref, data, modify = false) {
            return __awaiter(this, void 0, void 0, function* () {
                const doc = this.db.collection(__1.DocumentReference.users).
                    doc(ref).collection(__1.DocumentReference.issuedIDs)
                    .doc(data.id);
                if (modify) {
                    yield doc.update(data.toMap());
                }
                else {
                    yield doc.set(data.toMap());
                }
            });
        }
        /**
         * Manage app
         * @param consumer
         * @param data
         * @param modify default is false
         */
        manageConsumerApp(consumer, data, modify = false) {
            return __awaiter(this, void 0, void 0, function* () {
                const doc = this.db.collection(__1.DocumentReference.consumers).
                    doc(consumer).collection(__1.DocumentReference.apps)
                    .doc(data.id);
                if (modify) {
                    yield doc.update(data.toMap());
                }
                else {
                    yield doc.set(data.toMap());
                }
            });
        }
        /**
         * modify identification model (bankid) to database
         * @param {Record<string, unknown>} params arguments
         * @param {boolean} create true if user model never exists else false and we create one
         * @return {Promise<void>} void.
         */
        modifyIdentificationCollection(params, create = false) {
            return __awaiter(this, void 0, void 0, function* () {
                params.data.unResolveMaps();
                const ref = this.db.
                    collection(__1.DocumentReference.users).doc(params.data.id);
                if (ref && create) {
                    yield ref.set({
                        "content": __1.FunctionHelpers.encryptJSON(params.data.toMap(), params.cipher),
                    });
                }
                else {
                    yield ref.update({
                        "content": __1.FunctionHelpers.encryptJSON(params.data.toMap(), params.cipher),
                    });
                }
            });
        }
        /**
         * modify consumer model  to database
         * @param {boolean} create true if user model never exists else false and we create one
         * @return {Promise<void>} void.
         */
        modifyVendorsCollection(params, create = false) {
            return __awaiter(this, void 0, void 0, function* () {
                params.data.unResolveMaps();
                const ref = this.db.
                    collection(__1.DocumentReference.vendor).doc(params.data.id);
                if (ref && create) {
                    yield ref.set({
                        "content": __1.FunctionHelpers.encryptJSON(params.data.toMap(), params.cipher),
                    });
                }
                else {
                    yield ref.update({
                        "content": __1.FunctionHelpers.encryptJSON(params.data.toMap(), params.cipher),
                    });
                }
            });
        }
        createOrUpdateFirebaseDocument(options, setter = false) {
            return __awaiter(this, void 0, void 0, function* () {
                const query = this.db.collection(options.collectionPath).doc(options.docID);
                if (setter) {
                    yield query.set(options.data);
                }
                else {
                    yield query.update(options.data);
                }
                return;
            });
        }
    }
    DatabaseFunctions.Management = Management;
    class Cleaners {
        constructor(admin) {
            this.db = admin;
        }
        cleanRawFlow(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const ref = this.db.
                    collection(__1.DocumentReference.requests)
                    .doc(id);
                yield ref.delete();
            });
        }
        cleanSession(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const ref = this.db.
                    collection(__1.DocumentReference.sessions)
                    .doc(id);
                yield ref.delete();
            });
        }
        deleteIssuedID(bid, eid) {
            return __awaiter(this, void 0, void 0, function* () {
                const ref = this.db.
                    collection(__1.DocumentReference.users)
                    .doc(bid).collection(__1.DocumentReference.issuedIDs).doc(eid);
                yield ref.delete();
            });
        }
    }
    DatabaseFunctions.Cleaners = Cleaners;
    class ConsoleUI {
        constructor(admin) {
            this.db = admin;
        }
        retrieveConsoleUsers() {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db.collection(__1.DocumentReference.console).get();
                return source.docs.map((e) => __1.ConsoleUser.fromJson(e.data()));
            });
        }
        getConsoleUser(email) {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db.
                    collection(__1.DocumentReference.console)
                    .where('email', '==', email).get();
                if (source.empty)
                    throw new __1.SeverError(`No such user with email: ${email} exists.`, 400, 'authorization_error');
                return source.docs.map((e) => __1.ConsoleUser.fromJson(e.data()))[0];
            });
        }
        resolveConsoleUser(email) {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db.
                    collection(__1.DocumentReference.console)
                    .where('email', '==', email).get();
                if (source.empty)
                    return;
                return source.docs.map((e) => __1.ConsoleUser.fromJson(e.data()))[0];
            });
        }
        /**
         * Get users sessions
         * @param {string} user console user
         * @return {Promise<SessionData[]>} returns list.
         */
        getConsoleUserSessions(user) {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db.
                    collection(__1.DocumentReference.console).doc(user)
                    .collection(__1.DocumentReference.sessions).get();
                return source.docs.map((e) => __1.SessionData.fromJson(e.data()));
            });
        }
        /**
         * modify console session to database
         * @param {ConsoleUser} user console user who owns session
         * @param {SessionData} data model structure
         * @param {boolean} create true if user model never
         *  exists else false and we create one
         * @return {Promise<void>} void.
         */
        modifyConsoleUserSession(user, data, create = true) {
            return __awaiter(this, void 0, void 0, function* () {
                data.unResolveMaps();
                const ref = this.db.
                    collection(__1.DocumentReference.console).doc(user.id).
                    collection(__1.DocumentReference.sessions).doc(data.id);
                if (ref && create) {
                    yield ref.set(data.toMap());
                }
                else {
                    yield ref.update(data.toMap());
                }
            });
        }
        /**
        * Get user organizations map
        * @param {ConsoleUser} member console user model
        * @return {Promise<Record<string, unknown>[]>} returns app
        */
        getOrganizationsForMember(member, omitted) {
            return __awaiter(this, void 0, void 0, function* () {
                const getter = new Getters(this.db);
                const consumers = yield getter.retrieveConsumers();
                const orgs = [];
                for (let i = 0; i < consumers.length; i++) {
                    const org = consumers[i];
                    if (member.organizations.includes(org.id)) {
                        orgs.push(org.toMap(omitted));
                    }
                }
                return orgs;
            });
        }
        /**
         * modify console session to database
         * @param {ConsumerUserReference} consumer console user who owns session
         * @param {SessionData} data model structure
         * @param {boolean} create true if user model never
         *  exists else false and we create one
         * @return {Promise<void>} void.
         */
        modifyConsumerUserReference(consumer, data, create = true) {
            return __awaiter(this, void 0, void 0, function* () {
                const ref = this.db.
                    collection(__1.DocumentReference.consumers).doc(consumer.id).
                    collection(__1.DocumentReference.members).doc(data.id);
                if (ref && create) {
                    yield ref.set(JSON.parse(JSON.stringify(data)));
                }
                else {
                    yield ref.update(JSON.parse(JSON.stringify(data)));
                }
            });
        }
        deleteApp(consumer, app) {
            return __awaiter(this, void 0, void 0, function* () {
                const ref = this.db.
                    collection(__1.DocumentReference.consumers)
                    .doc(consumer).collection(__1.DocumentReference.apps).doc(app);
                const exist = (yield ref.get()).exists;
                if (!exist)
                    throw new __1.SeverError(`App with id:${app} does not exist`, 400, 'invalid_request');
                yield ref.delete();
            });
        }
        deleteConsumer(consumer) {
            return __awaiter(this, void 0, void 0, function* () {
                const ref = this.db.
                    collection(__1.DocumentReference.consumers)
                    .doc(consumer);
                const exist = (yield ref.get()).exists;
                if (!exist)
                    throw new __1.SeverError(`Consumer with id:${consumer} does not exist`, 400, 'invalid_request');
                yield ref.delete();
            });
        }
    }
    DatabaseFunctions.ConsoleUI = ConsoleUI;
})(DatabaseFunctions = exports.DatabaseFunctions || (exports.DatabaseFunctions = {}));
//# sourceMappingURL=database.js.map