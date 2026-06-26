import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { loadConfig } from "../config.js";
import { CasperRpcClient } from "../casper/rpc.js";
import { CsprCloudClient } from "../casper/cspr-cloud.js";
import { prepareGuardAction } from "../casper/executor.js";
import { evaluateTreasuryPolicy } from "../agent/policy.js";
import { analyzeTreasuryScenario } from "../agent/llm.js";
import type { TreasuryScenario } from "../types.js";

const config = loadConfig();
const rpc = new CasperRpcClient(config.rpcUrl);
const csprCloud = new CsprCloudClient(config);

const server = new McpServer({
  name: "casper-agent-kit",
  version: "0.1.0",
});

const treasuryScenarioSchema = {
  treasuryId: z.string().describe("Human-readable treasury identifier."),
  requestedSpendUsd: z.number().nonnegative(),
  currentReserveUsd: z.number().nonnegative(),
  projectedReserveUsd: z.number().nonnegative(),
  riskScore: z.number().min(0).max(100),
  counterparty: z.string(),
  memo: z.string(),
};

server.registerTool(
  "casper_get_node_status",
  {
    title: "Get Casper node status",
    description: "Read status from the configured Casper Testnet RPC node.",
    inputSchema: {},
  },
  async () => jsonResult(await rpc.getNodeStatus()),
);

server.registerTool(
  "casper_get_latest_block",
  {
    title: "Get latest Casper block",
    description: "Fetch the latest block from Casper Testnet.",
    inputSchema: {},
  },
  async () => jsonResult(await rpc.getLatestBlock()),
);

server.registerTool(
  "casper_query_global_state",
  {
    title: "Query Casper global state",
    description: "Query global state by key and optional path.",
    inputSchema: {
      key: z.string().describe("Global state key, such as hash-..."),
      path: z
        .array(z.string())
        .default([])
        .describe("Optional path segments under the global state key."),
    },
  },
  async ({ key, path }) => jsonResult(await rpc.queryGlobalState(key, path)),
);

server.registerTool(
  "casper_get_account_balance",
  {
    title: "Get Casper account balance via CSPR.cloud",
    description:
      "Read account information through CSPR.cloud when CSPR_CLOUD_API_TOKEN is configured.",
    inputSchema: {
      accountIdentifier: z
        .string()
        .describe("Casper public key or account hash."),
    },
  },
  async ({ accountIdentifier }) =>
    jsonResult(await csprCloud.getAccountBalance(accountIdentifier)),
);

server.registerTool(
  "treasury_guard_evaluate_policy",
  {
    title: "Evaluate Treasury Guard policy",
    description:
      "Evaluate whether a treasury spend should be approved, frozen, or rebalanced.",
    inputSchema: treasuryScenarioSchema,
  },
  async (scenario) =>
    jsonResult(evaluateTreasuryPolicy(scenario as TreasuryScenario)),
);

server.registerTool(
  "treasury_guard_prepare_action",
  {
    title: "Prepare Treasury Guard action",
    description:
      "Evaluate a treasury scenario and prepare a dry-run receipt or live Casper transaction payload.",
    inputSchema: treasuryScenarioSchema,
  },
  async (scenario) => {
    const typedScenario = scenario as TreasuryScenario;
    const decision = evaluateTreasuryPolicy(typedScenario);
    const llmAnalysis = await analyzeTreasuryScenario(
      config,
      typedScenario,
      decision,
      {
        rpcUrl: config.rpcUrl,
        contractHash: config.treasuryContractHash ?? "not-deployed-yet",
      },
    );
    const receipt = await prepareGuardAction(
      config,
      typedScenario,
      decision,
      llmAnalysis,
    );
    return jsonResult(receipt);
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);

function jsonResult(value: unknown) {
  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(value, null, 2),
      },
    ],
  };
}
