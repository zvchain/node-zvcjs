"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
var jssha_1 = __importDefault(require("jssha"));
var secp256k1_1 = __importDefault(require("secp256k1"));
var Account = /** @class */ (function () {
    function Account() {
        var _this = this;
        this.getHash = function (_a) {
            var options = __rest(_a, []);
            var source = options.source, target = options.target, value = options.value, gas_limit = options.gas_limit, gas_price = options.gas_price, nonce = options.nonce, type = options.type, data = options.data, extra_data = options.extra_data;
            // if (
            //   !source ||
            //   !target ||
            //   !value ||
            //   !gas_limit ||
            //   !gas_price ||
            //   !nonce  ||
            //   !type
            // ) {
            //   throw new Error("Parameter error");
            //   return;
            // }
            // if (
            //   /^-[0-9]*[1-9][0-9]*$/.test(value) ||
            //   /^-[0-9]*[1-9][0-9]*$/.test(gas_limit) ||
            //   /^-[0-9]*[1-9][0-9]*$/.test(gas_price)
            // ) {
            //   throw new Error("Enter legal number");
            // }
            var buffer = [];
            var reg = /^[Zz][Vv]/;
            var srcString;
            if (reg.test(options.source)) {
                srcString = options.source.substr(2);
            }
            else {
                srcString = options.source;
            }
            var targetString;
            if (reg.test(options.source)) {
                targetString = options.target.substr(2);
            }
            else {
                targetString = options.target;
            }
            // const srcString = options.source.substr(2);
            // const targetString = options.target.substr(2);
            var valueHexString = BigInt(options.value).toString(16);
            var gasLimitHexString = BigInt(options.gas_limit).toString(16);
            var gasPriceHexString = BigInt(options.gas_price).toString(16);
            var nonceHexString = BigInt(options.nonce).toString(16);
            buffer = buffer.concat(_this.Encode(srcString, "hex"));
            buffer = buffer.concat(_this.Encode(targetString, "hex"));
            buffer = buffer.concat(_this.Encode(valueHexString, "hex"));
            buffer = buffer.concat(_this.Encode(gasLimitHexString, "hex"));
            buffer = buffer.concat(_this.Encode(gasPriceHexString, "hex"));
            buffer = buffer.concat(_this.Encode(nonceHexString, "hex"));
            buffer.push(options.type);
            console.log(options.data);
            buffer = buffer.concat(_this.Encode(options.data, "base64"));
            console.log(2);
            buffer = buffer.concat(_this.Encode(options.extra_data, "base64"));
            var sha256_buf = Buffer.from(buffer);
            var SHA_256 = new jssha_1.default("SHA-256", "HEX");
            console.log("txBuf", sha256_buf.toString("hex"));
            SHA_256.update(sha256_buf.toString("hex"));
            SHA_256.getHash("HEX");
            return "0x" + SHA_256.getHash("HEX");
        };
        this.Encode = function (data, _type) {
            var result = [];
            if (data.length % 2 !== 0) {
                data = "0" + data;
            }
            if (data === "00") {
                return [0, 0, 0, 0];
            }
            var dataTmp = Buffer.from(data, _type);
            var lenTmp = Buffer.alloc(4);
            lenTmp.writeUInt32BE(Buffer.byteLength(data, _type));
            result = result.concat(_this.bufferTobytes(lenTmp));
            result = result.concat(_this.bufferTobytes(dataTmp));
            return result;
        };
        this.bufferTobytes = function (buf) {
            var e_1, _a;
            var result = [];
            try {
                for (var _b = __values(buf.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var value = _c.value;
                    result.push(value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return result;
        };
    }
    Account.prototype.createdPrivKeyAndpubKeyAndaddr = function () {
        // tslint:disable-next-line:one-variable-per-declaration
        var privKey, pubKeyArray, pubKeyArrayLeft, pubKeyArrayRight;
        do {
            privKey = crypto_1.randomBytes(32);
        } while (!secp256k1_1.default.privateKeyVerify(privKey));
        var pubKey = secp256k1_1.default.publicKeyCreate(privKey, false);
        pubKeyArray = this.bufferTobytes(pubKey);
        pubKeyArray.shift();
        pubKeyArrayRight = pubKeyArray.slice(pubKeyArray.length / 2);
        pubKeyArrayLeft = pubKeyArray.slice(0, pubKeyArray.length / 2);
        do {
            if (pubKeyArrayLeft[0] === 0) {
                pubKeyArrayLeft.shift();
            }
            if (pubKeyArrayRight[0] === 0) {
                pubKeyArrayRight.shift();
            }
        } while (!(pubKeyArrayLeft[0] !== 0 && pubKeyArrayRight[0] !== 0));
        pubKeyArray = pubKeyArrayLeft.concat(pubKeyArrayRight);
        var sha3_256 = new jssha_1.default("SHA3-256", "HEX", {
            numRounds: parseInt("1", 10),
        });
        sha3_256.update(Buffer.from(pubKeyArray).toString("hex"));
        var adderss = sha3_256.getHash("HEX");
        return {
            sk: "0x" + privKey.toString("hex"),
            pk: "0x" + pubKey.toString("hex"),
            zv: "zv" + adderss,
        };
    };
    Account.prototype.createAddrs = function (privKey) {
        // tslint:disable-next-line:one-variable-per-declaration
        var pubKeyArray, pubKeyArrayLeft, pubKeyArrayRight;
        var pubKey = secp256k1_1.default.publicKeyCreate(Buffer.from(privKey.substr(2).padStart(64, "0"), "hex"), false);
        pubKeyArray = this.bufferTobytes(pubKey);
        pubKeyArray.shift();
        pubKeyArrayRight = pubKeyArray.slice(pubKeyArray.length / 2);
        pubKeyArrayLeft = pubKeyArray.slice(0, pubKeyArray.length / 2);
        do {
            if (pubKeyArrayLeft[0] === 0) {
                pubKeyArrayLeft.shift();
            }
            if (pubKeyArrayRight[0] === 0) {
                pubKeyArrayRight.shift();
            }
        } while (!(pubKeyArrayLeft[0] !== 0 && pubKeyArrayRight[0] !== 0));
        pubKeyArray = pubKeyArrayLeft.concat(pubKeyArrayRight);
        var sha3_256 = new jssha_1.default("SHA3-256", "HEX", {
            numRounds: parseInt("1", 10),
        });
        sha3_256.update(Buffer.from(pubKeyArray).toString("hex"));
        var adderss = sha3_256.getHash("HEX");
        return "zv" + adderss;
    };
    return Account;
}());
exports.Account = Account;
