import type { Fact, Rule, RuleOutputFact } from "./rule-types";

export function buildFact(outputFact: RuleOutputFact, rule: Rule): Fact {
  return {
    code: outputFact.code,
    confidence: rule.confidence,
    domain: outputFact.domain,
    metadata: outputFact.metadata ?? {},
    reason: [],
    ruleIds: [rule.id],
    source: [rule.source],
    weight: rule.weight,
  };
}

export function mergeFacts(facts: Fact[]): Fact[] {
  const factMap = new Map<string, Fact>();

  for (const fact of facts) {
    const current = factMap.get(fact.code);

    if (current == null) {
      factMap.set(fact.code, fact);
      continue;
    }

    factMap.set(fact.code, {
      ...current,
      confidence: Math.max(current.confidence, fact.confidence),
      metadata: { ...current.metadata, ...fact.metadata },
      reason: [...current.reason, ...fact.reason],
      ruleIds: [...new Set([...current.ruleIds, ...fact.ruleIds])],
      source: [...current.source, ...fact.source],
      weight: current.weight + fact.weight,
    });
  }

  return Array.from(factMap.values());
}
