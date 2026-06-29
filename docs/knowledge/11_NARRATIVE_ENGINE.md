# Narrative Engine

## Mục tiêu

Narrative Engine là lớp diễn giải thống nhất của Mệnh Việt. Nó chỉ nhận facts,
scores, recommendations và confidence từ Report Engine/Rule Engine. Narrative
Engine không tạo dữ liệu mới, không gọi AI API và không thay đổi kết luận.

## Tone

Mệnh Việt luôn:

- trung lập;
- tích cực;
- không mê tín;
- không phán xét;
- không tuyệt đối;
- không gây sợ hãi.

Tone được xử lý trong:

- `/lib/narrative/tone-engine.ts`

Các tone hiện có:

- `balanced`
- `cautious`
- `encouraging`
- `grounded`

## Style

Style Engine định dạng câu theo tone đã chọn và kiểm tra ngôn ngữ an toàn.

File:

- `/lib/narrative/style-engine.ts`

Style không được biến một fact thành kết luận mới. Style chỉ làm câu dễ đọc hơn
và đúng giọng Mệnh Việt.

## Language

File:

- `/lib/narrative/language-rules.ts`

Ưu tiên:

- có xu hướng
- từ dữ liệu hiện có
- theo nguyên lý...
- điều này gợi ý rằng...
- có thể cân nhắc...

Không dùng:

- chắc chắn
- sẽ
- định mệnh
- 100%
- tuyệt đối
- đại họa
- phá sản
- ly hôn chắc chắn

Nếu narrative chứa từ bị cấm, `assertSafeLanguage()` sẽ throw error để chặn
output không an toàn.

## Section Template

File:

- `/lib/narrative/section-template-registry.ts`

Mỗi section có template riêng:

- Overview
- Strengths
- Career
- Finance
- Relationship
- Health
- Recommendations
- Why
- Next Discovery

Template chỉ dùng:

- fact code;
- recommendation;
- score confidence;
- tone;
- emotion qualifier.

Template không được tự thêm tri thức.

## Emotion

File:

- `/lib/narrative/emotion-layer.ts`

Emotion Layer điều chỉnh giọng điệu theo:

- điểm mạnh nổi bật;
- điểm cần lưu ý;
- mức confidence;
- có xung đột dữ liệu hay không.

Không được tạo cảm xúc giả. Nếu có conflict hoặc confidence thấp, tone phải thận
trọng hơn.

Ví dụ:

- Confidence cao, không conflict: `encouraging`
- Có conflict: `cautious`
- Confidence thấp: `grounded`
- Bình thường: `balanced`

## CTA

File:

- `/lib/narrative/call-to-action-builder.ts`

Mỗi báo cáo kết thúc bằng:

- Gợi ý áp dụng
- Khám phá tiếp
- Chia sẻ nếu thấy hữu ích

CTA không clickbait, không thao túng và không dùng nỗi sợ để ép hành động.

## Disclaimer

File:

- `/lib/narrative/disclaimer-builder.ts`

Disclaimer mặc định:

```text
Nội dung chỉ mang tính tham khảo và khám phá bản thân.
```

Khi liên quan sức khỏe, tài chính, pháp lý hoặc tâm lý:

```text
Nội dung không thay thế tư vấn chuyên môn về y tế, pháp lý, tài chính hoặc tâm lý.
```

## Ví dụ đúng

```text
Từ dữ liệu hiện có, các fact CAREER_LEADERSHIP và STRONG_FIRE gợi ý một số hướng
công việc có thể cân nhắc như Quản lý, Kinh doanh và Điều phối.
```

Vì sao đúng:

- Có nguồn từ fact.
- Dùng "gợi ý", "có thể cân nhắc".
- Không khẳng định tương lai.

## Ví dụ sai

```text
Bạn chắc chắn sẽ thành công trong kinh doanh vì đây là định mệnh của bạn.
```

Vì sao sai:

- Dùng "chắc chắn".
- Dùng "sẽ".
- Dùng "định mệnh".
- Tạo kết luận tuyệt đối không có trong fact.

## Cách Report Engine sử dụng

Report Engine có thể gọi:

```ts
import { renderSectionNarrative } from "@/lib/narrative/section-template-registry";

const narrative = renderSectionNarrative("CAREER", {
  facts,
  recommendations,
  scores,
  section: "CAREER",
});
```

Output:

- `section`
- `tone`
- `body`
- `disclaimer`

## Những phần chưa làm

- Chưa nối Narrative Engine vào Report Engine hiện tại.
- Chưa có test snapshot cho từng section template.
- Chưa có template tiếng Anh.
- Chưa có reviewer tool để scan toàn bộ copy trong app.
- Chưa có conflict narrative chi tiết theo từng loại conflict.
