import { ASTROLOGY_DISCLAIMER } from "../constants";
import { getCanChiByYear } from "./can-chi";
import { getCungPhi } from "./cung-phi";
import { getElementProfile } from "./elements";
import type { BirthChartInput, BirthChartOutput, FiveElement } from "./types";

interface NapAmRecord {
  element: FiveElement;
  napAm: string;
}

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

const NAP_AM_BY_CAN_CHI: Record<string, NapAmRecord> = {
  "Canh Dần": { element: "Mộc", napAm: "Tùng Bách Mộc" },
  "Tân Mão": { element: "Mộc", napAm: "Tùng Bách Mộc" },
  "Nhâm Thìn": { element: "Thủy", napAm: "Trường Lưu Thủy" },
  "Quý Tỵ": { element: "Thủy", napAm: "Trường Lưu Thủy" },
  "Giáp Ngọ": { element: "Kim", napAm: "Sa Trung Kim" },
  "Ất Mùi": { element: "Kim", napAm: "Sa Trung Kim" },
  "Bính Thân": { element: "Hỏa", napAm: "Sơn Hạ Hỏa" },
  "Đinh Dậu": { element: "Hỏa", napAm: "Sơn Hạ Hỏa" },
  "Mậu Tuất": { element: "Mộc", napAm: "Bình Địa Mộc" },
  "Kỷ Hợi": { element: "Mộc", napAm: "Bình Địa Mộc" },
  "Canh Tý": { element: "Thổ", napAm: "Bích Thượng Thổ" },
  "Tân Sửu": { element: "Thổ", napAm: "Bích Thượng Thổ" },
  "Nhâm Dần": { element: "Kim", napAm: "Kim Bạch Kim" },
  "Quý Mão": { element: "Kim", napAm: "Kim Bạch Kim" },
  "Giáp Thìn": { element: "Hỏa", napAm: "Phú Đăng Hỏa" },
  "Ất Tỵ": { element: "Hỏa", napAm: "Phú Đăng Hỏa" },
  "Bính Ngọ": { element: "Thủy", napAm: "Thiên Hà Thủy" },
  "Đinh Mùi": { element: "Thủy", napAm: "Thiên Hà Thủy" },
  "Mậu Thân": { element: "Thổ", napAm: "Đại Trạch Thổ" },
  "Kỷ Dậu": { element: "Thổ", napAm: "Đại Trạch Thổ" },
  "Canh Tuất": { element: "Kim", napAm: "Thoa Xuyến Kim" },
  "Tân Hợi": { element: "Kim", napAm: "Thoa Xuyến Kim" },
  "Nhâm Tý": { element: "Mộc", napAm: "Tang Đố Mộc" },
  "Quý Sửu": { element: "Mộc", napAm: "Tang Đố Mộc" },
  "Giáp Dần": { element: "Thủy", napAm: "Đại Khê Thủy" },
  "Ất Mão": { element: "Thủy", napAm: "Đại Khê Thủy" },
  "Bính Thìn": { element: "Thổ", napAm: "Sa Trung Thổ" },
  "Đinh Tỵ": { element: "Thổ", napAm: "Sa Trung Thổ" },
  "Mậu Ngọ": { element: "Hỏa", napAm: "Thiên Thượng Hỏa" },
  "Kỷ Mùi": { element: "Hỏa", napAm: "Thiên Thượng Hỏa" },
  "Canh Thân": { element: "Mộc", napAm: "Thạch Lựu Mộc" },
  "Tân Dậu": { element: "Mộc", napAm: "Thạch Lựu Mộc" },
  "Nhâm Tuất": { element: "Thủy", napAm: "Đại Hải Thủy" },
  "Quý Hợi": { element: "Thủy", napAm: "Đại Hải Thủy" },
  "Giáp Tý": { element: "Kim", napAm: "Hải Trung Kim" },
  "Ất Sửu": { element: "Kim", napAm: "Hải Trung Kim" },
  "Bính Dần": { element: "Hỏa", napAm: "Lư Trung Hỏa" },
  "Đinh Mão": { element: "Hỏa", napAm: "Lư Trung Hỏa" },
  "Mậu Thìn": { element: "Mộc", napAm: "Đại Lâm Mộc" },
  "Kỷ Tỵ": { element: "Mộc", napAm: "Đại Lâm Mộc" },
  "Canh Ngọ": { element: "Thổ", napAm: "Lộ Bàng Thổ" },
  "Tân Mùi": { element: "Thổ", napAm: "Lộ Bàng Thổ" },
  "Nhâm Thân": { element: "Kim", napAm: "Kiếm Phong Kim" },
  "Quý Dậu": { element: "Kim", napAm: "Kiếm Phong Kim" },
  "Giáp Tuất": { element: "Hỏa", napAm: "Sơn Đầu Hỏa" },
  "Ất Hợi": { element: "Hỏa", napAm: "Sơn Đầu Hỏa" },
  "Bính Tý": { element: "Thủy", napAm: "Giản Hạ Thủy" },
  "Đinh Sửu": { element: "Thủy", napAm: "Giản Hạ Thủy" },
  "Mậu Dần": { element: "Thổ", napAm: "Thành Đầu Thổ" },
  "Kỷ Mão": { element: "Thổ", napAm: "Thành Đầu Thổ" },
  "Canh Thìn": { element: "Kim", napAm: "Bạch Lạp Kim" },
  "Tân Tỵ": { element: "Kim", napAm: "Bạch Lạp Kim" },
};

export function generateBirthChart(input: BirthChartInput): BirthChartOutput {
  const birthDate =
    input.birthDate instanceof Date ? input.birthDate : new Date(input.birthDate);

  if (Number.isNaN(birthDate.getTime())) {
    throw new Error("Invalid birthDate.");
  }

  const year = birthDate.getFullYear();
  const canChi = getCanChiByYear(year);
  const canChiKey = `${canChi.heavenlyStem} ${canChi.earthlyBranch}`;
  const fallbackElement = STEM_ELEMENT_MAP[canChi.heavenlyStem] ?? "Thổ";
  const napAmRecord = NAP_AM_BY_CAN_CHI[canChiKey] ?? {
    element: fallbackElement,
    napAm: `${fallbackElement} theo Can năm sinh`,
  };
  const elementProfile = getElementProfile(napAmRecord.element);
  const cungPhiProfile = getCungPhi(year, input.gender);
  const lifePalace =
    input.birthTime != null && input.birthTime.trim().length > 0
      ? `Tham khảo theo giờ sinh ${input.birthTime}`
      : undefined;

  return {
    heavenlyStem: canChi.heavenlyStem,
    earthlyBranch: canChi.earthlyBranch,
    zodiacAnimal: canChi.zodiacAnimal,
    element: napAmRecord.element,
    napAm: napAmRecord.napAm,
    cungPhi: cungPhiProfile.cungPhi,
    cungPhiGroup: cungPhiProfile.group,
    lifePalace,
    luckyColors: elementProfile.luckyColors,
    unluckyColors: elementProfile.unluckyColors,
    luckyNumbers: elementProfile.luckyNumbers,
    goodDirections: cungPhiProfile.goodDirections,
    badDirections: cungPhiProfile.badDirections,
    summary: buildSummary({
      fullName: input.fullName,
      canChiKey,
      cungPhi: cungPhiProfile.cungPhi,
      element: napAmRecord.element,
      goodDirections: cungPhiProfile.goodDirections,
      luckyColors: elementProfile.luckyColors,
      napAm: napAmRecord.napAm,
    }),
  };
}

function buildSummary({
  fullName,
  canChiKey,
  cungPhi,
  element,
  goodDirections,
  luckyColors,
  napAm,
}: {
  fullName: string;
  canChiKey: string;
  cungPhi: string;
  element: FiveElement;
  goodDirections: string[];
  luckyColors: string[];
  napAm: string;
}) {
  const namePrefix = fullName.trim().length > 0 ? `${fullName.trim()} có` : "Hồ sơ có";

  return [
    `${namePrefix} năm sinh ${canChiKey}, thuộc hệ con giáp tương ứng theo Can Chi năm.`,
    `Ngũ hành đang tham chiếu nạp âm ${napAm}, quy về hành ${element}.`,
    `Cung Phi được xác định là ${cungPhi}, dùng để gợi ý nhóm hướng trong phong thủy ứng dụng.`,
    `Màu gợi ý gồm ${luckyColors.slice(0, 3).join(", ")}; hướng nên ưu tiên gồm ${goodDirections.slice(0, 3).join(", ")}.`,
    ASTROLOGY_DISCLAIMER,
  ].join(" ");
}
