import { getKnowledgeGraph } from "../graph/knowledge-graph";
import { getKnowledgeById } from "../knowledge-search";
import {
  FIVE_ELEMENTS_KNOWLEDGE_SEED,
  FIVE_ELEMENTS_OVERVIEW_KNOWLEDGE_ITEM,
  FIVE_ELEMENTS_OVERVIEW_SEED,
  type FiveElementSeedItem,
} from "./seeds/five-elements.seed";

export type FiveElementInput = "hoa" | "hỏa" | "kim" | "moc" | "mộc" | "tho" | "thổ" | "thuy" | "thủy" | string;

const elementAliases: Record<string, FiveElementSeedItem["element"]> = {
  hoa: "Hỏa",
  hỏa: "Hỏa",
  kim: "Kim",
  moc: "Mộc",
  mộc: "Mộc",
  tho: "Thổ",
  thổ: "Thổ",
  thuy: "Thủy",
  thủy: "Thủy",
};

function normalizeElement(value: string) {
  return value.trim().toLowerCase();
}

export function resolveFiveElementName(
  element: FiveElementInput,
): FiveElementSeedItem["element"] | null {
  const normalized = normalizeElement(element);

  return elementAliases[normalized] ?? null;
}

export function getFiveElementKnowledge(element: FiveElementInput) {
  const elementName = resolveFiveElementName(element);

  if (elementName == null) {
    return null;
  }

  return (
    FIVE_ELEMENTS_KNOWLEDGE_SEED.find((item) => item.element === elementName) ?? null
  );
}

export function getFiveElementOverview() {
  return {
    item: FIVE_ELEMENTS_OVERVIEW_KNOWLEDGE_ITEM,
    seed: FIVE_ELEMENTS_OVERVIEW_SEED,
  };
}

export function getFiveElementRelations(element: FiveElementInput) {
  const knowledge = getFiveElementKnowledge(element);

  if (knowledge == null) {
    return null;
  }

  return {
    controlledBy: knowledge.controlledBy,
    controllingRelation: knowledge.controllingRelation,
    generatedBy: knowledge.generatedBy,
    generatingRelation: knowledge.generatingRelation,
    graph: getKnowledgeGraph(knowledge.id),
  };
}

export function getFiveElementSeoData(element: FiveElementInput) {
  const knowledge = getFiveElementKnowledge(element);

  if (knowledge == null) {
    return null;
  }

  return {
    description: knowledge.summary,
    keywords: knowledge.seoKeywords,
    slug: knowledge.slug,
    title: `Ngũ Hành ${knowledge.name}`,
  };
}

export function getFiveElementReportFacts(element: FiveElementInput) {
  const knowledge = getFiveElementKnowledge(element);

  if (knowledge == null) {
    return null;
  }

  return {
    applications: knowledge.applications,
    colors: {
      cautious: knowledge.cautiousColors,
      favorable: knowledge.favorableColors,
    },
    commonMisunderstandings: knowledge.commonMisunderstandings,
    coreMeaning: knowledge.coreMeaning,
    faq: knowledge.faq,
    healthNotes: knowledge.healthNotes,
    id: knowledge.id,
    relatedKnowledge: knowledge.relatedKnowledge
      .map((id) => getKnowledgeById(id))
      .filter((item) => item != null),
    reportUsage: knowledge.reportUsage,
    shareInsightTemplates: knowledge.shareInsightTemplates,
    sources: knowledge.sources,
    strengths: knowledge.strengths,
    tendencies: {
      career: knowledge.careerTendencies,
      finance: knowledge.financeTendencies,
      relationship: knowledge.relationshipTendencies,
    },
    version: knowledge.version,
  };
}
