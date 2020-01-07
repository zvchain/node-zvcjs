let zvcjs = require('../dist/index')
const HttpRequest = require("../dist/src/http");
// import Zvcjs from '../dist/index'
// console.dir(zvcjs);
// const zvcjsss  = new zvcjs.rpc('http://node1.zvchain.io:8101/')
// zvcjsss.Balance("zv9eae37dbc0c3a076fe9981fbb050ebd29dfa9f3a6b1a4a8ef91e9604356e8801").then((res) => {
//   console.log(res)
// })

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
  const tx = new zvcjs.account().getHash({
    source: address,
    target: textJson.tx.Target,
    value: textJson.tx.Value,
    gas_limit: textJson.tx.GasLimit,
    gas_price: textJson.tx.GasPrice,
    nonce: textJson.tx.Nonce,
    type: textJson.tx.Type,
    data: textJson.tx.Data, // base64
    extra_data: textJson.tx.ExtraData // base64
  });
  console.log("tx:", tx);
  const signString = new zvcjs.signer().getSigner(
    Buffer.from(tx.substr(2), "hex"),
    Buffer.from(textJson.sk.substr(2).padStart(64, "0"), "hex")
  );
  console.log("signString:", signString);
  if (signString === textJson.sign) return true;
  return false;
};

// let a = 0;
// const fortest = () => {
//   testFunc().then(res => {
//     a++;
//     console.log(a);
//     if (!res || a === 10000000) {
//       return;
//     } else {
//       fortest();
//     }
//   });
// };
// console.time();
// fortest();
// console.timeEnd();

new zvcjs.transaction({
  url: 'http://node1.zvchain.io:8101/',
  sk: "0x1d642af72c5119c0887b872108371bf0d3f76becf44b99b2694e7f620d7a3cbc",
  source: "zv52d98bf879b6bcffa5f3f2853e26bb4835a87727a17aaab697d10bbd3c3750a9",
  target: "zv52d98bf879b6bcffa5f3f2853e26bb4835a87727a17aaab697d10bbd3c3750a9",
  value: 1000000000000,
  gas_limit: 10000,
  gas_price: 500,
  type: 0,
  data: "JXU4RkQ5JXU5MUNDJXU2NjJGJXU4OTgxJXU1MkEwJXU1QkM2JXU3Njg0JXU1MTg1JXU1QkI5MTIzNDU2",
  extra_data: "JXU4RkQ5JXU5MUNDJXU2NjJGJXU4OTgxJXU1MkEwJXU1QkM2JXU3Njg0JXU1MTg1JXU1QkI5MTIzNDU2"
}
).transaction().then(res => {
  console.log(res);
})