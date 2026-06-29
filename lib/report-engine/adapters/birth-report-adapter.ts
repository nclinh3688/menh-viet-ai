import type { BirthChart, Profile } from "@prisma/client";
import { renderSectionNarrative } from "@/lib/narrative/section-template-registry";
import { renderReportModel } from "@/lib/report-engine/report-renderer";
import type { ReportRenderModel, ReportSourceItem } from "@/lib/report-engine/report-schema";
import { runRuleEngine } from "@/lib/rule-engine/rule-runner";
import type { Fact, FactCode, KnowledgeInput, RuleEngineOutput } from "@/lib/rule-engine/rule-types";
import { formatSourceLabel } from "@/lib/sources/source-resolver";

interface DailyScoreInput {
  dateKey?: string;
  financeScore?: number;
  loveScore?: number;
  mentalScore?: number;
  totalScore?: number;
  workScore?: number;
}

interface BuildBirthReportInput {
  birthChart: BirthChart;
  dailyScore?: DailyScoreInput;
  profile: Profile;
}

interface BirthReportContext {
  canChiLabel: string;
  dailyScoreText: string;
  directionsText: string;
  elementLabel: string;
  factLabels: string[];
  strongestFacts: Fact[];
}

interface BirthReportDepthSections {
  career: string[];
  finance: string[];
  health: string[];
  personality: string[];
  practicalAdvice: string[];
  relationship: string[];
  sourceExplanations: ReportSourceItem[];
}

const factLabels: Record<FactCode, string> = {
  BALANCED_EARTH: "nền tảng ổn định",
  CAREER_LEADERSHIP: "khuynh hướng dẫn dắt",
  CAREER_MANAGEMENT: "tư duy quản trị",
  CAREER_OPERATIONS: "năng lực vận hành",
  CAREER_STRATEGY: "định hướng chiến lược",
  COMMUNICATION_STRENGTH: "khả năng giao tiếp",
  CREATIVE_GROWTH: "năng lượng phát triển",
  GOOD_FINANCE: "tổ chức nguồn lực",
  PRACTICAL_STABILITY: "tính thực tế",
  STABLE_RELATIONSHIP: "sự hài hòa trong quan hệ",
  STRONG_FIRE: "năng lượng chủ động",
  WOOD_GROWTH: "xu hướng mở rộng",
};

function parseStringList(value: string) {
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function joinReadable(items: string[], fallback: string) {
  if (items.length === 0) {
    return fallback;
  }

  if (items.length === 1) {
    return items[0];
  }

  return `${items.slice(0, -1).join(", ")} và ${items.at(-1)}`;
}

function buildContext(
  input: BuildBirthReportInput,
  output: RuleEngineOutput,
): BirthReportContext {
  const strongestFacts = [...output.facts]
    .sort((a, b) => b.weight + b.confidence - (a.weight + a.confidence))
    .slice(0, 3);
  const goodDirections = parseStringList(input.birthChart.goodDirections);

  return {
    canChiLabel: `${input.birthChart.heavenlyStem} ${input.birthChart.earthlyBranch}`,
    dailyScoreText:
      input.dailyScore?.totalScore == null
        ? "điểm ngày chưa có trong payload"
        : `điểm ngày ${input.dailyScore.totalScore}/100`,
    directionsText: joinReadable(goodDirections, "nhóm hướng tham khảo từ Cung Phi"),
    elementLabel: `${input.birthChart.element} - ${input.birthChart.napAm}`,
    factLabels: strongestFacts.map((fact) => factLabels[fact.code]),
    strongestFacts,
  };
}

function buildBirthKnowledge({
  birthChart,
  profile,
}: BuildBirthReportInput): KnowledgeInput {
  return {
    birthChart: {
      cungPhi: birthChart.cungPhi,
      earthlyBranch: birthChart.earthlyBranch,
      element: birthChart.element,
      heavenlyStem: birthChart.heavenlyStem,
      zodiacAnimal: birthChart.zodiacAnimal,
    },
    profile: {
      gender: profile.gender,
      mainInterest: profile.mainInterest,
    },
  };
}

function applyNarrative(
  report: ReportRenderModel,
  output: RuleEngineOutput,
  context: BirthReportContext,
) {
  const baseContext = {
    facts: output.facts,
    recommendations: output.recommendations,
    scores: output.scores,
  };
  const overview = renderSectionNarrative("OVERVIEW", {
    ...baseContext,
    section: "OVERVIEW",
  });
  const strengths = renderSectionNarrative("STRENGTHS", {
    ...baseContext,
    section: "STRENGTHS",
  });
  const career = renderSectionNarrative("CAREER", {
    ...baseContext,
    section: "CAREER",
  });
  const finance = renderSectionNarrative("FINANCE", {
    ...baseContext,
    section: "FINANCE",
  });
  const relationship = renderSectionNarrative("RELATIONSHIP", {
    ...baseContext,
    section: "RELATIONSHIP",
  });
  const health = renderSectionNarrative("HEALTH", {
    ...baseContext,
    section: "HEALTH",
  });
  const recommendations = renderSectionNarrative("RECOMMENDATIONS", {
    ...baseContext,
    section: "RECOMMENDATIONS",
  });

  return {
    ...report,
    career: {
      ...report.career,
      description: `${career.body} Điều Mệnh Việt nhận thấy: phần công việc nổi bật ở ${joinReadable(
        context.factLabels,
        "các fact đã khớp",
      )}. Vì sao: Rule Engine ưu tiên fact có weight và confidence cao từ ${context.elementLabel}. Gợi ý áp dụng: chọn một vai trò nhỏ để kiểm chứng cách bạn ra quyết định, phối hợp và duy trì nhịp làm việc.`,
    },
    cautions: {
      ...report.cautions,
      description: `Điều Mệnh Việt nhận thấy: các điểm cần lưu ý nên được đọc như vùng tự quan sát. Vì sao: hồ sơ đang kết hợp ${context.canChiLabel}, ${context.elementLabel} và Cung Phi ${report.rawData.facts.find((fact) => fact.code === "GOOD_FINANCE") == null ? "chưa tạo fact tài chính riêng" : "có fact tổ chức nguồn lực"}. Gợi ý áp dụng: ghi lại tình huống khiến bạn phản ứng nhanh, rồi chọn cách phản hồi chậm hơn một nhịp.`,
      items:
        report.cautions.items.length > 0
          ? [
              `Điều Mệnh Việt nhận thấy: ${report.cautions.items[0]}`,
              `Vì sao: dữ liệu hiện có chỉ phản ánh hệ quy chiếu tham khảo, chưa bao gồm bối cảnh sống, giáo dục và trải nghiệm cá nhân.`,
              "Gợi ý áp dụng: dùng kết quả như checklist tự quan sát trong 7 ngày, không dùng như nhãn cố định.",
            ]
          : report.cautions.items,
    },
    finance: {
      ...report.finance,
      description: `${finance.body} Điều Mệnh Việt nhận thấy: tài chính trong report này nghiêng về cách tổ chức nguồn lực hơn là dự báo tiền bạc. Vì sao: source Cung Phi và các fact liên quan chỉ đóng vai trò lớp tham khảo. Gợi ý áp dụng: chia mục tiêu thành ngắn hạn, trung hạn và khoản dự phòng trước khi ra quyết định lớn.`,
    },
    health: {
      ...report.health,
      description: `${health.body} Điều Mệnh Việt nhận thấy: phần sức khỏe chỉ nên dùng để nhắc về nhịp sống và khả năng tự quan sát. Vì sao: report không có dữ liệu y tế, chỉ có ${context.dailyScoreText} và dữ liệu hồ sơ. Gợi ý áp dụng: ưu tiên giấc ngủ, vận động nhẹ và hỏi chuyên môn khi có dấu hiệu bất thường.`,
    },
    keyInsight: {
      ...report.keyInsight,
      body: buildSignatureInsight(report, context),
    },
    overview: {
      ...report.overview,
      description: `${overview.body} Điều Mệnh Việt nhận thấy: hồ sơ đang xoay quanh ${context.canChiLabel}, hành ${context.elementLabel} và Cung Phi ${report.rawData.facts.some((fact) => fact.code === "GOOD_FINANCE") ? "có vai trò bổ trợ trong phần nguồn lực" : "được dùng làm dữ liệu hướng tham khảo"}. Vì sao: các kết luận chỉ lấy từ BirthChart, Rule Engine facts và ${context.dailyScoreText}. Gợi ý áp dụng: đọc trước insight nổi bật, sau đó đối chiếu từng section với trải nghiệm thực tế của bạn.`,
    },
    recommendations: {
      ...report.recommendations,
      description: `${recommendations.body} Điều Mệnh Việt nhận thấy: gợi ý tốt nhất là nhóm hành động nhỏ, dễ kiểm chứng. Vì sao: recommendations được map trực tiếp từ fact, không thêm dữ liệu ngoài nguồn. Gợi ý áp dụng: chọn 1 việc trong danh sách và thử trong tuần này.`,
    },
    relationship: {
      ...report.relationship,
      description: `${relationship.body} Điều Mệnh Việt nhận thấy: tình cảm nên được đọc qua cách giao tiếp, kỳ vọng và nhịp kết nối. Vì sao: report dùng fact quan hệ nếu có, kết hợp nền Can Chi như dữ liệu tham khảo. Gợi ý áp dụng: nói rõ nhu cầu, ranh giới và cách hỗ trợ nhau trong tình huống cụ thể.`,
    },
    strengths: {
      ...report.strengths,
      description: `${strengths.body} Điều Mệnh Việt nhận thấy: điểm mạnh đáng chú ý nằm ở ${joinReadable(
        context.factLabels,
        "các xu hướng đã khớp",
      )}. Vì sao: đây là các fact có weight nổi bật trong Rule Engine. Gợi ý áp dụng: chọn môi trường cho phép bạn dùng điểm mạnh này theo cách đo được, ví dụ một dự án nhỏ hoặc một thói quen mới.`,
    },
  } satisfies ReportRenderModel;
}

function buildSignatureInsight(
  report: ReportRenderModel,
  context: BirthReportContext,
) {
  if (context.strongestFacts.length === 0) {
    return report.keyInsight.body;
  }

  const strongestLabels = joinReadable(context.factLabels, "các fact nổi bật");

  return `Điều nổi bật của bạn nằm ở sự kết hợp giữa ${context.elementLabel}, Can Chi ${context.canChiLabel} và ${strongestLabels}. Vì sao: đây là các tín hiệu có weight cao trong Rule Engine, được tạo từ BirthChart và nguồn đã đăng ký. Gợi ý áp dụng: dùng insight này để chọn môi trường, nhịp làm việc và cách giao tiếp phù hợp hơn với dữ liệu hiện có. Nội dung chỉ mang tính tham khảo và khám phá bản thân.`;
}

function buildSourceExplanations(
  report: ReportRenderModel,
  input: BuildBirthReportInput,
): ReportSourceItem[] {
  return report.sources.map((source) => ({
    ...source,
    explanation: `Nguồn ${formatSourceLabel(source.primary)} được dùng để tạo fact ${source.factCode ?? "không xác định"} từ dữ liệu ${input.birthChart.heavenlyStem} ${input.birthChart.earthlyBranch}, hành ${input.birthChart.element}, Nạp âm ${input.birthChart.napAm} và Cung Phi ${input.birthChart.cungPhi}. Lý do: source này có liên hệ trực tiếp với rule đã khớp, confidence ${source.confidence}%.`,
  }));
}

function buildDepthSections(
  report: ReportRenderModel,
  input: BuildBirthReportInput,
  context: BirthReportContext,
): BirthReportDepthSections {
  const luckyColors = parseStringList(input.birthChart.luckyColors);
  const luckyNumbers = parseStringList(input.birthChart.luckyNumbers);
  const colorsText = joinReadable(luckyColors, "nhóm màu hợp từ Ngũ Hành");
  const numbersText = joinReadable(luckyNumbers, "nhóm số hợp từ Ngũ Hành");
  const personality = [
    `Điều Mệnh Việt nhận thấy: ${context.canChiLabel}, hành ${input.birthChart.element} và Nạp âm ${input.birthChart.napAm} tạo lớp dữ liệu chính cho phần con người.`,
    `Vì sao: source ${formatSourceLabel("CAN_CHI")}, ${formatSourceLabel("FIVE_ELEMENTS")} và ${formatSourceLabel("NAP_AM")} đều đến từ BirthChart đã lưu.`,
    `Gợi ý áp dụng: quan sát lúc bạn có nhiều năng lượng nhất trong ngày, rồi đối chiếu với ${context.dailyScoreText}.`,
  ];

  return {
    career: [
    ...report.career.items,
    `Điều Mệnh Việt nhận thấy: hành ${input.birthChart.element} và ${joinReadable(
      context.factLabels,
      "các fact nghề nghiệp",
    )} gợi ý cách làm việc nên có nhịp rõ ràng.`,
    `Vì sao: các rule đang dùng BirthChart, source ${formatSourceLabel("FIVE_ELEMENTS")} và fact career đã khớp.`,
    "Gợi ý áp dụng: chọn một mục tiêu nhỏ, xác định người phối hợp và đặt tiêu chí hoàn thành có thể quan sát.",
    ],
    finance: [
    ...report.finance.items,
    `Điều Mệnh Việt nhận thấy: Cung Phi ${input.birthChart.cungPhi} và ${context.directionsText} phù hợp để nhắc về cách tổ chức không gian, ưu tiên và nguồn lực.`,
    `Vì sao: source ${formatSourceLabel("CUNG_PHI")} đóng vai trò bổ trợ, không thay thế kế hoạch tài chính thực tế.`,
    "Gợi ý áp dụng: ghi ba nhóm chi tiêu chính, đặt giới hạn mềm và xem lại vào cuối tuần.",
    ],
    health: [
      ...report.health.items,
      `Điều Mệnh Việt nhận thấy: ${context.dailyScoreText} chỉ là tín hiệu ngày để tự quan sát năng lượng.`,
      "Vì sao: report không dùng dữ liệu y tế, nên phần này chỉ nhắc về nhịp sống.",
      "Gợi ý áp dụng: theo dõi ngủ nghỉ, vận động và mức căng thẳng bằng ghi chú ngắn mỗi ngày.",
    ],
    personality,
    practicalAdvice: [
      ...report.recommendations.items,
      ...personality,
      `Dùng màu ${colorsText} như một gợi ý thẩm mỹ hoặc nhắc nhớ cá nhân.`,
      `Dùng số ${numbersText} như tín hiệu biểu tượng, không thay thế quyết định thực tế.`,
      `Ưu tiên hướng ${context.directionsText} khi bố trí góc làm việc nếu điều kiện không gian phù hợp.`,
    ],
    relationship: [
    ...report.relationship.items,
    `Điều Mệnh Việt nhận thấy: Can Chi ${context.canChiLabel} tạo lớp dữ liệu nền để tự quan sát cách bạn phản hồi trong quan hệ.`,
    `Vì sao: source ${formatSourceLabel("CAN_CHI")} chỉ mô tả hệ quy chiếu năm sinh, còn chất lượng quan hệ phụ thuộc giao tiếp và lựa chọn hằng ngày.`,
    "Gợi ý áp dụng: khi có khác biệt, nói rõ nhu cầu bằng một ví dụ cụ thể thay vì kết luận về tính cách.",
    ],
    sourceExplanations: buildSourceExplanations(report, input),
  };
}

function deepenReportSections(
  report: ReportRenderModel,
  input: BuildBirthReportInput,
  context: BirthReportContext,
) {
  const depthSections = buildDepthSections(report, input, context);

  return {
    ...report,
    career: { ...report.career, items: depthSections.career },
    finance: { ...report.finance, items: depthSections.finance },
    recommendations: {
      ...report.recommendations,
      items: depthSections.practicalAdvice,
    },
    relationship: { ...report.relationship, items: depthSections.relationship },
    health: { ...report.health, items: depthSections.health },
    sources: depthSections.sourceExplanations,
    strengths: {
      ...report.strengths,
      items: [...report.strengths.items, ...depthSections.personality],
    },
  } satisfies ReportRenderModel;
}

export function buildBirthReport(
  input: BuildBirthReportInput,
): ReportRenderModel {
  const knowledge = buildBirthKnowledge(input);
  const ruleOutput = runRuleEngine(knowledge);
  const report = renderReportModel(ruleOutput);
  const context = buildContext(input, ruleOutput);
  const dailyScoreText =
    input.dailyScore?.totalScore == null
      ? "Chưa có điểm ngày trong payload báo cáo."
      : `Điểm hôm nay ${input.dailyScore.totalScore}/100, dùng như một tín hiệu tham khảo trong ngày.`;

  const narratedReport = applyNarrative(
    {
      ...report,
      interpretation: {
        body: `${report.interpretation.body} ${dailyScoreText}`,
        title: "Mệnh Việt luận giải",
      },
      keyInsight: {
        body: report.keyInsight.body,
        title: "Mệnh Việt nhận thấy điều nổi bật nhất ở bạn là...",
      },
      overview: {
        ...report.overview,
        title: `Báo cáo vận mệnh cá nhân của ${input.profile.fullName}`,
      },
      rawData: {
        ...report.rawData,
        facts: report.rawData.facts,
      },
    },
    ruleOutput,
    context,
  );

  return deepenReportSections(narratedReport, input, context);
}
