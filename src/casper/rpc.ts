import type { JsonRpcResponse } from "../types.js";

export class CasperRpcClient {
  constructor(private readonly rpcUrl: string) {}

  async request<T>(method: string, params?: Record<string, unknown>): Promise<T> {
    const body = {
      jsonrpc: "2.0",
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      method,
      params: params ?? {},
    };

    const response = await fetch(this.rpcUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Casper RPC ${method} failed: HTTP ${response.status}`);
    }

    const payload = (await response.json()) as JsonRpcResponse<T>;
    if (payload.error) {
      throw new Error(
        `Casper RPC ${method} failed: ${payload.error.message}`,
      );
    }

    if (payload.result === undefined) {
      throw new Error(`Casper RPC ${method} returned no result`);
    }

    return payload.result;
  }

  getNodeStatus(): Promise<unknown> {
    return this.request("info_get_status");
  }

  getLatestBlock(): Promise<unknown> {
    return this.request("chain_get_block");
  }

  getStateRootHash(): Promise<{ state_root_hash: string }> {
    return this.request("chain_get_state_root_hash");
  }

  async queryGlobalState(key: string, path: string[] = []): Promise<unknown> {
    const stateRoot = await this.getStateRootHash();
    return this.request("query_global_state", {
      state_root_hash: stateRoot.state_root_hash,
      key,
      path,
    });
  }
}
