# Architecture

CasperAgentKit has two deliverables:

1. An MCP server that exposes Casper operations as agent-callable tools.
2. A Treasury Guard reference agent that uses those tools to make and prepare on-chain actions.

```text
AI Host
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
Casper RPC / CSPR APIs / Casper client
  |
  v
Treasury Guard contract on Casper Testnet
```

The demo is intentionally narrow. The agent is not a generic chatbot. It has one job: enforce treasury policy and generate verifiable Casper actions.

## Live Transaction Path

For the video and final submission, the dry-run receipt must be replaced with one explorer-confirmed transaction.

Required proof fields:

- contract hash;
- transaction hash;
- explorer URL;
- CLI output or SDK response;
- final `demo/runs/treasury-guard-latest.json`.

## Why This Scores

Technical execution:
: MCP server, Casper RPC, policy engine, executor adapter.

Agentic systems:
: The agent perceives state, evaluates policy, chooses an action, and prepares execution.

Working smart contract:
: The contract stores a Treasury Guard action receipt.

Long-term impact:
: The MCP layer can become a reusable entry point for Casper agents beyond this demo.
