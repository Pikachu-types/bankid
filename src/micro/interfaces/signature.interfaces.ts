/**
 * Signature flow request
 */
export type SignatureFlowRequest = {
  /**
   * social security number
   */
  nin: string;
  /**
   * string payload of this request
   */
  payload: string;
  /**
   * Request mode
   */
  mode: string;
  /**
   * Request action type
   */
  action: string;
  /**
   * Consumer webhook params [optional] if action is 'confirm'
   */
  webhook?: Record<string, unknown>;
  /**
   * attach any old tokens
   */
  token?: string;
  /**
   * Request origin ip
   */
  ip: string;
  /**
   * Service agent
   */
  useragent: string;
  /**
   * App secret from header (v2 and above)
   */
  secret?: string;
  /**
   * Consumer api key (v2 and above)
   */
  apikey?: string;
};

/**
 * Wildcard signature flow request
 */
export type WildcardSignatureFlowRequest = {
  /**
   * string payload of this request
   */
  payload: string;
  /**
   * Request mode
   */
  mode: string;
  /**
   * Request action type
   */
  action: string;
  /**
   * Consumer webhook params [optional] if action is 'confirm'
   */
  webhook?: Record<string, unknown>;
  /**
   * attach any old tokens
   */
  token?: string;
  /**
   * Request origin ip
   */
  ip: string;
  /**
   * Service agent
   */
  useragent: string;
  /**
   * App secret from header (v2 and above)
   */
  secret?: string;
  /**
   * Consumer api key (v2 and above)
   */
  apikey?: string;
};