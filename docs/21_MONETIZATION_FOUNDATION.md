# Monetization Foundation

## Mô hình người dùng

### Anonymous

Người dùng chưa đăng nhập. Vẫn được dùng sản phẩm miễn phí để thấy giá trị trước:

- 3 lượt phân tích/ngày.
- Xem dashboard cơ bản.
- Không lưu lịch sử dài.
- Không bắt đăng nhập.

### Registered

Người dùng đã đăng nhập miễn phí:

- 10 lượt phân tích/ngày.
- Có thể lưu hồ sơ sau này.
- Có thể đồng bộ nhiều thiết bị sau này.
- Chuẩn bị cho lịch sử phân tích.

### Premium

Người dùng trả phí trong tương lai:

- Không giới hạn phân tích cơ bản.
- Mở luận giải chuyên sâu.
- Lưu lịch sử.
- Báo cáo PDF sau này.
- Giá MVP dự kiến: `99.000đ/tháng`.

### Pro

Gói cao hơn dành cho AI/PDF nâng cao:

- Không giới hạn phân tích cơ bản.
- AI Coach.
- PDF nâng cao.
- Tư vấn cá nhân hóa.
- Giá MVP dự kiến: `199.000đ/tháng`.

## Giới hạn từng gói

| Gói | Lượt/ngày | Lưu lịch sử | PDF | AI Chat | Báo cáo nâng cao |
| --- | --- | --- | --- | --- | --- |
| Free | 3 | Không | Không | Không | Không |
| Registered | 10 | Có | Không | Không | Không |
| Premium | Không giới hạn | Có | Có | Không | Có |
| Pro | Không giới hạn | Có | Có | Có | Có |

## Tính năng khóa Premium

- Luận giải chuyên sâu.
- Báo cáo PDF cá nhân.
- AI tư vấn vận trình.
- Vận trình 12 tháng.

Các card khóa chỉ là preview sản phẩm. Không dùng ngôn ngữ gây sợ hãi hoặc ép
mua.

## Vì sao chưa tích hợp payment thật

Chưa tích hợp payment trong sprint này vì cần hoàn thiện trước:

- Auth thật.
- Usage tracking thật.
- Gắn hồ sơ anonymous vào user.
- Chính sách giá, hoàn tiền, hóa đơn.
- Điều khoản sử dụng và nội dung pháp lý.

Tránh tích hợp thanh toán khi sản phẩm chưa có guardrail đầy đủ.

## Roadmap payment sau này

1. Tích hợp Auth.js/NextAuth thật.
2. Tạo bảng usage tracking hoặc event log.
3. Tạo middleware/helper kiểm tra quyền theo plan.
4. Tạo Stripe/PayOS/MoMo sandbox tùy thị trường mục tiêu.
5. Đồng bộ webhook payment vào `Subscription`.
6. Thêm trang quản lý tài khoản và trạng thái gói.
7. Mở khóa từng feature Premium theo `canUseFeature`.
