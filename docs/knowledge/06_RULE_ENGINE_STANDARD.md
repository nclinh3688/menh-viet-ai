# Rule Engine Standard

## Rule là gì?

Rule là điều kiện và hành động có cấu trúc, dùng để biến Knowledge Item thành
kết luận có thể giải thích.

```ts
interface Rule {
  id: string;
  name: string;
  category: string;
  when: RuleCondition[];
  then: RuleOutcome;
  weight: number;
  priority: number;
  sourceIds: string[];
  confidence: number;
}
```

## Weight

Weight là mức ảnh hưởng tương đối của rule trong một nhóm kết luận.

Ví dụ hợp tuổi MVP:

- Cung Phi: `35`
- Địa Chi: `25`
- Ngũ Hành: `20`
- Thiên Can: `10`
- Khác: `10`

Weight dùng để tính điểm hoặc thứ tự ưu tiên. Weight không được trình bày như sự
thật tuyệt đối.

## Priority

Priority quyết định rule nào được xử lý trước khi nhiều rule cùng áp dụng.

Ví dụ:

- Rule bảo vệ an toàn nội dung: priority `100`
- Rule nguồn chính: priority `80`
- Rule nguồn phụ: priority `50`
- Rule narrative tone: priority `20`

## Conflict Resolution

Conflict xảy ra khi hai nguồn đưa ra gợi ý khác nhau.

Ví dụ:

```text
Ngũ Hành gợi ý nhóm màu xanh lá.
Thần số học gợi ý nhóm màu xanh dương.
```

Rule Engine xử lý:

1. Xác định mục tiêu kết luận.
   Nếu kết luận là màu hợp theo bản mệnh, Ngũ Hành là nguồn chính.

2. So sánh priority.
   Nguồn chính có priority cao hơn nguồn phụ.

3. So sánh confidence.
   Nếu nguồn phụ có confidence thấp hơn, chỉ dùng làm gợi ý bổ sung.

4. Không gộp thành kết luận tuyệt đối.
   Narrative phải nói rõ "từ góc nhìn Ngũ Hành..." hoặc "ở góc nhìn bổ sung...".

5. Nếu conflict mạnh, chuyển thành "điểm cần cân bằng" thay vì chọn một phía.

## Ví dụ conflict Ngũ Hành và Thần số học

```ts
const result = {
  primaryConclusion: "Ưu tiên màu xanh lá theo Ngũ Hành.",
  secondaryPerspective:
    "Thần số học có thể gợi ý thêm nhóm xanh dương như một sắc thái bổ sung.",
  conflictResolution:
    "Không kết luận màu nào đúng tuyệt đối. Hiển thị xanh lá là nhóm chính, xanh dương là nhóm có thể thử nghiệm.",
};
```

## Rule safety

Rule không được tạo outcome:

- gây sợ hãi;
- khẳng định chắc chắn tương lai;
- yêu cầu mua vật phẩm;
- ép đăng nhập hoặc nâng cấp;
- thay thế tư vấn chuyên môn.

## Output rule engine

```ts
interface RuleEngineResult {
  selectedRules: string[];
  rejectedRules: string[];
  conflicts: string[];
  finalWeight: number;
  confidence: number;
  reason: string;
  recommendation: string;
}
```
