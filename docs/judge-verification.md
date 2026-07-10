# Judge Verification Playbook

This path verifies the working MVP without a wallet, private key, API token, or
new Testnet transaction.

## Prerequisites

- Node.js 22 and npm
- Git
- Rust with the `wasm32-unknown-unknown` target, only for the contract build

## Verify in a Clean Checkout

```bash
npm ci
cp .env.example .env
npm run build
npm run check
npm run contract:build
npm run mcp:smoke
npm run demo:agent
npm run verify:proof
```

Expected results:

- TypeScript build and checks pass.
- The Rust Treasury Guard contract compiles.
- The MCP smoke test returns a dry-run receipt.
- The demo writes `demo/runs/treasury-guard-latest.json` in dry-run mode.
- The proof verifier confirms the public Casper Testnet transaction, contract,
  package hash, entry point, arguments, and successful execution.

## Public Casper Testnet Proof

- Contract hash: `hash-e575218360dd4bac37c7bc07eefbdc18fc127a97a52f47bf2e184011adbb9fa9`
- Contract package hash: `contract-package-a7675037d99636d6303ab4d1c0d2c405010f8c0afef4f60542c08b27f56fcc57`
- Transaction hash: `474c06c9e047ff1b629c0f4218df1ee2a156a98f8d38c5a6c926fc82cf063e4b`
- Explorer: <https://testnet.cspr.live/transaction/474c06c9e047ff1b629c0f4218df1ee2a156a98f8d38c5a6c926fc82cf063e4b>

## Safety Boundary

The commands above do not sign or submit a transaction. Live execution remains
disabled unless the operator supplies a local Testnet key, disables dry-run, and
sets the explicit `CASPER_CONFIRM_TESTNET_WRITE` acknowledgement.
