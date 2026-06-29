import type { Fact, RuleDomain, Score } from "./rule-types";

const domainWeightCaps: Record<RuleDomain, number> = {
  BIRTH_CHART: 100,
  CAREER: 100,
  FINANCE: 100,
  LOVE: 100,
  PERSONALITY: 100,
  WELLBEING: 100,
};

export function calculateScores(facts: Fact[]): Score[] {
  const groupedFacts = facts.reduce<Map<RuleDomain, Fact[]>>((map, fact) => {
    const current = map.get(fact.domain) ?? [];
    map.set(fact.domain, [...current, fact]);
    return map;
  }, new Map());

  return Array.from(groupedFacts.entries()).map(([domain, domainFacts]) => {
    const totalWeight = domainFacts.reduce((sum, fact) => sum + fact.weight, 0);
    const cap = domainWeightCaps[domain];
    const score = Math.min(100, Math.round((totalWeight / cap) * 100));
    const confidence =
      domainFacts.reduce((sum, fact) => sum + fact.confidence, 0) /
      domainFacts.length;

    return {
      confidence: Math.round(confidence),
      domain,
      score,
      weight: totalWeight,
    };
  });
}
