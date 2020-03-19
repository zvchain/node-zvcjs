//////// <reference path="./jsonBigint/index.d.ts" />
// interface AxiosRequestConfig {
//   url: string
//   method: string
//   data?: any  // 可选参数用?号表示
//   params?: any
// }
interface Sign {
  source: zvAdderss,
  target: zvAdderss,
  value: number, // zvcjs.account.NewAssetFromString('1 zvc')
  gas_limit: number,
  gas_price: number,
  type: number,
  nonce: number,
  data: string// base64
  sign: string,
  extra_data: string,     // base64
}
interface Address{
  sk?: StringDataFormat
  pk?: StringDataFormat
  zv?: StringDataFormat
}
type StringDataFormat = 'HEX' | 'TEXT' | 'B64' | 'BYTES'|string;
type zvAdderss = 'zvAdderss'
interface GenHash{
  source: zvAdderss,
  target: zvAdderss,
  value: number,
  gas_limit: number,
  gas_price:  number
  nonce: number,
  type: number,
  data?: StringDataFormat, // base64
  extra_data?:StringDataFormat// base64
}
interface TransactionType {
  url:string,
  sk:StringDataFormat,
  source: zvAdderss,
  target: zvAdderss,
  value: number, // zvcjs.account.NewAssetFromString('1 zvc')
  gas_limit: number,
  gas_price: number,
  type: number,
  data: string// base64
  extra_data: string,     // base64
}