import type { SourceId } from "@/lib/sources/source-types";

export const KNOWLEDGE_LINK_TYPES = [
  "BELONGS_TO",
  "CONTROLLED_BY",
  "CONTROLS",
  "GENERATED_BY",
  "GENERATES",
  "HAS_VARIANT",
  "RELATED",
  "SEE_ALSO",
  "USED_BY",
  "USES",
] as const;

export type KnowledgeLinkType = (typeof KNOWLEDGE_LINK_TYPES)[number];

export interface KnowledgeLink {
  confidence: number;
  description: string;
  fromKnowledgeId: string;
  id: string;
  linkType: KnowledgeLinkType;
  sources: SourceId[];
  toKnowledgeId: string;
  version: string;
}

export interface KnowledgeGraphNode {
  id: string;
  incoming: KnowledgeLink[];
  outgoing: KnowledgeLink[];
}

export interface KnowledgeGraphResult {
  centerId: string;
  links: KnowledgeLink[];
  nodes: KnowledgeGraphNode[];
}
