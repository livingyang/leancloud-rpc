import {LeancloudRpc} from './leancloud-rpc';
import { LeancloudRpcError } from './leancloud-rpc-error';

// leancloud的连接器，提供注册和登录功能
// 登录完毕后，获取rpc对象，通过rpc与服务器进行通信

export namespace LeancloudClass {
    export interface _User {
        sessionToken: string;
        updatedAt: string;
        objectId: string;
        username: string;
        createdAt: string;
        emailVerified: boolean;
        mobilePhoneVerified: boolean;
    }
}

export class LeancloudConnector {
    appid = "EWD3oUAoB7mH0Griucaw74i7-gzGzoHsz";
    appkey = "vIoq3QeLbS8TtHYwcCdcvaOQ";
    server = "https://ewd3ouao.api.lncld.net/1.1/";
    rpcUrl = "http://localhost:3000/1.1/functions/rpc";
    _user: LeancloudClass._User | null = null;
    rpc = new LeancloudRpc;
    
    static Instance = new LeancloudConnector();

    attachRpc() {
        class LeancloudRpcClient extends LeancloudRpc {}
        console.log(LeancloudRpcClient.prototype);

        Object.getOwnPropertyNames(LeancloudRpc.prototype).filter(function(name) {
            return name !== 'constructor';
        }).forEach((method) => {
            (LeancloudRpcClient.prototype as any)[method] = (...params: any[]) => {
                return new Promise((resolve, reject) => {
                    let xhr = new XMLHttpRequest;
                    xhr.open('POST', this.rpcUrl);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.setRequestHeader("x-lc-id", this.appid);
                    xhr.setRequestHeader("x-lc-key", this.appkey);
                    xhr.setRequestHeader("X-LC-Session", this.getSessionToken());
                    xhr.send(JSON.stringify({method: method, params: params}));
                    xhr.onload = () => {
                        let obj = JSON.parse(xhr.responseText)
                        if (obj.error != null) {
                            reject(obj.error);
                        }
                        else if (obj.result != null) {
                            resolve(obj.result);
                        }
                        else {
                            reject(LeancloudRpcError.ParseError);
                        }
                    };
                    xhr.onerror = () => {
                        reject(LeancloudRpcError.InvalidRequest);
                    }
                });
            }
        })

        this.rpc = new LeancloudRpcClient();
    }

    getSessionToken() {
        return this._user != null ? this._user.sessionToken : '';
    }

    isLogin() {
        return this._user != null;
    }

    // 注册新用户
    register(username = '', password = '') {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest;
            xhr.open('POST', this.server + 'users');
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("x-lc-id", this.appid);
            xhr.setRequestHeader("x-lc-key", this.appkey);
            xhr.send(`{"username":"${username}","password":"${password}"}`);
            xhr.onload = () => {
                console.log(xhr);
                if (xhr.status === 201) {
                    let info = JSON.parse(xhr.responseText);
                    this._user = info;
                    resolve();
                }
            }
            xhr.onerror = () => {
                reject('register failed');
            }
        });
    }

    // 登录
    login(username = '', password = '') {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest;
            xhr.open('POST', this.server + 'login');
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("x-lc-id", this.appid);
            xhr.setRequestHeader("x-lc-key", this.appkey);
            xhr.send(`{"username":"${username}","password":"${password}"}`);
            xhr.onload = () => {
                if (xhr.status === 200) {
                    let info = JSON.parse(xhr.responseText);
                    this._user = info;
                    resolve();
                }
            }
            xhr.onerror = () => {
                reject('login failed');
            }
        });
    }

    logout() {
        if (this.isLogin()) {
            this._user = null;
        }
    }
}