import axios, { AxiosInstance, AxiosProxyConfig, AxiosRequestConfig, AxiosResponse } from 'axios'
import JSONbig = require('json-bigint')
class HttpRequest {
  constructor(private baseUrl: string) {
    // this.baseUrl = baseUrl
  }
  public request(options: AxiosRequestConfig) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    console.log("options", options)
    this.interceptors(instance, options.url);
    return instance(options);
  }
  private getInsideConfig() {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "baseURL": this.baseUrl,
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
      (res): any => {
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
export default HttpRequest
