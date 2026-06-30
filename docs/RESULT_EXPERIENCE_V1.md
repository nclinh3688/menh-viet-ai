# Result Experience v1

Sprint này nâng chuẩn hiển thị kết quả cho các module tra cứu chính của Mệnh
Việt. Không thêm AI API, payment, database hay thuật toán lớn.

## Cấu trúc result chuẩn

Mỗi result nên có:

- `title`: tên kết quả.
- `summary`: tóm tắt dễ hiểu.
- `keyInsight`: điều Mệnh Việt nhận thấy.
- `why`: flow Knowledge -> Rule -> Reason -> Conclusion.
- `strengths`: điểm thuận.
- `cautions`: điểm cần lưu ý.
- `advice`: gợi ý áp dụng.
- `sources`: nguồn phân tích và confidence.
- `confidence`: độ tin cậy tham khảo.
- `nextDiscovery`: khám phá tiếp.
- `shareText`: câu chia sẻ ngắn.

## Module đã nâng

- `/five-elements`: thêm Result Model, insight, why, source, advice, next
  discovery và share CTA. Module này dùng Five Elements Pack để lấy coreMeaning,
  tendencies và relatedKnowledge.
- `/numerology`: thêm insight, why, source Thần số học, gợi ý áp dụng và diễn đạt
  lại ghi chú tên tiếng Việt theo hướng public-ready.
- `/love-compatibility`: thêm insight tổng hợp, why theo từng trục điểm, source
  phân tích và gợi ý cân bằng.
- `/good-day`: thêm insight, why theo rule-based score, source, advice và next
  discovery.

Birth Report và Dashboard đã có pipeline report riêng, không refactor trong sprint
này.

## Component dùng chung

Thư mục `components/result` gồm:

- `ResultShell`
- `ResultSummaryCard`
- `ResultInsightCard`
- `ResultWhyCard`
- `ResultAdviceCard`
- `ResultSourceList`
- `ResultNextDiscovery`
- `ResultShareCta`

## Quality checklist

- Không dùng ngôn ngữ khẳng định quá mức hoặc hù dọa.
- Không nhắc tới việc máy tự diễn giải nội dung.
- Có phần vì sao.
- Có nguồn.
- Có gợi ý áp dụng.
- Summary không quá ngắn.
- Nếu thiếu dữ liệu, component không tự tạo kết luận ngoài nguồn.

## Phần còn thiếu

- Chưa gắn debug panel quality cho từng result page.
- Chưa export share card thành ảnh.
- Chưa thêm test tự động cho tất cả Result Model.
- Dashboard có thể được nâng theo Result Model ở sprint riêng nếu cần.
