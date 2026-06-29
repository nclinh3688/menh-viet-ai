import type {
  AstrologyInterpretationFields,
  AstrologyKnowledgeBase,
} from "./astrology-knowledge-types";

export interface NapAmKnowledge
  extends AstrologyKnowledgeBase,
    AstrologyInterpretationFields {
  canChiPairs: string[];
  element: "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ";
  periodNotes: string;
}

export const napAmRequiredFields = [
  "id",
  "slug",
  "name",
  "element",
  "canChiPairs",
  "periodNotes",
  "meaning",
  "origin",
  "characteristics",
  "strengths",
  "weaknesses",
  "career",
  "finance",
  "relationship",
  "health",
  "applications",
  "relatedKnowledge",
  "references",
  "sources",
  "confidence",
  "version",
] as const satisfies Array<keyof NapAmKnowledge>;
