import { getKnowledgeLinkRegistry } from "./knowledge-link-registry";
import type { KnowledgeLink, KnowledgeLinkType } from "./knowledge-link-types";

export interface ResolveKnowledgeLinksOptions {
  direction?: "incoming" | "outgoing" | "both";
  linkTypes?: KnowledgeLinkType[];
}

function matchesType(link: KnowledgeLink, linkTypes?: KnowledgeLinkType[]) {
  return linkTypes == null || linkTypes.includes(link.linkType);
}

export function getKnowledgeLinks() {
  return getKnowledgeLinkRegistry();
}

export function getOutgoingKnowledgeLinks(
  id: string,
  linkTypes?: KnowledgeLinkType[],
) {
  return getKnowledgeLinks().filter(
    (link) => link.fromKnowledgeId === id && matchesType(link, linkTypes),
  );
}

export function getIncomingKnowledgeLinks(
  id: string,
  linkTypes?: KnowledgeLinkType[],
) {
  return getKnowledgeLinks().filter(
    (link) => link.toKnowledgeId === id && matchesType(link, linkTypes),
  );
}

export function resolveKnowledgeLinks(
  id: string,
  options: ResolveKnowledgeLinksOptions = {},
) {
  const direction = options.direction ?? "both";
  const incoming =
    direction === "outgoing"
      ? []
      : getIncomingKnowledgeLinks(id, options.linkTypes);
  const outgoing =
    direction === "incoming"
      ? []
      : getOutgoingKnowledgeLinks(id, options.linkTypes);

  return [...outgoing, ...incoming];
}

export function getRelatedKnowledgeIds(id: string) {
  return [
    ...new Set(
      resolveKnowledgeLinks(id).map((link) =>
        link.fromKnowledgeId === id ? link.toKnowledgeId : link.fromKnowledgeId,
      ),
    ),
  ];
}
