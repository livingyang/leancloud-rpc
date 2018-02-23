"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const leancloud_rpc_1 = require("./leancloud-rpc");
const leancloud_storage_1 = require("leancloud-storage");
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
exports.LeancloudRpcServer = LeancloudRpcServer;
