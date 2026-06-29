import type { SourceId, SourceItem } from "./source-types";

export const sourceRegistry: Record<SourceId, SourceItem> = {
  BAT_TRACH: {
    category: "feng-shui",
    confidence: 76,
    description:
      "Bát Trạch là hệ quy chiếu phong thủy dùng nhóm Đông/Tây tứ mệnh và hướng.",
    id: "BAT_TRACH",
    name: "Bát Trạch",
    notes:
      "Dùng ở mức tham khảo cho hướng và nhóm mệnh, không thay thế khảo sát phong thủy thực địa.",
    references: [{ label: "Cung Phi engine", path: "/lib/astrology/cung-phi.ts" }],
    relatedDomains: ["directions", "feng-shui", "birth-report"],
  },
  CAN_CHI: {
    category: "astrology",
    confidence: 82,
    description:
      "Can Chi là hệ thống Thiên Can và Địa Chi dùng để mô tả năm sinh trong lịch truyền thống.",
    id: "CAN_CHI",
    name: "Can Chi",
    notes:
      "Đang dùng công thức theo năm dương lịch, chưa xử lý giao tiết khí chi tiết.",
    references: [{ label: "Can Chi engine", path: "/lib/astrology/can-chi.ts" }],
    relatedDomains: ["birth-chart", "personality", "report"],
  },
  CUNG_PHI: {
    category: "feng-shui",
    confidence: 78,
    description:
      "Cung Phi là nguồn dùng để xác định nhóm Đông/Tây tứ mệnh và hướng tham khảo.",
    id: "CUNG_PHI",
    name: "Cung Phi",
    notes:
      "Dùng bảng/logic theo năm sinh và giới tính; gender OTHER trả hướng trung lập.",
    references: [{ label: "Cung Phi engine", path: "/lib/astrology/cung-phi.ts" }],
    relatedDomains: ["directions", "finance", "feng-shui"],
  },
  DAILY_FORTUNE_RULE_BASED: {
    category: "rule-based",
    confidence: 55,
    description:
      "Điểm ngày được tạo ổn định từ ngày hiện tại và profile id.",
    id: "DAILY_FORTUNE_RULE_BASED",
    name: "Daily Fortune rule-based",
    notes:
      "Chỉ dùng để minh họa trải nghiệm hằng ngày, chưa phải thuật toán ngày tốt đầy đủ.",
    references: [{ label: "Daily fortune engine", path: "/lib/astrology/daily-fortune.ts" }],
    relatedDomains: ["daily", "dashboard", "birth-report"],
  },
  DIA_CHI: {
    category: "astrology",
    confidence: 82,
    description:
      "Địa Chi là phần chi trong Can Chi, thường liên quan tới con giáp năm sinh.",
    id: "DIA_CHI",
    name: "Địa Chi",
    notes:
      "Dùng như lớp dữ liệu nền cho năm sinh và hợp tuổi.",
    references: [{ label: "Can Chi engine", path: "/lib/astrology/can-chi.ts" }],
    relatedDomains: ["zodiac", "compatibility", "birth-chart"],
  },
  FIVE_ELEMENTS: {
    category: "astrology",
    confidence: 88,
    description:
      "Ngũ Hành là hệ quy chiếu Kim, Mộc, Thủy, Hỏa, Thổ dùng cho màu, số, nghề và quan hệ sinh khắc.",
    id: "FIVE_ELEMENTS",
    name: "Ngũ Hành",
    notes:
      "Nguồn chính cho các gợi ý màu, số, nghề ở mức hiện tại; cần source registry sâu hơn ở các giai đoạn sau.",
    references: [{ label: "Five elements engine", path: "/lib/astrology/elements.ts" }],
    relatedDomains: ["colors", "career", "personality", "birth-report"],
  },
  GOOD_DAY_RULE_BASED: {
    category: "rule-based",
    confidence: 58,
    description:
      "Xem ngày đẹp dùng điểm ổn định theo ngày và mục đích.",
    id: "GOOD_DAY_RULE_BASED",
    name: "Xem ngày đẹp rule-based",
    notes:
      "Không xử lý âm lịch đầy đủ, thần sát hoặc lịch tiết khí; chỉ dùng trải nghiệm tham khảo.",
    references: [{ label: "Good day engine", path: "/lib/astrology/good-day.ts" }],
    relatedDomains: ["good-day", "planning"],
  },
  NAP_AM: {
    category: "astrology",
    confidence: 72,
    description:
      "Nạp âm là lớp diễn giải bổ sung theo năm sinh, thường đi kèm Can Chi.",
    id: "NAP_AM",
    name: "Nạp âm",
    notes:
      "Dùng bảng nạp âm giới hạn và fallback; chưa phải bộ tra cứu đầy đủ mọi trường phái.",
    references: [{ label: "Birth chart engine", path: "/lib/astrology/birth-chart.ts" }],
    relatedDomains: ["birth-chart", "personality"],
  },
  NUMEROLOGY: {
    category: "numerology",
    confidence: 68,
    description:
      "Thần số học quy đổi ngày sinh và họ tên để tạo các con số tham khảo.",
    id: "NUMEROLOGY",
    name: "Thần số học",
    notes:
      "Tên tiếng Việt đang xử lý bằng chuẩn hóa chữ Latin, cần kiểm chứng thêm.",
    references: [{ label: "Numerology engine", path: "/lib/numerology" }],
    relatedDomains: ["numerology", "career", "relationship"],
  },
  THIEN_CAN: {
    category: "astrology",
    confidence: 82,
    description:
      "Thiên Can là phần can trong Can Chi, dùng như dữ liệu nền của năm sinh.",
    id: "THIEN_CAN",
    name: "Thiên Can",
    notes:
      "Dùng công thức theo năm dương lịch, chưa xử lý giao tiết khí chi tiết.",
    references: [{ label: "Can Chi engine", path: "/lib/astrology/can-chi.ts" }],
    relatedDomains: ["birth-chart", "compatibility"],
  },
};

export const legacySourceAliases: Record<string, SourceId> = {
  "Bát Trạch": "BAT_TRACH",
  "Can Chi": "CAN_CHI",
  "Cung Phi": "CUNG_PHI",
  "Daily Fortune rule-based": "DAILY_FORTUNE_RULE_BASED",
  "Địa Chi": "DIA_CHI",
  "Ngũ Hành": "FIVE_ELEMENTS",
  "Nạp âm": "NAP_AM",
  "Thần số học": "NUMEROLOGY",
  "Thiên Can": "THIEN_CAN",
  "Xem ngày đẹp rule-based": "GOOD_DAY_RULE_BASED",
};
