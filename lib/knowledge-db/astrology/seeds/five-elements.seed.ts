import type { SourceId } from "@/lib/sources/source-types";
import type { KnowledgeCategory } from "../../knowledge-category";
import type { KnowledgeItem, KnowledgeReference } from "../../knowledge-item";

interface ElementRelation {
  element: string;
  note: string;
}

interface FiveElementsOverviewSeed {
  applications: {
    astrology: string[];
    compatibility: string[];
    fengShui: string[];
  };
  category: KnowledgeCategory;
  confidence: number;
  controllingCycle: string[];
  elements: Array<"Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ">;
  generatingCycle: string[];
  id: string;
  lastUpdated: string;
  limitations: string[];
  name: string;
  references: KnowledgeReference[];
  relatedKnowledge: string[];
  slug: string;
  sources: SourceId[];
  summary: string;
  tags: string[];
  version: string;
  whatIsIt: string;
}

export interface FiveElementSeedItem {
  applications: string[];
  category: KnowledgeCategory;
  cautiousColors: string[];
  characteristics: string[];
  confidence: number;
  controlledBy: ElementRelation;
  controllingRelation: ElementRelation;
  coreMeaning: string;
  careerTendencies: string[];
  commonMisunderstandings: string[];
  element: "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ";
  faq: Array<{
    answer: string;
    question: string;
  }>;
  favorableColors: string[];
  favorableDirections: string[];
  favorableNumbers: string[];
  financeTendencies: string[];
  generatedBy: ElementRelation;
  generatingRelation: ElementRelation;
  hanviet?: string;
  healthNotes: string[];
  id: string;
  lastUpdated: string;
  name: string;
  references: KnowledgeReference[];
  relatedKnowledge: string[];
  reportUsage: string[];
  relationshipTendencies: string[];
  seoKeywords: string[];
  shareInsightTemplates: string[];
  slug: string;
  sources: SourceId[];
  strengths: string[];
  summary: string;
  tags: string[];
  version: string;
  weaknesses: string[];
  yinYangNotes: string;
}

const sharedReferences: KnowledgeReference[] = [
  { label: "Five elements engine", path: "/lib/astrology/elements.ts" },
  { label: "Source Registry", path: "/lib/sources/source-registry.ts" },
  {
    label: "Astrology Knowledge Structure",
    path: "/docs/knowledge/18_ASTROLOGY_KNOWLEDGE_STRUCTURE.md",
  },
];

export const FIVE_ELEMENTS_OVERVIEW_SEED: FiveElementsOverviewSeed = {
  applications: {
    astrology: ["đọc hành bản mệnh", "đối chiếu Can Chi/Nạp âm", "làm lớp nguồn cho Birth Report"],
    compatibility: ["đối chiếu sinh khắc", "giải thích điểm hợp tuổi ở mức tham khảo"],
    fengShui: ["gợi ý màu sắc", "gợi ý cách đọc môi trường sống ở mức nền"],
  },
  category: "CONCEPT",
  confidence: 88,
  controllingCycle: ["Mộc khắc Thổ", "Thổ khắc Thủy", "Thủy khắc Hỏa", "Hỏa khắc Kim", "Kim khắc Mộc"],
  elements: ["Kim", "Mộc", "Thủy", "Hỏa", "Thổ"],
  generatingCycle: ["Mộc sinh Hỏa", "Hỏa sinh Thổ", "Thổ sinh Kim", "Kim sinh Thủy", "Thủy sinh Mộc"],
  id: "five-elements.overview",
  lastUpdated: "2026-06-29",
  limitations: [
    "Chỉ là hệ quy chiếu tham khảo.",
    "Không thay thế tư vấn y tế, pháp lý, tài chính hoặc quyết định chuyên môn.",
    "Cần đọc cùng bối cảnh cá nhân và dữ liệu khác.",
  ],
  name: "Tổng quan Ngũ Hành",
  references: sharedReferences,
  relatedKnowledge: [
    "five-elements.kim.foundation",
    "five-elements.moc.foundation",
    "five-elements.thuy.foundation",
    "five-elements.hoa.foundation",
    "five-elements.tho.foundation",
  ],
  slug: "tong-quan-ngu-hanh",
  sources: ["FIVE_ELEMENTS"],
  summary:
    "Tổng quan cấu trúc Ngũ Hành, gồm 5 hành, vòng tương sinh, vòng tương khắc và phạm vi ứng dụng tham khảo.",
  tags: ["ngu-hanh", "tong-quan", "tuong-sinh", "tuong-khac", "phong-thuy", "hop-tuoi"],
  version: "1.0.0",
  whatIsIt:
    "Ngũ Hành là hệ quy chiếu gồm Kim, Mộc, Thủy, Hỏa, Thổ, dùng để mô tả quan hệ sinh khắc và các lớp gợi ý biểu tượng trong văn hóa phương Đông.",
};

export const FIVE_ELEMENTS_KNOWLEDGE_SEED: FiveElementSeedItem[] = [
  {
    applications: ["màu sắc tham khảo", "định hướng nghề nghiệp", "tự quan sát phong cách ra quyết định"],
    category: "ASTROLOGY",
    cautiousColors: ["đỏ", "cam", "tím"],
    characteristics: ["thiên về cấu trúc", "coi trọng tiêu chuẩn", "ưu tiên sự rõ ràng"],
    confidence: 88,
    controlledBy: { element: "Hỏa", note: "Hỏa khắc Kim trong vòng tương khắc." },
    controllingRelation: { element: "Mộc", note: "Kim khắc Mộc trong vòng tương khắc." },
    coreMeaning: "Kim thường gắn với cấu trúc, kỷ luật, chuẩn mực và khả năng tinh chỉnh.",
    careerTendencies: ["quản trị", "tài chính", "kỹ thuật", "pháp lý", "vận hành có quy chuẩn"],
    commonMisunderstandings: ["Kim không chỉ nói về tiền bạc.", "Màu hợp chỉ là gợi ý biểu tượng."],
    element: "Kim",
    faq: [
      { question: "Hành Kim hợp màu gì?", answer: "Các nhóm trắng, xám, ghi và màu thuộc Thổ thường được dùng làm gợi ý tham khảo." },
      { question: "Kim nên đọc trong report thế nào?", answer: "Ưu tiên đọc như xu hướng cấu trúc, tiêu chuẩn và cách tổ chức." },
    ],
    favorableColors: ["trắng", "xám", "ghi", "vàng nhạt", "nâu đất"],
    favorableDirections: [],
    favorableNumbers: ["6", "7"],
    financeTendencies: ["ưa kế hoạch rõ", "hợp theo dõi ngân sách", "nên tránh quyết định quá cứng nhắc"],
    generatedBy: { element: "Thổ", note: "Thổ sinh Kim trong vòng tương sinh." },
    generatingRelation: { element: "Thủy", note: "Kim sinh Thủy trong vòng tương sinh." },
    hanviet: "Kim",
    healthNotes: ["Chỉ dùng như ghi chú tham khảo về nhịp sống, không thay thế tư vấn y tế."],
    id: "five-elements.kim.foundation",
    lastUpdated: "2026-06-29",
    name: "Kim",
    references: sharedReferences,
    relatedKnowledge: ["five-elements.overview", "five-elements.tho.foundation", "five-elements.thuy.foundation", "five-elements.hoa.foundation", "five-elements.moc.foundation"],
    reportUsage: ["Birth Report dùng Kim để giải thích xu hướng cấu trúc và quản trị.", "Why Card có thể trỏ về nguồn FIVE_ELEMENTS."],
    relationshipTendencies: ["coi trọng ranh giới", "thích cam kết rõ", "nên mềm hóa khi trao đổi"],
    seoKeywords: ["mệnh Kim", "ngũ hành Kim", "màu hợp mệnh Kim", "số hợp mệnh Kim"],
    shareInsightTemplates: ["Hành Kim gợi ý xu hướng rõ ràng, kỷ luật và thích cấu trúc."],
    slug: "ngu-hanh-kim",
    sources: ["FIVE_ELEMENTS"],
    strengths: ["tổ chức", "kỷ luật", "tư duy hệ thống"],
    summary: "Hành Kim đại diện cho cấu trúc, chuẩn mực và khả năng tinh chỉnh trong hệ Ngũ Hành.",
    tags: ["kim", "ngu-hanh", "metal", "mau-hop", "so-hop"],
    version: "1.0.0",
    weaknesses: ["dễ cứng", "khó linh hoạt khi thiếu thông tin", "có thể quá chú trọng tiêu chuẩn"],
    yinYangNotes: "Hành Kim có thể biểu hiện cả sắc thái âm và dương tùy Can Chi hoặc ngữ cảnh luận giải.",
  },
  {
    applications: ["phát triển cá nhân", "nghề sáng tạo", "màu sắc tham khảo"],
    category: "ASTROLOGY",
    cautiousColors: ["trắng", "xám", "ghi"],
    characteristics: ["thiên về tăng trưởng", "thích học hỏi", "dễ mở rộng kết nối"],
    confidence: 88,
    controlledBy: { element: "Kim", note: "Kim khắc Mộc trong vòng tương khắc." },
    controllingRelation: { element: "Thổ", note: "Mộc khắc Thổ trong vòng tương khắc." },
    coreMeaning: "Mộc thường gắn với sinh trưởng, kết nối, linh hoạt và phát triển dài hạn.",
    careerTendencies: ["giáo dục", "sáng tạo", "tư vấn", "phát triển sản phẩm", "xây dựng cộng đồng"],
    commonMisunderstandings: ["Mộc không chỉ là cây cối theo nghĩa vật lý.", "Tăng trưởng cần đi cùng ranh giới và nhịp ổn định."],
    element: "Mộc",
    faq: [
      { question: "Hành Mộc hợp màu gì?", answer: "Xanh lá và nhóm màu thuộc Thủy thường được dùng làm gợi ý tham khảo." },
      { question: "Mộc dùng trong báo cáo ra sao?", answer: "Mệnh Việt dùng Mộc để đọc xu hướng phát triển, kết nối và học hỏi." },
    ],
    favorableColors: ["xanh lá", "xanh lục", "xanh dương", "đen"],
    favorableDirections: [],
    favorableNumbers: ["3", "4"],
    financeTendencies: ["phù hợp mục tiêu tăng trưởng", "nên quản trị rủi ro khi mở rộng", "hợp đầu tư vào kỹ năng"],
    generatedBy: { element: "Thủy", note: "Thủy sinh Mộc trong vòng tương sinh." },
    generatingRelation: { element: "Hỏa", note: "Mộc sinh Hỏa trong vòng tương sinh." },
    hanviet: "Mộc",
    healthNotes: ["Chỉ dùng như gợi ý tự quan sát nhịp sống, không thay thế tư vấn y tế."],
    id: "five-elements.moc.foundation",
    lastUpdated: "2026-06-29",
    name: "Mộc",
    references: sharedReferences,
    relatedKnowledge: ["five-elements.overview", "five-elements.thuy.foundation", "five-elements.hoa.foundation", "five-elements.kim.foundation", "five-elements.tho.foundation"],
    reportUsage: ["Birth Report dùng Mộc để giải thích xu hướng tăng trưởng và kết nối.", "Ngũ Hành page dùng Mộc cho màu, số và quan hệ sinh khắc."],
    relationshipTendencies: ["thích nuôi dưỡng", "coi trọng sự phát triển chung", "nên tránh ôm quá nhiều vai trò"],
    seoKeywords: ["mệnh Mộc", "ngũ hành Mộc", "màu hợp mệnh Mộc", "số hợp mệnh Mộc"],
    shareInsightTemplates: ["Hành Mộc gợi ý xu hướng phát triển, kết nối và mở rộng từng bước."],
    slug: "ngu-hanh-moc",
    sources: ["FIVE_ELEMENTS"],
    strengths: ["tăng trưởng", "linh hoạt", "kết nối"],
    summary: "Hành Mộc đại diện cho sinh trưởng, phát triển và khả năng kết nối trong hệ Ngũ Hành.",
    tags: ["moc", "mộc", "ngu-hanh", "wood", "mau-hop", "so-hop"],
    version: "1.0.0",
    weaknesses: ["dễ phân tán", "cần ranh giới rõ", "có thể mở rộng nhanh hơn năng lực hiện tại"],
    yinYangNotes: "Hành Mộc có sắc thái âm hoặc dương tùy dữ liệu đi kèm như Thiên Can, Địa Chi hoặc Nạp âm.",
  },
  {
    applications: ["giao tiếp", "nghiên cứu", "màu sắc tham khảo"],
    category: "ASTROLOGY",
    cautiousColors: ["vàng", "nâu đất"],
    characteristics: ["thiên về thích nghi", "nhạy với bối cảnh", "có xu hướng quan sát kỹ"],
    confidence: 88,
    controlledBy: { element: "Thổ", note: "Thổ khắc Thủy trong vòng tương khắc." },
    controllingRelation: { element: "Hỏa", note: "Thủy khắc Hỏa trong vòng tương khắc." },
    coreMeaning: "Thủy thường gắn với dòng chảy, giao tiếp, khả năng thích nghi và chiều sâu quan sát.",
    careerTendencies: ["truyền thông", "nghiên cứu", "dịch vụ", "thương mại", "phân tích thông tin"],
    commonMisunderstandings: ["Thủy không đồng nghĩa với thiếu ổn định.", "Tính thích nghi cần được đọc cùng bối cảnh."],
    element: "Thủy",
    faq: [
      { question: "Hành Thủy hợp màu gì?", answer: "Đen, xanh dương và nhóm màu thuộc Kim thường được dùng làm gợi ý tham khảo." },
      { question: "Thủy thể hiện gì trong report?", answer: "Thủy giúp đọc xu hướng giao tiếp, quan sát và thích nghi." },
    ],
    favorableColors: ["đen", "xanh dương", "trắng", "xám"],
    favorableDirections: [],
    favorableNumbers: ["1"],
    financeTendencies: ["hợp theo dõi dòng tiền", "nên tránh thay đổi thiếu tiêu chí", "phù hợp phân tích trước khi quyết định"],
    generatedBy: { element: "Kim", note: "Kim sinh Thủy trong vòng tương sinh." },
    generatingRelation: { element: "Mộc", note: "Thủy sinh Mộc trong vòng tương sinh." },
    hanviet: "Thủy",
    healthNotes: ["Chỉ mang tính tham khảo về nhịp sống và cảm nhận năng lượng, không thay thế tư vấn y tế."],
    id: "five-elements.thuy.foundation",
    lastUpdated: "2026-06-29",
    name: "Thủy",
    references: sharedReferences,
    relatedKnowledge: ["five-elements.overview", "five-elements.kim.foundation", "five-elements.moc.foundation", "five-elements.tho.foundation", "five-elements.hoa.foundation"],
    reportUsage: ["Birth Report dùng Thủy để giải thích xu hướng giao tiếp và thích nghi.", "Why Card có thể dùng quan hệ Kim sinh Thủy và Thủy sinh Mộc."],
    relationshipTendencies: ["lắng nghe tốt", "dễ cảm nhận thay đổi", "nên nói rõ nhu cầu thay vì giữ trong lòng"],
    seoKeywords: ["mệnh Thủy", "ngũ hành Thủy", "màu hợp mệnh Thủy", "số hợp mệnh Thủy"],
    shareInsightTemplates: ["Hành Thủy gợi ý khả năng quan sát, thích nghi và đọc bối cảnh."],
    slug: "ngu-hanh-thuy",
    sources: ["FIVE_ELEMENTS"],
    strengths: ["thích nghi", "giao tiếp", "quan sát"],
    summary: "Hành Thủy đại diện cho dòng chảy, thích nghi và giao tiếp trong hệ Ngũ Hành.",
    tags: ["thuy", "thủy", "ngu-hanh", "water", "mau-hop", "so-hop"],
    version: "1.0.0",
    weaknesses: ["dễ do dự", "cần tiêu chí rõ", "có thể bị ảnh hưởng bởi môi trường"],
    yinYangNotes: "Hành Thủy cần được đọc cùng dữ liệu âm dương khác để tránh diễn giải một chiều.",
  },
  {
    applications: ["vai trò dẫn dắt", "sáng tạo", "màu sắc tham khảo"],
    category: "ASTROLOGY",
    cautiousColors: ["đen", "xanh dương"],
    characteristics: ["thiên về hành động", "dễ tạo động lực", "ưu tiên sự rõ ràng trong mục tiêu"],
    confidence: 88,
    controlledBy: { element: "Thủy", note: "Thủy khắc Hỏa trong vòng tương khắc." },
    controllingRelation: { element: "Kim", note: "Hỏa khắc Kim trong vòng tương khắc." },
    coreMeaning: "Hỏa thường gắn với nhiệt huyết, hành động, sự lan tỏa và khả năng truyền cảm hứng.",
    careerTendencies: ["kinh doanh", "truyền thông", "dẫn dắt nhóm", "sáng tạo", "tổ chức sự kiện"],
    commonMisunderstandings: ["Hỏa không chỉ là nóng nảy.", "Năng lượng hành động cần đi cùng nhịp nghỉ và dữ liệu thực tế."],
    element: "Hỏa",
    faq: [
      { question: "Hành Hỏa hợp màu gì?", answer: "Đỏ, cam, tím và nhóm xanh lá thường được dùng làm gợi ý tham khảo." },
      { question: "Hỏa dùng trong Birth Report thế nào?", answer: "Hỏa hỗ trợ đọc xu hướng hành động, lan tỏa và truyền cảm hứng." },
    ],
    favorableColors: ["đỏ", "cam", "tím", "xanh lá"],
    favorableDirections: [],
    favorableNumbers: ["9"],
    financeTendencies: ["hợp mục tiêu có nhịp hành động", "nên tránh quyết định vội", "cần kiểm tra dữ liệu trước khi mở rộng"],
    generatedBy: { element: "Mộc", note: "Mộc sinh Hỏa trong vòng tương sinh." },
    generatingRelation: { element: "Thổ", note: "Hỏa sinh Thổ trong vòng tương sinh." },
    hanviet: "Hỏa",
    healthNotes: ["Chỉ dùng như lời nhắc tự quan sát nhịp nghỉ và mức căng thẳng, không thay thế tư vấn y tế."],
    id: "five-elements.hoa.foundation",
    lastUpdated: "2026-06-29",
    name: "Hỏa",
    references: sharedReferences,
    relatedKnowledge: ["five-elements.overview", "five-elements.moc.foundation", "five-elements.tho.foundation", "five-elements.thuy.foundation", "five-elements.kim.foundation"],
    reportUsage: ["Birth Report dùng Hỏa để giải thích xu hướng chủ động và dẫn dắt.", "Share Card có thể dùng Hỏa như insight về năng lượng hành động."],
    relationshipTendencies: ["thể hiện rõ", "dễ tạo cảm hứng", "nên lắng nghe nhịp cảm xúc của người khác"],
    seoKeywords: ["mệnh Hỏa", "ngũ hành Hỏa", "màu hợp mệnh Hỏa", "số hợp mệnh Hỏa"],
    shareInsightTemplates: ["Hành Hỏa gợi ý năng lượng chủ động, lan tỏa và truyền cảm hứng."],
    slug: "ngu-hanh-hoa",
    sources: ["FIVE_ELEMENTS"],
    strengths: ["chủ động", "truyền cảm hứng", "quyết đoán có điều kiện"],
    summary: "Hành Hỏa đại diện cho hành động, nhiệt huyết và khả năng lan tỏa trong hệ Ngũ Hành.",
    tags: ["hoa", "hỏa", "ngu-hanh", "fire", "mau-hop", "so-hop"],
    version: "1.0.0",
    weaknesses: ["dễ nhanh", "cần nhịp nghỉ", "có thể thiếu kiên nhẫn khi mục tiêu mơ hồ"],
    yinYangNotes: "Hành Hỏa nên được đọc cùng âm dương và bối cảnh để phân biệt nhiệt huyết với nhịp hành động quá cao.",
  },
  {
    applications: ["vận hành", "ổn định nền tảng", "màu sắc tham khảo"],
    category: "ASTROLOGY",
    cautiousColors: ["xanh lá", "xanh lục"],
    characteristics: ["thiên về ổn định", "coi trọng nền tảng", "ưu tiên trách nhiệm"],
    confidence: 88,
    controlledBy: { element: "Mộc", note: "Mộc khắc Thổ trong vòng tương khắc." },
    controllingRelation: { element: "Thủy", note: "Thổ khắc Thủy trong vòng tương khắc." },
    coreMeaning: "Thổ thường gắn với nền tảng, sự ổn định, khả năng nâng đỡ và tính thực tế.",
    careerTendencies: ["vận hành", "quản lý dự án", "bất động sản", "nhân sự", "xây dựng quy trình"],
    commonMisunderstandings: ["Thổ không chỉ là chậm hoặc bảo thủ.", "Ổn định cần đi cùng khả năng điều chỉnh."],
    element: "Thổ",
    faq: [
      { question: "Hành Thổ hợp màu gì?", answer: "Vàng, nâu đất và nhóm màu thuộc Hỏa thường được dùng làm gợi ý tham khảo." },
      { question: "Thổ dùng trong report ra sao?", answer: "Thổ giúp đọc xu hướng ổn định, trách nhiệm và xây nền." },
    ],
    favorableColors: ["vàng", "nâu đất", "đỏ", "cam", "tím"],
    favorableDirections: [],
    favorableNumbers: ["2", "5", "8"],
    financeTendencies: ["phù hợp kế hoạch dài hạn", "hợp tích lũy đều", "nên tránh trì hoãn khi cần điều chỉnh"],
    generatedBy: { element: "Hỏa", note: "Hỏa sinh Thổ trong vòng tương sinh." },
    generatingRelation: { element: "Kim", note: "Thổ sinh Kim trong vòng tương sinh." },
    hanviet: "Thổ",
    healthNotes: ["Chỉ là ghi chú tham khảo về nhịp sống ổn định, không thay thế tư vấn y tế."],
    id: "five-elements.tho.foundation",
    lastUpdated: "2026-06-29",
    name: "Thổ",
    references: sharedReferences,
    relatedKnowledge: ["five-elements.overview", "five-elements.hoa.foundation", "five-elements.kim.foundation", "five-elements.moc.foundation", "five-elements.thuy.foundation"],
    reportUsage: ["Birth Report dùng Thổ để giải thích xu hướng ổn định và vận hành.", "Ngũ Hành page dùng Thổ cho màu, số và quan hệ sinh khắc."],
    relationshipTendencies: ["đề cao trách nhiệm", "ưa sự bền bỉ", "nên linh hoạt khi bối cảnh thay đổi"],
    seoKeywords: ["mệnh Thổ", "ngũ hành Thổ", "màu hợp mệnh Thổ", "số hợp mệnh Thổ"],
    shareInsightTemplates: ["Hành Thổ gợi ý xu hướng ổn định, thực tế và nâng đỡ."],
    slug: "ngu-hanh-tho",
    sources: ["FIVE_ELEMENTS"],
    strengths: ["ổn định", "thực tế", "giữ nhịp"],
    summary: "Hành Thổ đại diện cho nền tảng, ổn định và khả năng nâng đỡ trong hệ Ngũ Hành.",
    tags: ["tho", "thổ", "ngu-hanh", "earth", "mau-hop", "so-hop"],
    version: "1.0.0",
    weaknesses: ["dễ chậm thay đổi", "cần tránh ôm trách nhiệm quá mức", "có thể khó buông việc đã quen"],
    yinYangNotes: "Hành Thổ có thể biểu hiện thành tính ổn định hoặc trì trệ tùy bối cảnh và dữ liệu đi kèm.",
  },
];

function toContent(item: FiveElementSeedItem) {
  return [
    item.coreMeaning,
    `Đặc điểm: ${item.characteristics.join(", ")}.`,
    `Điểm mạnh: ${item.strengths.join(", ")}.`,
    `Điểm cần lưu ý: ${item.weaknesses.join(", ")}.`,
    `Màu hợp tham khảo: ${item.favorableColors.join(", ")}.`,
    `Màu nên tiết chế: ${item.cautiousColors.join(", ")}.`,
    `Quan hệ tương sinh: ${item.generatedBy.element} sinh ${item.element}; ${item.element} sinh ${item.generatingRelation.element}.`,
    `Quan hệ tương khắc: ${item.controlledBy.element} khắc ${item.element}; ${item.element} khắc ${item.controllingRelation.element}.`,
    `Ứng dụng trong report: ${item.reportUsage.join(", ")}.`,
    `Hiểu nhầm thường gặp: ${item.commonMisunderstandings.join(", ")}.`,
    `FAQ: ${item.faq.map((entry) => `${entry.question} ${entry.answer}`).join(" ")}`,
  ].join(" ");
}

function overviewToContent(item: FiveElementsOverviewSeed) {
  return [
    item.whatIsIt,
    `Năm hành: ${item.elements.join(", ")}.`,
    `Tương sinh: ${item.generatingCycle.join(", ")}.`,
    `Tương khắc: ${item.controllingCycle.join(", ")}.`,
    `Ứng dụng tử vi: ${item.applications.astrology.join(", ")}.`,
    `Ứng dụng phong thủy: ${item.applications.fengShui.join(", ")}.`,
    `Ứng dụng hợp tuổi: ${item.applications.compatibility.join(", ")}.`,
    `Giới hạn: ${item.limitations.join(" ")}`,
  ].join(" ");
}

export const FIVE_ELEMENTS_OVERVIEW_KNOWLEDGE_ITEM: KnowledgeItem = {
  category: FIVE_ELEMENTS_OVERVIEW_SEED.category,
  confidence: FIVE_ELEMENTS_OVERVIEW_SEED.confidence,
  content: overviewToContent(FIVE_ELEMENTS_OVERVIEW_SEED),
  id: FIVE_ELEMENTS_OVERVIEW_SEED.id,
  lastUpdated: FIVE_ELEMENTS_OVERVIEW_SEED.lastUpdated,
  references: FIVE_ELEMENTS_OVERVIEW_SEED.references,
  relatedKnowledge: FIVE_ELEMENTS_OVERVIEW_SEED.relatedKnowledge,
  slug: FIVE_ELEMENTS_OVERVIEW_SEED.slug,
  sources: FIVE_ELEMENTS_OVERVIEW_SEED.sources,
  summary: FIVE_ELEMENTS_OVERVIEW_SEED.summary,
  tags: FIVE_ELEMENTS_OVERVIEW_SEED.tags,
  title: FIVE_ELEMENTS_OVERVIEW_SEED.name,
  version: FIVE_ELEMENTS_OVERVIEW_SEED.version,
};

export const FIVE_ELEMENTS_KNOWLEDGE_ITEMS: KnowledgeItem[] = [
  FIVE_ELEMENTS_OVERVIEW_KNOWLEDGE_ITEM,
  ...FIVE_ELEMENTS_KNOWLEDGE_SEED.map((item) => ({
    category: item.category,
    confidence: item.confidence,
    content: toContent(item),
    id: item.id,
    lastUpdated: item.lastUpdated,
    references: item.references,
    relatedKnowledge: item.relatedKnowledge,
    slug: item.slug,
    sources: item.sources,
    summary: item.summary,
    tags: [...new Set([...item.tags, ...item.seoKeywords])],
    title: `Ngũ Hành ${item.name}`,
    version: item.version,
  })),
];
