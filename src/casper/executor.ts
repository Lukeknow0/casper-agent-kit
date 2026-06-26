import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import * as sdk from "casper-js-sdk";
import type {
  GuardAction,
  GuardDecision,
  GuardReceipt,
  LlmAnalysis,
  TreasuryScenario,
} from "../types.js";
import type { AppConfig } from "../config.js";

const realSdk = (sdk as any).default || sdk;
const {
  PrivateKey,
  PublicKey,
  ContractCallBuilder,
  NativeTransferBuilder,
  KeyAlgorithm,
  Args,
  CLValue,
  RpcClient,
  HttpHandler,
} = realSdk;

export async function prepareGuardAction(
  config: AppConfig,
  scenario: TreasuryScenario,
  decision: GuardDecision,
  llmAnalysis: LlmAnalysis,
): Promise<GuardReceipt> {
  const createdAt = new Date().toISOString();

  if (config.dryRun || !config.secretKeyPath) {
    return {
      mode: "dry-run",
      action: decision.action,
      treasuryId: scenario.treasuryId,
      contractHash: config.treasuryContractHash,
      transactionHash: deterministicDryRunHash(scenario, decision.action),
      explorerUrl: undefined,
      decision,
      llmAnalysis,
      scenario,
      createdAt,
    };
  }

  try {
    const pemStr = await readFile(config.secretKeyPath, "utf8");
    const privateKey = PrivateKey.fromPem(pemStr, KeyAlgorithm.ED25519);
    const senderPublicKey = privateKey.publicKey;

    const client = new RpcClient(new HttpHandler(config.rpcUrl));
    let txHash = "";

    if (config.treasuryContractHash) {
      console.log(`Live mode: Submitting contract call to ${config.treasuryContractHash}...`);
      let cleanContractHash = config.treasuryContractHash;
      if (cleanContractHash.startsWith("hash-")) {
        cleanContractHash = cleanContractHash.slice(5);
      }

      const builder = new ContractCallBuilder();
      const tx = builder
        .from(senderPublicKey)
        .byHash(cleanContractHash)
        .entryPoint("record_guard_action")
        .runtimeArgs(
          Args.fromMap({
            treasury_id: CLValue.newCLString(scenario.treasuryId),
            action: CLValue.newCLString(decision.action),
          }),
        )
        .payment(2500000000) // 2.5 CSPR fee
        .chainName("casper-test")
        .build();

      tx.sign(privateKey);
      const result = await client.putTransaction(tx);
      txHash = (result.transactionHash as any).toHex ? (result.transactionHash as any).toHex() : result.transactionHash;
    } else {
      console.log("Live mode: No contract hash configured. Falling back to self-transfer transaction proof...");
      const builder = new NativeTransferBuilder();
      const tx = builder
        .from(senderPublicKey)
        .target(senderPublicKey)
        .amount("2500000000") // 2.5 CSPR in motes
        .id(Date.now())
        .chainName("casper-test")
        .payment(100000000) // 0.1 CSPR fee
        .build();

      tx.sign(privateKey);
      const result = await client.putTransaction(tx);
      txHash = (result.transactionHash as any).toHex ? (result.transactionHash as any).toHex() : result.transactionHash;
    }

    const explorerUrl = `${config.explorerBaseUrl}/transaction/${txHash}`;
    console.log(`✓ Live transaction sent! Hash: ${txHash}`);

    return {
      mode: "live",
      action: decision.action,
      treasuryId: scenario.treasuryId,
      contractHash: config.treasuryContractHash,
      transactionHash: txHash,
      explorerUrl,
      decision,
      llmAnalysis,
      scenario,
      createdAt,
    };
  } catch (error: any) {
    console.error("❌ Live execution failed:", error.message || error);
    // Fall back to dry-run but preserve the original action info
    return {
      mode: "dry-run",
      action: decision.action,
      treasuryId: scenario.treasuryId,
      contractHash: config.treasuryContractHash,
      transactionHash: deterministicDryRunHash(scenario, decision.action),
      explorerUrl: undefined,
      decision,
      llmAnalysis,
      scenario,
      createdAt,
    };
  }
}

function deterministicDryRunHash(
  scenario: TreasuryScenario,
  action: GuardAction,
): string {
  const digest = createHash("sha256")
    .update(JSON.stringify({ scenario, action }))
    .digest("hex");
  return `dry-run-${digest.slice(0, 32)}`;
}
