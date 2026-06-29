import type {
  AstrologyInterpretationFields,
  AstrologyKnowledgeBase,
  YinYang,
} from "./astrology-knowledge-types";

export interface HeavenlyStemKnowledge
  extends AstrologyKnowledgeBase,
    AstrologyInterpretationFields {
  element: "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ";
  hanviet: string;
  yinYang: YinYang;
}

export const heavenlyStemRequiredFields = [
  "id",
  "slug",
  "name",
  "hanviet",
  "element",
  "yinYang",
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
] as const satisfies Array<keyof HeavenlyStemKnowledge>;
