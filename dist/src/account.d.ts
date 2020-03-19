export declare class Account {
    constructor();
    createdPrivKeyAndpubKeyAndaddr(): Address;
    createAddrs(privKey: StringDataFormat): StringDataFormat;
    getHash: ({ ...options }: GenHash) => string;
    private Encode;
    private bufferTobytes;
}
