# Casper Testnet Deployment Notes

Status: completed for the Treasury Guard demo.

The repository has the MCP server, policy engine, dashboard, execution adapter, Rust smart contract, and one live Casper Testnet contract call.

## Required Inputs

- Testnet secret key path
- Funded testnet account
- Contract hash after deployment
- At least one explorer-confirmed Casper 2.0 transaction hash

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
CASPER_CONFIRM_TESTNET_WRITE=I_UNDERSTAND_TESTNET_WRITE
```

## Implemented Path: Rust Contract + Casper JS SDK v5

1. Implement `record_guard_action(treasury_id: String, action: String)` in Rust under `contracts/treasury_guard/contract`.
2. Store the latest action under the `latest_action` named key.
3. Compile the contract to `wasm32-unknown-unknown`.
4. Deploy through `scripts/deploy-contract.ts` using Casper JS SDK v5 `SessionBuilder().installOrUpgrade()`.
5. Write the deployed hash into `.env`.
6. Run `npm run demo:agent` with `CASPER_DRY_RUN=false`.
7. Record the Casper 2.0 transaction hash and explorer URL.

Build:

```bash
npm run contract:build
```

Deploy:

```bash
CASPER_SECRET_KEY_PATH=/absolute/path/to/secret_key.pem \
  npm run contract:deploy -- --confirm-testnet-deploy
```

The deploy script refuses to read a key or sign unless the explicit confirmation
flag is present. It then signs with the configured local Testnet key and submits
an `installOrUpgrade` transaction. Do not run it again unless intentionally
deploying a new contract version.

## Final Proof Fields

Update:

- `README.md`
- `submission_draft.md`
- `docs/judge-verification.md`
- `demo/runs/treasury-guard-latest.json`

Required values:

```text
Contract hash:
hash-e575218360dd4bac37c7bc07eefbdc18fc127a97a52f47bf2e184011adbb9fa9

Agent action transaction hash:
474c06c9e047ff1b629c0f4218df1ee2a156a98f8d38c5a6c926fc82cf063e4b

Explorer URL:
https://testnet.cspr.live/transaction/474c06c9e047ff1b629c0f4218df1ee2a156a98f8d38c5a6c926fc82cf063e4b
```
