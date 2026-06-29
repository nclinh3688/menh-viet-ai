import type { ReportRenderModel } from "@/lib/report-engine/report-schema";
import { isKnownSource, isLegacySourceLabel } from "@/lib/sources/source-resolver";

export interface ReportValidationResult {
  confidenceWarnings: string[];
  isPass: boolean;
  missingSections: string[];
  missingSources: string[];
  warnings: string[];
}

function hasText(value: string | undefined) {
  return value != null && value.trim().length > 0;
}

function validateSourceId(
  sourceId: string,
  context: string,
  warnings: string[],
) {
  if (isLegacySourceLabel(sourceId)) {
    warnings.push(
      `${context}: nguồn legacy label nên được chuyển sang SourceId (${sourceId})`,
    );
    return;
  }

  if (!isKnownSource(sourceId)) {
    warnings.push(`${context}: nguồn chưa xác định (${sourceId})`);
  }
}

export function validateReport(report: ReportRenderModel): ReportValidationResult {
  const missingSections: string[] = [];
  const missingSources: string[] = [];
  const confidenceWarnings: string[] = [];
  const warnings: string[] = [];

  if (!hasText(report.overview.title) || !hasText(report.overview.description)) {
    missingSections.push("overview");
  }

  if (report.rawData.facts.length === 0) {
    missingSections.push("rawData.facts");
  }

  if (!hasText(report.keyInsight.title) || !hasText(report.keyInsight.body)) {
    missingSections.push("keyInsight");
  }

  if (!hasText(report.interpretation.title) || !hasText(report.interpretation.body)) {
    missingSections.push("interpretation");
  }

  if (report.strengths.items.length === 0) {
    missingSections.push("strengths");
  }

  if (report.cautions.items.length === 0) {
    missingSections.push("cautions");
  }

  if (report.recommendations.items.length === 0) {
    missingSections.push("recommendations");
  }

  if (report.sources.length === 0) {
    missingSections.push("sources");
  }

  if (!hasText(report.disclaimer)) {
    missingSections.push("disclaimer");
  }

  for (const whyItem of report.why) {
    if (whyItem.sources.length === 0) {
      missingSources.push(`${whyItem.factCode}: missing sources`);
    }

    for (const source of whyItem.sources) {
      validateSourceId(source.primary, `${whyItem.factCode}: primary source`, warnings);

      for (const secondarySource of source.secondary ?? []) {
        validateSourceId(
          secondarySource,
          `${whyItem.factCode}: secondary source`,
          warnings,
        );
      }
    }

    if (whyItem.reason.length === 0) {
      missingSources.push(`${whyItem.factCode}: missing reason`);
    }

    if (whyItem.confidence <= 0) {
      missingSources.push(`${whyItem.factCode}: missing confidence`);
    }

    if (whyItem.confidence < 60) {
      confidenceWarnings.push(
        `${whyItem.factCode}: confidence thấp (${whyItem.confidence}%)`,
      );
    }
  }

  for (const source of report.sources) {
    if (!hasText(source.primary)) {
      missingSources.push(`${source.factCode ?? "unknown"}: missing primary source`);
    } else {
      validateSourceId(
        source.primary,
        `${source.factCode ?? "unknown"}: primary source`,
        warnings,
      );
    }

    for (const secondarySource of source.secondary) {
      validateSourceId(
        secondarySource,
        `${source.factCode ?? "unknown"}: secondary source`,
        warnings,
      );
    }

    if (!hasText(source.explanation)) {
      missingSources.push(`${source.factCode ?? "unknown"}: missing explanation`);
    }

    if (source.confidence <= 0) {
      missingSources.push(`${source.factCode ?? "unknown"}: missing confidence`);
    }
  }

  if (report.overview.confidence < 60) {
    confidenceWarnings.push(
      `overview: confidence thấp (${report.overview.confidence}%)`,
    );
  }

  if (report.why.length === 0) {
    warnings.push("why: chưa có explainability item");
  }

  return {
    confidenceWarnings,
    isPass:
      missingSections.length === 0 &&
      missingSources.length === 0 &&
      confidenceWarnings.length === 0,
    missingSections,
    missingSources,
    warnings,
  };
}
