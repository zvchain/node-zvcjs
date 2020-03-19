import { HexBase64BinaryEncoding, randomBytes } from 'crypto'
import jsSHA from "jssha";
import secp256k1 from 'secp256k1'

export class Account{
  constructor() { }
  public createdPrivKeyAndpubKeyAndaddr(): Address{
    // tslint:disable-next-line:one-variable-per-declaration
    let privKey: Buffer, pubKeyArray: number[], pubKeyArrayLeft: number[], pubKeyArrayRight: number[];
    do {
      privKey = randomBytes(32);
    } while (!secp256k1.privateKeyVerify(privKey));

    const pubKey = secp256k1.publicKeyCreate(privKey, false);

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

    const sha3_256 = new jsSHA("SHA3-256", "HEX", {
      numRounds: parseInt("1", 10),
    });
    sha3_256.update(Buffer.from(pubKeyArray).toString("hex"));
    const adderss = sha3_256.getHash("HEX");

    return {
      sk: "0x" + privKey.toString("hex"),
      pk: "0x" + pubKey.toString("hex"),
      zv: "zv" + adderss,
    };
  }
  public createAddrs(privKey: StringDataFormat): StringDataFormat {
    // tslint:disable-next-line:one-variable-per-declaration
    let pubKeyArray: number[], pubKeyArrayLeft: number[], pubKeyArrayRight: number[];
    const pubKey = secp256k1.publicKeyCreate(
      Buffer.from(privKey.substr(2).padStart(64, "0"), "hex"),
      false,
    );
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

    const sha3_256 = new jsSHA("SHA3-256", "HEX", {
      numRounds: parseInt("1", 10),
    });
    sha3_256.update(Buffer.from(pubKeyArray).toString("hex"));
    const adderss = sha3_256.getHash("HEX");
    return "zv" + adderss;
  }
  public getHash = ({ ...options }: GenHash): StringDataFormat => {
    const {
      source,
      target,
      value,
      gas_limit,
      gas_price,
      nonce,
      type,
      data,
      extra_data,
    } = options;

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
    let buffer = [];
    const reg = /^[Zz][Vv]/
    let srcString: string;
    if (reg.test( options.source)) {
      srcString = options.source.substr(2);
    }else{
      srcString = options.source
    }
    let targetString: string;
    if (reg.test( options.source)) {
      targetString = options.target.substr(2);
    }else{
      targetString = options.target
    }
    // const srcString = options.source.substr(2);
    // const targetString = options.target.substr(2);
    const valueHexString = BigInt(options.value).toString(16);
    const gasLimitHexString = BigInt(options.gas_limit).toString(16);
    const gasPriceHexString = BigInt(options.gas_price).toString(16);
    const nonceHexString = BigInt(options.nonce).toString(16);
    buffer = buffer.concat(this.Encode(srcString, "hex"));
    buffer = buffer.concat(this.Encode(targetString, "hex"));
    buffer = buffer.concat(this.Encode(valueHexString, "hex"));
    buffer = buffer.concat(this.Encode(gasLimitHexString, "hex"));
    buffer = buffer.concat(this.Encode(gasPriceHexString, "hex"));
    buffer = buffer.concat(this.Encode(nonceHexString, "hex"));

    buffer.push(options.type);
    buffer = buffer.concat(this.Encode(options.data, "base64"));
    buffer = buffer.concat(this.Encode(options.extra_data, "base64"));

    const sha256_buf = Buffer.from(buffer);
    const SHA_256 = new jsSHA("SHA-256", "HEX");
    SHA_256.update(sha256_buf.toString("hex"));
    SHA_256.getHash("HEX");
    return "0x" + SHA_256.getHash("HEX");
  };
  private Encode = (data: string, _type) => {
    let result = [];
    if (data.length % 2 !== 0) {
      data = "0" + data;
    }
    if (data === "00") {
      return [0, 0, 0, 0];
    }
    const dataTmp = Buffer.from(data, _type);
    const lenTmp = Buffer.alloc(4);
    lenTmp.writeUInt32BE(Buffer.byteLength(data, _type));
    result = result.concat(this.bufferTobytes(lenTmp));
    result = result.concat(this.bufferTobytes(dataTmp));
    return result;
  };
  private bufferTobytes = (buf: Buffer): number[] => {
    const result = [];
    for (const value of buf.values()) {
      result.push(value);
    }
    return result;
  };

}
