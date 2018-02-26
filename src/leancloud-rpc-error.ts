/** 
 * FOR BOTH
 * define leancloud rpc error code
*/

export enum LeancloudRpcError {
    ParseError = -32700, // An error occurred on the server while parsing the JSON text.
    InternalError = -32603,	// Internal JSON-RPC error.
    InvalidParams = -32602, // Invalid method parameter(s).
    MethodNotFound = -32601, // The method does not exist / is not available.
    InvalidRequest = -32600, // The JSON sent is not a valid Request object.

    HelloError = -30000,
    UserNotFound,
}