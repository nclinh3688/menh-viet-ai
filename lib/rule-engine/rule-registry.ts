import type { Rule } from "./rule-types";

export const ruleRegistry: Rule[] = [
  {
    confidence: 88,
    conditions: [{ field: "birthChart.element", operator: "equals", value: "Hỏa" }],
    domain: "CAREER",
    id: "career.fire.leadership",
    name: "Hỏa ưu tiên vai trò dẫn dắt",
    outputFacts: [
      {
        code: "STRONG_FIRE",
        domain: "PERSONALITY",
        metadata: { element: "Hỏa" },
      },
      {
        code: "CAREER_LEADERSHIP",
        domain: "CAREER",
        metadata: { suggestedTrack: "leadership" },
      },
    ],
    priority: 80,
    source: {
      primary: "Ngũ Hành",
      references: ["/lib/astrology/elements.ts"],
    },
    weight: 40,
  },
  {
    confidence: 84,
    conditions: [{ field: "birthChart.element", operator: "equals", value: "Mộc" }],
    domain: "CAREER",
    id: "career.wood.growth",
    name: "Mộc ưu tiên phát triển và kết nối",
    outputFacts: [
      {
        code: "WOOD_GROWTH",
        domain: "PERSONALITY",
        metadata: { element: "Mộc" },
      },
      {
        code: "CREATIVE_GROWTH",
        domain: "CAREER",
        metadata: { suggestedTrack: "growth" },
      },
    ],
    priority: 78,
    source: {
      primary: "Ngũ Hành",
      references: ["/lib/astrology/elements.ts"],
    },
    weight: 40,
  },
  {
    confidence: 82,
    conditions: [{ field: "birthChart.element", operator: "equals", value: "Thổ" }],
    domain: "CAREER",
    id: "career.earth.operations",
    name: "Thổ ưu tiên vận hành ổn định",
    outputFacts: [
      {
        code: "BALANCED_EARTH",
        domain: "PERSONALITY",
        metadata: { element: "Thổ" },
      },
      {
        code: "CAREER_OPERATIONS",
        domain: "CAREER",
        metadata: { suggestedTrack: "operations" },
      },
    ],
    priority: 78,
    source: {
      primary: "Ngũ Hành",
      references: ["/lib/astrology/elements.ts"],
    },
    weight: 40,
  },
  {
    confidence: 78,
    conditions: [
      { field: "birthChart.heavenlyStem", operator: "exists" },
      { field: "birthChart.earthlyBranch", operator: "exists" },
    ],
    domain: "PERSONALITY",
    id: "personality.can-chi.baseline",
    name: "Can Chi tạo dữ liệu nền",
    outputFacts: [
      {
        code: "PRACTICAL_STABILITY",
        domain: "PERSONALITY",
        metadata: { layer: "can-chi" },
      },
    ],
    priority: 60,
    source: {
      primary: "Can Chi",
      references: ["/lib/astrology/can-chi.ts"],
    },
    weight: 25,
  },
  {
    confidence: 76,
    conditions: [{ field: "birthChart.cungPhi", operator: "exists" }],
    domain: "FINANCE",
    id: "finance.cung-phi.directional-support",
    name: "Cung Phi bổ trợ định hướng tài chính",
    outputFacts: [
      {
        code: "GOOD_FINANCE",
        domain: "FINANCE",
        metadata: { layer: "cung-phi" },
      },
    ],
    priority: 55,
    source: {
      primary: "Cung Phi",
      references: ["/lib/astrology/cung-phi.ts"],
    },
    weight: 20,
  },
  {
    confidence: 74,
    conditions: [{ field: "numerology.lifePathNumber", operator: "in", value: ["1", "8"] }],
    domain: "CAREER",
    id: "career.numerology.strategy",
    name: "Thần số học bổ trợ chiến lược",
    outputFacts: [
      {
        code: "CAREER_STRATEGY",
        domain: "CAREER",
        metadata: { layer: "numerology" },
      },
    ],
    priority: 42,
    source: {
      primary: "Thần số học",
      references: ["/lib/numerology/profiles.ts"],
    },
    weight: 15,
  },
  {
    confidence: 72,
    conditions: [{ field: "numerology.lifePathNumber", operator: "in", value: ["2", "6"] }],
    domain: "LOVE",
    id: "love.numerology.relationship-stability",
    name: "Thần số học bổ trợ quan hệ ổn định",
    outputFacts: [
      {
        code: "STABLE_RELATIONSHIP",
        domain: "LOVE",
        metadata: { layer: "numerology" },
      },
    ],
    priority: 40,
    source: {
      primary: "Thần số học",
      references: ["/lib/numerology/profiles.ts"],
    },
    weight: 15,
  },
  {
    confidence: 72,
    conditions: [{ field: "birthChart.element", operator: "equals", value: "Thủy" }],
    domain: "CAREER",
    id: "career.water.communication",
    name: "Thủy ưu tiên giao tiếp và thích nghi",
    outputFacts: [
      {
        code: "COMMUNICATION_STRENGTH",
        domain: "CAREER",
        metadata: { element: "Thủy" },
      },
    ],
    priority: 76,
    source: {
      primary: "Ngũ Hành",
      references: ["/lib/astrology/elements.ts"],
    },
    weight: 40,
  },
  {
    confidence: 72,
    conditions: [{ field: "birthChart.element", operator: "equals", value: "Kim" }],
    domain: "CAREER",
    id: "career.metal.management",
    name: "Kim ưu tiên quản trị và cấu trúc",
    outputFacts: [
      {
        code: "CAREER_MANAGEMENT",
        domain: "CAREER",
        metadata: { element: "Kim" },
      },
    ],
    priority: 76,
    source: {
      primary: "Ngũ Hành",
      references: ["/lib/astrology/elements.ts"],
    },
    weight: 40,
  },
];
