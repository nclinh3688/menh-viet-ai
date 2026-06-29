import type { KnowledgeItem } from "../knowledge-item";
import { loadKnowledgeItems } from "../knowledge-loader";
import { searchKnowledge } from "../knowledge-search";
import { getRelatedKnowledgeIds } from "./knowledge-link-resolver";

export interface ConnectedKnowledgeResult {
  item: KnowledgeItem;
  relatedKnowledge: KnowledgeItem[];
}

export function searchConnectedKnowledge(id: string): ConnectedKnowledgeResult | null {
  const byId = loadKnowledgeItems().index.byId;
  const item = byId.get(id);

  if (item == null) {
    return null;
  }

  return {
    item,
    relatedKnowledge: getRelatedKnowledgeIds(id)
      .map((knowledgeId) => byId.get(knowledgeId))
      .filter((relatedItem) => relatedItem != null),
  };
}

export function searchKnowledgeWithConnections(
  input: Parameters<typeof searchKnowledge>[0],
): ConnectedKnowledgeResult[] {
  const byId = loadKnowledgeItems().index.byId;

  return searchKnowledge(input).map((item) => ({
    item,
    relatedKnowledge: getRelatedKnowledgeIds(item.id)
      .map((knowledgeId) => byId.get(knowledgeId))
      .filter((relatedItem) => relatedItem != null),
  }));
}
