import type { ElementProfile, FiveElement } from "./types";

export const FIVE_ELEMENTS = ["Kim", "Mộc", "Thủy", "Hỏa", "Thổ"] as const;

export const GENERATING_CYCLE: Record<FiveElement, FiveElement> = {
  Kim: "Thủy",
  Mộc: "Hỏa",
  Thủy: "Mộc",
  Hỏa: "Thổ",
  Thổ: "Kim",
};

export const CONTROLLING_CYCLE: Record<FiveElement, FiveElement> = {
  Kim: "Mộc",
  Mộc: "Thổ",
  Thủy: "Hỏa",
  Hỏa: "Kim",
  Thổ: "Thủy",
};

const ELEMENT_PROFILES: Record<FiveElement, ElementProfile> = {
  Kim: {
    element: "Kim",
    favorableElements: ["Thổ", "Kim", "Thủy"],
    unfavorableElements: ["Hỏa", "Mộc"],
    luckyColors: ["Trắng", "Xám", "Vàng nhạt", "Nâu đất"],
    unluckyColors: ["Đỏ", "Hồng", "Tím"],
    luckyNumbers: [6, 7, 2, 5, 8],
    personalitySummary:
      "Kim thường được xem như biểu tượng của kỷ luật, sự rõ ràng và khả năng tổ chức.",
    careerHints: ["Quản trị", "Tài chính", "Kỹ thuật", "Pháp lý"],
  },
  Mộc: {
    element: "Mộc",
    favorableElements: ["Thủy", "Mộc", "Hỏa"],
    unfavorableElements: ["Kim", "Thổ"],
    luckyColors: ["Xanh lá", "Xanh ngọc", "Đen", "Xanh dương"],
    unluckyColors: ["Trắng", "Xám", "Vàng kim"],
    luckyNumbers: [3, 4, 1],
    personalitySummary:
      "Mộc thường gợi liên tưởng tới sự phát triển, linh hoạt và khả năng kết nối.",
    careerHints: ["Giáo dục", "Sáng tạo", "Tư vấn", "Sản phẩm"],
  },
  Thủy: {
    element: "Thủy",
    favorableElements: ["Kim", "Thủy", "Mộc"],
    unfavorableElements: ["Thổ", "Hỏa"],
    luckyColors: ["Đen", "Xanh dương", "Trắng", "Xám"],
    unluckyColors: ["Vàng đất", "Nâu", "Đỏ"],
    luckyNumbers: [1, 6, 7],
    personalitySummary:
      "Thủy thường đại diện cho trực giác, giao tiếp và khả năng thích nghi theo bối cảnh.",
    careerHints: ["Truyền thông", "Nghiên cứu", "Thương mại", "Dịch vụ"],
  },
  Hỏa: {
    element: "Hỏa",
    favorableElements: ["Mộc", "Hỏa", "Thổ"],
    unfavorableElements: ["Thủy", "Kim"],
    luckyColors: ["Đỏ", "Hồng", "Tím", "Xanh lá"],
    unluckyColors: ["Đen", "Xanh dương", "Trắng"],
    luckyNumbers: [9, 3, 4],
    personalitySummary:
      "Hỏa thường gắn với năng lượng, sự chủ động và khả năng truyền cảm hứng.",
    careerHints: ["Marketing", "Lãnh đạo nhóm", "Nghệ thuật", "Kinh doanh"],
  },
  Thổ: {
    element: "Thổ",
    favorableElements: ["Hỏa", "Thổ", "Kim"],
    unfavorableElements: ["Mộc", "Thủy"],
    luckyColors: ["Vàng", "Nâu", "Đỏ", "Hồng"],
    unluckyColors: ["Xanh lá", "Đen", "Xanh dương"],
    luckyNumbers: [2, 5, 8, 9],
    personalitySummary:
      "Thổ thường được hiểu như nền tảng của sự ổn định, trách nhiệm và tính bền bỉ.",
    careerHints: ["Vận hành", "Bất động sản", "Nhân sự", "Quản lý dự án"],
  },
};

export function isFiveElement(element: string): element is FiveElement {
  return (FIVE_ELEMENTS as readonly string[]).includes(element);
}

export function getElementProfile(element: string): ElementProfile {
  if (!isFiveElement(element)) {
    throw new Error(`Unsupported element: ${element}`);
  }

  return ELEMENT_PROFILES[element];
}
