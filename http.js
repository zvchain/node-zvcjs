const axios = require("axios");
const JSONbig = require("json-bigint");
class HttpRequest {
  constructor() {
    this.queue = {};
  }
  getInsideConfig() {
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
      transformResponse: [
        function(data) {
          // Do whatever you want to transform the data
          return JSONbig.parse(data);
        }
      ]
    };
    return config;
  }
  destroy(url) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {
    }
  }
  interceptors(instance, url) {
    instance.interceptors.request.use(
      config => {
        this.queue[url] = true;
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      res => {
        this.destroy(url);
        const { data, status } = res;
        return {
          data,
          status
        };
      },
      error => {
        this.destroy(url);
        let errorInfo = error.response;
        if (!errorInfo) {
          const {
            request: { statusText, status },
            config
          } = JSON.parse(JSON.stringify(error));
          errorInfo = {
            statusText,
            status,
            request: {
              responseURL: config.url
            }
          };
        }
        return Promise.reject(error);
      }
    );
  }
  request(options) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    console.log(options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
}
module.exports = HttpRequest;
