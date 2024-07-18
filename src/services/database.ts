import * as admin from "firebase-admin";
import {
  BillingModel, ClientApp, ConsumerModel,
  DocumentAction, DocumentReference, Documents,
  FunctionHelpers, IdentificationModel,
  IdentificationRequest, InvitationRequest, PendingApprovals, Requests,
  SeverError,
  StandaloneBankID, VendorModel,
  eSignature
} from "..";
import { LabsCipher } from "labs-sharable";

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
     * @return {Promise<ClientApp[]>} returns list.
     */
    public async getConsumerApps(id: string):
      Promise<ClientApp[]> {
      const source = await this.db.
        collection(DocumentReference.consumers).doc(id)
        .collection(DocumentReference.apps).get();
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

    /**
     * Grab flow session
     * @param {string} id the identifier
     * @return {Promise<StandaloneBankID>} returns list.
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
     * Get users signing history
     * @param {string} user registered user
     * @return {Promise<IdentificationRequest[]>} returns list.
     */
    public async getSigningHistory(user: string):
      Promise<IdentificationRequest[]> {
      const source = await this.db.
        collection(DocumentReference.users).doc(user)
        .collection(DocumentReference.history).get();
      return source.docs.map((e) => IdentificationRequest.fromJson(e.data()));
    }

    /**
     * Get confirmed flow from user history
     * @param {string} user registered user
     * @param {string} flow session id
     * @return {Promise<IdentificationRequest>} returns session.
     */
    public async getConfirmedSession(user: string, flow: string):
      Promise<IdentificationRequest | undefined> {
      const source = await this.db.
        collection(DocumentReference.users).doc(user)
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
        // const accounts = new Accounts(new Getters(this.db));
        // await accounts.getRegisteredUser({
        //   id: params.person.id,
        //   cipher: params.cipher,
        // });
        const getter = new Getters(this.db);
        const exists = await getter.doesDocumentExist(
          params.person.id,
          DocumentReference.users,
        );
        throw new SeverError("NIN already exists");
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
        });
      } else {
        await ref.update({
          "content": FunctionHelpers.encryptJSON(params.data.toMap(), params.cipher),
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
        });
      } else {
        await ref.update({
          "content": FunctionHelpers.encryptJSON(params.data.toMap(), params.cipher),
        });
      }
    }

  }



}