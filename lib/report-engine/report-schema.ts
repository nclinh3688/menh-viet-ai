import type { Fact, FactCode, Recommendation, RuleSource, Score } from "@/lib/rule-engine/rule-types";
import type { SourceId } from "@/lib/sources/source-types";

export interface ReportTextBlock {
  body: string;
  title: string;
}

export interface ReportListSection {
  description: string;
  items: string[];
  title: string;
}

export interface ReportSourceItem {
  confidence: number;
  explanation: string;
  factCode?: FactCode;
  primary: SourceId;
  references: string[];
  secondary: SourceId[];
}

export interface ReportWhyItem {
  confidence: number;
  factCode: FactCode;
  reason: string[];
  rules: string[];
  sources: RuleSource[];
}

export interface ReportDiscoveryItem {
  href: string;
  label: string;
}

export interface ReportSchema {
  career: ReportListSection;
  cautions: ReportListSection;
  disclaimer: string;
  finance: ReportListSection;
  health: ReportListSection;
  interpretation: ReportTextBlock;
  keyInsight: ReportTextBlock;
  nextDiscovery: ReportDiscoveryItem[];
  overview: {
    confidence: number;
    description: string;
    facts: Fact[];
    scores: Score[];
    title: string;
  };
  rawData: {
    facts: Fact[];
    recommendations: Recommendation[];
    scores: Score[];
  };
  recommendations: ReportListSection;
  relationship: ReportListSection;
  sources: ReportSourceItem[];
  strengths: ReportListSection;
  why: ReportWhyItem[];
}

export interface ReportRenderModel extends ReportSchema {
  anchors: Array<{
    href: string;
    label: string;
  }>;
}
