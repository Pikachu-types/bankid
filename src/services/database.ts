import * as admin from "firebase-admin";
import {
  BillingModel, ClientApp, ConsoleUser, ConsumerModel,
  ConsumerUserReference,
  DocumentAction, DocumentReference, DocumentTypes, Documents,
  FunctionHelpers, IdentificationModel,
  IdentificationRequest, InvitationRequest, PendingApprovals, Requests,
  SessionData,
  SeverError,
  StandaloneBankID, EIDUserResource, VendorModel,
  eSignature,
  UserRoles,
  makeAKeyFromIdentity,
  WebhookRetry,
  Http
} from "..";
import { LabsCipher, parseInterface, unixTimeStampNow } from "labs-sharable";
import { OIDCSession } from "../modules/models/public/oidc_session";
import { CompanyLogic } from "../modules/models/portal/logic";
import { TransactionModel } from "../modules/models/portal/payment.request";
import { InvoiceModel, OverageModel } from '../modules/models/portal/invoicing';
import { ProductType, Subscription } from "@pikachu/console-types";
import { SubscriptionModel } from "@pikachu/console-types";


export namespace DatabaseFunctions {

  /**
  * Database helper class
  */
  export class Getters {

    readonly db: admin.firestore.Firestore;

    constructor(admin: admin.firestore.Firestore) {
      this.db = admin;
    }

    /**
     * Go to database vendor collection and get all
     * available vendors
     * @param {string} cipher encryption key
     * @return {Promise<VendorModel[]>} returns list.
     */
    public async retrieveVendors(cipher: string): Promise<VendorModel[]> {
      const source = await this.db.collection(DocumentReference.vendor).get();
      return source.docs.map((e) => {
        if (e.data()["content"] !== undefined) {
          const data = FunctionHelpers.
            bankidCipherToString(cipher, e.data()["content"]);
          return VendorModel.fromJson(JSON.parse(data));
        } else {
          return VendorModel.fromJson(e.data());
        }
      });
    }

    /**
     * Go to database invitations collection and get all
     * @return {Promise<VendorModel[]>} returns list.
     */
    public async retrieveNINInvitations(): Promise<InvitationRequest[]> {
      const source = await this.db.collection(DocumentReference.invitations).get();
      return source.docs.map((e) => InvitationRequest.fromJson(e.data()));
    }

    /**
     * Go to database registration requests collection and get all
     * @return {Promise<VendorModel[]>} returns list.
     */
    public async retrieveRegistrationRequests(): Promise<PendingApprovals[]> {
      const source = await this.db.collection(DocumentReference.pending).get();
      return source.docs.map((e) => PendingApprovals.fromJson(e.data()));
    }

    /**
     * Go to database ids collection and get all
     * registered social security numbers nin
     * @param {string} cipher encryption key
     * @return {Promise<IdentificationModel[]>} returns list.
     */
    public async retrieveRegisteredNINs(cipher: string): Promise<IdentificationModel[]> {
      const source = await this.db.collection(DocumentReference.users).get();
      return source.docs.map((e) => {
        if (e.data()["content"] !== undefined) {
          const data = FunctionHelpers.
            bankidCipherToString(cipher, e.data()["content"]);
          return IdentificationModel.fromJson(JSON.parse(data));
        } else {
          return IdentificationModel.fromJson(e.data());
        }
      });
    }

    /**
     * Go to database ids collection and get all
     * issued bankids
     * @param {string} ref registered nin to check for issued bank ids
     * @return {Promise<StandaloneBankID[]>} returns list.
     */
    public async retrieveIssuedBankIDs(ref: string):
      Promise<StandaloneBankID[]> {
      const source = await this.db.collection(DocumentReference.users)
        .doc(ref).collection(DocumentReference.issuedIDs).get();
      return source.docs.map((e) => StandaloneBankID.fromJson(e.data()));
    }

    /**
     * Go to database ids collection and get
     * @param {string} ref registered nin to check for issued bank ids
     * @param {string} pass standalone identifier
     * @return {Promise<StandaloneBankID>} returns list.
     */
    public async getStandalonePass(ref: string, pass: string):
      Promise<StandaloneBankID> {
      const source = await this.db.collection(DocumentReference.users)
        .doc(ref).collection(DocumentReference.issuedIDs).doc(pass).get();
      if (!source.data()) throw new SeverError("The request pasby pass is invalid.");
      return StandaloneBankID.fromJson((source.data() as Record<string, unknown>))
    }

    /**
     * Go to database consumer collection and get all
     * available consumers
     * @return {Promise<ConsumerModel[]>} returns list.
     */
    public async retrieveConsumers(): Promise<ConsumerModel[]> {
      const source = await this.db.collection(DocumentReference.consumers).get();
      return source.docs.map((e) => ConsumerModel.fromJson(e.data()));
    }

    /**
     * Get consumer apps
     * @param {string} id consumer id
     * @param {string} environment type of apps to retrieve i.e production or test
     * @return {Promise<ClientApp[]>} returns list.
     */
    public async getConsumerApps(id: string, environment?: string):
      Promise<ClientApp[]> {
      let s;
      if (environment) {
        s = this.db.
          collection(DocumentReference.consumers).doc(id)
          .collection(DocumentReference.apps).where('type', '==', environment);
      } else {
        s = this.db.
          collection(DocumentReference.consumers).doc(id)
          .collection(DocumentReference.apps);
      }
      const source = await s.get();
      return source.docs.map((e) => ClientApp.fromJson(e.data()));
    }

    /**
     * Get consumer app
     * @param {string} consumer organisation on console
     * @param {string} app consumer app
     * @return {Promise<ClientApp>} returns list.
     */
    public async getConsumerApp(consumer: string, app: string):
      Promise<ClientApp> {
      const source = await this.db.
        collection(DocumentReference.consumers).doc(consumer)
        .collection(DocumentReference.apps).doc(app).get();
      if (!source.exists) throw new SeverError("The requested app does not exists.", 400);
      return ClientApp.fromJson((source.data() as Record<string, unknown>));
    }

    /**
     * Get consumer app
     * @param {string} consumer organisation on console
     * @return {Promise<ConsumerModel>} returns list.
     */
    public async getConsumer(consumer: string):
      Promise<ConsumerModel> {
      const source = await this.db.
        collection(DocumentReference.consumers).doc(consumer).get();
      if (!source.exists) throw new SeverError("The requested consumer does not exists.", 400);
      return ConsumerModel.fromJson((source.data() as Record<string, unknown>));
    }


    /**
     * Go to database request collection and
     * encrypted identification request
     * @param {string} jwt provide encryption key for jwt decoding
     * @return {Promise<IdentificationRequest[]>} returns list.
     */
    public async retrieveIdentificationRequests(jwt: string):
      Promise<IdentificationRequest[]> {
      const source = await this.db.collection(DocumentReference.requests).get();
      return source.docs.map((e) => {
        const content = LabsCipher.jwtDecode(e.data().request as string, jwt);
        const identification = IdentificationRequest
          .fromJson(content as Record<string, unknown>);
        identification.signed = e.data().signed as boolean;
        return identification;
      });
    }

    /**
     * Go to database request collection and get raw requests
     * @return {Promise<Requests[]>} returns list.
     */
    public async retrieveRawIdentificationRequests():
      Promise<Requests[]> {
      const source = await this.db.collection(DocumentReference.requests).get();
      return source.docs.map((e) => Requests.fromJson(e.data()));
    }


    public async retrieveOIDCSessions():
      Promise<OIDCSession[]> {
      const source = await this.db.collection(DocumentReference.sessions).get();
      return source.docs.map((e) => OIDCSession.fromJson(e.data()));
    }

    public async retrieveTransactions():
      Promise<TransactionModel[]> {
      const source = await this.db.collection(DocumentReference.transactions).get();
      return source.docs.map((e) => TransactionModel.fromJson(e.data()));
    }

    public async findTransactionByReference(reference: string) {
      const source = await this.db.
        collection(DocumentReference.transactions)
        .where('reference', '==', reference).get();
      if (source.empty) throw new SeverError(`Transaction of reference - ${reference} does not exists.`, 400, 'invalid_request');
      return source.docs.map((e) => TransactionModel.fromJson(e.data()))[0];
    }

    public async companyLogic():
      Promise<CompanyLogic> {
      const source = await this.db.collection(DocumentReference.operations).doc("logic").get();
      if (!source.exists) throw new SeverError("Operations logic could not be found", 400, 'db_error');
      return parseInterface(source.data()) as CompanyLogic;
    }

    /**
     * Grab flow session
     * @param {string} id the identifier
     * @return {Promise<Requests>} returns list.
     */
    public async retrieveRawIdentificationRequest(id: string):
      Promise<Requests | undefined> {
      const source = await this.db.collection(DocumentReference.requests)
        .doc(id).get();
      if (!source.exists) {
        return;
      }
      return Requests.fromJson((source.data() as Record<string, unknown>));
    }

    /**
    * Grab flow session
    * @param {string} id the identifier
    * @param {string} user identify the national
    * @return {Promise<IdentificationRequest>} returns list.
    */
    public async getSignedFlowRequest(id: string, user: string):
      Promise<IdentificationRequest | undefined> {
      const source = await this.db.collection(DocumentReference.users).doc(user).collection(DocumentReference.history)
        .doc(id).get();
      if (!source.exists) {
        return;
      }
      return IdentificationRequest.fromJson((source.data() as Record<string, unknown>));
    }

    /**
     * Get users signing history
     * @param {string} user registered user
     * @return {Promise<IdentificationRequest[]>} returns list.
     */
    public async getSigningHistory(user: string, options?: {
      limit: number;
      /**
       * Document ID reference to begin with
       */
      startAt?: string;
    }):
      Promise<IdentificationRequest[]> {
      let val = this.db.
        collection(DocumentReference.users).doc(user)
        .collection(DocumentReference.history)

      if (options) {
        if (options.startAt) {
          const docRef = this.db.collection(DocumentReference.users).doc(user)
            .collection(DocumentReference.history).doc(options.startAt);
          const snapshot = await docRef.get();

          val.startAt(snapshot);
        }

        val.limit(options.limit);
      }
      const source = await val.get();
      return source.docs.map((e) => IdentificationRequest.fromJson(e.data()));
    }

    /**
     * Retrieves an OIDC session from the database using the provided token.
     *
     * @param token - The token used to identify the OIDC session.
     * @returns A promise that resolves to an OIDCSession object if found, or undefined if not.
     * @throws ServerError if the session does not exist or has expired.
     */
    public async getOIDCSession(token: string):
      Promise<OIDCSession> {
      const source = await this.db.
        collection(DocumentReference.sessions).doc(token).get();
      if (!source.exists) throw new SeverError("Resource session must be invalid or has expired", 400);
      return OIDCSession.fromJson((source.data() as Record<string, unknown>));
    }

    /**
     * Retrieves a confirmed session for a specific user and flow from the database.
     * @param user The user identifier.
     * @param flow The flow identifier.
     * @returns A Promise that resolves to an IdentificationRequest object if found, otherwise undefined.
     * @throws {SeverError} If the flow request does not exist or has not been processed by any national.
     */
    public async getConfirmedSession(user: string, flow: string): Promise<IdentificationRequest | undefined> {
      const source = await this.db
        .collection(DocumentReference.users).doc(user)
        .collection(DocumentReference.history).doc(flow).get();
      if (!source.exists) throw new SeverError("No such flow request or it has not been processed by any national.", 400);
      return IdentificationRequest.fromJson((source.data() as Record<string, unknown>));
    }


    /**
     * Get consumers billing history
     * @param {string} consumer registered is
     * @return {Promise<IdentificationRequest[]>} returns list.
     */
    public async getApiBillingUsages(consumer: string):
      Promise<BillingModel[]> {
      const source = await this.db.
        collection(DocumentReference.consumers).doc(consumer)
        .collection(DocumentReference.bill).get();
      return source.docs.map((e) => BillingModel.fromJson(e.data()));
    }

    /**
     * Get e-documents
     * @return {Promise<Documents[]>} returns list.
     */
    public async getEDocs():
      Promise<Documents[]> {
      const source = await this.db.
        collection(DocumentReference.documents).get();
      return source.docs.map((e) => Documents.fromJson(e.data()));
    }

    public async getDocument({ id, collection }: {
      id: string, collection: DocumentReference
    }): Promise<Record<string, unknown>> {
      const source = await this.db.collection(collection).doc(id)
        .get();
      if (!source.exists) throw new SeverError("The request data object does not exist", 400);
      return parseInterface(source.data());
    }


    public async isUserAttachedToConsumer(params: {
      org: string,
      nin: string,
    })
      : Promise<EIDUserResource | undefined> {
      const source = await this.db.
        collection(DocumentReference.consumers).doc(params.org)
        .collection(DocumentReference.consumerUser)
        .where('national', '==', params.nin).get();
      if (source.empty) return;
      return source.docs.map((e) => EIDUserResource.fromJson(e.data()))[0];
    }

    public async eidsAttachedToThisConsumer(org: string)
      : Promise<EIDUserResource[]> {
      const source = await this.db.
        collection(DocumentReference.consumers).doc(org)
        .collection(DocumentReference.consumerUser).get();
      return source.docs.map((e) => EIDUserResource.fromJson(e.data()));
    }

    /**
     * A power function used to check if firestore document exist
     * @param {string} docID reference id
     * @param {string} collectionPath string path of collection
     *  i.e users/{user}/notification
     * @return {Promise<boolean>} nothing
     */
    public async doesDocumentExist(docID: string,
      collectionPath: string)
      : Promise<boolean> {
      const query = await this.db.
        collection(collectionPath).doc(docID).get();
      return query.exists;
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
    public async doesSubDocumentExist(subID: string, docID: string,
      collectionPath: string, subCollectionPath: string)
      : Promise<boolean> {
      const query = await this.db.
        collection(collectionPath).doc(docID).
        collection(subCollectionPath).doc(subID).get();
      return query.exists;
    }

  }

  /**
   * Database management setters, updates and deletes
   */
  export class Management {

    readonly db: admin.firestore.Firestore;

    constructor(admin: admin.firestore.Firestore) {
      this.db = admin;
    }

    /**
     * Upload identification request to database
     * @param {Record<string, unknown>} data model structure
     * @param {DocumentAction} action type of document action
     * @return {Promise<void>} void.
     */
    public async manageIdentificationRequest(
      data: Requests, action: DocumentAction)
      : Promise<void> {
      if (data.id === undefined) {
        throw new SeverError("Internal error: Invalid map object. No id found");
      }
      const ref = this.db.
        collection(DocumentReference.requests)
        .doc(data.id as string);

      if (action === DocumentAction.create) {
        await ref.set(data.toMap());
      } else if (action === DocumentAction.update &&
        data.to === undefined || data.to.length < 1) {
        await ref.update({
          "signed": data.signed,
          "cancelled": data.cancelled,
          "onsess": data.onsess,
        });
      } else if (action === DocumentAction.update && (data.to !== undefined &&
        data.to.length > 1)) {
        await ref.update({
          "signed": data.signed,
          "cancelled": data.cancelled,
          "to": data.to,
          "onsess": data.onsess,
        });
      } else {
        await ref.delete();
      }
    }

    /**
     * Enrol a new nin for BankIDs
     * @param {Record<string, unknown>} params required arguments 
     * @return {Promise<void>} returns list.
     */
    public async enrolNIN(params: {
      /**
       * owner of the new pasby
       */
      person: IdentificationModel,
      /**
       * encryption key
       */
      cipher: string
    })
      : Promise<void> {
      try {
        const getter = new Getters(this.db);
        const exists = await getter.doesDocumentExist(
          params.person.id,
          DocumentReference.users,
        );
        if (exists) throw new SeverError("NIN already exists");
        await this.db.
          collection(DocumentReference.users).doc(params.person.id)
          .update({
            "content": FunctionHelpers.encryptJSON(params.person.toMap(), params.cipher),
          });
      } catch (_) {
        params.person.unResolveMaps();
        await this.db.
          collection(DocumentReference.users).doc(params.person.id)
          .set({
            "content": FunctionHelpers.encryptJSON(params.person.toMap(), params.cipher),
          });
      }
    }


    /**
     * Create a standalone
      * @param {IdentificationModel} person owner of the new BankID
      * @param {StandaloneBankID} id BankID to be created
     * @return {Promise<void>} returns list.
     */
    public async createBankID(
      person: IdentificationModel, id: StandaloneBankID)
      : Promise<void> {
      await this.db.
        collection(DocumentReference.users).doc(person.id)
        .collection(DocumentReference.issuedIDs).doc(id.id)
        .set(id.toMap());
    }


    /**
     * Modify is false by default
     * @param params 
     * @param modify 
     */
    public async attachUserToConsumer(params: {
      org: string,
      resource: EIDUserResource,
    }, modify = false)
      : Promise<void> {
      const query = this.db.
        collection(DocumentReference.consumers).doc(params.org)
        .collection(DocumentReference.consumerUser)
        .doc(params.resource.id);

      if (modify) {
        await query.update(params.resource.toMap());
      } else {
        await query.set(params.resource.toMap());
      }
    }

    /**
     * Sends a webhook request to the specified URL with the provided body and retries on failure.
     * 
     * @param {Object} params - The parameters for sending the webhook.
     * @param {string} params.url - The URL to which the webhook request is sent.
     * @param {any} params.body - The body of the webhook request.
     * @param {string} params.documentId - The unique identifier of the document associated with the webhook.
     * @param {WebhookRetry["documentType"]} params.documentType - The type of the document associated with the webhook.
     * 
     * @returns {Promise<boolean>} - Returns a promise that resolves to true if the webhook is sent successfully, or false if it fails and is queued for retry.
     * 
     * @throws Will log an error message if the webhook request fails.
     */
    public async sendWebhookWithRetry({
      url,
      body,
      documentId,
      documentType,
    }: {
      url: string;
      body: any;
      documentId: string;
      documentType: WebhookRetry["documentType"];
    }): Promise<boolean> {
      try {
        await Http.post({ url, body });
        return true;
      } catch (error) {
        console.error(`Webhook failed for ${documentId}. Error:`, error);
        // Save failed webhook for retry
        const retry: WebhookRetry = {
          id: this.db.collection(DocumentReference.webhookRetries).doc().id,
          url,
          body,
          documentId,
          documentType,
          createdAt: unixTimeStampNow(),
          lastAttempt: unixTimeStampNow(),
          attempts: 1,
          maxAttempts: 5,
        };
        await this.db.collection(DocumentReference.webhookRetries).doc(retry.id).set(retry);
        return false;
      }
    }


    /**
     * Creates a new OIDC session in the database.
     * @param data - The OIDC session object to be created.
     * @throws {SeverError} If the provided OIDC session object has an invalid ID.
     * @returns A Promise that resolves when the OIDC session is successfully created.
     */
    public async createOIDCSession(data: OIDCSession): Promise<void> {
      if (!data.id.startsWith(DocumentTypes.oidc)) throw new SeverError("Invalid OIDC session object");
      await this.db
        .collection(DocumentReference.sessions).doc(data.id)
        .set(data.toMap());
    }


    /**
     * Create nin invitation request
      * @param {InvitationRequest} person owner of the new BankID
     * @return {Promise<void>} returns list.
     */
    public async manageNINInvitationRequest(
      person: InvitationRequest, modify = false)
      : Promise<void> {
      const query = this.db.collection(DocumentReference.invitations).doc(person.id);
      if (modify) {
        await query.update(person.toMap());
      } else {
        await query.set(person.toMap());
      }
    }

    /**
     * Create pasby request
      * @param {PendingApprovals} person owner of the new BankID
     * @return {Promise<void>} returns list.
     */
    public async manageRegistrationRequests(
      person: PendingApprovals, modify = false)
      : Promise<void> {
      const query = this.db.collection(DocumentReference.pending).doc(person.nin);
      if (modify) {
        await query.update(person.toMap());
      } else {
        await query.set(person.toMap());
      }
    }

    /**
     * Change pending to false for pasby with nin request
      * @param {PendingApprovals} person owner of the new BankID
     * @return {Promise<void>} returns list.
     */
    public async markRegistrationRequest(nin: string, completed: boolean)
      : Promise<void> {
      const query = this.db.collection(DocumentReference.pending).doc(nin);
      await query.update({
        pending: completed,
      });
    }

    /**
     * Log image of stored nin
      * @param {IdentificationModel} person owner of the new BankID
      * @param {string} image base 64 content
     * @return {Promise<void>} returns list.
     */
    public async logRegisteredNinImage(
      person: IdentificationModel, image: string)
      : Promise<void> {
      await this.db.
        collection(DocumentReference.users).doc(person.id)
        .collection("image").doc("image_01")
        .set({
          "photo": image,
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
    public async updateFlowHistory(
      data: IdentificationRequest, setter = true)
      : Promise<void> {
      const query = this.db.
        collection(DocumentReference.users).doc(data.user)
        .collection(DocumentReference.history).doc(data.id);
      if (setter) {
        await query.set(data.toMap());
      } else {
        await query.update(data.toMap());
      }
    }


    /// Consumer & Console relationship 
    /**
     * Modify consumer billing history on console
     * @param {BillingModel} data model structure
     * @param {ConsumerModel} consumer model structure
     * @param {boolean} setter leave as true if function is to create a new instance of document else edit the request
     * @return {Promise<void>} void.
     */
    public async updateConsumerBillingHistory(
      data: BillingModel, consumer: ConsumerModel,
      setter: boolean)
      : Promise<void> {
      const query = this.db.
        collection(DocumentReference.consumers).doc(consumer.id)
        .collection(DocumentReference.bill).doc(data.timeline);
      if (setter) {
        await query.set(data.toMap());
      } else {
        await query.update(data.toMap());
      }
    }

    /**
     * Add e-signature for document sign flow
     * @param {string} id document id
     * @param {eSignature} data map entry
     * @return {Promise<void>} void.
     */
    public async addEDocSign(id: string, data: eSignature)
      : Promise<void> {
      const query = this.db.
        collection(DocumentReference.documents).doc(id);
      await query.update({
        "signatures": admin.firestore.FieldValue.arrayUnion(data),
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
    public async modifyEDocument(
      data: Documents, setter = false)
      : Promise<void> {
      const query = this.db.
        collection(DocumentReference.documents).doc(data.id);
      if (setter) {
        await query.set(data.toMap());
      } else {
        await query.update(data.toMap());
      }
    }


    /**
     * Manage new issued digital BankID/pasby
     * @param {string} ref registered nin to check for issued bank ids
     * @param {StandaloneBankID} data model structure
     * @param {boolean} modify true if create new doc else false
     * @return {Promise<void>} void.
     */
    public async manageIssuedBankID(ref: string,
      data: StandaloneBankID, modify = false)
      : Promise<void> {
      const doc = this.db.collection(DocumentReference.users).
        doc(ref).collection(DocumentReference.issuedIDs)
        .doc(data.id);

      if (modify) {
        await doc.update(data.toMap());
      } else {
        await doc.set(data.toMap());
      }
    }


    /**
     * Manage app
     * @param consumer 
     * @param data 
     * @param modify default is false
     */
    public async manageConsumerApp(consumer: string,
      data: ClientApp, modify = false)
      : Promise<void> {
      const doc = this.db.collection(DocumentReference.consumers).
        doc(consumer).collection(DocumentReference.apps)
        .doc(data.id);
      if (modify) {
        await doc.update(data.toMap());
      } else {
        await doc.set(data.toMap());
      }
    }

    /**
     * modify identification model (bankid) to database
     * @param {Record<string, unknown>} params arguments
     * @param {boolean} create true if user model never exists else false and we create one
     * @return {Promise<void>} void.
     */
    public async modifyIdentificationCollection(params: {
      /**
       * model structure
       */
      data: IdentificationModel,
      cipher: string
    }, create: boolean = false)
      : Promise<void> {
      params.data.unResolveMaps();
      const ref = this.db.
        collection(DocumentReference.users).doc(params.data.id);
      if (ref && create) {
        await ref.set({
          "content": FunctionHelpers.encryptJSON(params.data.toMap(), params.cipher),
          "id": params.data.id,
        });
      } else {
        await ref.update({
          "content": FunctionHelpers.encryptJSON(params.data.toMap(), params.cipher),
          "id": params.data.id,
        });
      }
    }

    /**
     * modify consumer model  to database
     * @param {boolean} create true if user model never exists else false and we create one
     * @return {Promise<void>} void.
     */
    public async modifyVendorsCollection(params: {
      data: VendorModel,
      cipher: string,
    }, create = false)
      : Promise<void> {
      params.data.unResolveMaps();
      const ref = this.db.
        collection(DocumentReference.vendor).doc(params.data.id);
      if (ref && create) {
        await ref.set({
          "content": FunctionHelpers.encryptJSON(params.data.toMap(), params.cipher),
          "id": params.data.id,
        });
      } else {
        await ref.update({
          "content": FunctionHelpers.encryptJSON(params.data.toMap(), params.cipher),
          "id": params.data.id,
        });
      }
    }

    /**
     * 
     * @param options 
     * @param setter default is false
     * @returns 
     */
    public async createOrUpdateFirebaseDocument(options: {
      docID: string,
      collectionPath: string,
      data: Record<string, unknown>,
    }, setter = false)
      : Promise<void> {
      const query = this.db.collection(options.collectionPath).doc(options.docID);
      if (setter) {
        await query.set(options.data);
      } else {
        await query.update(options.data);
      }
      return;
    }
  }

  export class Cleaners {

    readonly db: admin.firestore.Firestore;

    constructor(admin: admin.firestore.Firestore) {
      this.db = admin;
    }

    public async cleanRawFlow(id: string): Promise<void> {
      const ref = this.db.
        collection(DocumentReference.requests)
        .doc(id);
      await ref.delete();
    }

    public async cleanSession(id: string): Promise<void> {
      const ref = this.db.
        collection(DocumentReference.sessions)
        .doc(id);
      await ref.delete();
    }

    public async deleteIssuedID(bid: string, eid: string): Promise<void> {
      const ref = this.db.
        collection(DocumentReference.users)
        .doc(bid).collection(DocumentReference.issuedIDs).doc(eid);
      await ref.delete();
    }
  }

  export class ConsoleUI {

    readonly db: admin.firestore.Firestore;

    constructor(admin: admin.firestore.Firestore) {
      this.db = admin;
    }


    public async retrieveConsoleUsers(): Promise<ConsoleUser[]> {
      const source = await this.db.collection(DocumentReference.console).get();
      return source.docs.map((e) => ConsoleUser.fromJson(e.data()));
    }

    public async getConsoleUser(email: string)
      : Promise<ConsoleUser> {
      const source = await this.db.
        collection(DocumentReference.console)
        .where('email', '==', email).get();
      if (source.empty) throw new SeverError(`No such user with email: ${email} exists.`, 400, 'authorization_error');
      return source.docs.map((e) => ConsoleUser.fromJson(e.data()))[0];
    }

    public async resolveConsoleUser(email: string)
      : Promise<ConsoleUser | undefined> {
      const source = await this.db.
        collection(DocumentReference.console)
        .where('email', '==', email).get();
      if (source.empty) return;
      return source.docs.map((e) => ConsoleUser.fromJson(e.data()))[0];
    }

    public async getConsumerMember(consumer: string, email: string) {
      const source = await this.db.
        collection(DocumentReference.consumers).doc(consumer).collection(DocumentReference.members)
        .where('email', '==', email).get();
      if (source.empty) throw new SeverError(`The user with email: ${email} is not attached to organization: ${consumer}`, 400, 'invalid_request');
      return source.docs.map((e) => parseInterface(e.data()) as ConsumerUserReference)[0];
    }

    public async checkConsumerMemberSilently(consumer: string, email: string) {
      const source = await this.db.
        collection(DocumentReference.consumers).doc(consumer).collection(DocumentReference.members)
        .where('email', '==', email).get();
      if (source.empty) return;
      return source.docs.map((e) => parseInterface(e.data()) as ConsumerUserReference)[0];
    }

    public async retrieveConsumerMembers(consumer: string, options?: {
      email?: string;
      role?: UserRoles
    }): Promise<ConsumerUserReference[]> {
      let s;
      if (options?.email) {
        s = this.db.
          collection(DocumentReference.consumers).doc(consumer).collection(DocumentReference.members)
          .where('email', '==', options.email);
      } else if (options?.role) {
        s = this.db.
          collection(DocumentReference.consumers).doc(consumer).collection(DocumentReference.members)
          .where('role', '==', options.role);
      } else {
        s = this.db.
          collection(DocumentReference.consumers).doc(consumer).collection(DocumentReference.members);
      }
      const source = await s.get();
      return source.docs.map((e) => parseInterface(e.data()) as ConsumerUserReference);
    }

    /**
     * Get users sessions
     * @param {string} user console user
     * @return {Promise<SessionData[]>} returns list.
     */
    public async getConsoleUserSessions(user: string):
      Promise<SessionData[]> {
      const source = await this.db.
        collection(DocumentReference.console).doc(user)
        .collection(DocumentReference.sessions).get();
      return source.docs.map((e) => SessionData.fromJson(e.data()));
    }

    /**
     * modify console session to database
     * @param {ConsoleUser} user console user who owns session
     * @param {SessionData} data model structure
     * @param {boolean} create true if user model never
     *  exists else false and we create one
     * @return {Promise<void>} void.
     */
    public async modifyConsoleUserSession(user: ConsoleUser,
      data: SessionData, create = true)
      : Promise<void> {
      data.unResolveMaps();
      const ref = this.db.
        collection(DocumentReference.console).doc(user.id).
        collection(DocumentReference.sessions).doc(data.id);
      if (ref && create) {
        await ref.set(data.toMap());
      } else {
        await ref.update(data.toMap());
      }
    }

    public async doesSubscriptionExist(product: ProductType, consumer: string):
      Promise<SubscriptionModel | undefined> {
      const ref = await this.db.
        collection(DocumentReference.subscriptions).
        where("product", "==", product)
        .where("consumer", "==", consumer)
        .limit(1).get();
      if (ref.empty) return;
      return SubscriptionModel.fromJson(ref.docs[0].data() as Subscription);
    }

    public async findSubscription(code: string):
      Promise<SubscriptionModel | undefined> {
      const ref = await this.db.
        collection(DocumentReference.subscriptions).
        where("subscription_code", "==", code)
        .limit(1).get();
      if (ref.empty) return;
      return SubscriptionModel.fromJson(ref.docs[0].data() as Subscription);
    }

    public async getSubscriptions(consumer: string):
      Promise<SubscriptionModel[]> {
      const ref = await this.db.
        collection(DocumentReference.subscriptions).
       where("consumer", "==", consumer)
       .get();
      if (ref.empty) return [];

      return ref.docs.map((doc) => SubscriptionModel.fromJson(doc.data() as Subscription));
    }

    public async subscribeConsumer(model: Subscription) {
      return await this.db.collection(DocumentReference.subscriptions).doc(model.id).set({
        ...model,
      });
    }

    /**
    * Get user organizations map
    * @param {ConsoleUser} member console user model
    * @return {Promise<Record<string, unknown>[]>} returns app
    */
    public async getOrganizationsForMember(member: ConsoleUser, cipher: string, omitted?: string[], detailsOmit?: string[])
      : Promise<Record<string, unknown>[]> {
      const getter = new Getters(this.db);
      const consumers = await getter.retrieveConsumers();
      const orgs: Record<string, unknown>[] = [];
      for (let i = 0; i < consumers.length; i++) {
        const org = consumers[i];
        if (member.organizations.includes(org.id)) {
          if (org.apiKey.includes("-vi")) {
            org.apis = {
              live: FunctionHelpers.bankidCipherString(makeAKeyFromIdentity(org.id), FunctionHelpers.bankidCipherToString(cipher, org.findApiKey("production"))),
              test: FunctionHelpers.bankidCipherString(makeAKeyFromIdentity(org.id), FunctionHelpers.bankidCipherToString(cipher, org.findApiKey("test"))),
            };
            orgs.push(org.toMap({ paths: omitted, detailPaths: detailsOmit }));
          } else {
            orgs.push(org.toMap({ paths: omitted, detailPaths: detailsOmit }));
          }
        }
      }
      return orgs;
    }

    /**
     * modify console session to database
     * @param {ConsumerUserReference} consumer console user who owns session
     * @param {SessionData} data model structure
     * @param {boolean} create default is true
     * @return {Promise<void>} void.
     */
    public async modifyConsumerUserReference(consumer: ConsumerModel, data: ConsumerUserReference, create = true)
      : Promise<void> {
      const ref = this.db.
        collection(DocumentReference.consumers).doc(consumer.id).
        collection(DocumentReference.members).doc(data.id);
      if (ref && create) {
        await ref.set(JSON.parse(JSON.stringify(data)));
      } else {
        await ref.update(JSON.parse(JSON.stringify(data)));
      }
    }

    public async deleteApp(consumer: string, app: string): Promise<void> {
      const ref = this.db.
        collection(DocumentReference.consumers)
        .doc(consumer).collection(DocumentReference.apps).doc(app);
      const exist = (await ref.get()).exists;
      if (!exist) throw new SeverError(`App with id:${app} does not exist`, 400, 'invalid_request');
      await ref.delete();
    }

    public async deleteMember(consumer: string, email: string): Promise<void> {
      const exist = await this.checkConsumerMemberSilently(consumer, email);
      if (!exist) throw new SeverError(`Member by email:${email} does not exist`, 400, 'invalid_request');
      const id = exist.id;
      await this.db.
        collection(DocumentReference.consumers).doc(consumer).
        collection(DocumentReference.members).doc(id).delete();
      return;
    }

    public async changeMemberRole(consumer: string, email: string, role: UserRoles): Promise<void> {
      const exist = await this.checkConsumerMemberSilently(consumer, email);

      if (!exist) throw new SeverError(`Member by email:${email} does not exist thus can't edit`, 400, 'invalid_request');
      const id = exist.id;
      await this.db.
        collection(DocumentReference.consumers).doc(consumer).
        collection(DocumentReference.members).doc(id).update({
          role: role
        });
      return;
    }

    public async deleteConsumer(consumer: string): Promise<void> {
      const ref = this.db.
        collection(DocumentReference.consumers)
        .doc(consumer);
      const exist = (await ref.get()).exists;
      if (!exist) throw new SeverError(`Consumer with id:${consumer} does not exist`, 400, 'invalid_request');
      await ref.delete();
    }

    /**
     * Modify invoicing document
     * @param {InvoiceModel} data the invoicing model
     * @param {boolean} setter false by default
     */
    public async modifyConsumerInvoicing({ data, consumer }: {
      data: InvoiceModel;
      consumer: string;
    }, setter = false)
      : Promise<void> {
      const query = this.db.
        collection(DocumentReference.consumers).doc(consumer)
        .collection(DocumentReference.invoicing).doc(data.id);
      if (setter) {
        await query.set(data.toMap());
      } else {
        await query.update(data.toMap());
      }
    }

    /**
     * Modify invoicing document
     * @param {InvoiceModel} data the invoicing model
     * @param {boolean} setter false by default
     */
    public async modifyConsumerOverage({ data, consumer }: {
      data: OverageModel;
      consumer: string;
    }, setter = false)
      : Promise<void> {
      const query = this.db.
        collection(DocumentReference.consumers).doc(consumer)
        .collection(DocumentReference.overage).doc(data.timeline);
      if (setter) {
        await query.set(data.toMap());
      } else {
        await query.update(data.toMap());
      }
    }

    /**
     * Get consumers invoicing history
     * @param {string} consumer registered is
     * @return {Promise<InvoiceModel[]>} returns list.
     */
    public async retrieveInvoices(consumer: string):
      Promise<InvoiceModel[]> {
      const source = await this.db.
        collection(DocumentReference.consumers).doc(consumer)
        .collection(DocumentReference.invoicing).get();
      return source.docs.map((e) => InvoiceModel.fromJson(e.data()));
    }

    /**
     * Get consumers overage history
     * @param {string} consumer registered is
     * @return {Promise<OverageModel[]>} returns list.
     */
    public async retrieveOverages(consumer: string):
      Promise<OverageModel[]> {
      const source = await this.db.
        collection(DocumentReference.consumers).doc(consumer)
        .collection(DocumentReference.invoicing).get();
      return source.docs.map((e) => OverageModel.fromJson(e.data()));
    }

    public async findInvoiceWithReference({ reference, consumer }: {
      reference: string;
      consumer: string;
    }) {
      const source = await this.db.
        collection(DocumentReference.consumers).doc(consumer).collection(DocumentReference.invoicing)
        .where('trxRef', '==', reference).get();
      if (source.empty) return;
      return source.docs.map((e) => InvoiceModel.fromJson(e.data()))[0]; 43
    }

    public async findInvoiceWithCode({ code, consumer }: {
      code: string;
      consumer: string;
    }) {
      const source = await this.db.
        collection(DocumentReference.consumers).doc(consumer).collection(DocumentReference.invoicing)
        .where('id', '==', code).get();
      if (source.empty) return;
      return source.docs.map((e) => InvoiceModel.fromJson(e.data()))[0];
    }
  }
}