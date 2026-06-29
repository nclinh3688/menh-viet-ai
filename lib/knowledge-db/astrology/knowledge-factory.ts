import type { KnowledgeCategory } from "../knowledge-category";
import type { KnowledgeItem } from "../knowledge-item";
import type { AstrologyKnowledgeBase } from "./astrology-knowledge-types";

interface CreateAstrologyKnowledgeItemInput extends AstrologyKnowledgeBase {
  category?: KnowledgeCategory;
  content: string;
  summary: string;
  tags: string[];
  title?: string;
  lastUpdated: string;
}

export function createAstrologyKnowledgeItem(
  input: CreateAstrologyKnowledgeItemInput,
): KnowledgeItem {
  return {
    category: input.category ?? "ASTROLOGY",
    confidence: input.confidence,
    content: input.content,
    id: input.id,
    lastUpdated: input.lastUpdated,
    references: input.references,
    relatedKnowledge: input.relatedKnowledge,
    slug: input.slug,
    sources: input.sources,
    summary: input.summary,
    tags: input.tags,
    title: input.title ?? input.name,
    version: input.version,
  };
}
