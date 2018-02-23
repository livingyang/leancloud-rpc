export declare class LeancloudRpc {
    hello(): Promise<string>;
    helloError(): Promise<never>;
    add(num1?: number, num2?: number): Promise<number>;
    getUserName(): Promise<string>;
    getUserCount(): Promise<number>;
}
