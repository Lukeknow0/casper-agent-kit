export type GuardAction =
  | "NOOP"
  | "APPROVE_SPEND"
  | "FREEZE_TREASURY"
  | "REBALANCE_RESERVE";

export type GuardSeverity = "info" | "warning" | "critical";

export interface TreasuryPolicy {
  maxSingleSpendUsd: number;
  minReserveUsd: number;
  riskThreshold: number;
  reserveTargetUsd: number;
}

export interface TreasuryScenario {
  treasuryId: string;
  requestedSpendUsd: number;
  currentReserveUsd: number;
  projectedReserveUsd: number;
  riskScore: number;
  counterparty: string;
  memo: string;
}

export interface GuardDecision {
  action: GuardAction;
  severity: GuardSeverity;
  shouldExecute: boolean;
  rationale: string[];
}

export interface LlmAnalysis {
  provider: "openai-compatible" | "local-rule-engine";
  model: string;
  summary: string;
  recommendation: GuardAction;
  confidence: number;
  reasoning: string[];
  raw?: unknown;
}

export interface GuardReceipt {
  mode: "dry-run" | "live";
  action: GuardAction;
  treasuryId: string;
  contractHash?: string;
  transactionHash?: string;
  explorerUrl?: string;
  preparedCommand?: string[];
  decision: GuardDecision;
  llmAnalysis: LlmAnalysis;
  scenario: TreasuryScenario;
  createdAt: string;
}

export interface JsonRpcResponse<T> {
  jsonrpc: string;
  id: string | number;
  result?: T;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}
