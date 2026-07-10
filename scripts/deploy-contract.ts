import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as sdk from "casper-js-sdk";

const realSdk = (sdk as any).default || sdk;
const {
  RpcClient,
  HttpHandler,
  PrivateKey,
  SessionBuilder,
  KeyAlgorithm,
  Args,
} = realSdk;

const __dirname = dirname(fileURLToPath(import.meta.url));
const wasmPath = resolve(
  __dirname,
  "../contracts/treasury_guard/contract/target/wasm32-unknown-unknown/release/contract.wasm"
);

async function main() {
  if (!process.argv.includes("--confirm-testnet-deploy")) {
    throw new Error(
      "Deployment blocked. Re-run with --confirm-testnet-deploy after reviewing the contract, account, chain, and payment amount.",
    );
  }

  const privateKeyPath = process.env.CASPER_SECRET_KEY_PATH;
  if (!privateKeyPath) {
    throw new Error("CASPER_SECRET_KEY_PATH must point to a local Testnet key.");
  }

  const privateKeyPem = await readFile(privateKeyPath, "utf8");
  const privateKey = PrivateKey.fromPem(privateKeyPem, KeyAlgorithm.ED25519);
  const senderPublicKey = privateKey.publicKey;

  console.log("Loading WASM from:", wasmPath);
  const wasm = new Uint8Array(await readFile(wasmPath));

  const builder = new SessionBuilder();
  const tx = builder
    .from(senderPublicKey)
    .wasm(wasm)
    .installOrUpgrade()
    .runtimeArgs(Args.fromMap({}))
    .chainName("casper-test")
    .payment(150000000000) // 150 CSPR for contract deployment
    .build();

  console.log("Signing transaction...");
  tx.sign(privateKey);

  console.log("Submitting contract deployment to Casper Testnet...");
  const client = new RpcClient(new HttpHandler("https://node.testnet.casper.network/rpc"));
  
  const result = await client.putTransaction(tx);
  const txHash = (result.transactionHash as any).toHex ? (result.transactionHash as any).toHex() : result.transactionHash;
  
  console.log("\n==========================================");
  console.log("✓ Contract deployment transaction submitted!");
  console.log(`- Transaction Hash: ${txHash}`);
  console.log(`- Explorer URL:     https://testnet.cspr.live/transaction/${txHash}`);
  console.log("==========================================");
  console.log("\nPlease wait 1-2 minutes for the transaction to be confirmed on-chain.");
  console.log("Once confirmed, use the explorer to find the Contract Hash under 'Execution Results', and update .env CASPER_TREASURY_CONTRACT_HASH.");
}

main().catch((err) => {
  console.error("Failed to deploy contract:", err);
  process.exitCode = 1;
});
