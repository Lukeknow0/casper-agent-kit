import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const serverPath = resolve(__dirname, "../src/mcp/server.ts");

async function runTest() {
  console.log("Starting MCP server as a child process...");
  const child = spawn("npx", ["tsx", serverPath], {
    stdio: ["pipe", "pipe", "inherit"],
    env: {
      ...process.env,
      // The smoke test validates the MCP tool contract. Keep it read-only/dry-run
      // even when the local developer .env is configured for live signing.
      CASPER_DRY_RUN: "true",
      CASPER_SECRET_KEY_PATH: "",
    },
  });

  let output = "";
  child.stdout.on("data", (data) => {
    output += data.toString();
  });

  // Wait a moment for server to initialize
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Initialize MCP connection
  const initRequest = {
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
      protocolVersion: "2024-11-05",
      capabilities: {},
      clientInfo: { name: "smoke-test", version: "1.0.0" }
    }
  };
  child.stdin.write(JSON.stringify(initRequest) + "\n");
  
  await new Promise((resolve) => setTimeout(resolve, 500));

  child.stdin.write(JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }) + "\n");

  await new Promise((resolve) => setTimeout(resolve, 500));

  // MCP JSON-RPC 2.0 Request for treasury_guard_prepare_action
  const request = {
    jsonrpc: "2.0",
    id: 2,
    method: "tools/call",
    params: {
      name: "treasury_guard_prepare_action",
      arguments: {
        treasuryId: "smoke-test-treasury",
        requestedSpendUsd: 1000,
        currentReserveUsd: 10000,
        projectedReserveUsd: 9000,
        riskScore: 30,
        counterparty: "01045e0f4dfac83962a9267d736b791c4bf707d74b439fc850dd2f207f44504ef7",
        memo: "Test payment"
      },
    },
  };

  console.log("Sending tools/call request for treasury_guard_prepare_action...");
  child.stdin.write(JSON.stringify(request) + "\n");

  // Wait a bit to collect response
  await new Promise((resolve) => setTimeout(resolve, 4000));

  child.kill();

  console.log("Response received:");
  try {
    // Basic extraction of JSON-RPC response from stdio
    const lines = output.trim().split("\n");
    let found = false;
    for (const line of lines) {
      if (line.includes('"id":2')) {
        const response = JSON.parse(line);
        console.log(JSON.stringify(response, null, 2));
        
        const content = response.result?.content?.[0]?.text;
        if (content) {
          const parsedContent = JSON.parse(content);
          if (parsedContent.action) {
            console.log("\n✅ Smoke Test Passed: Prepare action returned a valid receipt object.");
            found = true;
            process.exit(0);
          }
        }
      }
    }
    if (!found) {
      console.error("\n❌ Smoke Test Failed: Did not receive a valid receipt.");
      process.exit(1);
    }
  } catch (err) {
    console.error("\n❌ Smoke Test Failed parsing response:", err);
    process.exit(1);
  }
}

runTest().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
