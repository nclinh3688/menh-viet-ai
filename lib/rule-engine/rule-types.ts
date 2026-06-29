export type RuleDomain =
  | "BIRTH_CHART"
  | "CAREER"
  | "FINANCE"
  | "LOVE"
  | "PERSONALITY"
  | "WELLBEING";

export type FactCode =
  | "BALANCED_EARTH"
  | "CAREER_LEADERSHIP"
  | "CAREER_MANAGEMENT"
  | "CAREER_OPERATIONS"
  | "CAREER_STRATEGY"
  | "COMMUNICATION_STRENGTH"
  | "CREATIVE_GROWTH"
  | "GOOD_FINANCE"
  | "PRACTICAL_STABILITY"
  | "STABLE_RELATIONSHIP"
  | "STRONG_FIRE"
  | "WOOD_GROWTH";

export type RuleOperator = "contains" | "equals" | "exists" | "gte" | "in";

export interface KnowledgeInput {
  birthChart?: {
    cungPhi?: string;
    earthlyBranch?: string;
    element?: string;
    heavenlyStem?: string;
    zodiacAnimal?: string;
  };
  numerology?: {
    attitudeNumber?: number;
    destinyNumber?: number | null;
    lifePathNumber?: number;
    soulUrgeNumber?: number | null;
  };
  profile?: {
    gender?: string;
    mainInterest?: string | null;
  };
}

export interface RuleCondition {
  field: string;
  operator: RuleOperator;
  value?: number | string | string[];
}

export interface RuleSource {
  primary: string;
  secondary?: string[];
  references?: string[];
}

export interface RuleOutputFact {
  code: FactCode;
  domain: RuleDomain;
  metadata?: Record<string, number | string | string[]>;
}

export interface Rule {
  confidence: number;
  conditions: RuleCondition[];
  domain: RuleDomain;
  id: string;
  name: string;
  outputFacts: RuleOutputFact[];
  priority: number;
  source: RuleSource;
  weight: number;
}

export interface Fact {
  code: FactCode;
  confidence: number;
  domain: RuleDomain;
  metadata: Record<string, number | string | string[]>;
  reason: string[];
  ruleIds: string[];
  source: RuleSource[];
  weight: number;
}

export interface Score {
  confidence: number;
  domain: RuleDomain;
  score: number;
  weight: number;
}

export interface Recommendation {
  domain: RuleDomain;
  factCode: FactCode;
  items: string[];
}

export interface RuleEngineOutput {
  confidence: number;
  facts: Fact[];
  reasons: Record<FactCode, string[]>;
  recommendations: Recommendation[];
  scores: Score[];
  sources: Record<FactCode, RuleSource[]>;
}
