# Treasury Guard Contract

The contract is the on-chain proof component for the Treasury Guard demo.

Buildathon target:

- deploy one small Casper Testnet contract;
- expose `record_guard_action`;
- store the latest action, treasury id, and caller;
- include the contract hash and transaction hash in the DoraHacks submission.

The TypeScript executor can run in live mode when these environment variables are set:

- `CASPER_DRY_RUN=false`
- `CASPER_TREASURY_CONTRACT_HASH`
- `CASPER_SECRET_KEY_PATH`

The contract in `treasury_guard/contract` is a real Rust Casper contract. It exposes the `record_guard_action(treasury_id: String, action: String)` entry point and stores the latest action under the `latest_action` named key.

Build:

```bash
make -C contracts/treasury_guard build-contract
```

Deployment was performed through the TypeScript `scripts/deploy-contract.ts` adapter using Casper JS SDK v5 `SessionBuilder().installOrUpgrade()` on Casper 2.0 Condor.

Verified Testnet contract:

```text
hash-e575218360dd4bac37c7bc07eefbdc18fc127a97a52f47bf2e184011adbb9fa9
```
