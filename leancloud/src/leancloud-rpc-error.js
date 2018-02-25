"use strict";
/**
 * FOR BOTH
 * define leancloud rpc error code
*/
Object.defineProperty(exports, "__esModule", { value: true });
var LeancloudRpcError;
(function (LeancloudRpcError) {
    LeancloudRpcError[LeancloudRpcError["ParseError"] = -32700] = "ParseError";
    LeancloudRpcError[LeancloudRpcError["InternalError"] = -32603] = "InternalError";
    LeancloudRpcError[LeancloudRpcError["InvalidParams"] = -32602] = "InvalidParams";
    LeancloudRpcError[LeancloudRpcError["MethodNotFound"] = -32601] = "MethodNotFound";
    LeancloudRpcError[LeancloudRpcError["InvalidRequest"] = -32600] = "InvalidRequest";
    LeancloudRpcError[LeancloudRpcError["HelloError"] = -30000] = "HelloError";
    LeancloudRpcError[LeancloudRpcError["UserNotFound"] = -29999] = "UserNotFound";
})(LeancloudRpcError = exports.LeancloudRpcError || (exports.LeancloudRpcError = {}));
