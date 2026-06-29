import { assertSafeLanguage } from "./language-rules";
import { tonePrefix } from "./tone-engine";
import type { NarrativeOutput, NarrativeSection, NarrativeTone } from "./narrative-types";

export function formatNarrative(
  section: NarrativeSection,
  tone: NarrativeTone,
  body: string,
  disclaimer: string,
): NarrativeOutput {
  const text = `${tonePrefix(tone)} ${body}`;

  assertSafeLanguage(text);

  return {
    body: text,
    disclaimer,
    section,
    tone,
  };
}

export function joinReadable(items: string[]) {
  if (items.length === 0) {
    return "dữ liệu hiện có";
  }

  if (items.length === 1) {
    return items[0];
  }

  return `${items.slice(0, -1).join(", ")} và ${items.at(-1)}`;
}
