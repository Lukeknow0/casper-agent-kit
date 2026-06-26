import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as sdk from "casper-js-sdk";

const realSdk = (sdk as any).default || sdk;
const { RpcClient, HttpHandler, PrivateKey, PublicKey, NativeTransferBuilder, KeyAlgorithm } = realSdk;

const __dirname = dirname(fileURLToPath(import.meta.url));
const privateKeyPath = resolve(__dirname, "../demo/keys/secret_key.pem");
const publicKeyPath = resolve(__dirname, "../demo/keys/public_key.pem");

async function main(): Promise<void> {
  let privateKeyPem = "";
  let publicKeyHex = "";
  
  try {
    privateKeyPem = await readFile(privateKeyPath, "utf8");
    const pubKeyPem = await readFile(publicKeyPath, "utf8");
    const pubKey = PublicKey.fromPem(pubKeyPem, KeyAlgorithm.ED25519);
    publicKeyHex = pubKey.toHex();
  } catch (err) {
    console.error("❌ Failed to read generated keys. Run 'npm run keys:generate' first.");
    process.exitCode = 1;
    return;
  }

  console.log("Loading private key...");
  const privateKey = PrivateKey.fromPem(privateKeyPem, KeyAlgorithm.ED25519);
  const senderPublicKey = PublicKey.fromHex(publicKeyHex);

  console.log(`Preparing transfer of 2.5 CSPR from and to: ${publicKeyHex}`);
  
  const client = new RpcClient(new HttpHandler("https://node.testnet.casper.network/rpc"));

  // Build self-transfer
  const tx = new NativeTransferBuilder()
    .from(senderPublicKey)
    .target(senderPublicKey) // Self-transfer to keep tokens
    .amount("2500000000") // 2.5 CSPR in motes
    .id(Date.now())
    .chainName("casper-test")
    .payment(100000000) // 0.1 CSPR payment
    .build();

  console.log("Signing transaction...");
  tx.sign(privateKey);

  console.log("Submitting transaction to Casper Testnet...");
  try {
    const result = await client.putTransaction(tx);
    const txHash = (result.transactionHash as any).toHex ? (result.transactionHash as any).toHex() : result.transactionHash;
    const explorerUrl = `https://testnet.cspr.live/transaction/${txHash}`;
    
    console.log("\n==========================================");
    console.log("✓ Transaction submitted successfully!");
    console.log(`- Transaction Hash: ${txHash}`);
    console.log(`- Explorer URL:     ${explorerUrl}`);
    console.log("==========================================");
    console.log("\nPlease wait 1-2 minutes for the transaction to be confirmed on-chain.");
    console.log("==========================================\n");
  } catch (error: any) {
    console.error("\n❌ Failed to submit transaction:", error.message || error);
    process.exitCode = 1;
  }
}

main().catch((err: unknown) => {
  console.error("System error:", err);
  process.exitCode = 1;
});
