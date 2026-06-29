# Knowledge Graph Foundation

## Mục tiêu

Knowledge Graph giúp Knowledge Item không còn là dữ liệu rời rạc. Mỗi item có
thể biết nó liên quan tới gì, sinh ra từ gì, ảnh hưởng tới gì và được dùng ở
module nào.

K4 chỉ tạo foundation TypeScript, không tạo UI, không dùng AI, không dùng SQL.

## Link types

- `RELATED`: liên quan chung.
- `GENERATES`: item này sinh ra item khác.
- `GENERATED_BY`: item này được sinh bởi item khác.
- `CONTROLS`: item này khắc/kiểm soát item khác.
- `CONTROLLED_BY`: item này bị khắc/kiểm soát bởi item khác.
- `USES`: item này sử dụng item khác.
- `USED_BY`: item này được item khác sử dụng.
- `BELONGS_TO`: item này thuộc một nhóm/khái niệm cha.
- `HAS_VARIANT`: item này có biến thể.
- `SEE_ALSO`: nên xem thêm.

## Knowledge Link

Mỗi link gồm:

- `id`
- `fromKnowledgeId`
- `toKnowledgeId`
- `linkType`
- `description`
- `confidence`
- `sources`
- `version`

## Graph architecture

```txt
Knowledge Items
  -> Knowledge Link Registry
  -> Link Resolver
  -> Knowledge Graph
  -> Graph Search
  -> Rule/Report/Narrative consumers
```

## File chính

- `/lib/knowledge-db/graph/knowledge-link-types.ts`
- `/lib/knowledge-db/graph/knowledge-link-registry.ts`
- `/lib/knowledge-db/graph/knowledge-link-resolver.ts`
- `/lib/knowledge-db/graph/knowledge-graph.ts`
- `/lib/knowledge-db/graph/knowledge-graph-search.ts`

## API

- `getRelatedKnowledge(id)`: trả về các Knowledge Item liên quan trực tiếp.
- `getKnowledgeTree(id, depth)`: mở rộng graph theo nhiều lớp.
- `getKnowledgeGraph(id)`: trả về node/link trực tiếp quanh một item.
- `searchConnectedKnowledge(id)`: tìm một item và các item liên quan.
- `searchKnowledgeWithConnections(input)`: search nhiều item kèm connections.
- `searchKnowledgeWithRelated(input)`: tích hợp nhẹ trong Knowledge Search.

## Ví dụ Hỏa

```txt
Hỏa
  GENERATED_BY -> Mộc
  GENERATES -> Thổ
  CONTROLS -> Kim
  CONTROLLED_BY -> Thủy
  BELONGS_TO -> Ngũ Hành là gì?
```

Các link này đến từ SourceId `FIVE_ELEMENTS`, dùng vòng tương sinh và tương
khắc của seed K3.

## Cách thêm link mới

1. Đảm bảo `fromKnowledgeId` và `toKnowledgeId` đã tồn tại trong Knowledge DB.
2. Chọn `linkType` từ danh sách chuẩn.
3. Viết `description` ngắn, trung lập, không diễn giải quá mức.
4. Gắn `sources` bằng SourceId, không dùng label hiển thị.
5. Ghi `confidence` và `version`.
6. Nếu cần chiều ngược, tạo link ngược rõ ràng thay vì suy luận runtime.

## Giới hạn hiện tại

- Chưa có validator riêng cho link trùng hoặc link trỏ tới item không tồn tại.
- Chưa có persistence SQL.
- Chưa có UI graph.
- Chưa có integration vào Report Engine hoặc Rule Engine.
- Link registry hiện seed chủ yếu cho Ngũ Hành K3.
