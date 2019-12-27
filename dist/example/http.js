"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const json_bigint_1 = __importDefault(require("json-bigint"));
class HttpRequest {
    constructor() { }
    request(options) {
        const instance = axios_1.default.create();
        options = Object.assign(this.getInsideConfig(), options);
        this.interceptors(instance, options.url);
        return instance(options);
    }
    getInsideConfig() {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            transformResponse: [
                // tslint:disable-next-line:only-arrow-functions
                function (data) {
                    return json_bigint_1.default.parse(data);
                },
            ],
        };
        return config;
    }
    interceptors(instance, url) {
        instance.interceptors.request.use((config) => {
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
        instance.interceptors.response.use((res) => {
            const { data, status } = res;
            return {
                data,
                status,
            };
        }, (error) => {
            let errorInfo = error.response;
            if (!errorInfo) {
                const { request: { statusText, status }, config, } = JSON.parse(JSON.stringify(error));
                errorInfo = {
                    statusText,
                    status,
                    request: {
                        responseURL: config.url,
                    },
                };
            }
            return Promise.reject(error);
        });
    }
}
exports.HttpRequest = HttpRequest;
