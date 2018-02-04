import {LeancloudRpc} from './leancloud-rpc';
import {LeancloudRpcError} from './leancloud-rpc-error';
import {Cloud} from 'leanengine';
import {User, Query} from 'leancloud-storage';

Cloud.define('rpc', function(request: Cloud.CloudFunctionRequest): any {
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
                    return Promise.reject(LeancloudRpcError.MethodNotFound);
                }
            }
            else {
                return Promise.reject(LeancloudRpcError.InvalidParams);
            }
        }
        else {
            return Promise.reject(LeancloudRpcError.InvalidRequest);
        }
    }
    else {
        return Promise.reject(LeancloudRpcError.UserNotFound);
    }
});

class LeancloudRpcServer extends LeancloudRpc {
    user: User;

    add(num1 = 0, num2 = 0) {
        return Promise.resolve(num1 + num2);
    }
    getUserName() {
        return Promise.resolve(this.user.get('username'));
    }
    getUserCount() {
        return new Query('_user').count() as any;
    }
}