"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("./http"));
var Zvcjs = /** @class */ (function (_super) {
    __extends(Zvcjs, _super);
    function Zvcjs(baseURL) {
        var _this = _super.call(this, baseURL) || this;
        _this.baseURL = baseURL;
        _this.setParams = function (nameSpace, method) {
            var params = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                params[_i - 2] = arguments[_i];
            }
            var option = {
                method: nameSpace + "_" + method,
                params: params,
                id: 1,
                jsonrpc: "2.0",
            };
            return JSON.stringify(option);
        };
        _this.Balance = function (address) {
            var params = _this.setParams("Gzv", 'balance', address);
            console.log(params);
            return _this.request({
                method: 'post',
                data: params,
                url: _this.baseURL,
            });
        };
        _this.GetBlockByHeight = function (height) {
            var params = _this.setParams("Gzv", 'getBlockByHeight', height);
            return _this.request({
                method: 'post',
                data: params,
                url: _this.baseURL,
            });
        };
        _this.GetblockHeight = function () {
            var params = _this.setParams("Gzv", 'blockHeight');
            return _this.request({
                method: 'post',
                url: _this.baseURL,
                data: params,
            });
        };
        _this.GetBlockByHash = function (hash) {
            var params = _this.setParams("Gzv", 'getBlockByHash', hash);
            return _this.request({
                method: 'post',
                url: _this.baseURL,
                data: params,
            });
        };
        _this.GetTransactionByHash = function (hash) {
            var params = _this.setParams("Gzv", 'transDetail', hash);
            return _this.request({
                method: 'post',
                url: _this.baseURL,
                data: params,
            });
        };
        _this.GetBlockHashByHeight = function (height) {
            var params = _this.setParams("Gzv", 'getBlockByHeight', height);
            return _this.request({
                method: 'post',
                url: _this.baseURL,
                data: params,
            });
        };
        _this.GetNonce = function (address) {
            var params = _this.setParams("Gzv", 'nonce', address);
            return _this.request({
                method: 'post',
                url: _this.baseURL,
                data: params,
            });
        };
        _this.minerInfo = function (address, detail) {
            var params = _this.setParams("Gzv", 'minerInfo', address, detail);
            return _this.request({
                method: 'post',
                url: _this.baseURL,
                data: params,
            });
        };
        _this.SendTransaction = function (tx) {
            var params = _this.setParams("Gzv", 'tx', tx);
            return _this.request({
                method: 'post',
                url: _this.baseURL,
                data: params,
            });
        };
        return _this;
    }
    return Zvcjs;
}(http_1.default));
exports.Zvcjs = Zvcjs;
