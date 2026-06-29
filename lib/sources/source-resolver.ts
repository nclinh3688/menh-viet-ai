import { legacySourceAliases, sourceRegistry } from "./source-registry";
import type { SourceId, SourceItem } from "./source-types";

function normalizeSourceId(id: string): SourceId | null {
  if (id in sourceRegistry) {
    return id as SourceId;
  }

  return legacySourceAliases[id] ?? null;
}

export function getSourceById(id: string): SourceItem | null {
  const sourceId = normalizeSourceId(id);

  return sourceId == null ? null : sourceRegistry[sourceId];
}

export function resolveSources(ids: string[]): SourceItem[] {
  return ids
    .map((id) => getSourceById(id))
    .filter((source): source is SourceItem => source != null);
}

export function getSourceConfidence(ids: string[]) {
  const sources = resolveSources(ids);

  if (sources.length === 0) {
    return 0;
  }

  return Math.round(
    sources.reduce((sum, source) => sum + source.confidence, 0) / sources.length,
  );
}

export function formatSourceLabel(id: string) {
  return getSourceById(id)?.name ?? "Nguồn chưa xác định";
}

export function isKnownSource(id: string) {
  return getSourceById(id) != null;
}
