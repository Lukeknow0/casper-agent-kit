import type { AppConfig } from "../config.js";

export class CsprCloudClient {
  constructor(private readonly config: AppConfig) {}

  async getAccountBalance(accountIdentifier: string): Promise<unknown> {
    if (!this.config.csprCloudApiToken) {
      return {
        status: "not_configured",
        message:
          "CSPR_CLOUD_API_TOKEN is not set. Configure a CSPR.cloud token to enable this tool.",
        accountIdentifier,
      };
    }

    const url = new URL(
      `/accounts/${encodeURIComponent(accountIdentifier)}`,
      this.config.csprCloudApiUrl,
    );

    const response = await fetch(url, {
      headers: {
        authorization: `Bearer ${this.config.csprCloudApiToken}`,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      return {
        status: "error",
        httpStatus: response.status,
        message: await response.text(),
        accountIdentifier,
      };
    }

    return response.json();
  }
}
