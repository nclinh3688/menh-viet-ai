import type { AstrologyGender, CungPhiGroup, CungPhiProfile } from "./types";

const EAST_GROUP_DIRECTIONS = ["Đông", "Đông Nam", "Nam", "Bắc"] as const;
const WEST_GROUP_DIRECTIONS = ["Tây", "Tây Bắc", "Tây Nam", "Đông Bắc"] as const;

const CUNG_GROUP: Record<string, CungPhiGroup> = {
  Khảm: "Đông tứ mệnh",
  Ly: "Đông tứ mệnh",
  Chấn: "Đông tứ mệnh",
  Tốn: "Đông tứ mệnh",
  Càn: "Tây tứ mệnh",
  Đoài: "Tây tứ mệnh",
  Cấn: "Tây tứ mệnh",
  Khôn: "Tây tứ mệnh",
};

const MALE_CUNG_BY_REMAINDER = ["Khôn", "Khảm", "Ly", "Cấn", "Đoài", "Càn", "Khôn", "Tốn", "Chấn"] as const;
const FEMALE_CUNG_BY_REMAINDER = ["Tốn", "Cấn", "Càn", "Đoài", "Cấn", "Ly", "Khảm", "Khôn", "Chấn"] as const;

export function getCungPhi(year: number, gender: AstrologyGender): CungPhiProfile {
  if (!Number.isInteger(year)) {
    throw new Error("Year must be an integer.");
  }

  if (gender === "OTHER") {
    return {
      cungPhi: "Chưa xác định",
      group: "Trung lập",
      goodDirections: ["Ưu tiên hướng phù hợp ánh sáng, thông gió và nhịp sinh hoạt cá nhân"],
      badDirections: ["Tránh không gian bí, thiếu sáng hoặc gây căng thẳng khi sử dụng lâu dài"],
    };
  }

  // MVP dùng cách quy đổi tổng chữ số năm sinh về modulo 9, đủ cho giai đoạn tra cứu cơ bản 1900-2100.
  const digitSum = String(year)
    .split("")
    .reduce((sum, digit) => sum + Number(digit), 0);
  const remainder = digitSum % 9;
  const cungPhi =
    gender === "MALE"
      ? MALE_CUNG_BY_REMAINDER[remainder]
      : FEMALE_CUNG_BY_REMAINDER[remainder];
  const group = CUNG_GROUP[cungPhi];
  const goodDirections =
    group === "Đông tứ mệnh" ? [...EAST_GROUP_DIRECTIONS] : [...WEST_GROUP_DIRECTIONS];
  const badDirections =
    group === "Đông tứ mệnh" ? [...WEST_GROUP_DIRECTIONS] : [...EAST_GROUP_DIRECTIONS];

  return {
    cungPhi,
    group,
    goodDirections,
    badDirections,
  };
}
