/**
 * Send transaction
 *  1.set network
 *  1.get addr  sk
 *  2. get nonce  note async
 *  3.getTx
 *  4.getSigner
 *  5.SendTransaction
 */
import { Account } from './account'
import { Rpc } from "./rpc"
import { Signer } from './sign'

export class Transaction {
  public url;
  public sk;
  public source;
  public target;
  public value;
  public gas_limit;
  public gas_price;
  public type;
  public data;
  public extra_data;

  public nonce: number;
  constructor({ url, sk, source, target, value, gas_limit, gas_price, type, data, extra_data }: TransactionType) {
    this.url = url;
    this.sk = sk;
    this.source = source;
    this.target = target;
    this.value = value;
    this.gas_limit = gas_limit;
    this.gas_price = gas_price;
    this.type = type;
    this.data = data;
    this.extra_data = extra_data;
  }
  public async transaction() {
    const rpc = new Rpc(this.url);
    const Nonce = await rpc.GetNonce(this.source).then((res) => {
      this.nonce = res.data.result
      return res.data.result
    })
    const Hash = new Account().getHash({
      source: this.source,
      target: this.target,
      value: this.value,
      gas_limit: this.gas_limit,
      gas_price: this.gas_price,
      nonce: Nonce,
      type: this.type,
      data: this.data,
      extra_data: this.extra_data,
    })
    const txbuf = Buffer.from(Hash.substr(2), 'hex');
    const privatekeybuf = Buffer.from(this.sk.substr(2), 'hex');
    const sign = new Signer().getSigner(txbuf, privatekeybuf);
    console.log({
      source: this.source,
      target: this.target,
      value: this.value,
      gas_limit: this.gas_limit,
      gas_price: this.gas_price,
      type: this.type,
      nonce: this.nonce,
      data: this.data,
      sign,
      extra_data: this.extra_data,
    })
    rpc.SendTransaction({
      source: this.source,
      target: this.target,
      value: this.value,
      gas_limit: this.gas_limit,
      gas_price: this.gas_price,
      type: this.type,
      nonce: this.nonce,
      data: this.data,
      sign,
      extra_data: this.extra_data,
    }).then((res) => {
      Promise.resolve(res)
    }).catch((error) => {
      Promise.reject(error)
    })
  }
}
