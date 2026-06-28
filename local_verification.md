# Local Verification

Status: live Casper Testnet proof verified. Final DoraHacks update still needs owner-side form review.

## What Works Now

```bash
npm install
npm run build
npm run demo:agent
```

Verified locally:

- TypeScript build passes.
- Treasury Guard agent runs.
- Demo scenario is loaded from `demo/scenario.json`.
- Policy decision is generated.
- LLM analysis field is recorded in the receipt. Default provider is `local-rule-engine`; an OpenAI-compatible endpoint can be configured through `.env`.
- Live action receipt is written to `demo/runs/treasury-guard-latest.json` when `CASPER_DRY_RUN=false`.
- Rust Treasury Guard contract is deployed on Casper Testnet.
- The agent submitted a live Casper 2.0 transaction calling `record_guard_action`.
- Dashboard API server reads the latest receipt and can trigger a fresh local agent run.

## Files To Review

- `README.md`
- `submission_draft.md`
- `docs/architecture.md`
- `docs/demo-script.md`
- `docs/final-submission-checklist.md`
- `demo/runs/treasury-guard-latest.json`

## Current Demo Command

```bash
npm run demo:agent
```

Expected result:

```text
CasperAgentKit Treasury Guard
Treasury: casper-testnet-demo-treasury
Action: APPROVE_SPEND
Mode: live
Contract Hash: hash-e575218360dd4bac37c7bc07eefbdc18fc127a97a52f47bf2e184011adbb9fa9
Transaction Hash: 474c06c9e047ff1b629c0f4218df1ee2a156a98f8d38c5a6c926fc82cf063e4b
Receipt: .../demo/runs/treasury-guard-latest.json
```

## Dashboard

```bash
npm run dashboard
```

Open:

```text
http://127.0.0.1:5174/
```

API checks:

```bash
curl http://127.0.0.1:5174/api/latest-run
curl -X POST http://127.0.0.1:5174/api/run-agent
```

## Remaining DoraHacks Submission Items

- *Verified:* Casper Testnet Treasury Guard contract deployment.
- *Verified:* Contract hash: `hash-e575218360dd4bac37c7bc07eefbdc18fc127a97a52f47bf2e184011adbb9fa9`.
- *Verified:* Real transaction hash: `474c06c9e047ff1b629c0f4218df1ee2a156a98f8d38c5a6c926fc82cf063e4b`.
- *Verified:* Explorer URL: `https://testnet.cspr.live/transaction/474c06c9e047ff1b629c0f4218df1ee2a156a98f8d38c5a6c926fc82cf063e4b`.
- *Verified:* Public GitHub repository URL: `https://github.com/Lukeknow0/casper-agent-kit`.
- Clean Demo video URL (Recording in progress).
- Optional CSPR.cloud token if you want to honestly select CSPR.cloud in the submission.

## Important Submission Constraint

Do not claim these as used until they are actually demonstrated:

- Odra Framework
- CSPR.click
- CSPR.cloud
- x402 Facilitator

The current verified stack is:

- TypeScript
- MCP SDK
- Casper JSON-RPC client
- Casper JS SDK v5
- Rust smart contract
- Casper contract SDK (`casper-contract` / `casper-types`)
- Casper 2.0 Condor `installOrUpgrade`
- Optional CSPR.cloud tool path, not configured without token
- Optional OpenAI-compatible LLM tool path, not configured without token
- Treasury Guard policy engine
- live Casper contract-call adapter with dry-run fallback
