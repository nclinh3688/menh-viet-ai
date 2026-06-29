import { buildDisclaimer } from "./disclaimer-builder";
import { buildEmotionProfile, emotionQualifier } from "./emotion-layer";
import { formatNarrative, joinReadable } from "./style-engine";
import type {
  NarrativeContext,
  NarrativeOutput,
  NarrativeSection,
  NarrativeTemplateInput,
} from "./narrative-types";

type SectionTemplate = (input: NarrativeTemplateInput) => string;

const sectionTemplates: Record<NarrativeSection, SectionTemplate> = {
  CAREER: ({ factCodes, recommendations }) =>
    `các fact ${joinReadable(factCodes)} gợi ý một số hướng công việc có thể cân nhắc như ${joinReadable(recommendations)}.`,
  FINANCE: ({ factCodes }) =>
    `nhóm fact ${joinReadable(factCodes)} phù hợp để quan sát cách bạn tổ chức nguồn lực và ưu tiên tài chính.`,
  HEALTH: () =>
    "phần sức khỏe chỉ nên đọc như lời nhắc về nhịp sống, không phải tư vấn y tế.",
  NEXT_DISCOVERY: () =>
    "bạn có thể tiếp tục khám phá các góc nhìn khác mà không cần nâng cấp hay bị khóa nội dung.",
  OVERVIEW: ({ factCodes }) =>
    `report đang dựa trên các fact ${joinReadable(factCodes)} và chỉ diễn giải những gì dữ liệu đã cung cấp.`,
  RECOMMENDATIONS: ({ recommendations }) =>
    `các gợi ý áp dụng nên bắt đầu từ bước nhỏ như ${joinReadable(recommendations)}.`,
  RELATIONSHIP: ({ factCodes }) =>
    `các fact ${joinReadable(factCodes)} có thể dùng để tự quan sát cách bạn kết nối và trao đổi kỳ vọng.`,
  STRENGTHS: ({ factCodes }) =>
    `điểm mạnh nổi bật đến từ ${joinReadable(factCodes)} và nên được hiểu như xu hướng hỗ trợ, không phải nhãn cố định.`,
  WHY: ({ factCodes }) =>
    `kết luận được tạo từ ${joinReadable(factCodes)}, kèm rule, nguồn và confidence để người dùng tự kiểm tra.`,
};

export function renderSectionNarrative(
  section: NarrativeSection,
  context: NarrativeContext,
): NarrativeOutput {
  const emotionProfile = buildEmotionProfile({ ...context, section });
  const factCodes = context.facts.map((fact) => fact.code);
  const recommendations = context.recommendations.flatMap((item) => item.items);
  const template = sectionTemplates[section];
  const body = `${template({
    confidence:
      context.scores.length === 0
        ? 0
        : Math.round(
            context.scores.reduce((sum, score) => sum + score.confidence, 0) /
              context.scores.length,
          ),
    factCodes,
    recommendations,
    tone: emotionProfile.leadTone,
  })} Nội dung này ${emotionQualifier(emotionProfile)}.`;

  return formatNarrative(
    section,
    emotionProfile.leadTone,
    body,
    buildDisclaimer(),
  );
}

export { sectionTemplates };
