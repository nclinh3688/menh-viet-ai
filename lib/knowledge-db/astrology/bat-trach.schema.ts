import type {
  AstrologyKnowledgeBase,
  KnowledgeTextBlock,
} from "./astrology-knowledge-types";

export interface BatTrachKnowledge extends AstrologyKnowledgeBase {
  cautions: KnowledgeTextBlock[];
  directionGroups: Array<{
    directions: string[];
    group: "EAST" | "WEST" | "NEUTRAL";
    meaning: string;
  }>;
  houseApplications: KnowledgeTextBlock[];
  meaning: string;
  origin: string;
}

export const batTrachRequiredFields = [
  "id",
  "slug",
  "name",
  "meaning",
  "origin",
  "directionGroups",
  "houseApplications",
  "cautions",
  "applications",
  "relatedKnowledge",
  "references",
  "sources",
  "confidence",
  "version",
] as const satisfies Array<keyof BatTrachKnowledge>;
