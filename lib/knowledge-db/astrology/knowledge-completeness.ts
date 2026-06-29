export interface KnowledgeCompletenessResult {
  missingFields: string[];
  percent: number;
  presentFields: string[];
}

function isFilled(value: unknown): boolean {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) && value > 0;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (value != null && typeof value === "object") {
    return Object.values(value).some(isFilled);
  }

  return value != null;
}

export function evaluateKnowledgeCompleteness<T extends Record<string, unknown>>(
  item: Partial<T>,
  requiredFields: readonly (keyof T)[],
): KnowledgeCompletenessResult {
  const presentFields: string[] = [];
  const missingFields: string[] = [];

  for (const field of requiredFields) {
    if (isFilled(item[field])) {
      presentFields.push(String(field));
    } else {
      missingFields.push(String(field));
    }
  }

  return {
    missingFields,
    percent:
      requiredFields.length === 0
        ? 100
        : Math.round((presentFields.length / requiredFields.length) * 100),
    presentFields,
  };
}
