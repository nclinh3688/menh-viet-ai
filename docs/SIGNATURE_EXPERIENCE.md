# Signature Experience

Public Beta 05 định nghĩa trải nghiệm đặc trưng cho các báo cáo Mệnh Việt. Sprint
này chỉ nâng UX, không thêm AI, payment hoặc knowledge mới.

## 1. Signature Insight

Signature Insight là card nổi bật nhất và nằm gần đầu báo cáo. Nội dung lấy từ
`report.keyInsight`, các yếu tố tạo nên insight lấy từ facts hiện có trong
`report.rawData.facts`, confidence lấy từ `report.overview.confidence`.

Không tạo kết luận mới trong component. Component chỉ render dữ liệu đã có.

## 2. Explain Why Timeline

Why Card hiển thị theo flow:

```text
Knowledge
↓
Rule
↓
Reason
↓
Conclusion
```

Mỗi dòng lấy từ `report.why`:

- Knowledge: source id được resolve qua Source Registry.
- Rule: rule id/name do Rule Engine trả về.
- Reason: lý do đi kèm fact.
- Conclusion: fact code và confidence.

Không chỉ list source, nhưng cũng không thêm suy luận ngoài dữ liệu report.

## 3. Knowledge Discovery

`KnowledgeDiscovery` hiển thị "Khám phá thêm" dưới các section chính. Dữ liệu lấy
từ Knowledge Graph/Knowledge Pack hiện có, cụ thể là related knowledge của Ngũ
Hành trong Birth Report.

Nếu không có related knowledge, component không render.

## 4. Journey Progress

Journey Progress đổi thành "Hành trình khám phá" và hiển thị:

```text
Đã khám phá: X / Y chủ đề
```

`X` được tính từ các section có dữ liệu thật. `Y` được tính từ anchors, next
discovery, sources và raw facts hiện có trong report. Không hard-code số chủ đề.

## 5. One Thing To Remember

Cuối báo cáo có card "Nếu chỉ nhớ một điều...". Nội dung rút từ câu đầu của
Signature Insight. Không dùng AI và không tạo dữ liệu mới.

## 6. Share Experience

Share Card được nâng cấp thành card chia sẻ trực quan hơn:

- Logo/tên Mệnh Việt
- Tên người dùng
- Insight
- Màu hợp
- Điểm hôm nay nếu có
- QR website placeholder bằng CSS

Chưa export ảnh và không gọi API.

## 7. Animation

Sprint này dùng lại `Reveal` và `premium-surface` đã có để giữ animation nhẹ:

- Fade/translate nhẹ khi section xuất hiện.
- Hover lift/glow nhẹ trên card.
- Tôn trọng `prefers-reduced-motion`.

Không thêm canvas, Three.js hoặc animation nặng.

## 8. Quy tắc mở rộng

- Component chỉ render dữ liệu đã chuẩn hóa.
- Không viết kết luận tử vi trực tiếp trong React component.
- Không nhắc AI trong report UI.
- Không thêm knowledge trong UI.
- Nếu thiếu dữ liệu, component nên không render thay vì bịa nội dung.
