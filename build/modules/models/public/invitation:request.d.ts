/**
 * Get a pasby nin invitation request
*/
export declare class InvitationRequest {
    nin: string;
    name: string;
    id: string;
    admin: string;
    iat: number;
    exp: number;
    used: boolean;
    /**
     * Change record to this class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {InvitationRequest} this class
     */
    static fromJson(obj: Record<string, unknown>): InvitationRequest;
    /**
     * This class handler to json
     * @return {string} text
     */
    toJsonString(): string;
    /**
     * Helper class function to find one specific object based on id
     *
     * @param {InvitationRequest[]} list an array to sort from and find given
     * @param {string} id provide the needed id to match for
     * @return {InvitationRequest | undefined} found object else undefined
     */
    static findOne(list: InvitationRequest[], id: string): InvitationRequest | undefined;
    /**
     * Helper class function to create invitation
     *
     * @param {string} nin identity to invite
     * @param {string} admin admin identity who created invite
     * @param {string} name naming info
     * @return {InvitationRequest} created
     */
    static create(nin: string, admin: string, name: string): InvitationRequest;
    /**
    * get document in map format
    * @return { Record<string, unknown>} returns doc map .
    */
    toMap(): Record<string, unknown>;
}
