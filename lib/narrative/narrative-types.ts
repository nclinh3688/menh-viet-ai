import type { Fact, FactCode, Recommendation, Score } from "@/lib/rule-engine/rule-types";

export type NarrativeSection =
  | "CAREER"
  | "FINANCE"
  | "HEALTH"
  | "NEXT_DISCOVERY"
  | "OVERVIEW"
  | "RECOMMENDATIONS"
  | "RELATIONSHIP"
  | "STRENGTHS"
  | "WHY";

export type NarrativeTone =
  | "balanced"
  | "cautious"
  | "encouraging"
  | "grounded";

export interface NarrativeContext {
  conflicts?: string[];
  facts: Fact[];
  recommendations: Recommendation[];
  scores: Score[];
  section: NarrativeSection;
}

export interface EmotionProfile {
  hasConflict: boolean;
  leadTone: NarrativeTone;
  signal: "caution" | "confidence" | "neutral";
}

export interface NarrativeTemplateInput {
  confidence: number;
  factCodes: FactCode[];
  recommendations: string[];
  tone: NarrativeTone;
}

export interface NarrativeOutput {
  body: string;
  disclaimer: string;
  section: NarrativeSection;
  tone: NarrativeTone;
}
