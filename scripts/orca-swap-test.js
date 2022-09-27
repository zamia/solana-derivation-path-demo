import { Connection, PublicKey, Keypair, clusterApiUrl } from "@solana/web3.js";
import { getOrca, OrcaPoolConfig } from "@orca-so/sdk";
import { Buffer } from "buffer";
import decimal from "decimal.js";
const { Decimal } = decimal;

const medal_secret =
  "a7268a7f600c23f7916297c5cd86ff1884f2cfe4a85082b43413c70b5508df0ead08b43045ee584397475096d8b8d8012b917697197ca5bdb5dc31553bbc9cb6";
const keypair = Keypair.fromSecretKey(Buffer.from(medal_secret, "hex"));
const pubkey = new PublicKey(keypair.publicKey);

const connection = new Connection(
  clusterApiUrl("mainnet-beta"),
  "singleGossip"
);
const orca = getOrca(connection);

// test swap 0.1 sol for USDC
try {
  const orcaPool = orca.getPool(OrcaPoolConfig.SOL_USDC);
  const solToken = orcaPool.getTokenA();
  const solAmount = new Decimal(0.1);
  const quote = await orcaPool.getQuote(solToken, solAmount);
  const usdcAmount = quote.getMinOutputAmount();
  console.log(`usdc amount minimum output: ${usdcAmount.toNumber()}`);

  const swapPayload = await orcaPool.swap(
    keypair,
    solToken,
    solAmount,
    usdcAmount
  );
  const swapTxId = await swapPayload.execute();
  console.log(`swap tx id: ${swapTxId}`);
} catch (e) {
  console.log(`error found: ${e.message}`);
}
