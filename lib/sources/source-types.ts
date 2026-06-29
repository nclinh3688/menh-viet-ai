export type SourceId =
  | "BAT_TRACH"
  | "CAN_CHI"
  | "CUNG_PHI"
  | "DAILY_FORTUNE_RULE_BASED"
  | "DIA_CHI"
  | "FIVE_ELEMENTS"
  | "GOOD_DAY_RULE_BASED"
  | "NAP_AM"
  | "NUMEROLOGY"
  | "THIEN_CAN";

export type SourceCategory =
  | "astrology"
  | "compatibility"
  | "rule-based"
  | "feng-shui"
  | "numerology";

export type SourceConfidence = number;

export interface SourceReference {
  label: string;
  path?: string;
}

export interface SourceItem {
  category: SourceCategory;
  confidence: SourceConfidence;
  description: string;
  id: SourceId;
  name: string;
  notes: string;
  references: SourceReference[];
  relatedDomains: string[];
}
