import { Keypair } from '@solana/web3.js';
import nacl from 'tweetnacl';
import bs58 from 'bs58';

const createSignature = (message, privateKey) => {
  return bs58.encode(nacl.sign.detached(message, privateKey));
};

const verifySignature = (message, signature, publicKey) => {
  const signUint8 = bs58.decode(signature);
  return nacl.sign.detached.verify(message, signUint8, publicKey);
}

const keypair = nacl.sign.keyPair.fromSecretKey(Keypair.generate().secretKey);
const publicKey = keypair.publicKey;
const privateKey = keypair.secretKey;
console.log(`public key: ${bs58.encode(publicKey)}`);
console.log(`private key: ${bs58.encode(privateKey)}`);

const message = Uint8Array.from([0xab, 0xbc, 0xcd, 0xde]);

const sign = createSignature(message, privateKey);
console.log(`signature: ${sign}`);

const result = verifySignature(message, sign, publicKey);
console.log(`verify result: ${result}`);