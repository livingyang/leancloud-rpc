/**
 * FOR SERVER
 * define leancloud rpc module
 */

import {LeancloudRpc} from './leancloud-rpc';
import {LeancloudRpcError} from './leancloud-rpc-error';
import {Cloud} from 'leanengine';
import {User, Query} from 'leancloud-storage';
import {LeancloudRpcServer} from './leancloud-rpc-server';

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