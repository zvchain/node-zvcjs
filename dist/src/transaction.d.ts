export declare class Transaction {
    url: any;
    sk: any;
    source: any;
    target: any;
    value: any;
    gas_limit: any;
    gas_price: any;
    type: any;
    data: any;
    extra_data: any;
    nonce: number;
    constructor({ url, sk, source, target, value, gas_limit, gas_price, type, data, extra_data }: TransactionType);
    transaction(): Promise<void>;
}
