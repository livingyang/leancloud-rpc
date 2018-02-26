"use strict";
/**
 * FOR SERVER
 * define leancloud rpc module
 */
Object.defineProperty(exports, "__esModule", { value: true });
const leancloud_rpc_error_1 = require("./leancloud-rpc-error");
const leanengine_1 = require("leanengine");
const leancloud_rpc_server_1 = require("./leancloud-rpc-server");
leanengine_1.Cloud.define('rpc', function (request) {
    // console.log(request.params);
    if (request.currentUser) {
        let rpc = new leancloud_rpc_server_1.LeancloudRpcServer;
        rpc.user = request.currentUser;
        if (request.params) {
            let method = request.params['method'];
            let params = request.params['params'];
            if (typeof method != 'string') {
                return Promise.reject(leancloud_rpc_error_1.LeancloudRpcError.MethodNotFound);
            }
            else if (!(params instanceof Array)) {
                return Promise.reject(leancloud_rpc_error_1.LeancloudRpcError.InvalidParams);
            }
            else {
                if (rpc[method] instanceof Function) {
                    return rpc[method](...params);
                }
                else {
                    return Promise.reject(leancloud_rpc_error_1.LeancloudRpcError.MethodNotFound);
                }
            }
        }
        else {
            return Promise.reject(leancloud_rpc_error_1.LeancloudRpcError.InvalidRequest);
        }
    }
    else {
        return Promise.reject(leancloud_rpc_error_1.LeancloudRpcError.UserNotFound);
    }
});
