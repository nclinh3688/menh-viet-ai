# Reasoning Standard

## Mục tiêu

Reasoning Standard quy định cách Mệnh Việt biến tri thức thành kết luận. Mọi
kết luận đều phải đi qua pipeline đầy đủ, không được nhảy thẳng từ dữ liệu thô
sang narrative.

## Pipeline bắt buộc

```text
Knowledge
↓
Rules
↓
Weight
↓
Reason
↓
Recommendation
↓
Narrative
```

## 1. Knowledge

Knowledge là dữ liệu đã chuẩn hóa theo `KnowledgeItem`.

Ví dụ:

- Người dùng có `element = Hỏa`.
- Knowledge Item cho biết nhóm màu đỏ/cam/tím thuộc Hỏa.
- Knowledge Item cho biết Mộc sinh Hỏa.

## 2. Rules

Rule xác định cách dùng knowledge.

Ví dụ:

- Nếu `profile.element = Hỏa`, thì màu cùng hành Hỏa được đưa vào nhóm màu hợp.
- Nếu `generatedBy = Mộc`, thì màu hành Mộc có thể là nhóm màu hỗ trợ.

## 3. Weight

Weight cho biết mức ảnh hưởng của rule.

Ví dụ:

- Ngũ Hành bản mệnh: weight `0.5`
- Cung Phi: weight `0.3`
- Thần số học: weight `0.2`

Weight không phải độ đúng tuyệt đối. Weight chỉ là mức ưu tiên trong hệ thống.

## 4. Reason

Reason giải thích vì sao rule và weight tạo ra kết luận.

Ví dụ:

- "Màu đỏ cùng nhóm Hỏa với bản mệnh, trong khi xanh lá thuộc Mộc, là hành sinh
  Hỏa. Vì vậy hai nhóm màu này có thể được ưu tiên khi đưa ra gợi ý màu sắc."

## 5. Recommendation

Recommendation chuyển reason thành gợi ý thực tế.

Ví dụ:

- "Có thể ưu tiên đỏ trầm, cam đất hoặc xanh lá dịu trong vật dụng cá nhân."

## 6. Narrative

Narrative biến recommendation thành nội dung dễ đọc, đúng giọng Mệnh Việt.

Ví dụ:

- "Từ góc nhìn Ngũ Hành, bạn có xu hướng hợp với những gam màu tạo cảm giác ấm
  và có sinh khí. Nếu muốn áp dụng nhẹ nhàng, hãy bắt đầu bằng một phụ kiện nhỏ
  thay vì thay đổi toàn bộ không gian."

## Quy tắc không được bỏ qua

1. Không có Knowledge thì không có Rule.
2. Không có Rule thì không có Weight.
3. Không có Weight thì không có thứ tự ưu tiên.
4. Không có Reason thì không được hiển thị Recommendation.
5. Không có Recommendation thì Narrative chỉ là mô tả, không đủ giá trị.

## Output chuẩn của reasoning

```ts
interface ReasoningOutput {
  conclusion: string;
  knowledgeIds: string[];
  appliedRules: string[];
  weights: Record<string, number>;
  reason: string;
  recommendation: string;
  confidence: number;
}
```

## Vai trò của AI

AI chỉ được phép viết lại `Narrative` từ `ReasoningOutput`. AI không được:

- tự thêm knowledge;
- tự thêm rule;
- tự tăng confidence;
- tự tạo nguồn;
- tự đưa ra kết luận không có trong `ReasoningOutput`.
