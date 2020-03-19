
import http from './http'

export class Zvcjs extends http {
  constructor( public baseURL: string){
      super(baseURL)
  }
  public setParams = (nameSpace: string, method: string, ...params: any): string => {
    const option = {
      method: nameSpace + "_" + method,
      params,
      id: 1,
      jsonrpc: "2.0",
    }
    return JSON.stringify(option)
  }
  public Balance = (address: string): Promise<any> => {
    const params = this.setParams("Gzv", 'balance', address)
    console.log(params)
    return this.request({
      method: 'post',
      data: params,
      url: this.baseURL,
    })
  }
  public GetBlockByHeight = (height: Number) => {
    const params = this.setParams("Gzv", 'getBlockByHeight', height)
    return this.request({
      method: 'post',
      data: params,
      url: this.baseURL,
    })
  }
  public GetblockHeight = () => {
    const params = this.setParams("Gzv", 'blockHeight' )
    return this.request({
      method: 'post',
      url: this.baseURL,
      data: params,
    })
  }
  public GetBlockByHash = (hash: string) => {
    const params = this.setParams("Gzv", 'getBlockByHash', hash)
    return this.request({
      method: 'post',
      url: this.baseURL,
      data: params,
    })
  }
  public GetTransactionByHash = (hash: string) => {
    const params = this.setParams("Gzv", 'transDetail', hash)
    return this.request({
      method: 'post',
      url: this.baseURL,
      data: params,
    })
  }
  public GetBlockHashByHeight = (height: number) => {
    const params = this.setParams("Gzv", 'getBlockByHeight', height)
    return this.request({
      method: 'post',
      url: this.baseURL,
      data: params,
    })
  }
  public GetNonce = (address: string) => {
    const params = this.setParams("Gzv", 'nonce', address)
    return this.request({
      method: 'post',
      url: this.baseURL,
      data: params,
    })
  }
  public minerInfo = (address: string, detail: string) => {
    const params = this.setParams("Gzv", 'minerInfo', address, detail)
    return this.request({
      method: 'post',
      url: this.baseURL,
      data: params,
    })
  }
  public SendTransaction = (tx: Sign) => {
    const params = this.setParams("Gzv", 'tx', tx)
    return this.request({
      method: 'post',
      url: this.baseURL,
      data: params,
    })
  }
}
