export interface ResultWhyItem {
  conclusion: string;
  knowledge: string;
  reason: string;
  rule: string;
}

export interface ResultSourceItem {
  confidence: number;
  description: string;
  label: string;
}

export interface ResultDiscoveryItem {
  href: string;
  label: string;
  summary?: string;
}

export interface ResultModel {
  advice: string[];
  cautions: string[];
  confidence: number;
  keyInsight: string;
  knowledgeInsight?: string;
  nextDiscovery: ResultDiscoveryItem[];
  shareText: string;
  sources: ResultSourceItem[];
  strengths: string[];
  summary: string;
  title: string;
  why: ResultWhyItem[];
}
