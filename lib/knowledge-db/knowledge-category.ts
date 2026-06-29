export const KNOWLEDGE_CATEGORIES = [
  "ASTROLOGY",
  "COMPATIBILITY",
  "CONCEPT",
  "FENG_SHUI",
  "GOOD_DAY",
  "NUMEROLOGY",
] as const;

export type KnowledgeCategory = (typeof KNOWLEDGE_CATEGORIES)[number];

export const knowledgeCategoryLabels: Record<KnowledgeCategory, string> = {
  ASTROLOGY: "Tử vi và hệ lịch",
  COMPATIBILITY: "Hợp tuổi",
  CONCEPT: "Khái niệm nền tảng",
  FENG_SHUI: "Phong thủy ứng dụng",
  GOOD_DAY: "Ngày đẹp",
  NUMEROLOGY: "Thần số học",
};

export function isKnowledgeCategory(value: string): value is KnowledgeCategory {
  return KNOWLEDGE_CATEGORIES.includes(value as KnowledgeCategory);
}
