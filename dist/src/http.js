"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var JSONbig = require("json-bigint");
var HttpRequest = /** @class */ (function () {
    function HttpRequest(baseUrl) {
        this.baseUrl = baseUrl;
        // this.baseUrl = baseUrl
    }
    HttpRequest.prototype.request = function (options) {
        var instance = axios_1.default.create();
        options = Object.assign(this.getInsideConfig(), options);
        console.log("options", options);
        this.interceptors(instance, options.url);
        return instance(options);
    };
    HttpRequest.prototype.getInsideConfig = function () {
        var config = {
            headers: {
                "Content-Type": "application/json",
                "baseURL": this.baseUrl,
            },
            transformResponse: [
                // tslint:disable-next-line:only-arrow-functions
                function (data) {
                    return JSONbig.parse(data);
                },
            ],
        };
        return config;
    };
    HttpRequest.prototype.interceptors = function (instance, url) {
        instance.interceptors.request.use(function (config) {
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        instance.interceptors.response.use(function (res) {
            var data = res.data, status = res.status;
            return {
                data: data,
                status: status,
            };
        }, function (error) {
            var errorInfo = error.response;
            if (!errorInfo) {
                var _a = JSON.parse(JSON.stringify(error)), _b = _a.request, statusText = _b.statusText, status_1 = _b.status, config = _a.config;
                errorInfo = {
                    statusText: statusText,
                    status: status_1,
                    request: {
                        responseURL: config.url,
                    },
                };
            }
            return Promise.reject(error);
        });
    };
    return HttpRequest;
}());
exports.default = HttpRequest;
