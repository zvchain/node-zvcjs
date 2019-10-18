# Instructions for use



` npm install `


引入 zvcjs
```js
 const zvcjs = require("./index");
```
使用 zvcjs api.  详见  https://github.com/zvchain/zvchain/wiki/rpc_api_en

### SendTransaction Dom

```js
  const addr ="xxxxxxxxxxxxxxx", //user addrs
    sk = "xxxxxxxxxxxxxxxxxxxx"; // user privKey

zvcjs.api.newApi("http://node1.zvchain.io:8101"); //test net work
  const SignAndSendTransaction = async(
    sk,source,target,value,gasLimit,gasPrice,typ,data,extra
  ) => {
    let nonce = await zvcjs.api.GetNonce(addr).then(res => res.data.result);
    const tx = zvcjs.account.genHash({
      src: source,  // string
      target, // string
      value, // string
      gasLimit,// string
      gasPrice,// string
      nonce,// string
      typ,// string
      data, // base64
      extra // base64
    });
    const signString = zvcjs.sign.getSigner(
      Buffer.from(tx.substr(2), "hex"),
      Buffer.from(sk.substr(2).padStart(64, "0"), "hex")
    );
    return zvcjs.api.SendTransaction({
      source: source,
      target: target,
      value: parseInt(value),
      gas_limit: parseInt(gasLimit),
      gas_price: parseInt(gasPrice),
      type: parseInt(typ),
      nonce: parseInt(nonce),
      data: data,
      sign: signString,
      extra_data: extra
    });
  };




  SignAndSendTransaction(
    sk,
    addr,
    addr,
    "1000000000000",
    "10000",
    "500",
    "0",
    "JXU4RkQ5JXU5MUNDJXU2NjJGJXU4OTgxJXU1MkEwJXU1QkM2JXU3Njg0JXU1MTg1JXU1QkI5MTIzNDU2",
    "JXU4RkQ5JXU5MUNDJXU2NjJGJXU4OTgxJXU1MkEwJXU1QkM2JXU3Njg0JXU1MTg1JXU1QkI5MTIzNDU2"
  )
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log("Wrong reques");
    });

```



**ex:**

```js
/*api rpc  */

zvcjs.api.newApi("http://node1.zvchain.io:8101"); //test net work

// GetblockHeight
zvcjs.api.GetblockHeight().then(res => {
    console.log(res);
  });
zvcjs.api.GetBlockByHeight(298253).then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log("Wrong reques");
  });
  
// GetTransactionByHash
zvcjs.api.GetTransactionByHash("0x015d771f4d31ee64fb964bc163f2479b6ba15d78555e936868ad24cca55909be ")
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log("Wrong reques");
  });
// GetBlockHashByHeight
zvcjs.api.GetBlockHashByHeight(2119)
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log("Wrong reques");
  });

// get Balance 
zvcjs.api.Balance("zv9eae37dbc0c3a076fe9981fbb050ebd29dfa9f3a6b1a4a8ef91e9604356e8801")
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log("Wrong reques");
  });
//get stake minerInfo   
zvcjs.api.minerInfo("zvbef13adcc9eda3514c4d8e1a11301c7ecde13d39e8d8b4bf2a9f1459b6a82923", "zvbef13adcc9eda3514c4d8e1a11301c7ecde13d39e8d8b4bf2a9f1459b6a82923")
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log("Wrong reques");
  });

// createdPrivKeyAndpubKeyAndaddr
const PrivKeyAndpubKeyAndaddr = zvcjs.account.createdPrivKeyAndpubKeyAndaddr();

/**
 * Send transaction
 *  1.set network
 *  1.get addr  sk
 *  2. get nonce  note async
 *  3.getTx
 *  4.getSigner
 *  5.SendTransaction
 */
const addr = 'XXXXXXXXXXXX',
  sk = 'XXXXXXXXXXX',
  nonce = ''
// get nonce
zvcjs // async
  .api
  .GetNonce(addr)
  .then(res => {
    nonce = res.data.result
  })
  .catch(err => {
    console.log("Wrong reques");
  });
// get hash
const tx = zvcjs
  .account
  .genHash({
    src: addr,
    target: addr,
    value: "1000000000",
    gasLimit: "10000",
    gasPrice: "500",
    nonce: nonce + '',
    typ: "0",
    data: "JXU4RkQ5JXU5MUNDJXU2NjJGJXU4OTgxJXU1MkEwJXU1QkM2JXU3Njg0JXU1MTg1JXU1QkI5MTIzNDU2", // base64
    extra: "JXU4RkQ5JXU5MUNDJXU2NjJGJXU4OTgxJXU1MkEwJXU1QkM2JXU3Njg0JXU1MTg1JXU1QkI5MTIzNDU2" // base64
  });
//get Signer
const txbuf = Buffer.from(tx.substr(2), 'hex'), 
  privatekeybuf = Buffer.from(sk.substr(2).padStart(64, "0"), 'hex');// 64 langht

const signString = zvcjs.sign.getSigner(txbuf, privatekeybuf);
// SendTransaction
zvcjs.api.SendTransaction({
    "source": addr,
    "target": addr,
    "value": 1000000000, 
    "gas_limit": 10000,
    "gas_price": 500,
    "type": 0,
    "nonce": nonce,
    "data": "JXU4RkQ5JXU5MUNDJXU2NjJGJXU4OTgxJXU1MkEwJXU1QkM2JXU3Njg0JXU1MTg1JXU1QkI5MTIzNDU2", // base64
    "sign": signString,
    "extra_data": "JXU4RkQ5JXU5MUNDJXU2NjJGJXU4OTgxJXU1MkEwJXU1QkM2JXU3Njg0JXU1MTg1JXU1QkI5MTIzNDU2" // base64
  })
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log("Wrong reques");
  });
  
zvcjs.api.Balance(addr).then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log("Wrong reques");
  });


```


