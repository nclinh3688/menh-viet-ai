import { buildFact, mergeFacts } from "./fact-builder";
import { calculateScores } from "./weight-calculator";
import { buildReasons } from "./reason-builder";
import { buildRecommendations } from "./recommendation-builder";
import { withCalculatedConfidence } from "./confidence-calculator";
import { ruleRegistry } from "./rule-registry";
import type {
  KnowledgeInput,
  Rule,
  RuleCondition,
  RuleEngineOutput,
  RuleSource,
} from "./rule-types";

function getValueByPath(input: KnowledgeInput, path: string): unknown {
  return path.split(".").reduce<unknown>((current, segment) => {
    if (current == null || typeof current !== "object") {
      return undefined;
    }

    return (current as Record<string, unknown>)[segment];
  }, input);
}

function evaluateCondition(input: KnowledgeInput, condition: RuleCondition) {
  const actualValue = getValueByPath(input, condition.field);

  switch (condition.operator) {
    case "contains":
      return Array.isArray(actualValue) && actualValue.includes(condition.value);
    case "equals":
      return actualValue === condition.value;
    case "exists":
      return actualValue != null && actualValue !== "";
    case "gte":
      return (
        typeof actualValue === "number" &&
        typeof condition.value === "number" &&
        actualValue >= condition.value
      );
    case "in":
      return (
        condition.value != null &&
        Array.isArray(condition.value) &&
        condition.value.map(String).includes(String(actualValue))
      );
    default:
      return false;
  }
}

export function evaluateRule(input: KnowledgeInput, rule: Rule) {
  return rule.conditions.every((condition) => evaluateCondition(input, condition));
}

export function runRuleEngine(
  knowledge: KnowledgeInput,
  rules: Rule[] = ruleRegistry,
): RuleEngineOutput {
  const matchedRules = rules
    .filter((rule) => evaluateRule(knowledge, rule))
    .sort((left, right) => right.priority - left.priority);

  const facts = mergeFacts(
    matchedRules.flatMap((rule) =>
      rule.outputFacts.map((outputFact) => buildFact(outputFact, rule)),
    ),
  );
  const scores = calculateScores(facts);
  const reasons = buildReasons(facts, matchedRules);
  const recommendations = buildRecommendations(facts);
  const sources = facts.reduce<Record<string, RuleSource[]>>((accumulator, fact) => {
    accumulator[fact.code] = fact.source;
    return accumulator;
  }, {});

  return withCalculatedConfidence({
    facts: facts.map((fact) => ({
      ...fact,
      reason: reasons[fact.code] ?? [],
    })),
    reasons,
    recommendations,
    scores,
    sources,
  });
}
