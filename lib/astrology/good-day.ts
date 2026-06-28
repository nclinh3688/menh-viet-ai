import { ASTROLOGY_DISCLAIMER } from "../constants";

export const GOOD_DAY_PURPOSES = [
  "Cưới hỏi",
  "Khai trương",
  "Ký hợp đồng",
  "Mua xe",
  "Mua nhà",
  "Xuất hành",
  "Động thổ",
  "Nhập trạch",
  "Công việc chung",
] as const;

export type GoodDayPurpose = (typeof GOOD_DAY_PURPOSES)[number];

export interface GoodDayInput {
  date: string;
  purpose: string;
}

export interface GoodDayAnalysis {
  advice: string;
  badActivities: string[];
  disclaimer: string;
  goodActivities: string[];
  goodDirections: string[];
  luckyHours: string[];
  purpose: string;
  rating: string;
  score: number;
}

const PURPOSE_GUIDANCE: Record<
  GoodDayPurpose,
  {
    avoid: string[];
    good: string[];
    scoreBias: number;
  }
> = {
  "Cưới hỏi": {
    avoid: ["Tranh luận chuyện sính lễ vào phút chót", "Chốt quyết định khi hai bên gia đình đang căng thẳng"],
    good: ["Bàn chuyện gia đình", "Lên kế hoạch nghi lễ", "Thống nhất ngân sách cưới"],
    scoreBias: 5,
  },
  "Khai trương": {
    avoid: ["Mở rộng quá nhiều hạng mục cùng lúc", "Ký cam kết vượt năng lực vận hành"],
    good: ["Ra mắt sản phẩm", "Gặp đối tác", "Chuẩn bị truyền thông"],
    scoreBias: 7,
  },
  "Ký hợp đồng": {
    avoid: ["Ký khi chưa rà điều khoản", "Bỏ qua phụ lục và cam kết thanh toán"],
    good: ["Đàm phán điều khoản", "Rà soát pháp lý", "Chốt phạm vi công việc"],
    scoreBias: 4,
  },
  "Mua xe": {
    avoid: ["Quyết định chỉ vì khuyến mãi", "Bỏ qua kiểm tra giấy tờ và chi phí vận hành"],
    good: ["So sánh lựa chọn", "Kiểm tra xe", "Chuẩn bị tài chính"],
    scoreBias: 2,
  },
  "Mua nhà": {
    avoid: ["Đặt cọc khi chưa kiểm tra pháp lý", "Vay vượt khả năng dòng tiền"],
    good: ["Khảo sát khu vực", "Rà pháp lý", "Tính ngân sách dài hạn"],
    scoreBias: 3,
  },
  "Xuất hành": {
    avoid: ["Đi khi lịch trình chưa rõ", "Mang quá nhiều việc chưa chuẩn bị"],
    good: ["Khởi hành việc quan trọng", "Gặp gỡ đối tác", "Sắp xếp lịch trình"],
    scoreBias: 6,
  },
  "Động thổ": {
    avoid: ["Thi công khi hồ sơ chưa rõ", "Bỏ qua an toàn công trường"],
    good: ["Khởi công", "Kiểm tra mặt bằng", "Thống nhất kế hoạch thi công"],
    scoreBias: 1,
  },
  "Nhập trạch": {
    avoid: ["Chuyển nhà quá vội", "Bỏ qua vệ sinh, ánh sáng và thông gió"],
    good: ["Dọn vào nhà mới", "Sắp xếp không gian sống", "Ổn định nếp sinh hoạt"],
    scoreBias: 5,
  },
  "Công việc chung": {
    avoid: ["Ôm quá nhiều việc trong một ngày", "Quyết định khi thiếu dữ liệu"],
    good: ["Lập kế hoạch", "Họp nhóm", "Hoàn thiện việc đang dang dở"],
    scoreBias: 0,
  },
};

const LUCKY_HOURS = [
  "05:00-07:00",
  "07:00-09:00",
  "09:00-11:00",
  "11:00-13:00",
  "13:00-15:00",
  "15:00-17:00",
  "17:00-19:00",
  "19:00-21:00",
];

const GOOD_DIRECTIONS = [
  "Đông",
  "Đông Nam",
  "Nam",
  "Tây Nam",
  "Tây",
  "Tây Bắc",
  "Bắc",
  "Đông Bắc",
];

export function analyzeGoodDay(input: GoodDayInput): GoodDayAnalysis {
  const date = new Date(input.date);

  if (input.date.trim().length === 0 || Number.isNaN(date.getTime())) {
    throw new Error("Vui lòng chọn ngày cần xem.");
  }

  if (!isGoodDayPurpose(input.purpose)) {
    throw new Error("Vui lòng chọn mục đích hợp lệ.");
  }

  const seed = buildSeed(input.date, input.purpose);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const guidance = PURPOSE_GUIDANCE[input.purpose];
  const rawScore =
    46 +
    ((day * 3 + month * 5 + year + seed + guidance.scoreBias) % 48) +
    getWeekendAdjustment(date, input.purpose);
  const score = clamp(rawScore, 32, 96);

  return {
    advice: buildAdvice(score, input.purpose),
    badActivities: guidance.avoid,
    disclaimer: ASTROLOGY_DISCLAIMER,
    goodActivities: guidance.good,
    goodDirections: pickItems(GOOD_DIRECTIONS, seed + month, 3),
    luckyHours: pickItems(LUCKY_HOURS, seed + day, 3),
    purpose: input.purpose,
    rating: getRating(score),
    score,
  };
}

function isGoodDayPurpose(value: string): value is GoodDayPurpose {
  return (GOOD_DAY_PURPOSES as readonly string[]).includes(value);
}

function buildSeed(date: string, purpose: string) {
  return `${date}:${purpose}`.split("").reduce((sum, char, index) => {
    return sum + char.charCodeAt(0) * (index + 1);
  }, 0);
}

function pickItems(items: string[], seed: number, count: number) {
  const startIndex = seed % items.length;

  return Array.from({ length: count }, (_, index) => {
    return items[(startIndex + index * 2) % items.length];
  });
}

function getWeekendAdjustment(date: Date, purpose: GoodDayPurpose) {
  const dayOfWeek = date.getDay();

  if (purpose === "Cưới hỏi" || purpose === "Nhập trạch") {
    return dayOfWeek === 0 || dayOfWeek === 6 ? 5 : 0;
  }

  if (purpose === "Ký hợp đồng" || purpose === "Công việc chung") {
    return dayOfWeek === 0 || dayOfWeek === 6 ? -4 : 3;
  }

  return 0;
}

function getRating(score: number) {
  if (score >= 85) return "Rất tốt";
  if (score >= 70) return "Khá tốt";
  if (score >= 50) return "Trung bình";
  return "Nên cân nhắc";
}

function buildAdvice(score: number, purpose: GoodDayPurpose) {
  if (score >= 85) {
    return `Ngày này khá thuận cho ${purpose.toLowerCase()}, nhưng vẫn nên chuẩn bị checklist, ngân sách và người chịu trách nhiệm rõ ràng.`;
  }

  if (score >= 70) {
    return `Có thể triển khai ${purpose.toLowerCase()} nếu kế hoạch đã sẵn sàng; nên giữ thêm phương án dự phòng cho thời gian và nhân sự.`;
  }

  if (score >= 50) {
    return `Ngày ở mức trung bình cho ${purpose.toLowerCase()}, phù hợp để chuẩn bị, rà soát và làm các bước ít rủi ro trước.`;
  }

  return `Nên cân nhắc kỹ trước khi làm việc lớn về ${purpose.toLowerCase()}; nếu vẫn cần tiến hành, hãy giảm phạm vi và kiểm tra lại các điều kiện thực tế.`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
