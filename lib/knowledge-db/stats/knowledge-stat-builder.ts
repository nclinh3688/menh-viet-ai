import type { KnowledgeCategory } from "@/lib/knowledge-db/knowledge-category";
import { KNOWLEDGE_CATEGORIES } from "@/lib/knowledge-db/knowledge-category";
import type { KnowledgeItem } from "@/lib/knowledge-db/knowledge-item";
import { loadKnowledgeItems } from "@/lib/knowledge-db/knowledge-loader";

export interface KnowledgeCategoryStat {
  category: KnowledgeCategory;
  completeness: number;
  itemCount: number;
}

export interface KnowledgeStats {
  byCategory: KnowledgeCategoryStat[];
  totalItems: number;
}

const requiredFields: Array<keyof KnowledgeItem> = [
  "id",
  "slug",
  "title",
  "category",
  "summary",
  "content",
  "sources",
  "references",
  "tags",
  "confidence",
  "version",
  "lastUpdated",
];

function isFilled(value: unknown) {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) && value > 0;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return value != null;
}

function getItemCompleteness(item: KnowledgeItem) {
  const presentCount = requiredFields.filter((field) => isFilled(item[field])).length;

  return Math.round((presentCount / requiredFields.length) * 100);
}

export function buildKnowledgeStats(items = loadKnowledgeItems().items): KnowledgeStats {
  return {
    byCategory: KNOWLEDGE_CATEGORIES.map((category) => {
      const categoryItems = items.filter((item) => item.category === category);
      const completeness =
        categoryItems.length === 0
          ? 0
          : Math.round(
              categoryItems.reduce((total, item) => total + getItemCompleteness(item), 0) /
                categoryItems.length,
            );

      return {
        category,
        completeness,
        itemCount: categoryItems.length,
      };
    }),
    totalItems: items.length,
  };
}
