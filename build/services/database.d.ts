import * as admin from "firebase-admin";
import { BillingModel, ClientApp, ConsoleUser, ConsumerModel, ConsumerUserReference, DocumentAction, Documents, IdentificationModel, IdentificationRequest, InvitationRequest, PendingApprovals, Requests, SessionData, StandaloneBankID, EIDUserResource, VendorModel, eSignature, UserRoles } from "..";
import { OIDCSession } from "../modules/models/public/oidc_session";
import { CompanyLogic } from "../modules/models/portal/logic";
import { TransactionModel } from "../modules/models/portal/payment.request";
export declare namespace DatabaseFunctions {
    /**
    * Database helper class
    */
    class Getters {
        readonly db: admin.firestore.Firestore;
        constructor(admin: admin.firestore.Firestore);
        /**
         * Go to database vendor collection and get all
         * available vendors
         * @param {string} cipher encryption key
         * @return {Promise<VendorModel[]>} returns list.
         */
        retrieveVendors(cipher: string): Promise<VendorModel[]>;
        /**
         * Go to database invitations collection and get all
         * @return {Promise<VendorModel[]>} returns list.
         */
        retrieveNINInvitations(): Promise<InvitationRequest[]>;
        /**
         * Go to database registration requests collection and get all
         * @return {Promise<VendorModel[]>} returns list.
         */
        retrieveRegistrationRequests(): Promise<PendingApprovals[]>;
        /**
         * Go to database ids collection and get all
         * registered social security numbers nin
         * @param {string} cipher encryption key
         * @return {Promise<IdentificationModel[]>} returns list.
         */
        retrieveRegisteredNINs(cipher: string): Promise<IdentificationModel[]>;
        /**
         * Go to database ids collection and get all
         * issued bankids
         * @param {string} ref registered nin to check for issued bank ids
         * @return {Promise<StandaloneBankID[]>} returns list.
         */
        retrieveIssuedBankIDs(ref: string): Promise<StandaloneBankID[]>;
        /**
         * Go to database ids collection and get
         * @param {string} ref registered nin to check for issued bank ids
         * @param {string} pass standalone identifier
         * @return {Promise<StandaloneBankID>} returns list.
         */
        getStandalonePass(ref: string, pass: string): Promise<StandaloneBankID>;
        /**
         * Go to database consumer collection and get all
         * available consumers
         * @return {Promise<ConsumerModel[]>} returns list.
         */
        retrieveConsumers(): Promise<ConsumerModel[]>;
        /**
         * Get consumer apps
         * @param {string} id consumer id
         * @param {string} environment type of apps to retrieve i.e production or test
         * @return {Promise<ClientApp[]>} returns list.
         */
        getConsumerApps(id: string, environment?: string): Promise<ClientApp[]>;
        /**
         * Get consumer app
         * @param {string} consumer organisation on console
         * @param {string} app consumer app
         * @return {Promise<ClientApp>} returns list.
         */
        getConsumerApp(consumer: string, app: string): Promise<ClientApp>;
        /**
         * Get consumer app
         * @param {string} consumer organisation on console
         * @return {Promise<ConsumerModel>} returns list.
         */
        getConsumer(consumer: string): Promise<ConsumerModel>;
        /**
         * Go to database request collection and
         * encrypted identification request
         * @param {string} jwt provide encryption key for jwt decoding
         * @return {Promise<IdentificationRequest[]>} returns list.
         */
        retrieveIdentificationRequests(jwt: string): Promise<IdentificationRequest[]>;
        /**
         * Go to database request collection and get raw requests
         * @return {Promise<Requests[]>} returns list.
         */
        retrieveRawIdentificationRequests(): Promise<Requests[]>;
        retrieveOIDCSessions(): Promise<OIDCSession[]>;
        retrieveTransactions(): Promise<TransactionModel[]>;
        findTransactionByReference(reference: string): Promise<TransactionModel>;
        companyLogic(): Promise<CompanyLogic>;
        /**
         * Grab flow session
         * @param {string} id the identifier
         * @return {Promise<Requests>} returns list.
         */
        retrieveRawIdentificationRequest(id: string): Promise<Requests | undefined>;
        /**
        * Grab flow session
        * @param {string} id the identifier
        * @param {string} user identify the national
        * @return {Promise<IdentificationRequest>} returns list.
        */
        getSignedFlowRequest(id: string, user: string): Promise<IdentificationRequest | undefined>;
        /**
         * Get users signing history
         * @param {string} user registered user
         * @return {Promise<IdentificationRequest[]>} returns list.
         */
        getSigningHistory(user: string, options?: {
            limit: number;
            /**
             * Document ID reference to begin with
             */
            startAt?: string;
        }): Promise<IdentificationRequest[]>;
        /**
         * Retrieves an OIDC session from the database using the provided token.
         *
         * @param token - The token used to identify the OIDC session.
         * @returns A promise that resolves to an OIDCSession object if found, or undefined if not.
         * @throws ServerError if the session does not exist or has expired.
         */
        getOIDCSession(token: string): Promise<OIDCSession>;
        /**
         * Retrieves a confirmed session for a specific user and flow from the database.
         * @param user The user identifier.
         * @param flow The flow identifier.
         * @returns A Promise that resolves to an IdentificationRequest object if found, otherwise undefined.
         * @throws {SeverError} If the flow request does not exist or has not been processed by any national.
         */
        getConfirmedSession(user: string, flow: string): Promise<IdentificationRequest | undefined>;
        /**
         * Get consumers billing history
         * @param {string} consumer registered is
         * @return {Promise<IdentificationRequest[]>} returns list.
         */
        getApiBillingUsages(consumer: string): Promise<BillingModel[]>;
        /**
         * Get e-documents
         * @return {Promise<Documents[]>} returns list.
         */
        getEDocs(): Promise<Documents[]>;
        isUserAttachedToConsumer(params: {
            org: string;
            nin: string;
        }): Promise<EIDUserResource | undefined>;
        eidsAttachedToThisConsumer(org: string): Promise<EIDUserResource[]>;
        /**
         * A power function used to check if firestore document exist
         * @param {string} docID reference id
         * @param {string} collectionPath string path of collection
         *  i.e users/{user}/notification
         * @return {Promise<boolean>} nothing
         */
        doesDocumentExist(docID: string, collectionPath: string): Promise<boolean>;
        /**
         * A power function used to check if firestore sub document exist
         * i.e consumers/{docID}/apps/{subID}
         * @param {string} subID main document in sub collection being looked for
         * @param {string} docID reference id
         * @param {string} collectionPath string path of collection
         * @param {string} subCollectionPath string path of sub collection
         * @return {Promise<boolean>} nothing
         */
        doesSubDocumentExist(subID: string, docID: string, collectionPath: string, subCollectionPath: string): Promise<boolean>;
    }
    /**
     * Database management setters, updates and deletes
     */
    class Management {
        readonly db: admin.firestore.Firestore;
        constructor(admin: admin.firestore.Firestore);
        /**
         * Upload identification request to database
         * @param {Record<string, unknown>} data model structure
         * @param {DocumentAction} action type of document action
         * @return {Promise<void>} void.
         */
        manageIdentificationRequest(data: Requests, action: DocumentAction): Promise<void>;
        /**
         * Enrol a new nin for BankIDs
         * @param {Record<string, unknown>} params required arguments
         * @return {Promise<void>} returns list.
         */
        enrolNIN(params: {
            /**
             * owner of the new pasby
             */
            person: IdentificationModel;
            /**
             * encryption key
             */
            cipher: string;
        }): Promise<void>;
        /**
         * Create a standalone
          * @param {IdentificationModel} person owner of the new BankID
          * @param {StandaloneBankID} id BankID to be created
         * @return {Promise<void>} returns list.
         */
        createBankID(person: IdentificationModel, id: StandaloneBankID): Promise<void>;
        attachUserToConsumer(params: {
            app: string;
            org: string;
            resource: EIDUserResource;
        }, modify?: boolean): Promise<void>;
        /**
         * Creates a new OIDC session in the database.
         * @param data - The OIDC session object to be created.
         * @throws {SeverError} If the provided OIDC session object has an invalid ID.
         * @returns A Promise that resolves when the OIDC session is successfully created.
         */
        createOIDCSession(data: OIDCSession): Promise<void>;
        /**
         * Create nin invitation request
          * @param {InvitationRequest} person owner of the new BankID
         * @return {Promise<void>} returns list.
         */
        manageNINInvitationRequest(person: InvitationRequest, modify?: boolean): Promise<void>;
        /**
         * Create pasby request
          * @param {PendingApprovals} person owner of the new BankID
         * @return {Promise<void>} returns list.
         */
        manageRegistrationRequests(person: PendingApprovals, modify?: boolean): Promise<void>;
        /**
         * Change pending to false for pasby with nin request
          * @param {PendingApprovals} person owner of the new BankID
         * @return {Promise<void>} returns list.
         */
        markRegistrationRequest(nin: string, completed: boolean): Promise<void>;
        /**
         * Log image of stored nin
          * @param {IdentificationModel} person owner of the new BankID
          * @param {string} image base 64 content
         * @return {Promise<void>} returns list.
         */
        logRegisteredNinImage(person: IdentificationModel, image: string): Promise<void>;
        /**
         * Modify identification request in database
         * @param {IdentificationRequest} data model structure
         * @param {boolean} setter leave as true if
         * function is to create a new instance of
         * document else edit the request
         * @return {Promise<void>} void.
         */
        updateFlowHistory(data: IdentificationRequest, setter?: boolean): Promise<void>;
        /**
         * Modify consumer billing history on console
         * @param {BillingModel} data model structure
         * @param {ConsumerModel} consumer model structure
         * @param {boolean} setter leave as true if function is to create a new instance of document else edit the request
         * @return {Promise<void>} void.
         */
        updateConsumerBillingHistory(data: BillingModel, consumer: ConsumerModel, setter: boolean): Promise<void>;
        /**
         * Add e-signature for document sign flow
         * @param {string} id document id
         * @param {eSignature} data map entry
         * @return {Promise<void>} void.
         */
        addEDocSign(id: string, data: eSignature): Promise<void>;
        /**
         * Modify e-signature request in database
         * @param {Documents} data model structure
         * @param {boolean} setter leave as true if
         * function is to create a new instance of
         * document else edit the request
         * @return {Promise<void>} void.
         */
        modifyEDocument(data: Documents, setter?: boolean): Promise<void>;
        /**
         * Manage new issued digital BankID/pasby
         * @param {string} ref registered nin to check for issued bank ids
         * @param {StandaloneBankID} data model structure
         * @param {boolean} modify true if create new doc else false
         * @return {Promise<void>} void.
         */
        manageIssuedBankID(ref: string, data: StandaloneBankID, modify?: boolean): Promise<void>;
        /**
         * Manage app
         * @param consumer
         * @param data
         * @param modify default is false
         */
        manageConsumerApp(consumer: string, data: ClientApp, modify?: boolean): Promise<void>;
        /**
         * modify identification model (bankid) to database
         * @param {Record<string, unknown>} params arguments
         * @param {boolean} create true if user model never exists else false and we create one
         * @return {Promise<void>} void.
         */
        modifyIdentificationCollection(params: {
            /**
             * model structure
             */
            data: IdentificationModel;
            cipher: string;
        }, create?: boolean): Promise<void>;
        /**
         * modify consumer model  to database
         * @param {boolean} create true if user model never exists else false and we create one
         * @return {Promise<void>} void.
         */
        modifyVendorsCollection(params: {
            data: VendorModel;
            cipher: string;
        }, create?: boolean): Promise<void>;
        /**
         *
         * @param options
         * @param setter default is false
         * @returns
         */
        createOrUpdateFirebaseDocument(options: {
            docID: string;
            collectionPath: string;
            data: Record<string, unknown>;
        }, setter?: boolean): Promise<void>;
    }
    class Cleaners {
        readonly db: admin.firestore.Firestore;
        constructor(admin: admin.firestore.Firestore);
        cleanRawFlow(id: string): Promise<void>;
        cleanSession(id: string): Promise<void>;
        deleteIssuedID(bid: string, eid: string): Promise<void>;
    }
    class ConsoleUI {
        readonly db: admin.firestore.Firestore;
        constructor(admin: admin.firestore.Firestore);
        retrieveConsoleUsers(): Promise<ConsoleUser[]>;
        getConsoleUser(email: string): Promise<ConsoleUser>;
        resolveConsoleUser(email: string): Promise<ConsoleUser | undefined>;
        getConsumerMember(consumer: string, email: string): Promise<ConsumerUserReference>;
        checkConsumerMemberSilently(consumer: string, email: string): Promise<ConsumerUserReference | undefined>;
        retrieveConsumerMembers(consumer: string, options?: {
            email?: string;
            role?: UserRoles;
        }): Promise<ConsumerUserReference[]>;
        /**
         * Get users sessions
         * @param {string} user console user
         * @return {Promise<SessionData[]>} returns list.
         */
        getConsoleUserSessions(user: string): Promise<SessionData[]>;
        /**
         * modify console session to database
         * @param {ConsoleUser} user console user who owns session
         * @param {SessionData} data model structure
         * @param {boolean} create true if user model never
         *  exists else false and we create one
         * @return {Promise<void>} void.
         */
        modifyConsoleUserSession(user: ConsoleUser, data: SessionData, create?: boolean): Promise<void>;
        /**
        * Get user organizations map
        * @param {ConsoleUser} member console user model
        * @return {Promise<Record<string, unknown>[]>} returns app
        */
        getOrganizationsForMember(member: ConsoleUser, omitted?: string[], detailsOmit?: string[]): Promise<Record<string, unknown>[]>;
        /**
         * modify console session to database
         * @param {ConsumerUserReference} consumer console user who owns session
         * @param {SessionData} data model structure
         * @param {boolean} create default is true
         * @return {Promise<void>} void.
         */
        modifyConsumerUserReference(consumer: ConsumerModel, data: ConsumerUserReference, create?: boolean): Promise<void>;
        deleteApp(consumer: string, app: string): Promise<void>;
        deleteMember(consumer: string, email: string): Promise<void>;
        changeMemberRole(consumer: string, email: string, role: UserRoles): Promise<void>;
        deleteConsumer(consumer: string): Promise<void>;
    }
}
