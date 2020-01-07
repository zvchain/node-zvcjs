import http from './http';
export declare class Rpc extends http {
    baseURL: string;
    constructor(baseURL: string);
    setParams: (nameSpace: string, method: string, ...params: any) => string;
    Balance: (address: string) => Promise<any>;
    GetBlockByHeight: (height: Number) => import("axios").AxiosPromise<any>;
    GetblockHeight: () => import("axios").AxiosPromise<any>;
    GetBlockByHash: (hash: string) => import("axios").AxiosPromise<any>;
    GetTransactionByHash: (hash: string) => import("axios").AxiosPromise<any>;
    GetBlockHashByHeight: (height: number) => import("axios").AxiosPromise<any>;
    GetNonce: (address: string) => import("axios").AxiosPromise<any>;
    minerInfo: (address: string, detail: string) => import("axios").AxiosPromise<any>;
    SendTransaction: (tx: Sign) => import("axios").AxiosPromise<any>;
}
