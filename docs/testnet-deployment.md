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
npm run contract:deploy
```

The deploy script signs with the local testnet key and submits an `installOrUpgrade` transaction. Do not run it again unless intentionally deploying a new contract version.

## Final Proof Fields

Update:

- `README.md`
- `submission_draft.md`
- `local_verification.md`
- `demo/runs/treasury-guard-latest.json`

Required values:

```text
Contract hash:
hash-e575218360dd4bac37c7bc07eefbdc18fc127a97a52f47bf2e184011adbb9fa9

Agent action transaction hash:
f790cbf4210f525c393df2e3d98e64d436c5337314bab8e14e08d7a80e961b9f

Explorer URL:
https://testnet.cspr.live/transaction/f790cbf4210f525c393df2e3d98e64d436c5337314bab8e14e08d7a80e961b9f
```
