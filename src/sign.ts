// const secp256k1 = require('secp256k1')
import secp256k1 from 'secp256k1'
/*
 * @param {buffer} txbuf
 * @param {buffer} privateKeybuf
 * @return {string} tx
 */
//  const getSigner = (txbuf: Buffer, privateKeybuf: Buffer) => {
//   const {signature, recovery} = secp256k1.sign(txbuf, privateKeybuf)
//   const oneByte = Buffer.from([recovery])
//   signature = Buffer.concat([
//     signature, oneByte,
//   ], 65)
//   return '0x' + signature.toString('hex')
// }
//  module.exports = {
//   getSigner,
// }
export class Signer {
  constructor() { }
  public getSigner = (txbuf: Buffer, privateKeybuf: Buffer) => {
    const { signature, recovery } = secp256k1.sign(txbuf, privateKeybuf)
    const oneByte = Buffer.from([recovery])
    const lastSignature = Buffer.concat([
      signature, oneByte,
    ], 65)
    return '0x' + lastSignature.toString('hex')
  }
}
