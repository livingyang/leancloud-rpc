import {LeancloudConnector} from '../src/leancloud-connector';
import { LeancloudRpcError } from '../src/leancloud-rpc-error';

global['XMLHttpRequest'] = require("xmlhttprequest").XMLHttpRequest;

let testUser = '55a47496e4b05001a7732c5f';
let password = 'password';
/*
beforeAll((done) => {
    LeancloudConnector.Instance.login(testUser, password).then(() => {
        done();
    }).catch((error) => {
        console.log(error);
        done();
    })
})

test('LeancloudConnector.rpc', (done) => {
    LeancloudConnector.Instance.rpc.hello().then((result) => {
        expect(result).toBe('hello world');
    })

    LeancloudConnector.Instance.rpc.helloError().catch((error: LeancloudRpcError) => {
        expect(error).toBe(LeancloudRpcError.HelloError);
    })

    LeancloudConnector.Instance.rpc.add(1, 2).then((result) => {
        expect(result).toBe(3);
        done();
    })
})*/

test('LeancloudConnector.attachRpc', (done) => {
    LeancloudConnector.Instance.attachRpc();
    
    LeancloudConnector.Instance.rpc.hello().then((result) => {
        expect(result).toBe('hello world');
        done();
    })

    // LeancloudConnector.Instance.rpc.helloError().catch((error: LeancloudRpcError) => {
    //     expect(error).toBe(LeancloudRpcError.HelloError);
    //     done();
    // })

    // LeancloudConnector.Instance.rpc.add(1, 2).then((result) => {
    //     expect(result).toBe(3);
    //     done();
    // })
})