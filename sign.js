const secp256k1 = require('secp256k1')
// let buf = Buffer.from([   194,   247,   64,   157,   1,   9,   224,   178,
// 221,   86,   214,   236,   37,   215,   203,   37,   232,   125,   70,   222,
//   122,   61,   78,   80,   162,   126,   86,   152,   142,   136,   63,
// 238 ]) let pek = Buffer.from([   243,   45,   53,   210,   180,   13,   166,
// 88,   42,   166,   165,   75,   253,   36,   138,   57,   190,   46,   179,
// 98,   13,   51,   16,   11,   197,   8,   47,   42,   181,   251,   203, 109
// ]) let {signature, recover} = secp256k1.sign(buf, pek) let oneByte =
// Buffer.from([recover]) signature = Buffer.concat([   signature, oneByte ],
// 65) console.log('0x' + signature.toString('hex'))

const getSigner = (txbuf, privateKeybuf) => {
  let {signature, recover} = secp256k1.sign(txbuf, privateKeybuf)
  let oneByte = Buffer.from([recover])
  signature = Buffer.concat([
    signature, oneByte
  ], 65)
  return '0x' + signature.toString('hex')
}
module.exports = {
  getSigner
}