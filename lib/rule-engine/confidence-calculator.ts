import type { Fact, RuleEngineOutput, Score } from "./rule-types";

export function calculateFactConfidence(fact: Fact): number {
  const sourceBonus = Math.min(8, fact.source.length * 2);
  const ruleBonus = Math.min(6, fact.ruleIds.length * 2);

  return Math.min(100, Math.round(fact.confidence + sourceBonus + ruleBonus));
}

export function calculateOverallConfidence(facts: Fact[], scores: Score[]): number {
  if (facts.length === 0 || scores.length === 0) {
    return 0;
  }

  const factAverage =
    facts.reduce((sum, fact) => sum + calculateFactConfidence(fact), 0) /
    facts.length;
  const scoreAverage =
    scores.reduce((sum, score) => sum + score.confidence, 0) / scores.length;

  return Math.round((factAverage + scoreAverage) / 2);
}

export function withCalculatedConfidence(
  output: Omit<RuleEngineOutput, "confidence">,
): RuleEngineOutput {
  return {
    ...output,
    confidence: calculateOverallConfidence(output.facts, output.scores),
  };
}
