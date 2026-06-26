import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as sdk from "casper-js-sdk";

const realSdk = (sdk as any).default || sdk;
const { RpcClient, HttpHandler, PublicKey, PurseIdentifier, KeyAlgorithm } = realSdk;

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicKeyPath = resolve(__dirname, "../demo/keys/public_key.pem");

async function main(): Promise<void> {
  let publicKeyHex = "";
  try {
    const pemStr = await readFile(publicKeyPath, "utf8");
    const pubKey = PublicKey.fromPem(pemStr, KeyAlgorithm.ED25519);
    publicKeyHex = pubKey.toHex();
  } catch (err: any) {
    console.error(`❌ Failed to read generated public key: ${err.message}`);
    process.exitCode = 1;
    return;
  }

  console.log(`Checking balance for address: ${publicKeyHex}`);
  
  const client = new RpcClient(new HttpHandler("https://node.testnet.casper.network/rpc"));
  const pubKeyObj = PublicKey.fromHex(publicKeyHex);
  const purseId = PurseIdentifier.fromPublicKey(pubKeyObj);

  try {
    const result = await client.queryLatestBalance(purseId);
    // Casper 2.0 returns balance object or bigInt
    const balanceMotes = (result as any).balance || result;
    const balanceCspr = Number(balanceMotes) / 1000000000;
    
    console.log("\n==========================================");
    console.log(`✓ Account is active and funded!`);
    console.log(`- Balance: ${balanceCspr} CSPR (${balanceMotes} motes)`);
    console.log("==========================================\n");
  } catch (error: any) {
    if (error.message && error.message.includes("Purse not found")) {
      console.log("\n==========================================");
      console.log("❌ Account is NOT funded yet (Purse not found).");
      console.log("==========================================");
      console.log("\nPlease follow these steps to fund it:");
      console.log("1. Open https://testnet.cspr.live/tools/faucet in your browser.");
      console.log(`2. Paste your address: ${publicKeyHex}`);
      console.log("3. Click 'Request Tokens'.");
      console.log("4. Wait 1-2 minutes for the transaction to finalize, then run this script again.");
      console.log("==========================================\n");
    } else {
      console.error("Error querying balance:", error.message || error);
      process.exitCode = 1;
    }
  }
}

main().catch((err: unknown) => {
  console.error("System error:", err);
  process.exitCode = 1;
});
