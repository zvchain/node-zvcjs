// const axios = require('axios');
const HttpRequest = require('./http.js')
let baseURL = ''
const newApi = (URL) => {

  return baseURL = URL
}
console.log(baseURL)
const axios = new HttpRequest()

const setParams = (nameSpace, method, ...params) => {
  let option = {
    "method": nameSpace + "_" + method,
    "params": params,
    "id": 1,
    "jsonrpc": "2.0"
  }
  return JSON.stringify(option)

}
const GetBlockByHeight = (height) => {
  let params = setParams("Gzv", 'getBlockByHeight', height)
  return axios.request({
    method: 'post',
    url: baseURL,
    data: params
  })
}

const GetblockHeight = () => {
  let params = setParams("Gzv", 'blockHeight', )
  return axios.request({
    method: 'post',
    url: baseURL,
    data: params
  })
}
const GetBlockByHash = (hash) => {
  let params = setParams("Gzv", 'getBlockByHash', hash)
  return axios.request({
    method: 'post',
    url: baseURL,
    data: params
  })
}
const GetTransactionByHash = (hash) => {
  let params = setParams("Gzv", 'transDetail', hash)
  return axios.request({
    method: 'post',
    url: baseURL,
    data: params
  })
}

const GetBlockHashByHeight = (height) => {
  let params = setParams("Gzv", 'getBlockByHeight', height)
  return axios.request({
    method: 'post',
    url: baseURL,
    data: params
  })
}
const GetNonce = (address) => {
  let params = setParams("Gzv", 'nonce', address)
  return axios.request({
    method: 'post',
    url: baseURL,
    data: params
  })
}
const Balance = (address) => {
  let params = setParams("Gzv", 'balance', address)
  return axios.request({
    method: 'post',
    url: baseURL,
    data: params
  })
}
const minerInfo = (address, detail) => {
  let params = setParams("Gzv", 'minerInfo', address, detail)
  return axios.request({
    method: 'post',
    url: baseURL,
    data: params
  })
}

const SendTransaction = (tx) => {
  let params = setParams("Gzv", 'tx', tx)
  return axios.request({
    method: 'post',
    url: baseURL,
    data: params
  })
}

module.exports = {
  newApi,
  GetBlockByHeight,
  GetblockHeight,
  GetBlockByHash,
  GetTransactionByHash,
  GetBlockHashByHeight,
  GetNonce,
  Balance,
  minerInfo,
  SendTransaction
}