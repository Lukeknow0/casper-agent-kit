# Local Verification

Status: local project is written. Do not submit yet.

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
- Dry-run action receipt is written to `demo/runs/treasury-guard-latest.json`.
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
Mode: dry-run
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

## What Is Still Missing Before DoraHacks Submission

- Real Casper Testnet Treasury Guard contract deployment.
- Real contract hash.
- Real transaction hash.
- Explorer URL.
- Public GitHub repository URL.
- Demo video URL.
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
- Optional CSPR.cloud tool path, not configured without token
- Optional OpenAI-compatible LLM tool path, not configured without token
- Treasury Guard policy engine
- dry-run Casper action adapter
