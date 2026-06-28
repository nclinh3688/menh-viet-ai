import { ASTROLOGY_DISCLAIMER } from "../constants";
import { generateBirthChart } from "./birth-chart";
import { GENERATING_CYCLE, getElementProfile, CONTROLLING_CYCLE } from "./elements";
import type { ElementProfile, FiveElement } from "./types";

export interface FiveElementsAnalysisInput {
  birthDate?: string;
  birthYear?: string | number;
}

export interface FiveElementsAnalysis {
  year: number;
  element: FiveElement;
  napAm: string;
  profile: ElementProfile;
  generates: FiveElement;
  generatedBy: FiveElement;
  controls: FiveElement;
  controlledBy: FiveElement;
  summary: string;
}

const MIN_SUPPORTED_YEAR = 1900;
const MAX_SUPPORTED_YEAR = 2100;

export function analyzeFiveElements(
  input: FiveElementsAnalysisInput,
): FiveElementsAnalysis {
  const year = resolveBirthYear(input);
  const chart = generateBirthChart({
    birthDate: `${year}-01-01`,
    fullName: "",
    gender: "OTHER",
  });
  const profile = getElementProfile(chart.element);

  return {
    year,
    element: chart.element,
    napAm: chart.napAm,
    profile,
    generates: GENERATING_CYCLE[chart.element],
    generatedBy: findCycleSource(GENERATING_CYCLE, chart.element),
    controls: CONTROLLING_CYCLE[chart.element],
    controlledBy: findCycleSource(CONTROLLING_CYCLE, chart.element),
    summary: [
      `Theo năm sinh ${year}, hệ quy chiếu MVP đang xác định nạp âm là ${chart.napAm}, quy về hành ${chart.element}.`,
      `Các gợi ý màu sắc, số và nghề nghiệp dưới đây dùng để tham khảo khuynh hướng cá nhân, không phải kết luận cố định.`,
      ASTROLOGY_DISCLAIMER,
    ].join(" "),
  };
}

function resolveBirthYear(input: FiveElementsAnalysisInput): number {
  if (input.birthDate != null && input.birthDate.trim().length > 0) {
    const date = new Date(input.birthDate);

    if (Number.isNaN(date.getTime())) {
      throw new Error("Ngày sinh không hợp lệ.");
    }

    return validateYear(date.getFullYear());
  }

  const parsedYear = Number(input.birthYear);

  if (!Number.isInteger(parsedYear)) {
    throw new Error("Vui lòng nhập năm sinh hợp lệ.");
  }

  return validateYear(parsedYear);
}

function validateYear(year: number) {
  if (year < MIN_SUPPORTED_YEAR || year > MAX_SUPPORTED_YEAR) {
    throw new Error(`Năm sinh nên nằm trong khoảng ${MIN_SUPPORTED_YEAR}-${MAX_SUPPORTED_YEAR}.`);
  }

  return year;
}

function findCycleSource(
  cycle: Record<FiveElement, FiveElement>,
  target: FiveElement,
): FiveElement {
  const entry = Object.entries(cycle).find(([, value]) => value === target);

  if (entry == null) {
    throw new Error(`Không tìm thấy quan hệ ngũ hành cho ${target}.`);
  }

  return entry[0] as FiveElement;
}
