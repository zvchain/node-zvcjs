const zvcjs = require('./index');
zvcjs
  .api
  .newApi('https://api.jokechain.cc:8101/')
/*
api
  .GetblockHeight()
  .then(res => {
    console.log(res)
  })
api
  .GetBlockByHeight(298253)
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log("错误请求")
  });
api
  .GetTransactionByHash("0x015d771f4d31ee64fb964bc163f2479b6ba15d78555e936868ad24cca55909be ")
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log("错误请求")
  });
api
  .GetBlockHashByHeight(2119)
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log("错误请求")
  });
api
  .GetNonce('zv9eae37dbc0c3a076fe9981fbb050ebd29dfa9f3a6b1a4a8ef91e9604356e8801')
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log("错误请求")
  });*/
/*
api
  .SendTransaction('0x9f42787b9bc66b7aa14d0bc436b5a921160feba9cd0279162df18526d5f6b0b0')
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log("错误请求")
  })

api
  .Balance('zv9eae37dbc0c3a076fe9981fbb050ebd29dfa9f3a6b1a4a8ef91e9604356e8801')
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log("错误请求")
  });

zvcjs
  .api
  .minerInfo('zvbef13adcc9eda3514c4d8e1a11301c7ecde13d39e8d8b4bf2a9f1459b6a82923', 'zvbef13adcc9eda3514c4d8e1a11301c7ecde13d39e8d8b4bf2a9f1459b6a82923')
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log("错误请求")
  })


let buf = Buffer.from([
  194,
  247,
  64,
  157,
  1,
  9,
  224,
  178,
  221,
  86,
  214,
  236,
  37,
  215,
  203,
  37,
  232,
  125,
  70,
  222,
  122,
  61,
  78,
  80,
  162,
  126,
  86,
  152,
  142,
  136,
  63,
  238
])
let pek = Buffer.from([
  243,
  45,
  53,
  210,
  180,
  13,
  166,
  88,
  42,
  166,
  165,
  75,
  253,
  36,
  138,
  57,
  190,
  46,
  179,
  98,
  13,
  51,
  16,
  11,
  197,
  8,
  47,
  42,
  181,
  251,
  203,
  109
])
const res = zvcjs
  .sign
  .getSigner(buf, pek)
console.log(res);

const tx = zvcjs
  .account
  .genHash({
    src: 'zvd4d108ca92871ab1115439db841553a4ec3c8eddd955ea6df299467fbfd0415e',
    target: 'zvd4d108ca92871ab1115439db841553a4ec3c8eddd955ea6df299467fbfd0415e',
    value: " 1000000000",
    gasLimit: ' 1000',
    gasPrice: '500',
    nonce: '10',
    typ: '0',
    data: 'JXU4RkQ5JXU5MUNDJXU2NjJGJXU4OTgxJXU1MkEwJXU1QkM2JXU3Njg0JXU1MTg1JXU1QkI5MTIzNDU2',
    extra: 'JXU4RkQ5JXU5MUNDJXU2NjJGJXU4OTgxJXU1MkEwJXU1QkM2JXU3Njg0JXU1MTg1JXU1QkI5MTIzNDU2'
  })
console.log(tx);

const PrivKeyAndpubKeyAndaddr = zvcjs
  .account
  .createdPrivKeyAndpubKeyAndaddr()
console.log(PrivKeyAndpubKeyAndaddr);
*/