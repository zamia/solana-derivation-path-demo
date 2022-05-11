# solana-derivation-path-demo
Show the difference between solana-cli and Phantom/Slope wallets regarding generating keypairs

## Usage

```
npm i
npm run keypair
```
This repo demostrates the difference methods used by solana-cli and other wallets:

* solana-cli directly generate seed from mnomonic and then slice the first 32 bytes, and then generate keypairs; like the following code:

```
    const seed = bip39.mnemonicToSeedSync(mnemonic); 
    console.log(`seed: ${seed.toString('hex')}`);

    let derivedSeed = seed.slice(0, 32);
   
    const keypair = Keypair.fromSeed(derivedSeed);
    console.log(`pubkey: ${keypair.publicKey}\nsecret key: ${keypair.secretKey}`);
```

* Phantom/Slope/Exodus and many other Solana Wallet usually use DerivePath method from ed25519 library to generate keypairs after get the seed. like this:

```
    const seed = bip39.mnemonicToSeedSync(mnemonic); 
    console.log(`seed: ${seed.toString('hex')}`);
    
    const path = "m/44'/501'/0'/0'";
    const derivedSeed = derivePath(path, seed.toString('hex')).key;
    console.log(`derived seed: ${derivedSeed.toString('hex')}`);
    

    const keypair = Keypair.fromSeed(derivedSeed);
    console.log(`pubkey: ${keypair.publicKey}\nsecret key: ${keypair.secretKey}`); 
```
