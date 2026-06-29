import type { Fact, Rule } from "./rule-types";

const factReasonTemplates: Record<string, string> = {
  BALANCED_EARTH:
    "Dữ liệu Ngũ Hành gợi ý xu hướng ổn định, trách nhiệm và ưu tiên nền tảng.",
  CAREER_LEADERSHIP:
    "Hành Hỏa trong dữ liệu hiện có thường gắn với năng lượng chủ động và khả năng truyền cảm hứng.",
  CAREER_MANAGEMENT:
    "Hành Kim thường được dùng để mô tả tính cấu trúc, kỷ luật và năng lực quản trị.",
  CAREER_OPERATIONS:
    "Hành Thổ thường gợi ý khả năng giữ nhịp, vận hành và xây nền ổn định.",
  CAREER_STRATEGY:
    "Dữ liệu Thần số học bổ trợ cho xu hướng tư duy mục tiêu và định hướng chiến lược.",
  COMMUNICATION_STRENGTH:
    "Hành Thủy thường liên quan tới giao tiếp, thích nghi và đọc bối cảnh.",
  CREATIVE_GROWTH:
    "Hành Mộc thường gắn với phát triển, kết nối và mở rộng ý tưởng.",
  GOOD_FINANCE:
    "Cung Phi được dùng như lớp dữ liệu bổ trợ khi xem xét hướng ưu tiên và cách tổ chức nguồn lực.",
  PRACTICAL_STABILITY:
    "Can Chi cung cấp dữ liệu nền để đọc các chủ đề ổn định trong hồ sơ.",
  STABLE_RELATIONSHIP:
    "Dữ liệu Thần số học bổ trợ cho xu hướng coi trọng sự hài hòa trong quan hệ.",
  STRONG_FIRE:
    "Hành Hỏa là dữ liệu nổi bật trong hồ sơ và được ghi nhận như một fact nền.",
  WOOD_GROWTH:
    "Hành Mộc là dữ liệu nổi bật trong hồ sơ và được ghi nhận như một fact nền.",
};

export function buildReason(fact: Fact, rules: Rule[]): string[] {
  const ruleNames = rules
    .filter((rule) => fact.ruleIds.includes(rule.id))
    .map((rule) => rule.name);
  const template =
    factReasonTemplates[fact.code] ??
    "Fact này được tạo từ rule đã khớp với dữ liệu đầu vào.";

  return [
    template,
    `Rule áp dụng: ${ruleNames.join(", ") || "Không xác định"}.`,
  ];
}

export function buildReasons(facts: Fact[], rules: Rule[]) {
  return facts.reduce<Record<string, string[]>>((accumulator, fact) => {
    accumulator[fact.code] = buildReason(fact, rules);
    return accumulator;
  }, {});
}
