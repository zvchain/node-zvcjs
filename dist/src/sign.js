"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const secp256k1 = require('secp256k1')
var secp256k1_1 = __importDefault(require("secp256k1"));
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
var Signer = /** @class */ (function () {
    function Signer() {
        this.getSigner = function (txbuf, privateKeybuf) {
            var _a = secp256k1_1.default.sign(txbuf, privateKeybuf), signature = _a.signature, recovery = _a.recovery;
            var oneByte = Buffer.from([recovery]);
            var lastSignature = Buffer.concat([
                signature, oneByte,
            ], 65);
            return '0x' + lastSignature.toString('hex');
        };
    }
    return Signer;
}());
exports.Signer = Signer;
