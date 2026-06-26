# Casper Testnet Deployment Plan

Status: blocked until a funded Casper Testnet key is available.

The current repository has the MCP server, policy engine, dashboard, and execution adapter. The remaining prize-critical step is replacing dry-run receipts with a real Casper Testnet contract call.

## Required Inputs

- Testnet secret key path
- Funded testnet account
- Contract hash after deployment
- At least one explorer-confirmed deploy hash

Do not commit the secret key or `.env`.

## Environment

```bash
cp .env.example .env
```

Fill:

```text
CASPER_DRY_RUN=false
CASPER_SECRET_KEY_PATH=/absolute/path/to/secret_key.pem
CASPER_TREASURY_CONTRACT_HASH=hash-...
```

## Preferred Path: Odra

1. Create a real Odra contract project for `TreasuryGuard`.
2. Implement `record_guard_action(treasury_id: String, action: String)`.
3. Implement `latest_action()`.
4. Deploy to Casper Testnet.
5. Write the deployed hash into `.env`.
6. Run `npm run demo:agent`.
7. Execute the prepared `casper-client put-deploy` command printed by the agent.
8. Record deploy hashes and explorer URLs.

## Fallback Path: Minimal Transaction Proof

If contract deployment blocks the submission, produce at least one real Casper Testnet transaction:

```bash
casper-client transfer \
  --node-address https://node.testnet.casper.network/rpc \
  --chain-name casper-test \
  --secret-key /absolute/path/to/secret_key.pem \
  --target-account <target-public-key> \
  --amount 2500000000 \
  --payment-amount 100000000
```

This is weaker than a contract call, but it is still better than a dry-run hash. The submission should clearly label it as the fallback transaction proof.

## Final Proof Fields

Update:

- `README.md`
- `submission_draft.md`
- `local_verification.md`
- `demo/runs/treasury-guard-latest.json`

Required values:

```text
Contract hash:
Deploy hash 1:
Deploy hash 2:
Deploy hash 3:
Explorer URLs:
```
