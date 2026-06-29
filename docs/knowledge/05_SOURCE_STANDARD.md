# Source Standard

## Mục tiêu

Mọi kết luận trong Mệnh Việt phải khai báo nguồn. Nguồn giúp người dùng hiểu vì
sao hệ thống đưa ra nhận định, đồng thời giúp đội sản phẩm kiểm soát chất lượng
tri thức.

## Trường bắt buộc cho mỗi kết luận

```ts
interface ConclusionSource {
  primarySource: string;
  secondarySources: string[];
  confidence: number;
  explanation: string;
}
```

## Nguồn chính

Nguồn chính là hệ quy chiếu có ảnh hưởng lớn nhất tới kết luận.

Ví dụ:

- Màu hợp: `Ngũ Hành`
- Hướng tốt: `Cung Phi`
- Điểm hợp tuổi: `Cung Phi`, nếu weight cao nhất là Cung Phi

## Nguồn phụ

Nguồn phụ là các hệ quy chiếu hỗ trợ hoặc điều chỉnh kết luận.

Ví dụ:

- Màu hợp có thể dùng `Cung Phi` làm nguồn phụ.
- Hợp tuổi có thể dùng `Thiên Can`, `Địa Chi`, `Ngũ Hành` làm nguồn phụ.

## Độ tin cậy

Confidence từ `0` đến `100`.

Confidence phải dựa trên:

- mức ổn định của rule;
- số nguồn đồng thuận;
- độ rõ của dữ liệu đầu vào;
- conflict với nguồn khác nếu có.

## Giải thích

Giải thích phải cho biết nguồn dẫn tới kết luận như thế nào.

Không viết:

- "Vì hệ thống thấy vậy."

Nên viết:

- "Màu này thuộc cùng hành với bản mệnh theo bảng Ngũ Hành, đồng thời không xung
  đột với nhóm hướng theo Cung Phi trong dữ liệu hiện có."

## Ví dụ: Màu hợp

```ts
const luckyColorSource = {
  primarySource: "Ngũ Hành",
  secondarySources: ["Cung Phi"],
  confidence: 100,
  explanation:
    "Màu hợp được lấy từ bảng màu theo Ngũ Hành bản mệnh. Cung Phi chỉ dùng để kiểm tra thêm, không thay thế nguồn chính.",
};
```

Hiển thị cho người dùng:

```text
Nguồn: Ngũ Hành, Cung Phi
Độ tin cậy: 100%
Giải thích: Màu hợp được xác định chủ yếu từ Ngũ Hành bản mệnh.
```

## Quy tắc khi thiếu nguồn

1. Nếu thiếu nguồn chính: không hiển thị kết luận.
2. Nếu thiếu nguồn phụ: vẫn có thể hiển thị nhưng phải giảm confidence nếu kết
   luận cần nhiều góc nhìn.
3. Nếu confidence dưới `70`: không dùng làm Signature Insight.
4. Nếu có conflict nguồn: chuyển sang rule conflict resolution.
