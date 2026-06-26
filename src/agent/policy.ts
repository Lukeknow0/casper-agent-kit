import type {
  GuardDecision,
  TreasuryPolicy,
  TreasuryScenario,
} from "../types.js";

export const defaultPolicy: TreasuryPolicy = {
  maxSingleSpendUsd: 25000,
  minReserveUsd: 75000,
  riskThreshold: 70,
  reserveTargetUsd: 100000,
};

export function evaluateTreasuryPolicy(
  scenario: TreasuryScenario,
  policy: TreasuryPolicy = defaultPolicy,
): GuardDecision {
  const rationale: string[] = [];

  if (scenario.riskScore >= policy.riskThreshold) {
    rationale.push(
      `Risk score ${scenario.riskScore} exceeds threshold ${policy.riskThreshold}.`,
    );
    return {
      action: "FREEZE_TREASURY",
      severity: "critical",
      shouldExecute: true,
      rationale,
    };
  }

  if (scenario.requestedSpendUsd > policy.maxSingleSpendUsd) {
    rationale.push(
      `Requested spend ${scenario.requestedSpendUsd} exceeds max single spend ${policy.maxSingleSpendUsd}.`,
    );
    return {
      action: "FREEZE_TREASURY",
      severity: "critical",
      shouldExecute: true,
      rationale,
    };
  }

  if (scenario.projectedReserveUsd < policy.minReserveUsd) {
    rationale.push(
      `Projected reserve ${scenario.projectedReserveUsd} is below minimum reserve ${policy.minReserveUsd}.`,
    );
    rationale.push(
      `Reserve target is ${policy.reserveTargetUsd}; rebalance is safer than approving spend.`,
    );
    return {
      action: "REBALANCE_RESERVE",
      severity: "warning",
      shouldExecute: true,
      rationale,
    };
  }

  rationale.push("Scenario is within treasury policy bounds.");
  return {
    action: "APPROVE_SPEND",
    severity: "info",
    shouldExecute: true,
    rationale,
  };
}
