# Birth Report Premium v1

## Mục tiêu

Birth Report Premium v1 là báo cáo vận mệnh cá nhân đầu tiên dùng đủ pipeline:

```text
Astrology Engine
↓
Rule Engine
↓
Report Engine
↓
Narrative Engine
↓
UI
```

Báo cáo không gọi AI API, không tích hợp payment và không tạo thuật toán mới.

## Flow dữ liệu

1. `/birth-report?profileId=...` nhận `profileId`.
2. Route lấy `Profile` và `BirthChart` từ database.
3. Nếu profile chưa có `BirthChart`, route dùng Astrology Engine hiện có để tạo
   chart giống dashboard.
4. Adapter `buildBirthReport()` nhận `Profile`, `BirthChart` và `DailyScore`.
5. Adapter chuyển dữ liệu sang `KnowledgeInput`.
6. Rule Engine tạo `facts`, `scores`, `reasons`, `sources`,
   `recommendations`, `confidence`.
7. Report Engine chuyển Rule Engine output thành `ReportRenderModel`.
8. Narrative Engine viết mô tả section từ facts và recommendations đã có.
9. UI render theo thứ tự report chuẩn.

## Adapter hoạt động thế nào

File:

- `/lib/report-engine/adapters/birth-report-adapter.ts`

Adapter không tự bịa dữ liệu. Nó chỉ đọc:

- `Profile`
- `BirthChart`
- `DailyScore`

Sau đó tạo knowledge:

- `birthChart.element`
- `birthChart.heavenlyStem`
- `birthChart.earthlyBranch`
- `birthChart.zodiacAnimal`
- `birthChart.cungPhi`
- `profile.gender`
- `profile.mainInterest`

## Section đã render

Route `/birth-report` render:

1. Tổng quan
2. Dữ liệu gốc
3. Insight nổi bật
4. Mệnh Việt luận giải
5. Điểm mạnh
6. Điểm cần lưu ý
7. Công việc
8. Tài chính
9. Tình cảm
10. Sức khỏe
11. Gợi ý áp dụng
12. Vì sao có kết luận này
13. Khám phá tiếp
14. Nguồn phân tích
15. Disclaimer

Ngoài ra có:

- Journey Progress
- Signature Insight
- Practical Advice
- Next Discovery
- Share Card foundation
- PremiumLock cho Vận trình 12 tháng và Báo cáo PDF cá nhân

## Nguồn dữ liệu đang dùng

- Astrology Engine: `/lib/astrology`
- Rule Engine: `/lib/rule-engine`
- Report Engine: `/lib/report-engine`
- Narrative Engine: `/lib/narrative`
- Prisma `Profile`
- Prisma `BirthChart`
- Daily score demo deterministic

## Premium logic

Báo cáo v1 hiển thị nội dung chính khá đầy đủ. Premium chỉ được dùng để preview:

- Vận trình 12 tháng
- Báo cáo PDF cá nhân

Không khóa nội dung chính trong sprint này.

## Phần còn thiếu

- Chưa có route chi tiết lưu report theo `SavedAnalysis`.
- Chưa có PDF thật.
- Chưa có vận trình 12 tháng thật.
- Chưa có source registry đầy đủ.
- Chưa có test snapshot cho adapter.
- Chưa gắn Birth Report vào navigation chính.
