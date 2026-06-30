import type { CompatibilityResult } from "@/lib/astrology/compatibility";
import type { FiveElementsAnalysis } from "@/lib/astrology/five-elements";
import type { GoodDayAnalysis } from "@/lib/astrology/good-day";
import { getFiveElementReportFacts } from "@/lib/knowledge-db/astrology/five-elements-pack";
import { searchKnowledgeWithRelated } from "@/lib/knowledge-db/knowledge-search";
import type { NumerologyAnalysis } from "@/lib/numerology";
import type { ResultDiscoveryItem, ResultModel } from "./result-types";

function buildKnowledgeDiscovery(keyword: string): ResultDiscoveryItem[] {
  const candidates = searchKnowledgeWithRelated({ keyword }).flatMap((result) => [
    result.item,
    ...result.relatedKnowledge,
  ]);
  const uniqueCandidates = [
    ...new Map(candidates.map((item) => [item.id, item])).values(),
  ];

  return uniqueCandidates
    .slice(0, 3)
    .map((item) => ({
      href: `/knowledge/${item.slug}`,
      label: item.title,
      summary: item.summary,
    }));
}

function buildRelatedDiscovery(
  items: Array<{ slug: string; summary: string; title: string }>,
): ResultDiscoveryItem[] {
  return items.slice(0, 3).map((item) => ({
    href: `/knowledge/${item.slug}`,
    label: item.title,
    summary: item.summary,
  }));
}

export function buildFiveElementsResultModel(
  analysis: FiveElementsAnalysis,
): ResultModel {
  const knowledge = getFiveElementReportFacts(analysis.element);
  const relatedKnowledge =
    knowledge == null ? [] : buildRelatedDiscovery(knowledge.relatedKnowledge);
  const coreMeaning =
    knowledge?.coreMeaning ??
    `Hành ${analysis.element} được đọc như một lớp tham khảo về khí chất và cách cân bằng môi trường.`;

  return {
    advice: [
      `Công việc: ${knowledge?.tendencies.career[0] ?? analysis.profile.careerHints[0]}`,
      `Tình cảm: ${knowledge?.tendencies.relationship[0] ?? "Ưu tiên giao tiếp rõ ràng và tôn trọng nhịp riêng của mỗi người."}`,
      `Tài chính: ${knowledge?.tendencies.finance[0] ?? "Dùng kết quả như gợi ý để tổ chức nguồn lực, không thay thế kế hoạch tài chính."}`,
    ],
    cautions: [
      `Màu nên tiết chế: ${analysis.profile.unluckyColors.join(", ")}.`,
      `${analysis.element} bị ${analysis.controlledBy} khắc trong hệ tương khắc, nên đọc như lời nhắc về cân bằng thay vì kết luận cố định.`,
    ],
    confidence: knowledge == null ? 72 : 88,
    keyInsight: `Điều Mệnh Việt nhận thấy: hành ${analysis.element} của năm ${analysis.year} nổi bật ở ${coreMeaning}`,
    knowledgeInsight:
      knowledge?.commonMisunderstandings[0] ??
      `Hành ${analysis.element} nên được đọc cùng Nạp Âm, Can Chi và bối cảnh cá nhân để tránh kết luận một chiều.`,
    nextDiscovery: relatedKnowledge,
    shareText: `Mệnh ${analysis.element} - ${analysis.napAm}: ${coreMeaning}`,
    sources: [
      {
        confidence: 90,
        description: "Dùng để xác định hành, màu sắc, số hợp và quan hệ sinh khắc.",
        label: "Ngũ Hành",
      },
      {
        confidence: 82,
        description: "Dùng để đọc nạp âm theo năm sinh trong Astrology Engine hiện có.",
        label: "Nạp Âm",
      },
    ],
    strengths: [
      ...(knowledge?.strengths.slice(0, 3) ?? [analysis.profile.personalitySummary]),
      `Màu hợp: ${analysis.profile.luckyColors.join(", ")}.`,
      `Số hợp: ${analysis.profile.luckyNumbers.join(", ")}.`,
    ],
    summary: `${analysis.summary} ${coreMeaning}`,
    title: `Mệnh ${analysis.element} - ${analysis.napAm}`,
    why: [
      {
        conclusion: `Năm ${analysis.year} được quy về hành ${analysis.element}.`,
        knowledge: "Dữ liệu năm sinh, Nạp Âm và quan hệ Ngũ Hành.",
        reason: `Astrology Engine xác định Nạp Âm ${analysis.napAm}, sau đó lấy profile hành ${analysis.element}.`,
        rule: "Năm sinh → BirthChart → Element Profile → Result Model.",
      },
    ],
  };
}

export function buildNumerologyResultModel(
  analysis: NumerologyAnalysis,
): ResultModel {
  return {
    advice: [
      `Phát triển: ${analysis.lifePathProfile.growthDirections[0]}`,
      `Tình yêu: ${analysis.lifePathProfile.love}`,
      `Công việc: ${analysis.lifePathProfile.work}`,
    ],
    cautions: analysis.lifePathProfile.weaknesses,
    confidence: analysis.nameBreakdown.isMvpVietnameseName ? 74 : 82,
    keyInsight: `Điều Mệnh Việt nhận thấy: số chủ đạo ${analysis.lifePathNumber} là trục chính, còn số thái độ ${analysis.attitudeNumber} gợi ý cách bạn phản ứng ban đầu với môi trường.`,
    knowledgeInsight:
      "Các con số trong thần số học nên được đọc như trục phản tư; họ tên tiếng Việt đã được chuẩn hóa ở mức tham khảo công khai.",
    nextDiscovery: buildKnowledgeDiscovery("ngũ hành"),
    shareText: `${analysis.fullName}: số chủ đạo ${analysis.lifePathNumber}, số thái độ ${analysis.attitudeNumber}.`,
    sources: [
      {
        confidence: 74,
        description: "Dùng ngày sinh và họ tên đã chuẩn hóa để tính các con số nền tảng.",
        label: "Thần số học",
      },
    ],
    strengths: analysis.lifePathProfile.strengths,
    summary: analysis.summary,
    title: `Thần số học của ${analysis.fullName}`,
    why: [
      {
        conclusion: `Số chủ đạo ${analysis.lifePathNumber} là kết quả chính của ngày sinh.`,
        knowledge: "Ngày sinh và bảng quy đổi thần số học.",
        reason: "Ngày, tháng, năm sinh được cộng và rút gọn về số lõi.",
        rule: "Birth date → Life Path Number → Numerology Profile.",
      },
      {
        conclusion: "Phần tên tiếng Việt là bản tham khảo công khai.",
        knowledge: "Họ tên sau khi bỏ dấu và quy đổi chữ cái Latin.",
        reason: analysis.mvpNote,
        rule: "Vietnamese name normalization → Letter values → Soul/Destiny numbers.",
      },
    ],
  };
}

export function buildCompatibilityResultModel(
  result: CompatibilityResult,
): ResultModel {
  const strongestAxis =
    [...result.breakdown].sort((a, b) => b.score / b.maxScore - a.score / a.maxScore)[0];

  return {
    advice: result.practicalSuggestions,
    cautions: result.frictionPoints,
    confidence: 78,
    keyInsight: `Điều Mệnh Việt nhận thấy: tổng điểm ${result.totalScore}/100 nằm ở mức ${result.rating}; trục nổi bật nhất hiện là ${strongestAxis.label}.`,
    knowledgeInsight:
      "Điểm hợp tuổi không chỉ đến từ tổng điểm; từng trục như Cung Phi, Địa Chi, Ngũ Hành và Thiên Can có vai trò riêng trong mô hình hiện tại.",
    nextDiscovery: buildKnowledgeDiscovery("ngũ hành"),
    shareText: `${result.male.fullName} & ${result.female.fullName}: ${result.totalScore}/100 - ${result.rating}.`,
    sources: [
      { confidence: 82, description: "Đọc nhóm mệnh và hướng tham khảo.", label: "Cung Phi" },
      { confidence: 80, description: "Đọc nhịp tương hợp năm sinh.", label: "Địa Chi" },
      { confidence: 78, description: "Đọc quan hệ hành giữa hai hồ sơ.", label: "Ngũ Hành" },
      { confidence: 72, description: "Đọc lớp thiên can năm sinh.", label: "Thiên Can" },
    ],
    strengths: result.strengths,
    summary: result.summary,
    title: "Kết quả hợp tuổi",
    why: result.breakdown.map((item) => ({
      conclusion: `${item.label}: ${item.score}/${item.maxScore}.`,
      knowledge: `Nguồn ${item.label}.`,
      reason: item.explanation,
      rule: `${item.label} score weight trong mô hình hợp tuổi tham khảo.`,
    })),
  };
}

export function buildGoodDayResultModel(result: GoodDayAnalysis): ResultModel {
  return {
    advice: [
      result.advice,
      "Kiểm tra lịch trình, giấy tờ, ngân sách, người chịu trách nhiệm và phương án dự phòng trước khi thực hiện.",
    ],
    cautions: result.badActivities,
    confidence: 70,
    keyInsight: `Điều Mệnh Việt nhận thấy: ngày này đạt ${result.score}/100 cho mục đích ${result.purpose}, thuộc mức ${result.rating}.`,
    knowledgeInsight:
      "Bản xem ngày hiện dùng mô hình rule-based tham khảo, vì vậy cùng ngày và cùng mục đích được tính theo một quy tắc ổn định thay vì thay đổi ngẫu nhiên.",
    nextDiscovery: buildKnowledgeDiscovery("ngũ hành"),
    shareText: `${result.purpose}: ${result.score}/100 - ${result.rating}.`,
    sources: [
      {
        confidence: 70,
        description: "Điểm được tính ổn định từ ngày, mục đích và bộ quy tắc tham khảo.",
        label: "Good Day Rule-based",
      },
    ],
    strengths: [
      `Việc nên làm: ${result.goodActivities.join(", ")}.`,
      `Giờ gợi ý: ${result.luckyHours.join(", ")}.`,
      `Hướng gợi ý: ${result.goodDirections.join(", ")}.`,
    ],
    summary: result.advice,
    title: `Ngày ${result.rating} cho ${result.purpose}`,
    why: [
      {
        conclusion: `Điểm ngày ${result.score}/100.`,
        knowledge: "Ngày cần xem, mục đích và bảng guidance theo mục đích.",
        reason: "Cùng ngày và cùng mục đích luôn cho kết quả giống nhau, không dùng random.",
        rule: "Date + Purpose → deterministic score → rating/advice.",
      },
    ],
  };
}
