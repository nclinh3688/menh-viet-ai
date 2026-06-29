import type {
  AstrologyInterpretationFields,
  AstrologyKnowledgeBase,
  YinYang,
} from "./astrology-knowledge-types";

export interface EarthlyBranchKnowledge
  extends AstrologyKnowledgeBase,
    AstrologyInterpretationFields {
  animal: string;
  hiddenStems: string[];
  season: string;
  timeRange: string;
  yinYang: YinYang;
}

export const earthlyBranchRequiredFields = [
  "id",
  "slug",
  "name",
  "animal",
  "yinYang",
  "season",
  "timeRange",
  "hiddenStems",
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
] as const satisfies Array<keyof EarthlyBranchKnowledge>;
