# Security Policy

## Supported Version

This repository is a buildathon MVP. Security fixes target the `main` branch.

## Reporting a Vulnerability

Please do not open public issues for sensitive findings.

Report security concerns through GitHub private vulnerability reporting if enabled, or contact the repository owner through GitHub:

https://github.com/Lukeknow0

Include:

- affected commit or release;
- reproduction steps;
- expected and actual impact;
- whether any private key, token, or on-chain account is at risk.

## Secret Handling

Never commit private keys, funded wallets, API keys, or `.env` files. The demo supports dry-run mode and uses `.env.example` for public configuration examples.

## On-Chain Scope

The live proof targets Casper Testnet only. Do not use this MVP as production treasury automation without an independent smart contract and key-management review.
