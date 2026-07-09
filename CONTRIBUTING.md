# Contributing

CasperAgentKit welcomes focused improvements that make Casper easier for AI agents to read, reason about, and execute against through MCP.

## Development

```bash
npm install
npm run ci
```

## Pull Request Checklist

- Keep the MCP tool interface typed and documented.
- Do not commit `.env`, private keys, testnet wallets, or generated build artifacts.
- Preserve dry-run behavior for safe local testing.
- Run `npm run ci` before opening a pull request.
- If changing the live proof constants, update README and `scripts/verify-proof.ts` together.

## Project Scope

Treasury Guard is the reference agent. New examples should reuse the same MCP-first pattern rather than adding one-off scripts that bypass the toolkit.
