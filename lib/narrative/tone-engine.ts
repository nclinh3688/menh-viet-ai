import type { NarrativeContext, NarrativeTone } from "./narrative-types";

export function resolveTone(context: NarrativeContext): NarrativeTone {
  const averageConfidence =
    context.scores.length === 0
      ? 0
      : context.scores.reduce((sum, score) => sum + score.confidence, 0) /
        context.scores.length;

  if ((context.conflicts?.length ?? 0) > 0) {
    return "cautious";
  }

  if (averageConfidence >= 82) {
    return "encouraging";
  }

  if (averageConfidence > 0 && averageConfidence < 68) {
    return "grounded";
  }

  return "balanced";
}

export function tonePrefix(tone: NarrativeTone) {
  const prefixMap: Record<NarrativeTone, string> = {
    balanced: "Nhìn một cách cân bằng,",
    cautious: "Vì dữ liệu có điểm cần đối chiếu,",
    encouraging: "Từ các tín hiệu nổi bật,",
    grounded: "Ở mức tham khảo thận trọng,",
  };

  return prefixMap[tone];
}
