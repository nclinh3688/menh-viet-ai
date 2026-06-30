import type { KnowledgeCategory } from "@/lib/knowledge-db/knowledge-category";
import type { KnowledgeItem } from "@/lib/knowledge-db/knowledge-item";

export interface KnowledgeTopic {
  category?: KnowledgeCategory;
  description: string;
  keywords: string[];
  slug: string;
  tags: string[];
  title: string;
}

export const knowledgeTopics: KnowledgeTopic[] = [
  {
    category: "ASTROLOGY",
    description: "Hệ Thiên Can dùng để đọc lớp dữ liệu năm sinh trong Can Chi.",
    keywords: ["thiên can", "thien can"],
    slug: "heavenly-stems",
    tags: ["thien-can"],
    title: "Thiên Can",
  },
  {
    category: "ASTROLOGY",
    description: "Hệ Địa Chi, con giáp và các quan hệ nhịp năm sinh.",
    keywords: ["địa chi", "dia chi"],
    slug: "earthly-branches",
    tags: ["dia-chi"],
    title: "Địa Chi",
  },
  {
    description: "Kim, Mộc, Thủy, Hỏa, Thổ và vòng sinh khắc.",
    keywords: ["ngũ hành", "ngu hanh", "kim", "mộc", "thủy", "hỏa", "thổ"],
    slug: "five-elements",
    tags: ["ngu-hanh"],
    title: "Ngũ Hành",
  },
  {
    category: "ASTROLOGY",
    description: "Lớp nạp âm dùng trong BirthChart và hành bản mệnh.",
    keywords: ["nạp âm", "nap am"],
    slug: "nap-am",
    tags: ["nap-am"],
    title: "Nạp Âm",
  },
  {
    category: "FENG_SHUI",
    description: "Cung Phi, nhóm Đông/Tây tứ mệnh và hướng tham khảo.",
    keywords: ["cung phi"],
    slug: "cung-phi",
    tags: ["cung-phi"],
    title: "Cung Phi",
  },
  {
    category: "FENG_SHUI",
    description: "Bát Trạch và cách đọc hướng trong phong thủy ứng dụng.",
    keywords: ["bát trạch", "bat trach"],
    slug: "bat-trach",
    tags: ["bat-trach"],
    title: "Bát Trạch",
  },
  {
    category: "NUMEROLOGY",
    description: "Các con số nền tảng dùng để khám phá bản thân.",
    keywords: ["thần số học", "than so hoc", "numerology"],
    slug: "numerology",
    tags: ["numerology"],
    title: "Thần số học",
  },
  {
    category: "COMPATIBILITY",
    description: "Các trục Cung Phi, Địa Chi, Thiên Can và Ngũ Hành trong hợp tuổi.",
    keywords: ["hợp tuổi", "hop tuoi"],
    slug: "compatibility",
    tags: ["hop-tuoi"],
    title: "Hợp tuổi",
  },
  {
    category: "GOOD_DAY",
    description: "Cách đọc ngày theo mục đích và guidance tham khảo.",
    keywords: ["ngày đẹp", "ngay dep"],
    slug: "good-day",
    tags: ["ngay-dep"],
    title: "Ngày đẹp",
  },
  {
    category: "FENG_SHUI",
    description: "Tri thức phong thủy ứng dụng cho màu sắc, hướng và không gian.",
    keywords: ["phong thủy", "phong thuy"],
    slug: "feng-shui",
    tags: ["phong-thuy"],
    title: "Phong thủy",
  },
];

function normalize(value: string) {
  return value.toLowerCase();
}

export function findKnowledgeTopic(slug: string) {
  return knowledgeTopics.find((topic) => topic.slug === slug) ?? null;
}

export function getItemsForTopic(topic: KnowledgeTopic, items: KnowledgeItem[]) {
  return items.filter((item) => {
    const haystack = normalize(
      [item.id, item.slug, item.title, item.summary, item.content, ...item.tags].join(" "),
    );

    return (
      (topic.category != null && item.category === topic.category) ||
      topic.tags.some((tag) => item.tags.includes(tag)) ||
      topic.keywords.some((keyword) => haystack.includes(normalize(keyword)))
    );
  });
}

export function getTopicCompleteness(items: KnowledgeItem[]) {
  if (items.length === 0) {
    return 0;
  }

  const requiredKeys: Array<keyof KnowledgeItem> = [
    "id",
    "slug",
    "title",
    "summary",
    "content",
    "sources",
    "references",
    "version",
  ];
  const total = items.reduce((sum, item) => {
    const present = requiredKeys.filter((key) => {
      const value = item[key];
      return Array.isArray(value) ? value.length > 0 : value != null && String(value).length > 0;
    }).length;

    return sum + Math.round((present / requiredKeys.length) * 100);
  }, 0);

  return Math.round(total / items.length);
}
