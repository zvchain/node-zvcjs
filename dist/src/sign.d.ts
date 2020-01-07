/// <reference types="node" />
export declare class Signer {
    constructor();
    getSigner: (txbuf: Buffer, privateKeybuf: Buffer) => string;
}
