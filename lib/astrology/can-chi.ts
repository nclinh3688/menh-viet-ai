import type { CanChiProfile } from "./types";

export const HEAVENLY_STEMS = [
  "Giáp",
  "Ất",
  "Bính",
  "Đinh",
  "Mậu",
  "Kỷ",
  "Canh",
  "Tân",
  "Nhâm",
  "Quý",
] as const;

export const EARTHLY_BRANCHES = [
  "Tý",
  "Sửu",
  "Dần",
  "Mão",
  "Thìn",
  "Tỵ",
  "Ngọ",
  "Mùi",
  "Thân",
  "Dậu",
  "Tuất",
  "Hợi",
] as const;

export const ZODIAC_ANIMALS = [
  "Chuột",
  "Trâu",
  "Hổ",
  "Mèo",
  "Rồng",
  "Rắn",
  "Ngựa",
  "Dê",
  "Khỉ",
  "Gà",
  "Chó",
  "Heo",
] as const;

export function getCanChiByYear(year: number): CanChiProfile {
  if (!Number.isInteger(year)) {
    throw new Error("Year must be an integer.");
  }

  // Hệ Can Chi lặp theo chu kỳ 60 năm; công thức này căn chỉ số về mốc lịch phổ biến.
  const heavenlyStemIndex = (year + 6) % HEAVENLY_STEMS.length;
  const earthlyBranchIndex = (year + 8) % EARTHLY_BRANCHES.length;

  return {
    heavenlyStem: HEAVENLY_STEMS[heavenlyStemIndex],
    earthlyBranch: EARTHLY_BRANCHES[earthlyBranchIndex],
    zodiacAnimal: ZODIAC_ANIMALS[earthlyBranchIndex],
  };
}
