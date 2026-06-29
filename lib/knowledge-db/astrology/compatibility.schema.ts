import type {
  AstrologyKnowledgeBase,
  KnowledgeTextBlock,
} from "./astrology-knowledge-types";

export interface CompatibilityKnowledge extends AstrologyKnowledgeBase {
  dimensions: Array<{
    description: string;
    maxScore: number;
    name: "CUNG_PHI" | "DIA_CHI" | "NGU_HANH" | "THIEN_CAN" | "OTHER";
    sourceIds: string[];
    weight: number;
  }>;
  interpretationRules: KnowledgeTextBlock[];
  meaning: string;
  practicalAdvice: KnowledgeTextBlock[];
  safetyRules: string[];
  scoringNotes: string;
}

export const compatibilityRequiredFields = [
  "id",
  "slug",
  "name",
  "meaning",
  "dimensions",
  "scoringNotes",
  "interpretationRules",
  "practicalAdvice",
  "safetyRules",
  "applications",
  "relatedKnowledge",
  "references",
  "sources",
  "confidence",
  "version",
] as const satisfies Array<keyof CompatibilityKnowledge>;
