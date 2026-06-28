# Design System

## Tinh thần thị giác

Mệnh Việt AI cần có cảm giác huyền bí nhưng cao cấp: tối, tinh tế, có chiều sâu,
không lòe loẹt, không dùng hiệu ứng mê tín rẻ tiền.

Từ khóa thiết kế:

- Premium
- Calm
- Vietnamese
- Insightful
- Trustworthy
- Mobile-first

## Màu sắc

Nền:

- Dark charcoal, near-black, deep ink.
- Có thể dùng radial light rất nhẹ, không dùng orb/bokeh lòe loẹt.

Accent:

- Gold/amber cho hành động chính.
- Jade/teal cho điểm nhấn phụ.
- Muted slate cho border/card.

Tránh:

- Purple gradient quá phổ biến.
- Màu neon.
- Đỏ/đen kiểu mê tín cực đoan.
- Palette một màu đơn điệu.

## Typography

- Heading: chắc, rõ, không quá trang trí.
- Body: dễ đọc trên mobile, line-height rộng.
- Không dùng font quá fantasy.
- Không scale font bằng viewport width.
- Không dùng negative letter spacing.

## Spacing

- Mobile-first: padding 20px là mặc định tốt.
- Desktop dùng max-width rõ ràng.
- Các section cần thở, nhưng dashboard phải đủ dense để scan nhanh.

## Card

- Border radius tối đa 8px trừ khi design system thay đổi.
- Card dùng cho item, panel, form, dashboard block.
- Không đặt card trong card nếu không cần.
- Glass effect phải tiết chế: `bg-card/60`, border nhẹ, blur vừa phải.

## Button

- Primary: màu gold/amber, dùng cho CTA chính.
- Secondary: muted, dùng cho action phụ.
- Ghost: navigation hoặc action nhẹ.
- Icon dùng `lucide-react` khi có thể.

## Icon

- Dùng icon chức năng, không trang trí quá mức.
- Icon phải hỗ trợ scan nhanh: arrow, compass, sparkles, chart, user, lock.

## Animation

- Dùng ít, mượt, phục vụ feedback.
- Không dùng animation gây nhiễu trong dashboard.
- Loading state rõ ràng cho form submit/server action.

## Tone

- Tĩnh, sâu, hiện đại.
- Không phán quyết tuyệt đối.
- Không hù dọa.
- Luôn có disclaimer cho nội dung tử vi/phong thủy.
