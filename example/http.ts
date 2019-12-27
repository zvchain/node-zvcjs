import axios, { AxiosInstance, AxiosProxyConfig, AxiosRequestConfig } from 'axios'
import JSONbig from 'json-bigint'
import {Jsonbigint} from '../types/json-bigint'

export class HttpRequest {
  constructor() { }
  public request(options: AxiosRequestConfig) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
  private getInsideConfig() {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      transformResponse: [
        // tslint:disable-next-line:only-arrow-functions
        function(data: any): any {
          return JSONbig.parse(data);
        },
      ],
    };
    return config;
  }
  private interceptors(instance: AxiosInstance, url: String) {
    instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    instance.interceptors.response.use(
      (res) => {
        const { data, status } = res;
        return {
          data,
          status,
        };
      },
      (error) => {
        let errorInfo = error.response;
        if (!errorInfo) {
          const {
            request: { statusText, status },
            config,
          } = JSON.parse(JSON.stringify(error));
          errorInfo = {
            statusText,
            status,
            request: {
              responseURL: config.url,
            },
          };
        }
        return Promise.reject(error);
      },
    );
  }
}
