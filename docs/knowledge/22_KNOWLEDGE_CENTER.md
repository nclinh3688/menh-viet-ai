# Knowledge Center

Knowledge K6 tạo nền tảng Encyclopedia cho Mệnh Việt. Đây không phải blog và
không thêm AI API, payment, SQL database hoặc thay đổi Rule Engine.

## Mục tiêu

Knowledge Center giúp người dùng học, tra cứu và hiểu sâu hơn về các hệ tri thức:

- Thiên Can
- Địa Chi
- Ngũ Hành
- Nạp Âm
- Cung Phi
- Bát Trạch
- Thần số học
- Hợp tuổi
- Ngày đẹp
- Phong thủy

## Flow

1. Người dùng vào `/knowledge`.
2. Xem các danh mục tri thức.
3. Search theo keyword, tag hoặc category.
4. Mở category như `/knowledge/five-elements`.
5. Mở Knowledge Item như `/knowledge/ngu-hanh-hoa`.
6. Xem nguồn, graph và related knowledge.

## Kiến trúc

- `app/knowledge/page.tsx`: trang chủ Knowledge Center.
- `app/knowledge/[slug]/page.tsx`: route động cho category hoặc item.
- `app/knowledge/knowledge-topics.ts`: định nghĩa danh mục Encyclopedia.
- `components/knowledge/*`: Explorer components.
- `lib/knowledge-db/stats/knowledge-stat-builder.ts`: thống kê tổng item, item theo category và completeness.

## Search

Search dùng `lib/knowledge-db/knowledge-search.ts` hiện có:

- `keyword`
- `tag`
- `category`

Không tạo search engine mới.

## Knowledge Graph

Trang item dùng `getKnowledgeGraph()` và `getRelatedKnowledge()` để render:

- SEE_ALSO
- RELATED
- GENERATES
- GENERATED_BY
- CONTROLS
- CONTROLLED_BY
- BELONGS_TO
- HAS_VARIANT

## Dữ liệu hiện tại

Seed có chiều sâu nhất hiện là Ngũ Hành. Các category chưa có item đủ chuẩn hiển
thị trạng thái đang chuẩn hóa, không tự tạo dữ liệu.

## Quality

- Không dùng ngôn ngữ khẳng định quá mức.
- Không dùng wording gây sợ hãi.
- Không nhắc tới việc máy tự diễn giải nội dung.
- Không tạo knowledge mới trong UI.
- Nếu thiếu dữ liệu, hiển thị empty state.

## Roadmap K7

- Seed Thiên Can đầy đủ.
- Seed Địa Chi đầy đủ.
- Seed Nạp Âm theo bảng chuẩn.
- Seed Cung Phi/Bát Trạch.
- Thêm canonical cho từng Knowledge Item.
- Thêm structured data FAQ cho item đủ dữ liệu.
- Thêm kiểm thử search/category/graph.
