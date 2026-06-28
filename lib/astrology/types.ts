export type AstrologyGender = "MALE" | "FEMALE" | "OTHER";

export type FiveElement = "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ";

export type CungPhiGroup = "Đông tứ mệnh" | "Tây tứ mệnh" | "Trung lập";

export interface CanChiProfile {
  heavenlyStem: string;
  earthlyBranch: string;
  zodiacAnimal: string;
}

export interface ElementProfile {
  element: FiveElement;
  favorableElements: FiveElement[];
  unfavorableElements: FiveElement[];
  luckyColors: string[];
  unluckyColors: string[];
  luckyNumbers: number[];
  personalitySummary: string;
  careerHints: string[];
}

export interface CungPhiProfile {
  cungPhi: string;
  group: CungPhiGroup;
  goodDirections: string[];
  badDirections: string[];
}

export interface BirthChartInput {
  fullName: string;
  birthDate: Date | string;
  birthTime?: string;
  gender: AstrologyGender;
}

export interface BirthChartOutput {
  heavenlyStem: string;
  earthlyBranch: string;
  zodiacAnimal: string;
  element: FiveElement;
  napAm: string;
  cungPhi: string;
  cungPhiGroup: CungPhiGroup;
  lifePalace?: string;
  luckyColors: string[];
  unluckyColors: string[];
  luckyNumbers: number[];
  goodDirections: string[];
  badDirections: string[];
  summary: string;
}
