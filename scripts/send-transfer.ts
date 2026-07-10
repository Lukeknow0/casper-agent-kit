import { readFile } from "node:fs/promises";
import * as sdk from "casper-js-sdk";

const realSdk = (sdk as any).default || sdk;
const { RpcClient, HttpHandler, PrivateKey, NativeTransferBuilder, KeyAlgorithm } = realSdk;

async function main(): Promise<void> {
  if (!process.argv.includes("--confirm-testnet-transfer")) {
    throw new Error(
      "Transfer blocked. Re-run with --confirm-testnet-transfer after reviewing the account, chain, amount, and fee.",
    );
  }

  const privateKeyPath = process.env.CASPER_SECRET_KEY_PATH;
  if (!privateKeyPath) {
    throw new Error("CASPER_SECRET_KEY_PATH must point to a local Testnet key.");
  }

  const privateKeyPem = await readFile(privateKeyPath, "utf8");
  const privateKey = PrivateKey.fromPem(privateKeyPem, KeyAlgorithm.ED25519);
  const senderPublicKey = privateKey.publicKey;
  const publicKeyHex = senderPublicKey.toHex();

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
