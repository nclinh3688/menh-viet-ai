# Five Elements Pack v1

## Pack gồm gì

Ngũ Hành Pack v1 gồm:

- Overview: `five-elements.overview`
- Kim: `five-elements.kim.foundation`
- Mộc: `five-elements.moc.foundation`
- Thủy: `five-elements.thuy.foundation`
- Hỏa: `five-elements.hoa.foundation`
- Thổ: `five-elements.tho.foundation`

Overview lưu dữ liệu cấu trúc về:

- Ngũ Hành là gì;
- 5 hành gồm gì;
- vòng tương sinh;
- vòng tương khắc;
- ứng dụng trong tử vi;
- ứng dụng trong phong thủy;
- ứng dụng trong hợp tuổi;
- giới hạn tham khảo.

Mỗi hành có thêm:

- FAQ;
- ví dụ ứng dụng thực tế;
- hiểu nhầm thường gặp;
- cách dùng trong report;
- SEO keywords;
- share insight templates;
- related knowledge đầy đủ hơn.

## Helper đã tạo

File:

`/lib/knowledge-db/astrology/five-elements-pack.ts`

Exports:

- `getFiveElementKnowledge(element)`
- `getFiveElementRelations(element)`
- `getFiveElementOverview()`
- `getFiveElementSeoData(element)`
- `getFiveElementReportFacts(element)`

Helper nhận cả tên có dấu và không dấu như `Hỏa`, `hoa`, `Thủy`, `thuy`.

## Graph đã hoàn thiện

Graph Ngũ Hành có:

- đủ chiều `GENERATES`;
- đủ chiều `GENERATED_BY`;
- đủ chiều `CONTROLS`;
- đủ chiều `CONTROLLED_BY`;
- mỗi hành `BELONGS_TO` overview;
- overview `HAS_VARIANT` tới 5 hành;
- mỗi hành `SEE_ALSO` overview.

Ví dụ Hỏa:

```txt
Mộc -> Hỏa -> Thổ
Thủy -> Hỏa -> Kim
Hỏa -> five-elements.overview
five-elements.overview -> Hỏa
```

## Birth Report dùng thế nào

Birth Report Adapter lấy `birthChart.element`, gọi
`getFiveElementReportFacts(element)` và đưa dữ liệu vào:

- source explanation khi source là `FIVE_ELEMENTS`;
- phần personality/strengths;
- một gợi ý áp dụng ngắn trong recommendations.

Report vẫn không tự suy luận ngoài Knowledge Pack và Rule Engine.

## Nguyên tắc nội dung

- Dữ liệu ngắn, có cấu trúc.
- Không dùng ngôn ngữ khẳng định quá mức.
- Health notes luôn nói rõ chỉ mang tính tham khảo và không thay thế tư vấn y tế.
- Source dùng `FIVE_ELEMENTS`.
- Không tạo bài viết dài trong seed.

## Phần còn thiếu

- Chưa có reviewer workflow.
- Chưa có source phụ ngoài registry nội bộ.
- Chưa có FAQ mở rộng theo từng nhu cầu người dùng.
- Chưa có tự động kiểm tra link trỏ tới item không tồn tại.
- Chưa gắn pack vào SEO page generation.
