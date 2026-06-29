import { isKnowledgeCategory } from "./knowledge-category";
import type { KnowledgeItem } from "./knowledge-item";
import { isKnownSource } from "@/lib/sources/source-resolver";

export interface KnowledgeValidationIssue {
  field: string;
  id?: string;
  message: string;
  severity: "error" | "warning";
}

export interface KnowledgeValidationResult {
  errors: KnowledgeValidationIssue[];
  isPass: boolean;
  warnings: KnowledgeValidationIssue[];
}

function hasText(value: string | undefined) {
  return value != null && value.trim().length > 0;
}

function pushIssue(
  issues: KnowledgeValidationIssue[],
  issue: KnowledgeValidationIssue,
) {
  issues.push(issue);
}

export function validateKnowledgeItems(
  items: KnowledgeItem[],
): KnowledgeValidationResult {
  const errors: KnowledgeValidationIssue[] = [];
  const warnings: KnowledgeValidationIssue[] = [];
  const ids = new Map<string, number>();
  const slugs = new Map<string, number>();

  for (const item of items) {
    ids.set(item.id, (ids.get(item.id) ?? 0) + 1);
    slugs.set(item.slug, (slugs.get(item.slug) ?? 0) + 1);

    if (!hasText(item.id)) {
      pushIssue(errors, {
        field: "id",
        id: item.id,
        message: "Knowledge item thiếu id.",
        severity: "error",
      });
    }

    if (!hasText(item.slug)) {
      pushIssue(errors, {
        field: "slug",
        id: item.id,
        message: "Knowledge item thiếu slug.",
        severity: "error",
      });
    }

    if (!isKnowledgeCategory(item.category)) {
      pushIssue(errors, {
        field: "category",
        id: item.id,
        message: `Category không hợp lệ: ${item.category}.`,
        severity: "error",
      });
    }

    if (item.sources.length === 0) {
      pushIssue(errors, {
        field: "sources",
        id: item.id,
        message: "Knowledge item thiếu nguồn.",
        severity: "error",
      });
    }

    for (const sourceId of item.sources) {
      if (!isKnownSource(sourceId)) {
        pushIssue(errors, {
          field: "sources",
          id: item.id,
          message: `Source không tồn tại trong Source Registry: ${sourceId}.`,
          severity: "error",
        });
      }
    }

    if (item.references.length === 0) {
      pushIssue(errors, {
        field: "references",
        id: item.id,
        message: "Knowledge item thiếu references.",
        severity: "error",
      });
    }

    if (!hasText(item.version)) {
      pushIssue(errors, {
        field: "version",
        id: item.id,
        message: "Knowledge item thiếu version.",
        severity: "error",
      });
    }

    if (!hasText(item.lastUpdated)) {
      pushIssue(warnings, {
        field: "lastUpdated",
        id: item.id,
        message: "Knowledge item thiếu lastUpdated.",
        severity: "warning",
      });
    }

    if (item.confidence < 0 || item.confidence > 100) {
      pushIssue(errors, {
        field: "confidence",
        id: item.id,
        message: "Confidence phải nằm trong khoảng 0-100.",
        severity: "error",
      });
    }
  }

  for (const [id, count] of ids) {
    if (count > 1) {
      pushIssue(errors, {
        field: "id",
        id,
        message: `Knowledge id bị trùng ${count} lần.`,
        severity: "error",
      });
    }
  }

  for (const [slug, count] of slugs) {
    if (count > 1) {
      pushIssue(errors, {
        field: "slug",
        message: `Knowledge slug bị trùng ${count} lần: ${slug}.`,
        severity: "error",
      });
    }
  }

  return {
    errors,
    isPass: errors.length === 0,
    warnings,
  };
}
