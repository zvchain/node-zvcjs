const jsSHA = require("jssha");

const { randomBytes } = require("crypto");
const secp256k1 = require("secp256k1");
/**
 *
 * @param {buffer} buf
 */
const bufferTobytes = buf => {
  var result = [];
  for (const value of buf.values()) {
    result.push(value);
  }
  return result;
};
/**
 * @return {object}
 */
function createdPrivKeyAndpubKeyAndaddr() {
  let privKey, pubKeyArray, pubKeyArrayLeft, pubKeyArrayRight;
  do {
    privKey = randomBytes(32);
  } while (!secp256k1.privateKeyVerify(privKey));

  const pubKey = secp256k1.publicKeyCreate(privKey, false);

  pubKeyArray = bufferTobytes(pubKey);
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
    numRounds: parseInt(1, 10)
  });
  sha3_256.update(Buffer.from(pubKeyArray).toString("hex"));
  const adderss = sha3_256.getHash("HEX");

  return {
    sk: "0x" + privKey.toString("hex"),
    pk: "0x" + pubKey.toString("hex"),
    zv: "zv" + adderss
  };
}
function createAddrs(privKey) {
  let pubKeyArray, pubKeyArrayLeft, pubKeyArrayRight;
  const pubKey = secp256k1.publicKeyCreate(
    Buffer.from(privKey.substr(2).padStart(64, "0"), "hex"),
    false
  );
  pubKeyArray = bufferTobytes(pubKey);
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
    numRounds: parseInt(1, 10)
  });
  sha3_256.update(Buffer.from(pubKeyArray).toString("hex"));
  const adderss = sha3_256.getHash("HEX");
  return "zv" + adderss;
}
function skToAddrsAnPk(privKey) {
  let pubKeyArray, pubKeyArrayLeft, pubKeyArrayRight;
  const pubKey = secp256k1.publicKeyCreate(
    Buffer.from(privKey.substr(2).padStart(64, "0"), "hex"),
    false
  );
  pubKeyArray = bufferTobytes(pubKey);
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
    numRounds: parseInt(1, 10)
  });
  sha3_256.update(Buffer.from(pubKeyArray).toString("hex"));
  const adderss = sha3_256.getHash("HEX");
  return {
    sk: privKey,
    pk: "0x" + pubKey.toString("hex"),
    zv: "zv" + adderss
  };
}
/**
 *
 * @param {*} data
 * @param {*} _type
 */
const Encode = (data, _type) => {
  var result = [];
  if (data.length % 2 !== 0) {
    data = "0" + data;
  }
  if (data === "00") {
    return [0, 0, 0, 0];
  }
  let dataTmp = Buffer.from(data, _type);
  let lenTmp = Buffer.alloc(4);
  lenTmp.writeUInt32BE(Buffer.byteLength(data, _type));
  result = result.concat(bufferTobytes(lenTmp));
  result = result.concat(bufferTobytes(dataTmp));
  return result;
};
/**
 *
 * @param {objet[string]} param0
 */
const genHash = ({ ...options }) => {
  let {
    src,
    target,
    value,
    gasLimit,
    gasPrice,
    nonce,
    typ,
    data,
    extra
  } = options;

  if (
    src === "" ||
    target === "" ||
    value === "" ||
    gasLimit === "" ||
    gasPrice === "" ||
    nonce === "" ||
    typ === ""
  ) {
    throw new Error("Parameter error");
    return;
  }
  if (
    /^-[0-9]*[1-9][0-9]*$/.test(value) ||
    /^-[0-9]*[1-9][0-9]*$/.test(gasLimit) ||
    /^-[0-9]*[1-9][0-9]*$/.test(gasPrice)
  ) {
    throw new Error("Enter legal number");
  }
  let buffer = [];
  let srcString = options.src.substr(2);
  let targetString = options.target.substr(2);
  let valueHexString = BigInt(options.value).toString(16);
  let gasLimitHexString = BigInt(options.gasLimit).toString(16);
  let gasPriceHexString = BigInt(options.gasPrice).toString(16);
  let nonceHexString = BigInt(options.nonce).toString(16);

  buffer = buffer.concat(Encode(srcString, "hex"));
  buffer = buffer.concat(Encode(targetString, "hex"));
  buffer = buffer.concat(Encode(valueHexString, "hex"));
  buffer = buffer.concat(Encode(gasLimitHexString, "hex"));
  buffer = buffer.concat(Encode(gasPriceHexString, "hex"));
  buffer = buffer.concat(Encode(nonceHexString, "hex"));

  buffer.push(parseInt(options.typ));
  buffer = buffer.concat(Encode(options.data, "base64"));
  buffer = buffer.concat(Encode(options.extra, "base64"));

  let sha256_buf = Buffer.from(buffer);
  let SHA_256 = new jsSHA("SHA-256", "HEX");
  console.log("txBuf", sha256_buf.toString("hex"));
  SHA_256.update(sha256_buf.toString("hex"));
  SHA_256.getHash("HEX");
  return "0x" + SHA_256.getHash("HEX");
};
/**
 *
 * @param {string} n
 */
const NewAssetFromString = n => {
  let unit = n.replace(/[^a-zA-Z]/gi, "").toLowerCase();
  let number = parseFloat(n);
  switch (unit) {
    case "ra":
      number = number;
      break;
    case "kra":
      number = number * 1e3;
      break;
    case "mra":
      number = number * 1e6;
      break;
    default:
      number = number * 1e9;

      break;
  }
  return number | 0;
};
module.exports = {
  NewAssetFromString,
  skToAddrsAnPk,
  genHash,
  createdPrivKeyAndpubKeyAndaddr,
  createAddrs
};
