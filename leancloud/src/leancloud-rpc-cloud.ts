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
            
            if (typeof method != 'string') {
                return Promise.reject(LeancloudRpcError.MethodNotFound);
            }
            else if (!(params instanceof Array)) {
                return Promise.reject(LeancloudRpcError.InvalidParams);
            }
            else {
                if (rpc[method] instanceof Function) {
                    return rpc[method](...params);
                }
                else {
                    return Promise.reject(LeancloudRpcError.MethodNotFound);
                }
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