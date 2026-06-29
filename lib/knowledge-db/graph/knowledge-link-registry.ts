import type { KnowledgeLink } from "./knowledge-link-types";

const elementIds = {
  hoa: "five-elements.hoa.foundation",
  kim: "five-elements.kim.foundation",
  moc: "five-elements.moc.foundation",
  tho: "five-elements.tho.foundation",
  thuy: "five-elements.thuy.foundation",
} as const;
const fiveElementsOverviewId = "five-elements.overview";

function link(
  id: string,
  fromKnowledgeId: string,
  toKnowledgeId: string,
  linkType: KnowledgeLink["linkType"],
  description: string,
): KnowledgeLink {
  return {
    confidence: 88,
    description,
    fromKnowledgeId,
    id,
    linkType,
    sources: ["FIVE_ELEMENTS"],
    toKnowledgeId,
    version: "1.0.0",
  };
}

export const knowledgeLinkRegistry: KnowledgeLink[] = [
  link(
    "five-elements.moc.generates.hoa",
    elementIds.moc,
    elementIds.hoa,
    "GENERATES",
    "Mộc sinh Hỏa trong vòng tương sinh Ngũ Hành.",
  ),
  link(
    "five-elements.hoa.generated-by.moc",
    elementIds.hoa,
    elementIds.moc,
    "GENERATED_BY",
    "Hỏa được sinh bởi Mộc trong vòng tương sinh Ngũ Hành.",
  ),
  link(
    "five-elements.hoa.generates.tho",
    elementIds.hoa,
    elementIds.tho,
    "GENERATES",
    "Hỏa sinh Thổ trong vòng tương sinh Ngũ Hành.",
  ),
  link(
    "five-elements.tho.generated-by.hoa",
    elementIds.tho,
    elementIds.hoa,
    "GENERATED_BY",
    "Thổ được sinh bởi Hỏa trong vòng tương sinh Ngũ Hành.",
  ),
  link(
    "five-elements.tho.generates.kim",
    elementIds.tho,
    elementIds.kim,
    "GENERATES",
    "Thổ sinh Kim trong vòng tương sinh Ngũ Hành.",
  ),
  link(
    "five-elements.kim.generated-by.tho",
    elementIds.kim,
    elementIds.tho,
    "GENERATED_BY",
    "Kim được sinh bởi Thổ trong vòng tương sinh Ngũ Hành.",
  ),
  link(
    "five-elements.kim.generates.thuy",
    elementIds.kim,
    elementIds.thuy,
    "GENERATES",
    "Kim sinh Thủy trong vòng tương sinh Ngũ Hành.",
  ),
  link(
    "five-elements.thuy.generated-by.kim",
    elementIds.thuy,
    elementIds.kim,
    "GENERATED_BY",
    "Thủy được sinh bởi Kim trong vòng tương sinh Ngũ Hành.",
  ),
  link(
    "five-elements.thuy.generates.moc",
    elementIds.thuy,
    elementIds.moc,
    "GENERATES",
    "Thủy sinh Mộc trong vòng tương sinh Ngũ Hành.",
  ),
  link(
    "five-elements.moc.generated-by.thuy",
    elementIds.moc,
    elementIds.thuy,
    "GENERATED_BY",
    "Mộc được sinh bởi Thủy trong vòng tương sinh Ngũ Hành.",
  ),
  link(
    "five-elements.hoa.controls.kim",
    elementIds.hoa,
    elementIds.kim,
    "CONTROLS",
    "Hỏa khắc Kim trong vòng tương khắc Ngũ Hành.",
  ),
  link(
    "five-elements.kim.controlled-by.hoa",
    elementIds.kim,
    elementIds.hoa,
    "CONTROLLED_BY",
    "Kim bị Hỏa khắc trong vòng tương khắc Ngũ Hành.",
  ),
  link(
    "five-elements.kim.controls.moc",
    elementIds.kim,
    elementIds.moc,
    "CONTROLS",
    "Kim khắc Mộc trong vòng tương khắc Ngũ Hành.",
  ),
  link(
    "five-elements.moc.controlled-by.kim",
    elementIds.moc,
    elementIds.kim,
    "CONTROLLED_BY",
    "Mộc bị Kim khắc trong vòng tương khắc Ngũ Hành.",
  ),
  link(
    "five-elements.moc.controls.tho",
    elementIds.moc,
    elementIds.tho,
    "CONTROLS",
    "Mộc khắc Thổ trong vòng tương khắc Ngũ Hành.",
  ),
  link(
    "five-elements.tho.controlled-by.moc",
    elementIds.tho,
    elementIds.moc,
    "CONTROLLED_BY",
    "Thổ bị Mộc khắc trong vòng tương khắc Ngũ Hành.",
  ),
  link(
    "five-elements.tho.controls.thuy",
    elementIds.tho,
    elementIds.thuy,
    "CONTROLS",
    "Thổ khắc Thủy trong vòng tương khắc Ngũ Hành.",
  ),
  link(
    "five-elements.thuy.controlled-by.tho",
    elementIds.thuy,
    elementIds.tho,
    "CONTROLLED_BY",
    "Thủy bị Thổ khắc trong vòng tương khắc Ngũ Hành.",
  ),
  link(
    "five-elements.thuy.controls.hoa",
    elementIds.thuy,
    elementIds.hoa,
    "CONTROLS",
    "Thủy khắc Hỏa trong vòng tương khắc Ngũ Hành.",
  ),
  link(
    "five-elements.hoa.controlled-by.thuy",
    elementIds.hoa,
    elementIds.thuy,
    "CONTROLLED_BY",
    "Hỏa bị Thủy khắc trong vòng tương khắc Ngũ Hành.",
  ),
  ...Object.values(elementIds).map((id) =>
    link(
      `${id}.belongs-to.five-elements-overview`,
      id,
      fiveElementsOverviewId,
      "BELONGS_TO",
      "Item này thuộc nhóm tri thức nền Ngũ Hành.",
    ),
  ),
  ...Object.values(elementIds).map((id) =>
    link(
      `five-elements-overview.has-variant.${id}`,
      fiveElementsOverviewId,
      id,
      "HAS_VARIANT",
      "Tổng quan Ngũ Hành có biến thể tri thức theo từng hành.",
    ),
  ),
  ...Object.values(elementIds).map((id) =>
    link(
      `${id}.see-also.five-elements-overview`,
      id,
      fiveElementsOverviewId,
      "SEE_ALSO",
      "Nên xem tổng quan Ngũ Hành để hiểu vòng sinh khắc và phạm vi ứng dụng.",
    ),
  ),
];

export function getKnowledgeLinkRegistry() {
  return knowledgeLinkRegistry;
}
