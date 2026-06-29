import type {
  AstrologyInterpretationFields,
  AstrologyKnowledgeBase,
} from "./astrology-knowledge-types";

export interface CungPhiKnowledge
  extends AstrologyKnowledgeBase,
    AstrologyInterpretationFields {
  element: "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ";
  genderNotes: string;
  goodDirections: string[];
  group: "EAST" | "WEST" | "NEUTRAL";
  unfavorableDirections: string[];
}

export const cungPhiRequiredFields = [
  "id",
  "slug",
  "name",
  "element",
  "group",
  "goodDirections",
  "unfavorableDirections",
  "genderNotes",
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
] as const satisfies Array<keyof CungPhiKnowledge>;
