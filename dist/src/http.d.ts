import { AxiosRequestConfig } from 'axios';
declare class HttpRequest {
    private baseUrl;
    constructor(baseUrl: string);
    request(options: AxiosRequestConfig): import("axios").AxiosPromise<any>;
    private getInsideConfig;
    private interceptors;
}
export default HttpRequest;
