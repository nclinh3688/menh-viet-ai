import type {
  AstrologyInterpretationFields,
  AstrologyKnowledgeBase,
  KnowledgeTextBlock,
} from "./astrology-knowledge-types";

export interface FiveElementKnowledge
  extends AstrologyKnowledgeBase,
    AstrologyInterpretationFields {
  favorableColors: string[];
  favorableElements: string[];
  favorableNumbers: string[];
  generatingElement: string;
  controllingElement: string;
  controlledByElement: string;
  generatedByElement: string;
  unfavorableColors: string[];
  unfavorableElements: string[];
  practicalExamples: KnowledgeTextBlock[];
}

export const fiveElementRequiredFields = [
  "id",
  "slug",
  "name",
  "meaning",
  "origin",
  "characteristics",
  "strengths",
  "weaknesses",
  "career",
  "finance",
  "relationship",
  "health",
  "favorableElements",
  "unfavorableElements",
  "generatingElement",
  "generatedByElement",
  "controllingElement",
  "controlledByElement",
  "favorableColors",
  "unfavorableColors",
  "favorableNumbers",
  "applications",
  "practicalExamples",
  "relatedKnowledge",
  "references",
  "sources",
  "confidence",
  "version",
] as const satisfies Array<keyof FiveElementKnowledge>;
