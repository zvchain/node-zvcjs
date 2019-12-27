import { AxiosRequestConfig } from 'axios';
export declare class HttpRequest {
    constructor();
    request(options: AxiosRequestConfig): import("axios").AxiosPromise<any>;
    private getInsideConfig;
    private interceptors;
}
