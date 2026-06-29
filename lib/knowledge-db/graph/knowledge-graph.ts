import { loadKnowledgeItems } from "../knowledge-loader";
import {
  getIncomingKnowledgeLinks,
  getOutgoingKnowledgeLinks,
  getRelatedKnowledgeIds,
  resolveKnowledgeLinks,
} from "./knowledge-link-resolver";
import type { KnowledgeGraphNode, KnowledgeGraphResult } from "./knowledge-link-types";

function buildNode(id: string): KnowledgeGraphNode {
  return {
    id,
    incoming: getIncomingKnowledgeLinks(id),
    outgoing: getOutgoingKnowledgeLinks(id),
  };
}

export function getRelatedKnowledge(id: string) {
  const byId = loadKnowledgeItems().index.byId;

  return getRelatedKnowledgeIds(id)
    .map((knowledgeId) => byId.get(knowledgeId))
    .filter((item) => item != null);
}

export function getKnowledgeGraph(id: string): KnowledgeGraphResult {
  const links = resolveKnowledgeLinks(id);
  const nodeIds = [
    ...new Set([
      id,
      ...links.flatMap((link) => [link.fromKnowledgeId, link.toKnowledgeId]),
    ]),
  ];

  return {
    centerId: id,
    links,
    nodes: nodeIds.map(buildNode),
  };
}

export function getKnowledgeTree(id: string, depth = 2): KnowledgeGraphResult {
  const visited = new Set<string>([id]);
  const links = [];
  let frontier = [id];

  for (let level = 0; level < depth; level += 1) {
    const nextFrontier: string[] = [];

    for (const currentId of frontier) {
      const connectedLinks = resolveKnowledgeLinks(currentId);
      links.push(...connectedLinks);

      for (const link of connectedLinks) {
        const nextId =
          link.fromKnowledgeId === currentId
            ? link.toKnowledgeId
            : link.fromKnowledgeId;

        if (!visited.has(nextId)) {
          visited.add(nextId);
          nextFrontier.push(nextId);
        }
      }
    }

    frontier = nextFrontier;
  }

  const uniqueLinks = Array.from(
    new Map(links.map((link) => [link.id, link])).values(),
  );

  return {
    centerId: id,
    links: uniqueLinks,
    nodes: Array.from(visited).map(buildNode),
  };
}
