import type { SourceId } from "@/lib/sources/source-types";
import type { KnowledgeReference } from "../knowledge-item";
import type {
  AstrologyInterpretationFields,
  AstrologyKnowledgeBase,
  KnowledgeTextBlock,
} from "./astrology-knowledge-types";

export const emptyTextBlock: KnowledgeTextBlock = {
  description: "",
  examples: [],
  notes: [],
};

export const emptyInterpretationFields: AstrologyInterpretationFields = {
  career: emptyTextBlock,
  characteristics: [],
  finance: emptyTextBlock,
  health: emptyTextBlock,
  meaning: "",
  origin: "",
  relationship: emptyTextBlock,
  strengths: [],
  weaknesses: [],
};

export function createKnowledgeTemplate(
  overrides: Partial<AstrologyKnowledgeBase> = {},
): AstrologyKnowledgeBase {
  return {
    applications: [],
    confidence: 0,
    id: "",
    name: "",
    references: [] satisfies KnowledgeReference[],
    relatedKnowledge: [],
    slug: "",
    sources: [] satisfies SourceId[],
    version: "",
    ...overrides,
  };
}
