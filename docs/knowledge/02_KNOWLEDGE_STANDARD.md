# Knowledge Standard

## Knowledge Item là gì?

Knowledge Item là đơn vị tri thức nhỏ nhất mà Mệnh Việt cho phép sử dụng trong
luận giải. Mọi rule, recommendation và narrative phải tham chiếu tới Knowledge
Item thay vì viết trực tiếp từ cảm tính.

## Cấu trúc bắt buộc

```ts
interface KnowledgeItem {
  id: string;
  category: string;
  title: string;
  description: string;
  evidence: string[];
  reason: string;
  source: KnowledgeSource;
  confidence: number;
  tags: string[];
  references: string[];
}
```

## Giải thích từng trường

### id

Định danh duy nhất, ổn định và có thể tham chiếu trong rule engine.

Ví dụ:

- `five-elements.fire.lucky-colors`
- `cung-phi.khon.good-directions`
- `numerology.life-path.6.strengths`

### category

Nhóm tri thức chính.

Ví dụ:

- `five-elements`
- `can-chi`
- `cung-phi`
- `compatibility`
- `numerology`
- `good-day`
- `feng-shui`

### title

Tên ngắn, dễ hiểu cho người biên tập và developer.

Ví dụ:

- `Màu hợp hành Hỏa`
- `Hướng tốt cung Khôn`

### description

Mô tả nội dung tri thức ở dạng trung lập, không khẳng định tuyệt đối.

Không viết:

- "Người mệnh Hỏa chắc chắn hợp màu đỏ."

Nên viết:

- "Trong hệ Ngũ Hành, màu đỏ thường được gắn với hành Hỏa và có thể dùng như
  một gợi ý tham khảo khi chọn màu chủ đạo."

### evidence

Danh sách dữ kiện làm cơ sở cho Knowledge Item.

Ví dụ:

- `element = Hỏa`
- `color group = đỏ, cam, tím`
- `relation = same element`

### reason

Giải thích tại sao evidence dẫn tới description.

Ví dụ:

- "Màu đỏ, cam và tím thường được quy về hành Hỏa, nên được xem là cùng hệ với
  bản mệnh Hỏa trong ngữ cảnh màu sắc tham khảo."

### source

Nguồn chính của tri thức.

Ví dụ:

```ts
interface KnowledgeSource {
  primary: string;
  secondary?: string[];
  notes?: string;
}
```

### confidence

Điểm tin cậy từ `0` đến `100`.

- `90-100`: quy tắc lõi, ít tranh cãi trong phạm vi hệ thống.
- `70-89`: quy tắc phổ biến nhưng có biến thể theo trường phái.
- `50-69`: dữ liệu tham khảo, cần giải thích rõ giới hạn.
- `<50`: không dùng cho kết luận chính, chỉ dùng nếu có nhãn thử nghiệm.

### tags

Từ khóa phục vụ tìm kiếm, grouping và SEO nội bộ.

Ví dụ:

- `["mau-hop", "hoa", "ngu-hanh"]`

### references

Danh sách tài liệu, bảng tra cứu, file nội bộ hoặc nguồn đã kiểm duyệt.

Ví dụ:

- `/lib/astrology/elements.ts`
- `/docs/knowledge/source/five-elements-color-table.md`

## Quy tắc sử dụng

1. Không tạo narrative nếu thiếu Knowledge Item.
2. Không nâng confidence nếu thiếu source.
3. Không dùng Knowledge Item có confidence thấp cho Premium insight chính.
4. Mọi knowledge thay đổi phải có lý do và người chịu trách nhiệm.
5. AI không được tự tạo Knowledge Item ở runtime.
