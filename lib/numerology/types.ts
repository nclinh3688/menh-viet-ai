export type NumerologyCoreNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 11 | 22 | 33;

export interface NumerologyInput {
  fullName: string;
  birthDate: string;
}

export interface NumerologyProfile {
  number: NumerologyCoreNumber;
  title: string;
  strengths: string[];
  weaknesses: string[];
  growthDirections: string[];
  love: string;
  work: string;
}

export interface NumerologyNameBreakdown {
  normalizedName: string;
  soulUrgeNumber: NumerologyCoreNumber | null;
  destinyNumber: NumerologyCoreNumber | null;
  isMvpVietnameseName: boolean;
}

export interface NumerologyAnalysis {
  fullName: string;
  birthDate: string;
  lifePathNumber: NumerologyCoreNumber;
  attitudeNumber: NumerologyCoreNumber;
  soulUrgeNumber: NumerologyCoreNumber | null;
  destinyNumber: NumerologyCoreNumber | null;
  lifePathProfile: NumerologyProfile;
  attitudeProfile: NumerologyProfile;
  soulUrgeProfile: NumerologyProfile | null;
  destinyProfile: NumerologyProfile | null;
  nameBreakdown: NumerologyNameBreakdown;
  summary: string;
  mvpNote: string;
}
