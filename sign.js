const secp256k1 = require('secp256k1')
/*
 * @param {buffer} txbuf
 * @param {buffer} privateKeybuf
 * @return {string} tx
 */
const getSigner = (txbuf, privateKeybuf) => {
  let {signature, recovery} = secp256k1.sign(txbuf, privateKeybuf)
  let oneByte = Buffer.from([recovery])
  signature = Buffer.concat([
    signature, oneByte
  ], 65)
  return '0x' + signature.toString('hex')
}
module.exports = {
  getSigner
}