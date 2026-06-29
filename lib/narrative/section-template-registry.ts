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
    `Điều Mệnh Việt nhận thấy: các fact ${joinReadable(factCodes)} gợi ý một số hướng công việc có thể cân nhắc như ${joinReadable(recommendations)}. Vì sao: các fact này được tạo từ rule đã khớp với dữ liệu hồ sơ. Gợi ý áp dụng: chọn một hướng nhỏ để thử, đo phản hồi bằng kết quả thực tế.`,
  FINANCE: ({ factCodes }) =>
    `Điều Mệnh Việt nhận thấy: nhóm fact ${joinReadable(factCodes)} phù hợp để quan sát cách bạn tổ chức nguồn lực và ưu tiên tài chính. Vì sao: phần tài chính trong report chỉ dùng dữ liệu nguồn đã đăng ký, không thay thế tư vấn chuyên môn. Gợi ý áp dụng: viết ra ba ưu tiên tiền bạc gần nhất rồi chọn một bước quản lý đơn giản.`,
  HEALTH: () =>
    "Điều Mệnh Việt nhận thấy: phần sức khỏe chỉ nên đọc như lời nhắc về nhịp sống. Vì sao: report không có dữ liệu y tế. Gợi ý áp dụng: quan sát giấc ngủ, vận động và mức căng thẳng bằng ghi chú ngắn.",
  NEXT_DISCOVERY: () =>
    "Điều Mệnh Việt nhận thấy: bạn có thể tiếp tục khám phá các góc nhìn khác mà không cần nâng cấp hay bị khóa nội dung. Vì sao: mỗi module dùng một lớp dữ liệu riêng. Gợi ý áp dụng: chọn chủ đề gần với câu hỏi hiện tại nhất.",
  OVERVIEW: ({ factCodes }) =>
    `Điều Mệnh Việt nhận thấy: report đang dựa trên các fact ${joinReadable(factCodes)}. Vì sao: Narrative Engine chỉ diễn giải dữ liệu đã được Rule Engine chuẩn hóa. Gợi ý áp dụng: đọc tổng quan trước, sau đó đối chiếu từng section với trải nghiệm của bạn.`,
  RECOMMENDATIONS: ({ recommendations }) =>
    `Điều Mệnh Việt nhận thấy: các gợi ý áp dụng nên bắt đầu từ bước nhỏ như ${joinReadable(recommendations)}. Vì sao: gợi ý được map từ fact, không thêm dữ liệu ngoài nguồn. Gợi ý áp dụng: chọn một việc dễ làm trong tuần này.`,
  RELATIONSHIP: ({ factCodes }) =>
    `Điều Mệnh Việt nhận thấy: các fact ${joinReadable(factCodes)} có thể dùng để tự quan sát cách bạn kết nối và trao đổi kỳ vọng. Vì sao: dữ liệu quan hệ chỉ là hệ quy chiếu tham khảo. Gợi ý áp dụng: nói rõ nhu cầu bằng ví dụ cụ thể khi trao đổi.`,
  STRENGTHS: ({ factCodes }) =>
    `Điều Mệnh Việt nhận thấy: điểm mạnh nổi bật đến từ ${joinReadable(factCodes)}. Vì sao: đây là các fact có tín hiệu nổi bật trong dữ liệu hiện có. Gợi ý áp dụng: dùng điểm mạnh này trong một bối cảnh nhỏ, có thể quan sát kết quả.`,
  WHY: ({ factCodes }) =>
    `Điều Mệnh Việt nhận thấy: kết luận được tạo từ ${joinReadable(factCodes)}. Vì sao: mỗi fact có rule, nguồn và confidence để người dùng tự kiểm tra. Gợi ý áp dụng: ưu tiên đọc các nguồn có liên hệ trực tiếp nhất với kết luận.`,
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
