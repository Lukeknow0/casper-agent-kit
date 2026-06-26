import type { AppConfig } from "../config.js";
import type {
  GuardAction,
  GuardDecision,
  LlmAnalysis,
  TreasuryScenario,
} from "../types.js";

interface ChatCompletionResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

export async function analyzeTreasuryScenario(
  config: AppConfig,
  scenario: TreasuryScenario,
  decision: GuardDecision,
  chainContext: unknown,
): Promise<LlmAnalysis> {
  if (!config.llmApiUrl || !config.llmApiKey) {
    return localReasoning(scenario, decision);
  }

  const prompt = [
    "You are a cautious Web3 treasury risk agent for Casper.",
    "Return strict JSON with keys summary, recommendation, confidence, reasoning.",
    "recommendation must be one of NOOP, APPROVE_SPEND, FREEZE_TREASURY, REBALANCE_RESERVE.",
    "",
    `Scenario: ${JSON.stringify(scenario)}`,
    `Rule decision: ${JSON.stringify(decision)}`,
    `Chain context: ${JSON.stringify(chainContext).slice(0, 4000)}`,
  ].join("\n");

  const response = await fetch(config.llmApiUrl, {
    method: "POST",
    headers: {
      authorization: `Bearer ${config.llmApiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: config.llmModel,
      messages: [
        {
          role: "system",
          content:
            "You produce concise, auditable JSON for blockchain agent decisions.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.1,
    }),
  });

  if (!response.ok) {
    return {
      ...localReasoning(scenario, decision),
      summary: `LLM endpoint returned HTTP ${response.status}; local policy reasoning used.`,
    };
  }

  const payload = (await response.json()) as ChatCompletionResponse;
  const content = payload.choices?.[0]?.message?.content ?? "";
  const parsed = parseLlmJson(content);

  if (!parsed) {
    return {
      ...localReasoning(scenario, decision),
      raw: content,
      summary: "LLM response was not valid JSON; local policy reasoning used.",
    };
  }

  return {
    provider: "openai-compatible",
    model: config.llmModel,
    summary: parsed.summary,
    recommendation: parsed.recommendation,
    confidence: parsed.confidence,
    reasoning: parsed.reasoning,
    raw: parsed,
  };
}

function localReasoning(
  scenario: TreasuryScenario,
  decision: GuardDecision,
): LlmAnalysis {
  return {
    provider: "local-rule-engine",
    model: "deterministic-policy-v1",
    summary: `Local policy recommends ${decision.action} for ${scenario.treasuryId}.`,
    recommendation: decision.action,
    confidence: decision.severity === "critical" ? 0.92 : 0.82,
    reasoning: decision.rationale,
  };
}

function parseLlmJson(content: string):
  | {
      summary: string;
      recommendation: GuardAction;
      confidence: number;
      reasoning: string[];
    }
  | undefined {
  const clean = content
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  try {
    const value = JSON.parse(clean) as {
      summary?: unknown;
      recommendation?: unknown;
      confidence?: unknown;
      reasoning?: unknown;
    };

    if (
      typeof value.summary !== "string" ||
      !isGuardAction(value.recommendation) ||
      typeof value.confidence !== "number" ||
      !Array.isArray(value.reasoning) ||
      !value.reasoning.every((item) => typeof item === "string")
    ) {
      return undefined;
    }

    return {
      summary: value.summary,
      recommendation: value.recommendation,
      confidence: value.confidence,
      reasoning: value.reasoning,
    };
  } catch {
    return undefined;
  }
}

function isGuardAction(value: unknown): value is GuardAction {
  return (
    value === "NOOP" ||
    value === "APPROVE_SPEND" ||
    value === "FREEZE_TREASURY" ||
    value === "REBALANCE_RESERVE"
  );
}
