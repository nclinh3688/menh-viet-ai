# Rule Engine Implementation

## Mục tiêu

Rule Engine Foundation nằm trong `/lib/rule-engine`. Đây là lớp biến knowledge
đã chuẩn hóa thành fact, score, reason, source, recommendation và confidence.
Không có AI, không có UI, không ghi database.

## File chính

- `rule-types.ts`: định nghĩa `Rule`, `Fact`, `KnowledgeInput`, `RuleEngineOutput`.
- `rule-registry.ts`: registry MVP các rule an toàn, có source và confidence.
- `rule-runner.ts`: evaluate rule và trả output chuẩn.
- `fact-builder.ts`: sinh fact từ rule output và merge fact trùng.
- `reason-builder.ts`: tạo reason cho từng fact từ rule đã match.
- `weight-calculator.ts`: tính score theo domain từ weight.
- `confidence-calculator.ts`: tính confidence fact và confidence tổng.
- `recommendation-builder.ts`: map fact sang gợi ý rule-based.

## Rule Flow

```text
KnowledgeInput
↓
Rule Registry
↓
Evaluate Conditions
↓
Matched Rules
↓
Output Facts
```

Rule chỉ match khi tất cả conditions đúng. Rule có priority cao được xử lý trước,
nhưng fact trùng vẫn được merge để giữ nhiều source/ruleIds.

## Fact Flow

Fact là dữ liệu cuối cùng, không chứa câu văn marketing hoặc luận giải dài.

Ví dụ:

- `CAREER_LEADERSHIP`
- `STRONG_FIRE`
- `GOOD_FINANCE`
- `STABLE_RELATIONSHIP`

Fact gồm:

- code
- domain
- metadata
- ruleIds
- source
- weight
- confidence
- reason

## Weight

Weight hiện là số nguyên theo rule. Score theo domain được tính bằng:

```text
score = min(100, totalDomainWeight / domainCap * 100)
```

MVP dùng cap `100` cho mỗi domain.

Ví dụ định hướng career:

- Ngũ Hành: 40
- Can Chi: 25
- Cung Phi: 20
- Thần số học: 15

Nếu một profile match đủ 4 lớp trên cho career, score có thể đạt 100.

## Reason

Mỗi fact có `reason[]`.

Reason được tạo từ:

- fact code;
- rule name đã match;
- source của rule.

Reason không dùng AI. Nội dung reason được viết sẵn theo template an toàn, tránh
từ tuyệt đối như "chắc chắn", "định mệnh", "100%".

## Recommendation

Recommendation Builder là rule-based.

Ví dụ:

```text
CAREER_LEADERSHIP
↓
Quản lý
Kinh doanh
Điều phối
Dẫn dắt nhóm
```

Recommendation chỉ được tạo nếu fact nằm trong map đã chuẩn hóa.

## Output chuẩn

```ts
interface RuleEngineOutput {
  facts: Fact[];
  scores: Score[];
  reasons: Record<FactCode, string[]>;
  sources: Record<FactCode, RuleSource[]>;
  recommendations: Recommendation[];
  confidence: number;
}
```

## Kiến trúc mở rộng

1. Tách `rule-registry.ts` thành nhiều registry theo domain.
2. Thêm source registry riêng.
3. Thêm conflict resolution module.
4. Thêm rule validation script để chặn rule thiếu source/confidence.
5. Thêm test snapshot cho output rule engine.
6. Nối report builder để narrative chỉ đọc `RuleEngineOutput`.
7. Cho Premium dùng nhiều rule/source hơn, không chỉ thêm chữ.

## Những phần chưa làm

- Chưa nối vào dashboard/report hiện tại.
- Chưa có conflict resolver riêng.
- Chưa có knowledge item registry thật.
- Chưa có automated tests.
- Chưa có admin/editor cho rule.
- Chưa có versioning rule.
