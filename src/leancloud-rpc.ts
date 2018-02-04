import {LeancloudRpcError} from './leancloud-rpc-error';

export class LeancloudRpc {
    hello() {
        return Promise.resolve('hello world');
    }

    helloError() {
        return Promise.reject(LeancloudRpcError.HelloError);
    }

    add(num1 = 0, num2 = 0) {
        return Promise.resolve(num1 + num2);
    }
}
