# Report Engine

## Mục tiêu

Report Engine là lớp chuyển output của Rule Engine thành report render model và
UI section dùng chung. Nó không tự suy luận, không gọi AI, không ghi database và
không chứa business logic thuật toán.

## Flow

```text
Knowledge
↓
Rule Engine
↓
Facts
↓
Report Engine
↓
Render Model
↓
Mệnh Việt Narrative
↓
UI
```

## Schema

File:

- `/lib/report-engine/report-schema.ts`

Report schema gồm:

- `overview`
- `rawData`
- `keyInsight`
- `interpretation`
- `strengths`
- `cautions`
- `career`
- `finance`
- `relationship`
- `health`
- `recommendations`
- `nextDiscovery`
- `sources`
- `disclaimer`

`ReportRenderModel` mở rộng schema với `anchors` để hỗ trợ cuộn nhanh trong UI.

## Renderer

File:

- `/lib/report-engine/report-renderer.ts`

Input:

- `RuleEngineOutput`

Output:

- `ReportRenderModel`

Renderer chỉ map:

- facts thành section;
- scores thành overview;
- recommendations thành gợi ý áp dụng;
- sources/reasons thành explainability;
- next discovery thành navigation.

Renderer không tạo thuật toán mới và không thay đổi dữ liệu gốc.

## Component Tree

Folder:

- `/components/report-engine`

Component:

- `ReportHeader`
- `ReportOverview`
- `ReportRawData`
- `ReportKeyInsight`
- `ReportInterpretation`
- `ReportStrengths`
- `ReportCautions`
- `ReportCareer`
- `ReportFinance`
- `ReportRelationship`
- `ReportHealth`
- `ReportRecommendations`
- `ReportWhyCard`
- `ReportNextDiscovery`
- `ReportFooter`

Helper nội bộ:

- `ReportSection`

Mỗi section có:

- icon;
- tiêu đề;
- mô tả ngắn;
- anchor;
- animation nhẹ qua `Reveal`;
- mobile-first layout;
- focus-visible style cho keyboard navigation.

## Report Order

Mọi báo cáo phải render theo thứ tự:

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

## Explainability

`ReportWhyCard` hiển thị:

- nguồn dữ liệu;
- rule đã dùng;
- confidence;
- reason.

Không nhắc AI trong phần này. Nếu một fact không có reason hoặc source, module
tích hợp phải coi đó là dữ liệu chưa đủ chuẩn.

## Cách module khác dùng Report Engine

Ví dụ:

```ts
import { runRuleEngine } from "@/lib/rule-engine/rule-runner";
import { renderReportModel } from "@/lib/report-engine/report-renderer";

const ruleOutput = runRuleEngine(knowledge);
const report = renderReportModel(ruleOutput);
```

Sau đó render các component theo thứ tự chuẩn:

```tsx
<ReportHeader report={report} />
<ReportOverview report={report} />
<ReportRawData report={report} />
<ReportKeyInsight report={report} />
<ReportInterpretation report={report} />
<ReportStrengths report={report} />
<ReportCautions report={report} />
<ReportCareer report={report} />
<ReportFinance report={report} />
<ReportRelationship report={report} />
<ReportHealth report={report} />
<ReportRecommendations report={report} />
<ReportWhyCard report={report} />
<ReportNextDiscovery report={report} />
<ReportFooter report={report} />
```

## Cách mở rộng

1. Thêm report adapter riêng cho từng module.
2. Thêm validator để bắt report thiếu section bắt buộc.
3. Thêm snapshot test cho render model.
4. Tách narrative templates theo domain.
5. Thêm source confidence policy cho Premium.
6. Thêm detail page report sau khi SaveAnalysis có payload ổn định.

## Những phần chưa làm

- Chưa nối vào dashboard hoặc các module hiện tại.
- Chưa có report detail page.
- Chưa có validator bắt thiếu section.
- Chưa có automated tests.
- Chưa có narrative template registry riêng.
