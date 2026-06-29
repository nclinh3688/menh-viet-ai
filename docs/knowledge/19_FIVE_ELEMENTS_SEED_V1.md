# Five Elements Seed v1

## Mục tiêu

K3 tạo seed tri thức cấu trúc đầu tiên cho 5 hành trong Ngũ Hành. File seed chỉ
lưu tri thức nền để engine/narrative dùng sau này, không phải bài viết dài và
không tạo luận giải cá nhân.

## 5 item đã thêm

- `five-elements.kim.foundation`: Kim
- `five-elements.moc.foundation`: Mộc
- `five-elements.thuy.foundation`: Thủy
- `five-elements.hoa.foundation`: Hỏa
- `five-elements.tho.foundation`: Thổ

## Field chính

Mỗi item gồm:

- `id`
- `slug`
- `name`
- `hanviet`
- `category`
- `summary`
- `element`
- `yinYangNotes`
- `coreMeaning`
- `characteristics`
- `strengths`
- `weaknesses`
- `careerTendencies`
- `financeTendencies`
- `relationshipTendencies`
- `healthNotes`
- `favorableColors`
- `cautiousColors`
- `favorableDirections`
- `favorableNumbers`
- `generatingRelation`
- `controllingRelation`
- `generatedBy`
- `controlledBy`
- `applications`
- `relatedKnowledge`
- `sources`
- `references`
- `confidence`
- `version`
- `lastUpdated`

## Nguyên tắc nội dung

- Viết ngắn, rõ, dạng dữ liệu.
- Không dùng ngôn ngữ khẳng định tương lai.
- Không dùng các từ cấm đã quy định trong Writing Standard.
- Health notes luôn ghi rõ chỉ mang tính tham khảo và không thay thế tư vấn y tế.
- Chỉ mô tả xu hướng nền của Ngũ Hành, chưa tạo luận giải cá nhân.

## Nguồn sử dụng

Mỗi item dùng SourceId:

- `FIVE_ELEMENTS`

References:

- `/lib/astrology/elements.ts`
- `/lib/sources/source-registry.ts`
- `/docs/knowledge/18_ASTROLOGY_KNOWLEDGE_STRUCTURE.md`

## Tích hợp registry

Seed export:

- `FIVE_ELEMENTS_KNOWLEDGE_SEED`: dữ liệu cấu trúc đầy đủ.
- `FIVE_ELEMENTS_KNOWLEDGE_ITEMS`: bản map sang `KnowledgeItem`.

`knowledge-registry.ts` đã thêm `FIVE_ELEMENTS_KNOWLEDGE_ITEMS`, nên
`searchKnowledge()` có thể tìm theo keyword hoặc tag: `Kim`, `Mộc`, `Thủy`,
`Hỏa`, `Thổ`.

## Giới hạn hiện tại

- Chưa có FAQ.
- Chưa có ví dụ thực tế sâu theo từng bối cảnh.
- Chưa có source phụ ngoài Source Registry nội bộ.
- Chưa có reviewer workflow cho dữ liệu tri thức.
- Chưa gắn trực tiếp seed này vào Rule Engine.
