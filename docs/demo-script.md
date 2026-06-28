# Demo Script

## 0:00 - 0:20 Problem

AI agents can reason, but they need a safe standard interface to act on Casper. Today each agent has to integrate chain reads, transaction construction, signing, and verification separately.

## 0:20 - 0:45 Solution

CasperAgentKit exposes Casper operations through MCP tools. Any MCP-compatible host can query Casper state, evaluate treasury policy, and prepare on-chain actions.

## 0:45 - 1:20 MCP Server

Show `npm run dev:mcp` and the available tools:

- `casper_get_node_status`
- `casper_get_latest_block`
- `casper_query_global_state`
- `casper_get_account_balance`
- `treasury_guard_evaluate_policy`
- `treasury_guard_prepare_action`

## 1:20 - 2:00 Treasury Guard Agent

Run:

```bash
npm run demo:agent
```

Explain the flow:

1. The scenario contains a requested spend, projected reserve, and risk score.
2. The policy engine evaluates the request.
3. The LLM analysis field records either the configured LLM response or deterministic local reasoning.
4. The executor prepares the Casper contract action.
5. The final receipt is written for auditability.

## 2:00 - 2:35 On-chain Proof

Show the deployed contract address and testnet transaction hash. Open the explorer URL and confirm the transaction.

```text
Contract Hash:
hash-e575218360dd4bac37c7bc07eefbdc18fc127a97a52f47bf2e184011adbb9fa9

Transaction Hash:
f790cbf4210f525c393df2e3d98e64d436c5337314bab8e14e08d7a80e961b9f

Explorer:
https://testnet.cspr.live/transaction/f790cbf4210f525c393df2e3d98e64d436c5337314bab8e14e08d7a80e961b9f
```

## 2:35 - 3:00 Long-term Value

CasperAgentKit is not just a demo agent. It is a reusable MCP toolkit for Casper developers building autonomous agents, treasury bots, RWA monitors, x402 services, and compliance workflows.
