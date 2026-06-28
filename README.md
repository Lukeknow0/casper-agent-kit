# CasperAgentKit

MCP-native toolkit for building autonomous Casper agents, with a working Treasury Guard reference agent.

CasperAgentKit gives an AI host a standard Model Context Protocol interface for Casper operations: read node state, inspect blocks, query global state, evaluate treasury policy, and prepare an on-chain guard action. The reference demo shows the full agent loop: perceive, decide, prepare action, and verify the receipt.

## Why This Project

The buildathon rewards practical agentic applications on Casper. A plain yield router depends on testnet DeFi liquidity that may not exist. CasperAgentKit keeps the scope controllable while staying aligned with the official AI Toolkit direction: MCP, agent skills, CSPR APIs, and transaction-producing Casper components.

The submission story is:

> CasperAgentKit is an MCP-native toolkit that lets AI agents read Casper state, make decisions, and execute verified testnet transactions. We demonstrate it with a Treasury Guard Agent that autonomously enforces DeFi treasury policies on Casper Testnet.

## Project Structure

```text
src/
  agent/              Treasury Guard reference agent
  casper/             JSON-RPC client and action executor adapter
  mcp/                MCP server exposing CasperAgentKit tools
contracts/            Rust Treasury Guard smart contract and deployment notes
dashboard/            Static demo dashboard for video recording
demo/                 Scenario input and runtime receipts
docs/                 Architecture and demo scripts
```

## Quick Start

```bash
npm install
cp .env.example .env
npm run build
npm run demo:agent
```

Start the MCP server:

```bash
npm run dev:mcp
```

Serve the dashboard:

```bash
npm run dashboard
```

The dashboard runs a local API server on `http://127.0.0.1:5174/`. It reads `demo/runs/treasury-guard-latest.json`; the Run Agent button triggers a fresh local agent run.

Build the Rust Treasury Guard contract:

```bash
npm run contract:build
```

## MCP Tools

`casper_get_node_status`
: Read node status from the configured Casper RPC endpoint.

`casper_get_latest_block`
: Fetch the latest block.

`casper_query_global_state`
: Query global state by key and optional path.

`casper_get_account_balance`
: Read account information through CSPR.cloud when `CSPR_CLOUD_API_TOKEN` is configured.

`treasury_guard_evaluate_policy`
: Evaluate a treasury scenario against guard policy.

`treasury_guard_prepare_action`
: Produce a dry-run receipt or prepared live execution payload for the selected action.

## Demo Agent

The Treasury Guard Agent reads `demo/scenario.json`, evaluates policy, prepares an action receipt, and writes the latest run to `demo/runs/treasury-guard-latest.json`.

The receipt includes `llmAnalysis`. By default the provider is `local-rule-engine`, so the demo works without secrets. To use a real OpenAI-compatible endpoint, set `LLM_API_URL`, `LLM_API_KEY`, and `LLM_MODEL`.

## Testnet Smart Contract Integration

This kit is fully integrated with a custom Treasury Guard smart contract deployed on Casper Testnet:

- **Contract Hash:** `hash-e575218360dd4bac37c7bc07eefbdc18fc127a97a52f47bf2e184011adbb9fa9`
- **Explorer Contract Link:** [Contract](https://testnet.cspr.live/contract/hash-e575218360dd4bac37c7bc07eefbdc18fc127a97a52f47bf2e184011adbb9fa9)
- **Sample Live Agent Action Transaction:** `f790cbf4210f525c393df2e3d98e64d436c5337314bab8e14e08d7a80e961b9f`
- **Explorer Transaction Link:** [Transaction](https://testnet.cspr.live/transaction/f790cbf4210f525c393df2e3d98e64d436c5337314bab8e14e08d7a80e961b9f)

The agent reads risk policies, uses LLM analysis to evaluate the scenario, executes a live transaction invoking the `record_guard_action` entry point, and records the audit receipt.

The smart contract is implemented in Rust with `casper-contract` / `casper-types`, compiled to `wasm32-unknown-unknown`, and deployed through the Casper JS SDK v5 `SessionBuilder().installOrUpgrade()` path for Casper 2.0 Condor.

## Buildathon Proof Checklist

- [x] Public GitHub repository: https://github.com/Lukeknow0/casper-agent-kit
- [x] MCP server starts locally
- [x] Treasury Guard demo runs from CLI and connects to live Casper Testnet
- [x] Verified Contract address on Casper Testnet
- [x] Live transaction hash recorded on Casper Testnet
- [ ] Demo video showing agent logs, contract address, and explorer confirmation
