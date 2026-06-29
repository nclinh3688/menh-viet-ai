import type { KnowledgeCategory } from "./knowledge-category";
import { loadKnowledgeItems } from "./knowledge-loader";
import type { KnowledgeItem } from "./knowledge-item";

export interface KnowledgeSearchInput {
  category?: KnowledgeCategory;
  id?: string;
  keyword?: string;
  slug?: string;
  tag?: string;
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function matchesKeyword(item: KnowledgeItem, keyword: string) {
  const normalizedKeyword = normalize(keyword);
  const haystack = [
    item.id,
    item.slug,
    item.title,
    item.summary,
    item.content,
    ...item.tags,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalizedKeyword);
}

export function searchKnowledge(input: KnowledgeSearchInput) {
  const { index, items } = loadKnowledgeItems();

  if (input.id != null) {
    return index.byId.get(input.id) == null ? [] : [index.byId.get(input.id)!];
  }

  if (input.slug != null) {
    return index.bySlug.get(input.slug) == null
      ? []
      : [index.bySlug.get(input.slug)!];
  }

  if (input.tag != null) {
    return index.byTag.get(normalize(input.tag)) ?? [];
  }

  if (input.category != null) {
    return index.byCategory.get(input.category) ?? [];
  }

  if (input.keyword != null) {
    return items.filter((item) => matchesKeyword(item, input.keyword!));
  }

  return items;
}

export function getKnowledgeById(id: string) {
  return searchKnowledge({ id })[0] ?? null;
}

export function getKnowledgeBySlug(slug: string) {
  return searchKnowledge({ slug })[0] ?? null;
}
