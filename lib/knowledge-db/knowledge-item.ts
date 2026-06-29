import type { SourceId } from "@/lib/sources/source-types";
import type { KnowledgeCategory } from "./knowledge-category";

export interface KnowledgeReference {
  label: string;
  path?: string;
  url?: string;
}

export interface KnowledgeItem {
  category: KnowledgeCategory;
  confidence: number;
  content: string;
  id: string;
  lastUpdated: string;
  references: KnowledgeReference[];
  relatedKnowledge: string[];
  slug: string;
  sources: SourceId[];
  summary: string;
  tags: string[];
  title: string;
  version: string;
}

export type KnowledgeItemInput = KnowledgeItem;
