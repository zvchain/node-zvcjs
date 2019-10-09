const axios = require("axios")
class HttpRequest {
  // eslint-disable-next-line no-undef// baseUrl = baseURL
  constructor() {
    // this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig() { // 全局的配置
    const config = {
      // baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json"
      }
    }
    return config
  }
  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance
      .interceptors
      .request
      .use(config => {
        this.queue[url] = true
        return config
      }, error => {
        return Promise.reject(error)
      })
    // 响应拦截
    instance
      .interceptors
      .response
      .use(res => {
        this.destroy(url)
        // console.log(res)
        const {data, status} = res
        return {data, status}
      }, error => {
        this.destroy(url)
        let errorInfo = error.response
        if (!errorInfo) {
          const {
            request: {
              statusText,
              status
            },
            config
          } = JSON.parse(JSON.stringify(error))
          errorInfo = {
            statusText,
            status,
            request: {
              responseURL: config.url
            }
          }
        }
        // addErrorLog(errorInfo)
        return Promise.reject(error)
      })
  }
  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    console.log(options)
    this.interceptors(instance, options.url)
    // console.log(options)

    return instance(options)
  }
}
module.exports = HttpRequest
