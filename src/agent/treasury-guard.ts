import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadConfig } from "../config.js";
import { prepareGuardAction } from "../casper/executor.js";
import { evaluateTreasuryPolicy } from "./policy.js";
import { analyzeTreasuryScenario } from "./llm.js";
import type { TreasuryScenario } from "../types.js";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const scenarioPath = resolve(rootDir, "demo/scenario.json");
const outputPath = resolve(rootDir, "demo/runs/treasury-guard-latest.json");

async function main(): Promise<void> {
  const scenario = JSON.parse(
    await readFile(scenarioPath, "utf8"),
  ) as TreasuryScenario;
  const config = loadConfig();
  const decision = evaluateTreasuryPolicy(scenario);
  const llmAnalysis = await analyzeTreasuryScenario(config, scenario, decision, {
    rpcUrl: config.rpcUrl,
    contractHash: config.treasuryContractHash ?? "not-configured",
  });
  const receipt = await prepareGuardAction(config, scenario, decision, llmAnalysis);

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, JSON.stringify(receipt, null, 2));

  console.log("CasperAgentKit Treasury Guard");
  console.log(`Treasury: ${scenario.treasuryId}`);
  console.log(`Action: ${receipt.action}`);
  console.log(`Mode: ${receipt.mode}`);
  console.log(`Receipt: ${outputPath}`);
  console.log("Rationale:");
  for (const item of decision.rationale) {
    console.log(`- ${item}`);
  }
  console.log("LLM analysis:");
  console.log(`- provider: ${llmAnalysis.provider}`);
  console.log(`- summary: ${llmAnalysis.summary}`);

  if (receipt.transactionHash) {
    console.log(`Transaction Hash: ${receipt.transactionHash}`);
  }
  if (receipt.explorerUrl) {
    console.log(`Explorer URL: ${receipt.explorerUrl}`);
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
