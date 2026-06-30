# Knowledge SEO + Item Quality v1

Knowledge K7 nâng Knowledge Center để các trang category và item có cấu trúc SEO
rõ hơn, có thể index tốt hơn và dễ audit chất lượng nội dung.

## Metadata

Route `/knowledge/[slug]` tạo metadata động:

- `title`: theo category hoặc Knowledge Item.
- `description`: theo mô tả category hoặc summary của item.
- `canonical`: `/knowledge/[slug]`.
- OpenGraph: title, description, URL, locale, siteName.
- Twitter Card: summary large image metadata cơ bản.

Nếu slug không khớp category hoặc item, route dùng `notFound()`.

## JSON-LD

Trang category render:

- `CollectionPage`
- `BreadcrumbList`

Trang item render:

- `DefinedTerm`
- `BreadcrumbList`
- `FAQPage` nếu item có FAQ trong seed hiện có.

JSON-LD được render bằng `<script type="application/ld+json">` trong route server
component, không gọi API ngoài.

## Breadcrumb

Breadcrumb UI theo thứ tự:

```text
Trang chủ > Tri thức > Danh mục > Item
```

Category page không có node item cuối. Item page tự tìm category phù hợp từ
`knowledgeTopics` và dữ liệu registry.

## Item quality layout

Trang item theo thứ tự:

1. Tiêu đề
2. Summary
3. Dữ liệu chính
4. Ý nghĩa
5. Ứng dụng
6. Hiểu lầm thường gặp
7. FAQ
8. Quan hệ tri thức
9. Nguồn
10. Cập nhật lần cuối
11. Internal linking

Với item chưa có detail schema riêng, page vẫn hiển thị dữ liệu chuẩn từ
`KnowledgeItem`.

## Sitemap

`app/sitemap.ts` hiện include:

- `/knowledge`
- toàn bộ category route từ `knowledgeTopics`
- toàn bộ item route từ Knowledge Registry

Các route được dedupe bằng `Set`.

## Dev-only warning

Trong development, trang item hiển thị warning nếu thiếu:

- summary
- sources
- references
- version
- lastUpdated
- relatedKnowledge

Production không hiển thị warning này.

## Phần còn thiếu

- Chưa thêm Article schema vì item hiện phù hợp với `DefinedTerm` hơn.
- Chưa có automated SEO snapshot test.
- Chưa seed đủ detail schema cho Thiên Can, Địa Chi, Nạp Âm, Cung Phi và Bát Trạch.
- Chưa thêm OpenGraph image riêng cho từng item.
