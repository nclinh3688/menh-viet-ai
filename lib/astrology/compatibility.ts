import { ASTROLOGY_DISCLAIMER } from "../constants";
import { normalizeBirthTimeInput } from "../validations/date-time";
import { getCanChiByYear } from "./can-chi";
import { CONTROLLING_CYCLE, GENERATING_CYCLE } from "./elements";
import { generateBirthChart } from "./birth-chart";
import type { FiveElement } from "./types";

export type CompatibilityCalendarType = "SOLAR" | "LUNAR";

export interface CompatibilityPersonInput {
  birthDate: string;
  birthTime?: string;
  calendarType: CompatibilityCalendarType;
  fullName?: string;
}

export interface CompatibilityInput {
  female: CompatibilityPersonInput;
  male: CompatibilityPersonInput;
}

export interface CompatibilityPersonProfile {
  birthYear: number;
  calendarType: CompatibilityCalendarType;
  canChi: string;
  cungPhi: string;
  cungPhiGroup: string;
  earthlyBranch: string;
  element: FiveElement;
  fullName: string;
  heavenlyStem: string;
  napAm: string;
  zodiacAnimal: string;
}

export interface CompatibilityScoreBreakdown {
  explanation: string;
  key: "cungPhi" | "diaChi" | "nguHanh" | "thienCan" | "other";
  label: string;
  maxScore: number;
  score: number;
}

export interface CompatibilityResult {
  breakdown: CompatibilityScoreBreakdown[];
  disclaimer: string;
  female: CompatibilityPersonProfile;
  frictionPoints: string[];
  male: CompatibilityPersonProfile;
  practicalSuggestions: string[];
  rating: string;
  strengths: string[];
  summary: string;
  totalScore: number;
}

const EARTHLY_BRANCH_GROUPS = [
  ["Thân", "Tý", "Thìn"],
  ["Dần", "Ngọ", "Tuất"],
  ["Hợi", "Mão", "Mùi"],
  ["Tỵ", "Dậu", "Sửu"],
];

const EARTHLY_BRANCH_PAIRS = [
  ["Tý", "Sửu"],
  ["Dần", "Hợi"],
  ["Mão", "Tuất"],
  ["Thìn", "Dậu"],
  ["Tỵ", "Thân"],
  ["Ngọ", "Mùi"],
];

const EARTHLY_BRANCH_CONFLICTS = [
  ["Tý", "Ngọ"],
  ["Sửu", "Mùi"],
  ["Dần", "Thân"],
  ["Mão", "Dậu"],
  ["Thìn", "Tuất"],
  ["Tỵ", "Hợi"],
];

const STEM_ELEMENT_MAP: Record<string, FiveElement> = {
  Giáp: "Mộc",
  Ất: "Mộc",
  Bính: "Hỏa",
  Đinh: "Hỏa",
  Mậu: "Thổ",
  Kỷ: "Thổ",
  Canh: "Kim",
  Tân: "Kim",
  Nhâm: "Thủy",
  Quý: "Thủy",
};

export function analyzeCompatibility(input: CompatibilityInput): CompatibilityResult {
  const male = buildPersonProfile(input.male, "Nam");
  const female = buildPersonProfile(input.female, "Nữ");
  const breakdown = [
    scoreCungPhi(male, female),
    scoreDiaChi(male, female),
    scoreNguHanh(male, female),
    scoreThienCan(male, female),
    scoreOther(input, male, female),
  ];
  const totalScore = breakdown.reduce((sum, item) => sum + item.score, 0);
  const rating = getRating(totalScore);

  return {
    breakdown,
    disclaimer: ASTROLOGY_DISCLAIMER,
    female,
    frictionPoints: buildFrictionPoints(breakdown, male, female),
    male,
    practicalSuggestions: buildPracticalSuggestions(breakdown),
    rating,
    strengths: buildStrengths(breakdown, male, female),
    summary: buildSummary(totalScore, rating, male, female),
    totalScore,
  };
}

function buildPersonProfile(
  input: CompatibilityPersonInput,
  fallbackName: "Nam" | "Nữ",
): CompatibilityPersonProfile {
  const birthDate = new Date(input.birthDate);

  if (Number.isNaN(birthDate.getTime())) {
    throw new Error(`Ngày sinh của ${fallbackName.toLowerCase()} không hợp lệ.`);
  }

  const birthYear = birthDate.getFullYear();
  const gender = fallbackName === "Nam" ? "MALE" : "FEMALE";
  const chart = generateBirthChart({
    birthDate: input.birthDate,
    birthTime: normalizeOptionalTime(input.birthTime),
    fullName: input.fullName?.trim() ?? fallbackName,
    gender,
  });
  const canChi = getCanChiByYear(birthYear);

  return {
    birthYear,
    calendarType: input.calendarType,
    canChi: `${canChi.heavenlyStem} ${canChi.earthlyBranch}`,
    cungPhi: chart.cungPhi,
    cungPhiGroup: chart.cungPhiGroup,
    earthlyBranch: canChi.earthlyBranch,
    element: chart.element,
    fullName: input.fullName?.trim() || fallbackName,
    heavenlyStem: canChi.heavenlyStem,
    napAm: chart.napAm,
    zodiacAnimal: canChi.zodiacAnimal,
  };
}

function scoreCungPhi(
  male: CompatibilityPersonProfile,
  female: CompatibilityPersonProfile,
): CompatibilityScoreBreakdown {
  if (male.cungPhi === female.cungPhi) {
    return buildScore("cungPhi", "Cung Phi", 35, 35, "Hai người cùng Cung Phi, dễ có chung cảm nhận về không gian sống và cách tổ chức gia đình.");
  }

  if (male.cungPhiGroup === female.cungPhiGroup) {
    return buildScore("cungPhi", "Cung Phi", 35, 30, "Hai người cùng nhóm Đông/Tây tứ mệnh, thuận hơn khi bàn về hướng nhà, phòng ngủ hoặc không gian sinh hoạt.");
  }

  return buildScore("cungPhi", "Cung Phi", 35, 18, "Hai người khác nhóm Cung Phi, nên ưu tiên thỏa thuận thực tế về nhà cửa, ánh sáng và nhịp sinh hoạt thay vì áp đặt một hướng duy nhất.");
}

function scoreDiaChi(
  male: CompatibilityPersonProfile,
  female: CompatibilityPersonProfile,
): CompatibilityScoreBreakdown {
  const pair = [male.earthlyBranch, female.earthlyBranch];

  if (isPairIn(pair, EARTHLY_BRANCH_PAIRS)) {
    return buildScore("diaChi", "Địa Chi", 25, 25, "Địa Chi thuộc nhóm lục hợp, thường được xem là dễ bổ trợ về nhịp sống và sự phối hợp.");
  }

  if (isSameGroup(pair, EARTHLY_BRANCH_GROUPS)) {
    return buildScore("diaChi", "Địa Chi", 25, 22, "Địa Chi nằm trong nhóm tam hợp, có điểm chung về cách hành động và mục tiêu dài hạn.");
  }

  if (male.earthlyBranch === female.earthlyBranch) {
    return buildScore("diaChi", "Địa Chi", 25, 18, "Hai người cùng Địa Chi, dễ hiểu nhau nhưng cũng có thể giống nhau ở một số phản ứng cảm xúc.");
  }

  if (isPairIn(pair, EARTHLY_BRANCH_CONFLICTS)) {
    return buildScore("diaChi", "Địa Chi", 25, 9, "Địa Chi thuộc nhóm xung trong hệ quy chiếu truyền thống, nên chú ý cách trao đổi khi bất đồng.");
  }

  return buildScore("diaChi", "Địa Chi", 25, 15, "Địa Chi ở mức trung tính, kết quả phụ thuộc nhiều vào giao tiếp, thói quen và hoàn cảnh sống.");
}

function scoreNguHanh(
  male: CompatibilityPersonProfile,
  female: CompatibilityPersonProfile,
): CompatibilityScoreBreakdown {
  const relation = getElementRelation(male.element, female.element);

  if (relation === "same") {
    return buildScore("nguHanh", "Ngũ Hành", 20, 16, "Hai người cùng hành, dễ đồng cảm về một số giá trị nhưng cần tránh phản ứng quá giống nhau.");
  }

  if (relation === "generating") {
    return buildScore("nguHanh", "Ngũ Hành", 20, 20, "Ngũ Hành có quan hệ tương sinh, thuận cho việc hỗ trợ và nâng đỡ nhau trong đời sống.");
  }

  if (relation === "controlled") {
    return buildScore("nguHanh", "Ngũ Hành", 20, 9, "Ngũ Hành có quan hệ tiết chế, nên đặt ranh giới và phân vai rõ để giảm cảm giác bị áp lực.");
  }

  return buildScore("nguHanh", "Ngũ Hành", 20, 13, "Ngũ Hành ở mức trung tính, có thể cân bằng bằng thói quen sống và cách phối hợp thực tế.");
}

function scoreThienCan(
  male: CompatibilityPersonProfile,
  female: CompatibilityPersonProfile,
): CompatibilityScoreBreakdown {
  const maleElement = STEM_ELEMENT_MAP[male.heavenlyStem];
  const femaleElement = STEM_ELEMENT_MAP[female.heavenlyStem];

  if (male.heavenlyStem === female.heavenlyStem) {
    return buildScore("thienCan", "Thiên Can", 10, 8, "Thiên Can giống nhau, dễ có chung cách nhìn nhưng cần linh hoạt khi cùng bảo vệ quan điểm.");
  }

  if (getElementRelation(maleElement, femaleElement) === "generating") {
    return buildScore("thienCan", "Thiên Can", 10, 10, "Thiên Can quy đổi Ngũ Hành có xu hướng tương sinh, hỗ trợ tốt cho cách ra quyết định.");
  }

  if (getElementRelation(maleElement, femaleElement) === "controlled") {
    return buildScore("thienCan", "Thiên Can", 10, 4, "Thiên Can có yếu tố tiết chế, nên trao đổi rõ kỳ vọng trước các quyết định lớn.");
  }

  return buildScore("thienCan", "Thiên Can", 10, 6, "Thiên Can ở mức cân bằng, không tạo lợi thế hay thách thức quá nổi bật trong MVP.");
}

function scoreOther(
  input: CompatibilityInput,
  male: CompatibilityPersonProfile,
  female: CompatibilityPersonProfile,
): CompatibilityScoreBreakdown {
  let score = 6;
  const explanations = ["Mục khác đánh giá bổ sung theo độ chênh năm sinh, dữ liệu giờ sinh và loại lịch nhập vào."];
  const ageGap = Math.abs(male.birthYear - female.birthYear);

  if (ageGap <= 6) {
    score += 2;
    explanations.push("Độ chênh năm sinh vừa phải, thường dễ đồng bộ bối cảnh sống hơn.");
  } else if (ageGap >= 12) {
    explanations.push("Độ chênh năm sinh lớn, nên chú ý khác biệt thế hệ và kỳ vọng sống.");
  } else {
    score += 1;
  }

  if (normalizeOptionalTime(input.male.birthTime) && normalizeOptionalTime(input.female.birthTime)) {
    score += 1;
    explanations.push("Cả hai có giờ sinh, thuận lợi cho các phân tích sâu hơn ở sprint sau.");
  }

  if (male.calendarType === female.calendarType) {
    score += 1;
  }

  return buildScore("other", "Khác", 10, Math.min(score, 10), explanations.join(" "));
}

function normalizeOptionalTime(value: string | undefined) {
  const normalizedValue = normalizeBirthTimeInput(value ?? "");

  return normalizedValue.length > 0 ? normalizedValue : undefined;
}

function buildScore(
  key: CompatibilityScoreBreakdown["key"],
  label: string,
  maxScore: number,
  score: number,
  explanation: string,
): CompatibilityScoreBreakdown {
  return { explanation, key, label, maxScore, score };
}

function getRating(totalScore: number) {
  if (totalScore >= 85) return "Rất hợp";
  if (totalScore >= 70) return "Khá hợp";
  if (totalScore >= 50) return "Trung bình";
  return "Cần cân nhắc";
}

function getElementRelation(first: FiveElement, second: FiveElement) {
  if (first === second) return "same";
  if (GENERATING_CYCLE[first] === second || GENERATING_CYCLE[second] === first) {
    return "generating";
  }
  if (CONTROLLING_CYCLE[first] === second || CONTROLLING_CYCLE[second] === first) {
    return "controlled";
  }
  return "neutral";
}

function isPairIn(pair: string[], groups: string[][]) {
  return groups.some((group) => pair.every((item) => group.includes(item)));
}

function isSameGroup(pair: string[], groups: string[][]) {
  return groups.some((group) => pair.every((item) => group.includes(item)));
}

function buildSummary(
  totalScore: number,
  rating: string,
  male: CompatibilityPersonProfile,
  female: CompatibilityPersonProfile,
) {
  return [
    `${male.fullName} và ${female.fullName} đạt ${totalScore}/100, xếp loại ${rating} theo mô hình hợp tuổi MVP.`,
    `Kết quả đang dựa trên Cung Phi, Địa Chi, Ngũ Hành, Thiên Can và một nhóm yếu tố bổ sung.`,
    "Nên xem đây là gợi ý để hiểu nhau và cải thiện giao tiếp, không phải kết luận bắt buộc về hôn nhân.",
    ASTROLOGY_DISCLAIMER,
  ].join(" ");
}

function buildStrengths(
  breakdown: CompatibilityScoreBreakdown[],
  male: CompatibilityPersonProfile,
  female: CompatibilityPersonProfile,
) {
  const strengths = breakdown
    .filter((item) => item.score / item.maxScore >= 0.75)
    .map((item) => `${item.label}: ${item.explanation}`);

  if (strengths.length === 0) {
    strengths.push(
      `${male.fullName} và ${female.fullName} có nhiều yếu tố trung tính, phù hợp để xây dựng bằng giao tiếp và thói quen thực tế.`,
    );
  }

  return strengths.slice(0, 4);
}

function buildFrictionPoints(
  breakdown: CompatibilityScoreBreakdown[],
  male: CompatibilityPersonProfile,
  female: CompatibilityPersonProfile,
) {
  const frictionPoints = breakdown
    .filter((item) => item.score / item.maxScore < 0.55)
    .map((item) => `${item.label}: ${item.explanation}`);

  if (frictionPoints.length === 0) {
    frictionPoints.push(
      `${male.fullName} và ${female.fullName} không có điểm va chạm nổi bật trong mô hình MVP; vẫn nên quan sát cách xử lý áp lực hằng ngày.`,
    );
  }

  return frictionPoints.slice(0, 4);
}

function buildPracticalSuggestions(breakdown: CompatibilityScoreBreakdown[]) {
  const lowScores = breakdown.filter((item) => item.score / item.maxScore < 0.65);
  const suggestions = [
    "Thống nhất cách trao đổi khi bất đồng: nói rõ nhu cầu, tránh quy kết tính cách.",
    "Tách riêng quyết định tình cảm với áp lực gia đình, tài chính hoặc thời điểm.",
    "Dùng kết quả như checklist trò chuyện, không dùng để gây áp lực lên đối phương.",
  ];

  if (lowScores.some((item) => item.key === "cungPhi")) {
    suggestions.push("Với Cung Phi khác nhóm, ưu tiên bố trí không gian sống theo ánh sáng, thông gió và sự thoải mái thực tế của cả hai.");
  }

  if (lowScores.some((item) => item.key === "diaChi" || item.key === "thienCan")) {
    suggestions.push("Khi có khác biệt Can Chi, nên thống nhất quy tắc ra quyết định trước các việc lớn như cưới hỏi, nhà cửa hoặc tài chính.");
  }

  return suggestions.slice(0, 5);
}
