# Casper Agentic Buildathon 2026 Submission Draft

> Project: CasperAgentKit
> Status: local draft only. Do not submit before user verification.

## Title

CasperAgentKit - MCP-Powered Autonomous Agent Toolkit for Casper

## Tagline

Give any AI agent the power to read, reason, and prepare verified actions on Casper.

## Description

CasperAgentKit is an open-source MCP server that lets AI agents interact with Casper through a standard tool interface. It exposes Casper network reads, global state queries, and Treasury Guard actions as MCP tools that can be used by AI hosts and agent frameworks.

The reference demo is Treasury Guard: an autonomous agent that evaluates a DeFi treasury spend request, checks reserve and risk policy, chooses an action, and prepares a Casper Testnet contract call that records the decision on-chain.

## Problem

AI agents can reason about financial workflows, but they need a safe and repeatable way to act on blockchain networks. For Casper, developers still need to wire together chain reads, transaction preparation, signing, contract calls, and verification manually. That makes agent development slow and hard to reuse.

## Solution

CasperAgentKit provides:

1. An MCP-compliant server for Casper operations.
2. A Treasury Guard reference agent with a concrete policy workflow.
3. Casper Testnet JSON-RPC tools for node status, latest block, and global state queries.
4. A contract action adapter for recording Treasury Guard decisions on-chain.
5. A reproducible CLI demo and dashboard for review and video recording.

## Technical Architecture

```text
AI Host or Agent Runtime
  |
  | MCP
  v
CasperAgentKit MCP Server
  |-- casper_get_node_status
  |-- casper_get_latest_block
  |-- casper_query_global_state
  |-- treasury_guard_evaluate_policy
  |-- treasury_guard_prepare_action
  |
  v
Casper JSON-RPC / Casper client adapter
  |
  v
Treasury Guard contract on Casper Testnet
```

## Agent Workflow

1. Perceive: read a treasury scenario and optional Casper network state.
2. Analyze: evaluate requested spend, projected reserve, risk score, and counterparty.
3. Decide: choose approve, freeze, rebalance, or no-op.
4. Prepare: produce a Casper contract action through the MCP tool layer.
5. Verify: attach a contract hash and explorer-confirmed transaction hash for final submission.
6. Record: store the decision rationale and transaction proof as an audit receipt.

## Casper Integration

Current local implementation:

- MCP server written in TypeScript.
- Casper JSON-RPC client for live Testnet reads.
- Treasury Guard policy engine and action executor adapter.
- Dry-run receipt mode for safe local verification.
- Contract API sketch for the on-chain Treasury Guard proof component.

Before final submission, fill:

```text
Contract hash: <pending testnet deployment>
Transaction hash: <pending testnet transaction>
Explorer URL: <pending explorer confirmation>
```

## Technology Stack Used

Use only the items that are true at final submission time.

Currently true:

- JavaScript/TypeScript SDK
- Casper JSON-RPC
- MCP server implementation

Select only after live proof:

- Odra Framework
- CSPR.click
- CSPR.cloud
- CSPR.click AI Agent Skill
- CSPR.cloud AI Agent Skill
- x402 Facilitator

Do not select x402 unless the final demo includes an actual x402 interaction.

## GitHub Repository

```text
https://github.com/<username>/casper-agent-kit
```

## Demo Video Script

### 0:00 - 0:20 Problem

AI agents need a standard way to interact with Casper. Today each project has to manually integrate chain reads, contract calls, signing, and verification.

### 0:20 - 0:45 Solution

CasperAgentKit exposes Casper operations through MCP tools. The reference Treasury Guard Agent uses those tools to evaluate treasury risk and prepare on-chain actions.

### 0:45 - 1:20 MCP Tools

Show the MCP server and the available tools:

- `casper_get_node_status`
- `casper_get_latest_block`
- `casper_query_global_state`
- `treasury_guard_evaluate_policy`
- `treasury_guard_prepare_action`

### 1:20 - 2:00 Treasury Guard Demo

Run:

```bash
npm run demo:agent
```

Show the scenario, policy decision, prepared action, and generated receipt.

### 2:00 - 2:35 On-chain Proof

After deployment, show:

- Casper Testnet contract hash
- transaction hash
- explorer confirmation

### 2:35 - 3:00 Long-term Value

CasperAgentKit is reusable infrastructure for Casper agents. Treasury Guard is one reference agent; the same MCP toolkit can support RWA monitors, x402 service agents, DeFi operators, and compliance workflows.

## Long-Term Launch Plan

Phase 1:

- Publish public repo and documentation.
- Ship a verified Treasury Guard demo on Casper Testnet.
- Add setup guides for MCP-compatible hosts.

Phase 2:

- Add CSPR.cloud and CSPR.click adapters.
- Expand contract tools and transaction templates.
- Add x402 payment tools after a working payment demo is available.

Phase 3:

- Build reusable Casper agent templates for treasury, RWA, compliance, and developer tooling.
- Package CasperAgentKit for broader MCP server directories.
