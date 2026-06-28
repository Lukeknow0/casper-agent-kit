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
  |-- casper_get_account_balance
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

For the video and final submission, the agent now has one explorer-confirmed Casper 2.0 transaction calling the deployed Treasury Guard contract.

Required proof fields:

- contract hash;
- transaction hash;
- explorer URL;
- CLI output or SDK response;
- final `demo/runs/treasury-guard-latest.json`.

Verified proof:

```text
Contract Hash: hash-e575218360dd4bac37c7bc07eefbdc18fc127a97a52f47bf2e184011adbb9fa9
Transaction Hash: 474c06c9e047ff1b629c0f4218df1ee2a156a98f8d38c5a6c926fc82cf063e4b
Explorer URL: https://testnet.cspr.live/transaction/474c06c9e047ff1b629c0f4218df1ee2a156a98f8d38c5a6c926fc82cf063e4b
```

## Why This Scores

Technical execution:
: MCP server, Casper RPC, policy engine, executor adapter.

Agentic systems:
: The agent perceives state, evaluates policy, chooses an action, and prepares execution.

Working smart contract:
: The contract stores a Treasury Guard action receipt.

Long-term impact:
: The MCP layer can become a reusable entry point for Casper agents beyond this demo.
