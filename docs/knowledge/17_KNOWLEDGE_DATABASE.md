# Knowledge Database Foundation

## Vai trò

Knowledge Database là lớp tri thức độc lập của Mệnh Việt. AI, Rule Engine,
Report Engine và Narrative Engine chỉ được sử dụng knowledge đã được chuẩn hóa,
không tự sở hữu hoặc tự tạo knowledge ở runtime.

Sprint K1 chỉ tạo foundation bằng TypeScript registry, chưa dùng SQL database.

## Kiến trúc

```txt
Knowledge Registry
  -> Knowledge Loader
  -> Knowledge Validator
  -> Knowledge Index
  -> Knowledge Search
  -> Rule/Report/Narrative Engine ở các sprint sau
```

## File chính

- `/lib/knowledge-db/knowledge-item.ts`: định nghĩa `KnowledgeItem`.
- `/lib/knowledge-db/knowledge-category.ts`: category chuẩn.
- `/lib/knowledge-db/knowledge-registry.ts`: registry code-based cho MVP.
- `/lib/knowledge-db/knowledge-index.ts`: index theo id, slug, tag, category.
- `/lib/knowledge-db/knowledge-loader.ts`: load registry và chạy validation.
- `/lib/knowledge-db/knowledge-validator.ts`: kiểm tra chất lượng knowledge.
- `/lib/knowledge-db/knowledge-search.ts`: tìm kiếm knowledge.

## Knowledge Item

Mỗi item gồm:

- `id`: mã ổn định, duy nhất.
- `slug`: slug dùng cho SEO/internal linking sau này.
- `title`: tiêu đề ngắn.
- `category`: một trong các category chuẩn.
- `summary`: tóm tắt trung lập.
- `content`: nội dung tri thức.
- `sources`: danh sách SourceId từ Source Registry.
- `references`: file/tài liệu liên quan.
- `tags`: tag phục vụ search.
- `relatedKnowledge`: id các item liên quan.
- `confidence`: 0-100.
- `version`: version tri thức.
- `lastUpdated`: ngày cập nhật.

## Category chuẩn

- `ASTROLOGY`
- `FENG_SHUI`
- `NUMEROLOGY`
- `GOOD_DAY`
- `COMPATIBILITY`
- `CONCEPT`

## Cách thêm Knowledge mới

1. Tạo item trong `knowledge-registry.ts`.
2. Đặt `id` ổn định, ví dụ `astrology.can-chi.year-cycle`.
3. Đặt `slug` dễ đọc, không trùng.
4. Chọn category chuẩn.
5. Gắn `sources` bằng SourceId, không dùng label tiếng Việt trực tiếp.
6. Thêm ít nhất một `reference`.
7. Ghi `version` và `lastUpdated`.
8. Chạy lint/build để TypeScript và validator không lỗi.

Ví dụ:

```ts
{
  id: "concept.five-elements.overview",
  slug: "ngu-hanh-la-gi",
  title: "Ngũ Hành là gì?",
  category: "CONCEPT",
  sources: ["FIVE_ELEMENTS"],
  version: "1.0.0",
  lastUpdated: "2026-06-29",
}
```

## Validator

Validator kiểm tra:

- id trùng;
- slug trùng;
- thiếu nguồn;
- source không tồn tại trong Source Registry;
- thiếu references;
- thiếu version;
- confidence ngoài khoảng 0-100;
- category không hợp lệ.

Kết quả trả về:

- `isPass`
- `errors`
- `warnings`

## Search

`searchKnowledge()` hỗ trợ tìm theo:

- `id`
- `slug`
- `tag`
- `category`
- `keyword`

Keyword tìm trong id, slug, title, summary, content và tags.

## Registry hiện tại

K1 chỉ seed một số item MVP:

- `concept.five-elements.overview`
- `astrology.can-chi.year-cycle`
- `feng-shui.cung-phi.direction-group`

Mục tiêu là chứng minh cấu trúc mở rộng được tới hàng nghìn item, không nhồi dữ
liệu lớn trong sprint foundation.

## Roadmap K2

1. Tách knowledge theo domain file nếu registry bắt đầu lớn.
2. Thêm schema validation nghiêm hơn cho slug/date/version.
3. Tạo quality gate chạy validator trong CI.
4. Kết nối Rule Engine để rule tham chiếu `knowledgeItemIds`.
5. Kết nối Report Engine để Why Card hiển thị knowledge liên quan.
6. Thêm versioning và changelog knowledge.
7. Chuẩn bị migration sang storage riêng nếu cần admin/editor.
