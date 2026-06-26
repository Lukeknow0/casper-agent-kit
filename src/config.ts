import "dotenv/config";

export interface AppConfig {
  rpcUrl: string;
  explorerBaseUrl: string;
  treasuryContractHash?: string;
  dryRun: boolean;
  casperClientBin: string;
  secretKeyPath?: string;
  csprCloudApiUrl: string;
  csprCloudApiToken?: string;
  llmApiUrl?: string;
  llmApiKey?: string;
  llmModel: string;
}

export function loadConfig(): AppConfig {
  return {
    rpcUrl:
      process.env.CASPER_RPC_URL ||
      "https://node.testnet.casper.network/rpc",
    explorerBaseUrl:
      process.env.CASPER_EXPLORER_BASE_URL || "https://testnet.cspr.live",
    treasuryContractHash: emptyToUndefined(
      process.env.CASPER_TREASURY_CONTRACT_HASH,
    ),
    dryRun: process.env.CASPER_DRY_RUN !== "false",
    casperClientBin: process.env.CASPER_CLIENT_BIN || "casper-client",
    secretKeyPath: emptyToUndefined(process.env.CASPER_SECRET_KEY_PATH),
    csprCloudApiUrl:
      process.env.CSPR_CLOUD_API_URL || "https://api.testnet.cspr.cloud",
    csprCloudApiToken: emptyToUndefined(process.env.CSPR_CLOUD_API_TOKEN),
    llmApiUrl: emptyToUndefined(process.env.LLM_API_URL),
    llmApiKey: emptyToUndefined(process.env.LLM_API_KEY),
    llmModel: process.env.LLM_MODEL || "gpt-4o-mini",
  };
}

function emptyToUndefined(value: string | undefined): string | undefined {
  return value && value.trim().length > 0 ? value.trim() : undefined;
}
