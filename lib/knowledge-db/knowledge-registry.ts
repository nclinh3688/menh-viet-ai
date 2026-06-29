import { FIVE_ELEMENTS_KNOWLEDGE_ITEMS } from "./astrology/seeds/five-elements.seed";
import type { KnowledgeItem } from "./knowledge-item";

const knowledgeItems: KnowledgeItem[] = [
  {
    category: "CONCEPT",
    confidence: 88,
    content:
      "Ngũ Hành là hệ quy chiếu gồm Kim, Mộc, Thủy, Hỏa, Thổ. Trong Mệnh Việt, Ngũ Hành được dùng để mô tả màu sắc, số, nghề nghiệp và quan hệ sinh khắc ở mức tham khảo.",
    id: "concept.five-elements.overview",
    lastUpdated: "2026-06-29",
    references: [
      { label: "Five elements engine", path: "/lib/astrology/elements.ts" },
      { label: "Source Registry", path: "/lib/sources/source-registry.ts" },
    ],
    relatedKnowledge: ["astrology.birth-chart.element"],
    slug: "ngu-hanh-la-gi",
    sources: ["FIVE_ELEMENTS"],
    summary:
      "Định nghĩa Ngũ Hành như một hệ quy chiếu tham khảo gồm Kim, Mộc, Thủy, Hỏa, Thổ.",
    tags: ["ngu-hanh", "kim", "moc", "thuy", "hoa", "tho", "concept"],
    title: "Ngũ Hành là gì?",
    version: "1.0.0",
  },
  {
    category: "ASTROLOGY",
    confidence: 82,
    content:
      "Can Chi là hệ thống kết hợp Thiên Can và Địa Chi để mô tả năm sinh trong lịch truyền thống. Mệnh Việt dùng Can Chi năm sinh như dữ liệu nền cho BirthChart.",
    id: "astrology.can-chi.year-cycle",
    lastUpdated: "2026-06-29",
    references: [
      { label: "Can Chi engine", path: "/lib/astrology/can-chi.ts" },
      { label: "Source Registry", path: "/lib/sources/source-registry.ts" },
    ],
    relatedKnowledge: ["astrology.thien-can", "astrology.dia-chi"],
    slug: "can-chi-nam-sinh",
    sources: ["CAN_CHI", "THIEN_CAN", "DIA_CHI"],
    summary:
      "Can Chi năm sinh là dữ liệu nền gồm Thiên Can và Địa Chi trong BirthChart.",
    tags: ["can-chi", "thien-can", "dia-chi", "nam-sinh", "birth-chart"],
    title: "Can Chi năm sinh",
    version: "1.0.0",
  },
  {
    category: "FENG_SHUI",
    confidence: 78,
    content:
      "Cung Phi là lớp dữ liệu phong thủy dùng để tham khảo nhóm Đông/Tây tứ mệnh và hướng. Cung Phi không thay thế khảo sát không gian sống thực tế.",
    id: "feng-shui.cung-phi.direction-group",
    lastUpdated: "2026-06-29",
    references: [
      { label: "Cung Phi engine", path: "/lib/astrology/cung-phi.ts" },
      { label: "Source Registry", path: "/lib/sources/source-registry.ts" },
    ],
    relatedKnowledge: ["concept.five-elements.overview"],
    slug: "cung-phi-va-huong-tham-khao",
    sources: ["CUNG_PHI", "BAT_TRACH"],
    summary:
      "Cung Phi hỗ trợ đọc nhóm hướng tham khảo trong phong thủy ứng dụng.",
    tags: ["cung-phi", "bat-trach", "huong-tot", "phong-thuy"],
    title: "Cung Phi và hướng tham khảo",
    version: "1.0.0",
  },
  ...FIVE_ELEMENTS_KNOWLEDGE_ITEMS,
];

export function getKnowledgeRegistry() {
  return knowledgeItems;
}

export function registerKnowledgeItems(items: KnowledgeItem[]) {
  return [...knowledgeItems, ...items];
}
