import {LeancloudConnector} from '../src/leancloud-connector';
import { LeancloudRpcError } from '../src/leancloud-rpc-error';

global['XMLHttpRequest'] = require("xmlhttprequest").XMLHttpRequest;

let testUser = '55a47496e4b05001a7732c5f';
let password = 'password';

beforeAll((done) => {
    LeancloudConnector.Instance.login(testUser, password).then(() => {
        done();
    }).catch((error) => {
        console.log(error);
        done();
    })
})

class MultiDone {
    done: jest.DoneCallback;
    count = 0;
    target = 0;

    constructor(done: jest.DoneCallback, target) {
        this.done = done;
        this.target = target;
    }

    check() {
        if (++this.count >= this.target) {
            this.done();
        }
    }
}

test('LeancloudConnector.rpc', (done) => {
    let multi = new MultiDone(done, 5);

    LeancloudConnector.Instance.rpc.hello().then((result) => {
        expect(result).toBe('hello world');
        multi.check();
    });

    LeancloudConnector.Instance.rpc.helloError().catch((error: LeancloudRpcError) => {
        expect(error).toBe(LeancloudRpcError.HelloError);
        multi.check();
    });

    LeancloudConnector.Instance.rpc.add(1, 2).then((result) => {
        expect(result).toBe(3);
        multi.check();
    });

    LeancloudConnector.Instance.rpc.getUserName().then((result) => {
        expect(result).toBe('username');
        multi.check();
    });

    LeancloudConnector.Instance.rpc.getUserCount().then((result) => {
        expect(result).toBe(0);
        multi.check();
    });
})

test('LeancloudConnector.attachRpc', (done) => {
    LeancloudConnector.Instance.attachRpc();
    let multi = new MultiDone(done, 4);
    
    LeancloudConnector.Instance.rpc.hello().then((result) => {
        expect(result).toBe('hello world');
        multi.check();
    });

    LeancloudConnector.Instance.rpc.add(1, 2).then((result) => {
        expect(result).toBe(3);
        multi.check();
    });

    LeancloudConnector.Instance.rpc.getUserName().then((result) => {
        expect(result).toBe(testUser);
        multi.check();
    });

    LeancloudConnector.Instance.rpc.getUserCount().then((result) => {
        // console.log(result);
        expect(result).toBeGreaterThan(0);
        multi.check();
    });
})