import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as sdk from "casper-js-sdk";

const realSdk = (sdk as any).default || sdk;
const { KeyAlgorithm, PrivateKey } = realSdk;

const __dirname = dirname(fileURLToPath(import.meta.url));
const keysDir = resolve(__dirname, "../demo/keys");

async function main(): Promise<void> {
  // 1. Generate Ed25519 Keypair
  console.log("Generating a new Casper Ed25519 keypair...");
  const privateKey = PrivateKey.generate(KeyAlgorithm.ED25519);
  const publicKey = privateKey.publicKey;

  // 2. Export PEM strings
  const privateKeyPem = privateKey.toPem();
  const publicKeyPem = publicKey.toPem();
  const publicKeyHex = publicKey.toHex();

  // 3. Ensure folder exists and write keys
  await mkdir(keysDir, { recursive: true });

  const privateKeyPath = resolve(keysDir, "secret_key.pem");
  const publicKeyPath = resolve(keysDir, "public_key.pem");

  await writeFile(privateKeyPath, privateKeyPem, "utf8");
  await writeFile(publicKeyPath, publicKeyPem, "utf8");

  console.log("\n==========================================");
  console.log("✓ Keys generated successfully!");
  console.log(`- Private Key Path: ${privateKeyPath}`);
  console.log(`- Public Key Path:  ${publicKeyPath}`);
  console.log(`- Public Hex Key:   ${publicKeyHex}`);
  console.log("==========================================");
  console.log("\nInstructions for funding:");
  console.log("1. Copy the Public Hex Key above.");
  console.log("2. Open https://testnet.cspr.live/tools/faucet in your browser.");
  console.log("3. Log in or complete captcha, paste your public hex key, and request tokens.");
  console.log("4. Once you have requested tokens, verify your balance on testnet.cspr.live.");
  console.log("==========================================\n");
}

main().catch((err: unknown) => {
  console.error("Error generating keys:", err);
  process.exitCode = 1;
});
