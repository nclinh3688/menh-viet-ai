# Astrology Knowledge Pack Structure

## Mục tiêu

K2 chỉ tạo cấu trúc nhập tri thức cho Astrology Knowledge Pack. Sprint này
không tạo dữ liệu Can Chi, Ngũ Hành, Nạp âm, Cung Phi hoặc hợp tuổi cụ thể.

## Thư mục

`/lib/knowledge-db/astrology`

## Schema đã tạo

- `heavenly-stems.schema.ts`: Thiên Can.
- `earthly-branches.schema.ts`: Địa Chi.
- `five-elements.schema.ts`: Ngũ Hành.
- `nap-am.schema.ts`: Nạp âm.
- `cung-phi.schema.ts`: Cung Phi.
- `bat-trach.schema.ts`: Bát Trạch.
- `compatibility.schema.ts`: Hợp tuổi.

## Base fields

Các schema dùng chung base:

- `id`
- `slug`
- `name`
- `applications`
- `relatedKnowledge`
- `references`
- `sources`
- `confidence`
- `version`

Các schema luận giải dùng thêm:

- `meaning`
- `origin`
- `characteristics`
- `strengths`
- `weaknesses`
- `career`
- `finance`
- `relationship`
- `health`

## Heavenly Stem schema

Thiên Can gồm:

- `id`
- `slug`
- `name`
- `hanviet`
- `element`
- `yinYang`
- `meaning`
- `origin`
- `characteristics`
- `strengths`
- `weaknesses`
- `career`
- `finance`
- `relationship`
- `health`
- `applications`
- `relatedKnowledge`
- `references`
- `sources`
- `confidence`
- `version`

## Factory

`knowledge-factory.ts` cung cấp `createAstrologyKnowledgeItem()` để chuyển một
knowledge pack item thành `KnowledgeItem` chuẩn của Knowledge DB.

Factory không tạo nội dung mới. Nó chỉ chuẩn hóa field:

- category mặc định là `ASTROLOGY`;
- title mặc định lấy từ `name`;
- giữ nguyên source, references, confidence, version.

## Template

`knowledge-template.ts` cung cấp:

- `emptyTextBlock`
- `emptyInterpretationFields`
- `createKnowledgeTemplate()`

Template dùng cho người nhập tri thức điền dữ liệu sau này. Tất cả field nội
dung để trống, không seed tri thức.

## Completeness

`knowledge-completeness.ts` cung cấp `evaluateKnowledgeCompleteness()`.

Input:

- item partial;
- danh sách required fields của schema.

Output:

- `percent`;
- `presentFields`;
- `missingFields`.

Ví dụ kỳ vọng sau này:

```txt
Giáp: 92%
Thiếu:
- FAQ
- Ví dụ thực tế
- Nguồn phụ
```

Trong K2, completeness chỉ tính theo required fields đã định nghĩa trong schema.

## Quy tắc nhập liệu sau này

1. Không nhập tri thức nếu thiếu source.
2. Không dùng label nguồn trực tiếp; dùng SourceId.
3. Không viết kết luận tuyệt đối.
4. Mỗi item cần references đủ rõ để reviewer kiểm tra.
5. Không để AI tự tạo knowledge ở runtime.

## Roadmap K3

1. Tạo pack dữ liệu Thiên Can với từng item được review.
2. Thêm completeness rule nâng cao cho FAQ, ví dụ thực tế và source phụ.
3. Gắn Knowledge Item vào Rule Engine bằng `knowledgeItemIds`.
4. Tạo quality script để kiểm tra toàn bộ pack.
5. Chuẩn bị format import từ file JSON/MDX nếu registry TypeScript quá lớn.
