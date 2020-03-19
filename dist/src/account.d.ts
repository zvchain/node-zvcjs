export default class Account {
    constructor();
    createdPrivKeyAndpubKeyAndaddr(): Address;
    createAddrs(privKey: StringDataFormat): StringDataFormat;
    genHash: ({ ...options }: GenHash) => string;
    private Encode;
    private bufferTobytes;
}
