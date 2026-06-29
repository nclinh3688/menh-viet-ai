import type { KnowledgeCategory } from "./knowledge-category";
import type { KnowledgeItem } from "./knowledge-item";

export interface KnowledgeIndex {
  byCategory: Map<KnowledgeCategory, KnowledgeItem[]>;
  byId: Map<string, KnowledgeItem>;
  bySlug: Map<string, KnowledgeItem>;
  byTag: Map<string, KnowledgeItem[]>;
}

function appendToIndex<T extends string>(
  index: Map<T, KnowledgeItem[]>,
  key: T,
  item: KnowledgeItem,
) {
  index.set(key, [...(index.get(key) ?? []), item]);
}

export function buildKnowledgeIndex(items: KnowledgeItem[]): KnowledgeIndex {
  const byCategory = new Map<KnowledgeCategory, KnowledgeItem[]>();
  const byId = new Map<string, KnowledgeItem>();
  const bySlug = new Map<string, KnowledgeItem>();
  const byTag = new Map<string, KnowledgeItem[]>();

  for (const item of items) {
    byId.set(item.id, item);
    bySlug.set(item.slug, item);
    appendToIndex(byCategory, item.category, item);

    for (const tag of item.tags) {
      appendToIndex(byTag, tag.toLowerCase(), item);
    }
  }

  return {
    byCategory,
    byId,
    bySlug,
    byTag,
  };
}
