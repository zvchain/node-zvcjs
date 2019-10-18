const zvcjs = require("./index");
const HttpRequest = require("./http.js");
//api rpc
zvcjs.api.newApi("http://node1.zvchain.io:8101"); //test net work
/*
zvcjs
  .api
  .GetblockHeight()
  .then(res => {
    console.log(res);
  });
zvcjs
  .api
  .GetBlockByHeight(298253)
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log("Wrong reques");
  });
zvcjs
  .api
  .GetTransactionByHash("0x015d771f4d31ee64fb964bc163f2479b6ba15d78555e936868ad24cca55909be ")
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log("Wrong reques");
  });
zvcjs
  .api
  .GetBlockHashByHeight(2119)
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log("Wrong reques");
  });


zvcjs
  .api
  .Balance("zv9eae37dbc0c3a076fe9981fbb050ebd29dfa9f3a6b1a4a8ef91e9604356e8801")
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log("Wrong reques");
  });

zvcjs
  .api
  .minerInfo("zvbef13adcc9eda3514c4d8e1a11301c7ecde13d39e8d8b4bf2a9f1459b6a82923", "zvbef13adcc9eda3514c4d8e1a11301c7ecde13d39e8d8b4bf2a9f1459b6a82923")
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log("Wrong reques");
  });
  */

// createdPrivKeyAndpubKeyAndaddr
/*
const PrivKeyAndpubKeyAndaddr = zvcjs
  .account
  .createdPrivKeyAndpubKeyAndaddr();
console.log(PrivKeyAndpubKeyAndaddr);
*/

/**
 * Send transaction
 *  1.set network
 *  1.get addr  sk
 *  2. get nonce  note async
 *  3.getTx
 *  4.getSigner
 *  5.SendTransaction
 */
/*
const addr = 'zvd4d108ca92871ab1115439db841553a4ec3c8eddd955ea6df299467fbfd0415e',
  sk = '0x22854711fa315fd89205d9dad31877ff2c2c83c4ddb908b71e8babb562c049bf',
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
// getTx
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
//getSigner
const txbuf = Buffer.from(tx.substr(2), 'hex'),
  privatekeybuf = Buffer.from(sk.substr(2), 'hex');

const signString = zvcjs
  .sign
  .getSigner(txbuf, privatekeybuf);
console.log(signString);
// SendTransaction
zvcjs
  .api
  .SendTransaction({
    "source": addr,
    "target": addr,
    "value": 1000000000, // zvcjs.account.NewAssetFromString('1 zvc')
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
*/
// deom
// {
//   const addr =
//       "zv52d98bf879b6bcffa5f3f2853e26bb4835a87727a17aaab697d10bbd3c3750a9",
//     sk = "0x1d642af72c5119c0887b872108371bf0d3f76becf44b99b2694e7f620d7a3cbc";
//   const SignAndSendTransaction = async (
//     sk,
//     source,
//     target,
//     value,
//     gasLimit,
//     gasPrice,
//     typ,
//     data,
//     extra
//   ) => {
//     let nonce = await zvcjs.api.GetNonce(addr).then(res => res.data.result);
//     const tx = zvcjs.account.genHash({
//       src: source,
//       target,
//       value, // zvcjs.account.NewAssetFromString('1 zvc')
//       gasLimit,
//       gasPrice,
//       nonce,
//       typ,
//       data, // base64
//       extra // base64
//     });
//     const signString = zvcjs.sign.getSigner(
//       Buffer.from(tx.substr(2), "hex"),
//       Buffer.from(sk.substr(2).padStart(64, "0"), "hex")
//     );
//     return zvcjs.api.SendTransaction({
//       source: source,
//       target: target,
//       value: parseInt(value),
//       gas_limit: parseInt(gasLimit),
//       gas_price: parseInt(gasPrice),
//       type: parseInt(typ),
//       nonce: parseInt(nonce),
//       data: data,
//       sign: signString,
//       extra_data: extra
//     });
//   };
//   SignAndSendTransaction(
//     sk,
//     addr,
//     addr,
//     "1000000000000",
//     "10000",
//     "500",
//     "0",
//     "JXU4RkQ5JXU5MUNDJXU2NjJGJXU4OTgxJXU1MkEwJXU1QkM2JXU3Njg0JXU1MTg1JXU1QkI5MTIzNDU2",
//     "JXU4RkQ5JXU5MUNDJXU2NjJGJXU4OTgxJXU1MkEwJXU1QkM2JXU3Njg0JXU1MTg1JXU1QkI5MTIzNDU2"
//   )
//     .then(res => {
//       console.log(res);
//     })
//     .catch(err => {
//       console.log("Wrong reques");
//     });
// }

const testFunc = async () => {
  let textJson = await new HttpRequest()
    .request({
      method: "get",
      url: "http://10.0.0.174:8888/gen"
    })
    .then(res => res.data);
  console.log(textJson);
  console.log(textJson.sk);
  const address = zvcjs.account.createAddrs(textJson.sk);
  console.log("address :", address);
  const tx = zvcjs.account.genHash({
    src: address,
    target: textJson.tx.Target,
    value: textJson.tx.Value + "",
    gasLimit: textJson.tx.GasLimit + "",
    gasPrice: textJson.tx.GasPrice + "",
    nonce: textJson.tx.Nonce + "",
    typ: textJson.tx.Type + "",
    data: textJson.tx.Data, // base64
    extra: textJson.tx.ExtraData // base64
  });
  console.log("tx:", tx);
  const signString = zvcjs.sign.getSigner(
    Buffer.from(tx.substr(2), "hex"),
    Buffer.from(textJson.sk.substr(2).padStart(64, "0"), "hex")
  );
  console.log("signString:", signString);
  if (signString === textJson.sign) return true;
  return false;
};

let a = 0;
const fortest = () => {
  testFunc().then(res => {
    a++;
    console.log(a);
    if (!res || a === 10000000) {
      return;
    } else {
      fortest();
    }
  });
};
console.time();
fortest();
console.timeEnd();
