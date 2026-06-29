import { ASTROLOGY_DISCLAIMER } from "../constants";
import { birthDateInputToIsoDate } from "../validations/date-time";
import { NUMEROLOGY_PROFILES } from "./profiles";
import type {
  NumerologyAnalysis,
  NumerologyCoreNumber,
  NumerologyInput,
  NumerologyNameBreakdown,
} from "./types";

const LETTER_VALUES: Record<string, number> = {
  A: 1,
  J: 1,
  S: 1,
  B: 2,
  K: 2,
  T: 2,
  C: 3,
  L: 3,
  U: 3,
  D: 4,
  M: 4,
  V: 4,
  E: 5,
  N: 5,
  W: 5,
  F: 6,
  O: 6,
  X: 6,
  G: 7,
  P: 7,
  Y: 7,
  H: 8,
  Q: 8,
  Z: 8,
  I: 9,
  R: 9,
};

const VOWELS = new Set(["A", "E", "I", "O", "U", "Y"]);
const MASTER_NUMBERS = new Set([11, 22, 33]);

export function analyzeNumerology(input: NumerologyInput): NumerologyAnalysis {
  const fullName = input.fullName.trim();

  if (fullName.length < 2) {
    throw new Error("Vui lòng nhập họ tên đầy đủ hơn.");
  }

  const birthDate = parseBirthDate(input.birthDate);
  const nameBreakdown = analyzeName(fullName);
  const lifePathNumber = reduceToCoreNumber(
    birthDate.year + birthDate.month + birthDate.day,
  );
  const attitudeNumber = reduceToCoreNumber(birthDate.month + birthDate.day);

  return {
    fullName,
    birthDate: input.birthDate,
    lifePathNumber,
    attitudeNumber,
    soulUrgeNumber: nameBreakdown.soulUrgeNumber,
    destinyNumber: nameBreakdown.destinyNumber,
    lifePathProfile: NUMEROLOGY_PROFILES[lifePathNumber],
    attitudeProfile: NUMEROLOGY_PROFILES[attitudeNumber],
    soulUrgeProfile:
      nameBreakdown.soulUrgeNumber == null
        ? null
        : NUMEROLOGY_PROFILES[nameBreakdown.soulUrgeNumber],
    destinyProfile:
      nameBreakdown.destinyNumber == null
        ? null
        : NUMEROLOGY_PROFILES[nameBreakdown.destinyNumber],
    nameBreakdown,
    summary: buildSummary(fullName, lifePathNumber, attitudeNumber),
    mvpNote:
      "Phần số linh hồn và số sứ mệnh đang dùng quy đổi chữ cái Latin sau khi bỏ dấu tiếng Việt, nên chỉ là bản tham khảo.",
  };
}

function parseBirthDate(value: string) {
  const date = new Date(birthDateInputToIsoDate(value));

  if (value.trim().length === 0 || Number.isNaN(date.getTime())) {
    throw new Error("Vui lòng nhập ngày sinh hợp lệ.");
  }

  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}

function analyzeName(fullName: string): NumerologyNameBreakdown {
  const normalizedName = normalizeVietnameseName(fullName);
  const letters = normalizedName.replace(/[^A-Z]/g, "").split("");

  if (letters.length === 0) {
    return {
      normalizedName,
      soulUrgeNumber: null,
      destinyNumber: null,
      isMvpVietnameseName: true,
    };
  }

  const allLetterSum = sumLetters(letters);
  const vowelSum = sumLetters(letters.filter((letter) => VOWELS.has(letter)));

  return {
    normalizedName,
    soulUrgeNumber: vowelSum > 0 ? reduceToCoreNumber(vowelSum) : null,
    destinyNumber: allLetterSum > 0 ? reduceToCoreNumber(allLetterSum) : null,
    isMvpVietnameseName: true,
  };
}

function normalizeVietnameseName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toUpperCase()
    .replace(/\s+/g, " ")
    .trim();
}

function sumLetters(letters: string[]) {
  return letters.reduce((total, letter) => total + (LETTER_VALUES[letter] ?? 0), 0);
}

function reduceToCoreNumber(value: number): NumerologyCoreNumber {
  let current = Math.abs(value);

  while (current > 9 && !MASTER_NUMBERS.has(current)) {
    current = String(current)
      .split("")
      .reduce((total, digit) => total + Number(digit), 0);
  }

  return current as NumerologyCoreNumber;
}

function buildSummary(
  fullName: string,
  lifePathNumber: NumerologyCoreNumber,
  attitudeNumber: NumerologyCoreNumber,
) {
  return [
    `${fullName} có số chủ đạo ${lifePathNumber} và số thái độ ${attitudeNumber} theo cách tính thần số học tham khảo.`,
    "Kết quả nên được dùng như gợi ý phản tư về điểm mạnh, điểm cần rèn và hướng phát triển cá nhân.",
    ASTROLOGY_DISCLAIMER,
  ].join(" ");
}
