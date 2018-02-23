/**
 * FOR SERVER
 * leancloud rpc server
 * implement rpc functions
 */

import {LeancloudRpc} from './leancloud-rpc';
import {LeancloudRpcError} from './leancloud-rpc-error';
import {User, Query} from 'leancloud-storage';

export class LeancloudRpcServer extends LeancloudRpc {
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