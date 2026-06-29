import { buildKnowledgeIndex } from "./knowledge-index";
import type { KnowledgeItem } from "./knowledge-item";
import { getKnowledgeRegistry } from "./knowledge-registry";
import { validateKnowledgeItems } from "./knowledge-validator";

export interface LoadKnowledgeOptions {
  extraItems?: KnowledgeItem[];
  shouldValidate?: boolean;
}

export function loadKnowledgeItems(options: LoadKnowledgeOptions = {}) {
  const items = [...getKnowledgeRegistry(), ...(options.extraItems ?? [])];
  const validation =
    options.shouldValidate === false ? null : validateKnowledgeItems(items);

  return {
    index: buildKnowledgeIndex(items),
    items,
    validation,
  };
}
