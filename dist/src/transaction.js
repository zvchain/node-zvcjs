"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Send transaction
 *  1.set network
 *  1.get addr  sk
 *  2. get nonce  note async
 *  3.getTx
 *  4.getSigner
 *  5.SendTransaction
 */
var account_1 = require("./account");
var rpc_1 = require("./rpc");
var sign_1 = require("./sign");
var Transaction = /** @class */ (function () {
    function Transaction(_a) {
        var url = _a.url, sk = _a.sk, source = _a.source, target = _a.target, value = _a.value, gas_limit = _a.gas_limit, gas_price = _a.gas_price, type = _a.type, data = _a.data, extra_data = _a.extra_data;
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
    Transaction.prototype.transaction = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rpc, Nonce, Hash, txbuf, privatekeybuf, sign;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rpc = new rpc_1.Rpc(this.url);
                        return [4 /*yield*/, rpc.GetNonce(this.source).then(function (res) {
                                _this.nonce = res.data.result;
                                return res.data.result;
                            })];
                    case 1:
                        Nonce = _a.sent();
                        Hash = new account_1.Account().getHash({
                            source: this.source,
                            target: this.target,
                            value: this.value,
                            gas_limit: this.gas_limit,
                            gas_price: this.gas_price,
                            nonce: Nonce,
                            type: this.type,
                            data: this.data,
                            extra_data: this.extra_data,
                        });
                        txbuf = Buffer.from(Hash.substr(2), 'hex');
                        privatekeybuf = Buffer.from(this.sk.substr(2), 'hex');
                        sign = new sign_1.Signer().getSigner(txbuf, privatekeybuf);
                        console.log({
                            source: this.source,
                            target: this.target,
                            value: this.value,
                            gas_limit: this.gas_limit,
                            gas_price: this.gas_price,
                            type: this.type,
                            nonce: this.nonce,
                            data: this.data,
                            sign: sign,
                            extra_data: this.extra_data,
                        });
                        rpc.SendTransaction({
                            source: this.source,
                            target: this.target,
                            value: this.value,
                            gas_limit: this.gas_limit,
                            gas_price: this.gas_price,
                            type: this.type,
                            nonce: this.nonce,
                            data: this.data,
                            sign: sign,
                            extra_data: this.extra_data,
                        }).then(function (res) {
                            Promise.resolve(res);
                        }).catch(function (error) {
                            Promise.reject(error);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return Transaction;
}());
exports.Transaction = Transaction;
