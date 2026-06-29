import type { FactCode, RuleEngineOutput, RuleSource } from "@/lib/rule-engine/rule-types";
import { formatSourceLabel } from "@/lib/sources/source-resolver";
import type {
  ReportDiscoveryItem,
  ReportListSection,
  ReportRenderModel,
  ReportSourceItem,
  ReportTextBlock,
  ReportWhyItem,
} from "./report-schema";

const factTitles: Record<FactCode, string> = {
  BALANCED_EARTH: "Nền tảng ổn định",
  CAREER_LEADERSHIP: "Khuynh hướng dẫn dắt",
  CAREER_MANAGEMENT: "Tư duy quản trị",
  CAREER_OPERATIONS: "Năng lực vận hành",
  CAREER_STRATEGY: "Định hướng chiến lược",
  COMMUNICATION_STRENGTH: "Khả năng giao tiếp",
  CREATIVE_GROWTH: "Năng lượng phát triển",
  GOOD_FINANCE: "Tổ chức nguồn lực",
  PRACTICAL_STABILITY: "Tính thực tế",
  STABLE_RELATIONSHIP: "Sự hài hòa trong quan hệ",
  STRONG_FIRE: "Năng lượng chủ động",
  WOOD_GROWTH: "Xu hướng mở rộng",
};

const defaultDiscovery: ReportDiscoveryItem[] = [
  { href: "/love-compatibility", label: "Độ hợp với người yêu" },
  { href: "/numerology", label: "Thần số học" },
  { href: "/five-elements", label: "Màu hợp" },
  { href: "/good-day", label: "Ngày đẹp" },
];

function titlesForFacts(codes: FactCode[], fallback: string) {
  const titles = codes.map((code) => factTitles[code]).filter(Boolean);
  return titles.length > 0 ? titles : [fallback];
}

function buildTextBlock(output: RuleEngineOutput): ReportTextBlock {
  const strongestFact = [...output.facts].sort((a, b) => b.weight - a.weight)[0];

  if (strongestFact == null) {
    return {
      body: "Dữ liệu hiện có chưa đủ để tạo insight nổi bật. Hãy bổ sung thêm dữ liệu gốc trước khi đọc report.",
      title: "Insight nổi bật",
    };
  }

  return {
    body: `Từ dữ liệu hiện có, điểm nổi bật nhất là ${factTitles[strongestFact.code].toLowerCase()}. Đây là thông tin tham khảo để bạn quan sát thêm trong hành trình khám phá bản thân.`,
    title: "Nếu chỉ chọn một điều đáng nhớ nhất trong hồ sơ này...",
  };
}

function buildInterpretation(output: RuleEngineOutput): ReportTextBlock {
  return {
    body:
      output.facts.length === 0
        ? "Report Engine chưa nhận được fact từ Rule Engine, nên không tạo diễn giải."
        : "Mệnh Việt tổng hợp các fact đã được Rule Engine tạo ra, đối chiếu điểm số, nguồn và reason để trình bày thành một report có cấu trúc. Nội dung không tự suy luận ngoài dữ liệu đầu vào.",
    title: "Mệnh Việt luận giải",
  };
}

function buildSection(
  title: string,
  description: string,
  items: string[],
): ReportListSection {
  return {
    description,
    items,
    title,
  };
}

function flattenRecommendations(output: RuleEngineOutput) {
  return [...new Set(output.recommendations.flatMap((item) => item.items))];
}

function buildSources(output: RuleEngineOutput): ReportSourceItem[] {
  return output.facts.flatMap((fact) =>
    fact.source.map((source) => ({
      confidence: fact.confidence,
      explanation: `Nguồn ${formatSourceLabel(source.primary)} tạo fact ${fact.code} thông qua rule ${fact.ruleIds.join(", ")}.`,
      factCode: fact.code,
      primary: source.primary,
      references: source.references ?? [],
      secondary: source.secondary ?? [],
    })),
  );
}

function buildWhy(output: RuleEngineOutput): ReportWhyItem[] {
  return output.facts.map((fact) => ({
    confidence: fact.confidence,
    factCode: fact.code,
    reason: output.reasons[fact.code] ?? fact.reason,
    rules: fact.ruleIds,
    sources: output.sources[fact.code] ?? fact.source,
  }));
}

function sourceNames(sources: RuleSource[]) {
  return sources
    .flatMap((source) => [source.primary, ...(source.secondary ?? [])])
    .filter(Boolean);
}

export function renderReportModel(output: RuleEngineOutput): ReportRenderModel {
  const careerFacts = output.facts
    .filter((fact) => fact.domain === "CAREER")
    .map((fact) => fact.code);
  const financeFacts = output.facts
    .filter((fact) => fact.domain === "FINANCE")
    .map((fact) => fact.code);
  const relationshipFacts = output.facts
    .filter((fact) => fact.domain === "LOVE")
    .map((fact) => fact.code);
  const strengthFacts = output.facts
    .filter((fact) => fact.domain === "PERSONALITY" || fact.domain === "CAREER")
    .map((fact) => fact.code);
  const allSources = sourceNames(output.facts.flatMap((fact) => fact.source));

  return {
    anchors: [
      { href: "#overview", label: "Tổng quan" },
      { href: "#raw-data", label: "Dữ liệu gốc" },
      { href: "#key-insight", label: "Insight" },
      { href: "#recommendations", label: "Gợi ý" },
      { href: "#why", label: "Vì sao" },
      { href: "#sources", label: "Nguồn" },
    ],
    career: buildSection(
      "Công việc",
      "Các gợi ý công việc được tạo từ fact thuộc domain career.",
      titlesForFacts(careerFacts, "Chưa có fact công việc đủ rõ."),
    ),
    cautions: buildSection(
      "Điểm cần lưu ý",
      "Các điểm này là chủ đề nên quan sát, không phải cảnh báo cố định.",
      output.facts.length > 0
        ? ["Đọc kết quả như hệ quy chiếu tham khảo.", "Ưu tiên kiểm chứng bằng trải nghiệm thực tế."]
        : ["Chưa có đủ fact để đưa ra điểm cần lưu ý."],
    ),
    disclaimer: "Nội dung chỉ mang tính tham khảo và khám phá bản thân.",
    finance: buildSection(
      "Tài chính",
      "Các gợi ý tài chính chỉ phục vụ tự quan sát và không thay thế tư vấn chuyên môn.",
      titlesForFacts(financeFacts, "Chưa có fact tài chính đủ rõ."),
    ),
    health: buildSection(
      "Sức khỏe",
      "Mệnh Việt không đưa ra tư vấn y tế. Phần này chỉ nhắc về nhịp sống và tự quan sát.",
      ["Không thay thế tư vấn y tế.", "Ưu tiên ngủ nghỉ, vận động và kiểm tra chuyên môn khi cần."],
    ),
    interpretation: buildInterpretation(output),
    keyInsight: buildTextBlock(output),
    nextDiscovery: defaultDiscovery,
    overview: {
      confidence: output.confidence,
      description: `Report được tạo từ ${output.facts.length} fact, ${output.scores.length} nhóm điểm và ${allSources.length} nguồn dữ liệu.`,
      facts: output.facts,
      scores: output.scores,
      title: "Tổng quan report",
    },
    rawData: {
      facts: output.facts,
      recommendations: output.recommendations,
      scores: output.scores,
    },
    recommendations: buildSection(
      "Gợi ý áp dụng",
      "Các gợi ý được map trực tiếp từ fact và rule đã khớp.",
      flattenRecommendations(output),
    ),
    relationship: buildSection(
      "Tình cảm",
      "Các gợi ý tình cảm chỉ dùng để tự quan sát cách kết nối.",
      titlesForFacts(relationshipFacts, "Chưa có fact tình cảm đủ rõ."),
    ),
    sources: buildSources(output),
    strengths: buildSection(
      "Điểm mạnh",
      "Các điểm mạnh được rút ra từ fact có domain personality hoặc career.",
      titlesForFacts(strengthFacts, "Chưa có fact điểm mạnh đủ rõ."),
    ),
    why: buildWhy(output),
  };
}
