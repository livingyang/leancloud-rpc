"use strict";
/**
 * FOR BOTH
 * leancloud rpc
 * define rpc api
 */
Object.defineProperty(exports, "__esModule", { value: true });
const leancloud_rpc_error_1 = require("./leancloud-rpc-error");
class LeancloudRpc {
    hello() {
        return Promise.resolve('hello world');
    }
    helloError() {
        return Promise.reject(leancloud_rpc_error_1.LeancloudRpcError.HelloError);
    }
    add(num1 = 0, num2 = 0) {
        return Promise.resolve(num1 + num2);
    }
    getUserName() {
        return Promise.resolve('username');
    }
    getUserCount() {
        return Promise.resolve(0);
    }
}
exports.LeancloudRpc = LeancloudRpc;
