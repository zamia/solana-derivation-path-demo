import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import { derivePath } from "ed25519-hd-key";

const generateKeypair = async () => {
  const keypair = Keypair.generate();
  console.log(`pubkey: ${keypair.publicKey}`);
  console.log(`secret key: ${keypair.secretKey}`);
  return keypair;
};

const generateKeypairByPhrase = async (
  mnemonic,
  options = { enable_path: true }
) => {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  console.log(`seed: ${seed.toString("hex")}`);

  let derivedSeed = seed.slice(0, 32);
  if (options.enable_path) {
    const path = "m/44'/501'/0'/0'";
    derivedSeed = derivePath(path, seed.toString("hex")).key;
    console.log(`derived seed: ${derivedSeed.toString("hex")}`);
  }

  const keypair = Keypair.fromSeed(derivedSeed);
  const secretKeyHex = Buffer.from(keypair.secretKey).toString("hex");
  console.log(`pubkey: ${keypair.publicKey}\nsecret key hex: ${secretKeyHex}`);

  return keypair;
};

const mnemonic = bip39.generateMnemonic();
console.log(`recovery phrase: ${mnemonic}`);

console.log("\n");
console.log(
  "first key using deriavation path ================================"
);
await generateKeypairByPhrase(mnemonic);

console.log("\n");
console.log(
  "second key don't using deriavation path ================================"
);
await generateKeypairByPhrase(mnemonic, { enable_path: false });

console.log("\n");
console.log(
  "Medal'Key using deriavation path ================================"
);
await generateKeypairByPhrase(
  "mean hole rely wild broccoli engage pitch manual day enable flock merit"
);
