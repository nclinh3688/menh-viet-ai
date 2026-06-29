import type { EmotionProfile, NarrativeContext } from "./narrative-types";
import { resolveTone } from "./tone-engine";

export function buildEmotionProfile(context: NarrativeContext): EmotionProfile {
  const hasConflict = (context.conflicts?.length ?? 0) > 0;
  const averageConfidence =
    context.scores.length === 0
      ? 0
      : context.scores.reduce((sum, score) => sum + score.confidence, 0) /
        context.scores.length;

  return {
    hasConflict,
    leadTone: resolveTone(context),
    signal:
      hasConflict || averageConfidence < 68
        ? "caution"
        : averageConfidence >= 82
          ? "confidence"
          : "neutral",
  };
}

export function emotionQualifier(profile: EmotionProfile) {
  if (profile.hasConflict) {
    return "nên đọc như một góc nhìn cần đối chiếu thêm";
  }

  if (profile.signal === "confidence") {
    return "có thể xem là tín hiệu tương đối rõ trong dữ liệu hiện có";
  }

  if (profile.signal === "caution") {
    return "nên xem là thông tin tham khảo cần kiểm chứng bằng trải nghiệm thực tế";
  }

  return "có thể dùng như một điểm tự quan sát";
}
