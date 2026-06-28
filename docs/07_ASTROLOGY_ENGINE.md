# Astrology Engine

## Nguyên tắc

- Tất cả thuật toán nằm trong `/lib/astrology`.
- Component React chỉ nhận data đã xử lý, không chứa thuật toán.
- Thuật toán phải có type rõ ràng và test nhanh được.
- Không khẳng định kết quả là sự thật tuyệt đối.
- Summary phải có disclaimer: "Nội dung chỉ mang tính tham khảo và khám phá bản thân."

## Can Chi

Module: `/lib/astrology/can-chi.ts`

Hiện dùng:

- Can = `(year + 6) % 10`
- Chi = `(year + 8) % 12`

Kết quả:

- Thiên Can
- Địa Chi
- Con giáp

## Ngũ Hành

Module: `/lib/astrology/elements.ts`

Nội dung:

- Năm hành: Kim, Mộc, Thủy, Hỏa, Thổ.
- Tương sinh.
- Tương khắc.
- Màu hợp.
- Màu nên tiết chế.
- Số hợp.
- Gợi ý nghề nghiệp.

## Cung Phi

Module: `/lib/astrology/cung-phi.ts`

Hiện dùng MVP theo năm sinh và giới tính. `OTHER` trả hướng trung lập.

Cần mở rộng:

- Bảng tra cứu đầy đủ hơn.
- Kiểm thử theo từng năm.
- Giải thích Đông/Tây tứ mệnh rõ ràng.

## Birth Chart

Module: `/lib/astrology/birth-chart.ts`

Sinh dữ liệu:

- Can Chi
- Con giáp
- Ngũ hành
- Nạp âm
- Cung Phi
- Màu, số, hướng
- Summary

## Hợp tuổi

Giai đoạn sau cần tính:

- Thiên Can
- Địa Chi
- Ngũ Hành
- Cung Phi
- Điểm tổng
- Chi tiết điểm thành phần

Không dùng ngôn ngữ "chắc chắn chia tay", "đại họa", "bắt buộc cưới/không cưới".

## Thần số học

Giai đoạn sau cần module riêng:

- Life Path
- Destiny
- Soul Urge
- Personal Year

## Ngày đẹp

Giai đoạn sau:

- Lịch âm/dương.
- Trực ngày.
- Hoàng đạo/hắc đạo.
- Tuổi xung.
- Mục đích: cưới hỏi, khai trương, ký kết.

## Daily Fortune

Hiện có demo deterministic. Giai đoạn sau cần thuật toán thật hơn, nhưng vẫn
phải giữ tính tham khảo và không tạo phụ thuộc tâm lý.
