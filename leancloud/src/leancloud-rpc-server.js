"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const leancloud_rpc_1 = require("./leancloud-rpc");
const leancloud_rpc_error_1 = require("./leancloud-rpc-error");
const leanengine_1 = require("leanengine");
const leancloud_storage_1 = require("leancloud-storage");
leanengine_1.Cloud.define('rpc', function (request) {
    // console.log(request.params);
    if (request.currentUser) {
        let rpc = new LeancloudRpcServer;
        rpc.user = request.currentUser;
        if (request.params) {
            let method = request.params['method'];
            let params = request.params['params'];
            if (method && params) {
                if (rpc[method]) {
                    return rpc[method](...params);
                }
                else {
                    return Promise.reject(leancloud_rpc_error_1.LeancloudRpcError.MethodNotFound);
                }
            }
            else {
                return Promise.reject(leancloud_rpc_error_1.LeancloudRpcError.InvalidParams);
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
class LeancloudRpcServer extends leancloud_rpc_1.LeancloudRpc {
    add(num1 = 0, num2 = 0) {
        return Promise.resolve(num1 + num2);
    }
    getUserName() {
        return Promise.resolve(this.user.get('username'));
    }
    getUserCount() {
        return new leancloud_storage_1.Query('_user').count();
    }
}
