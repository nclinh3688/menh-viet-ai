import type { SourceId } from "@/lib/sources/source-types";
import type { KnowledgeReference } from "../knowledge-item";

export type YinYang = "YANG" | "YIN";

export interface KnowledgeTextBlock {
  description: string;
  examples?: string[];
  notes?: string[];
}

export interface AstrologyKnowledgeBase {
  applications: KnowledgeTextBlock[];
  confidence: number;
  id: string;
  name: string;
  references: KnowledgeReference[];
  relatedKnowledge: string[];
  slug: string;
  sources: SourceId[];
  version: string;
}

export interface AstrologyInterpretationFields {
  career: KnowledgeTextBlock;
  characteristics: string[];
  finance: KnowledgeTextBlock;
  health: KnowledgeTextBlock;
  meaning: string;
  origin: string;
  relationship: KnowledgeTextBlock;
  strengths: string[];
  weaknesses: string[];
}
