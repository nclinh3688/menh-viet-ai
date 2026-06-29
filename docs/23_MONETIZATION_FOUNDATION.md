# Monetization Foundation

## Mô hình gói

### Free

- 3 lượt phân tích/ngày.
- Hồ sơ cơ bản.
- Không lưu lịch sử dài.
- Không PDF.
- Không AI chat.

### Registered

- 10 lượt/ngày.
- Có thể lưu hồ sơ sau này.
- Đồng bộ nhiều thiết bị sau này.
- Phù hợp người dùng muốn quay lại xem kết quả.

### Premium

- Không giới hạn phân tích cơ bản.
- Luận giải chuyên sâu.
- Lưu lịch sử.
- Vận trình 12 tháng.
- PDF sau này.
- Giá dự kiến: `99.000đ/tháng`.

### Pro

- Tất cả Premium.
- AI Coach.
- Báo cáo nâng cao.
- Ưu tiên tính năng mới.
- Giá dự kiến: `199.000đ/tháng`.

## Tính năng từng gói

| Tính năng | Free | Registered | Premium | Pro |
| --- | --- | --- | --- | --- |
| Lượt/ngày | 3 | 10 | Không giới hạn | Không giới hạn |
| Hồ sơ cơ bản | Có | Có | Có | Có |
| Lưu lịch sử | Không | Có sau này | Có | Có |
| Luận giải chuyên sâu | Không | Không | Có | Có |
| Vận trình 12 tháng | Không | Không | Có | Có |
| PDF | Không | Không | Có sau này | Nâng cao |
| AI Chat | Không | Không | Không | Có |

## Logic giới hạn lượt dùng

Logic nền tảng nằm trong:

- `/lib/subscription/plans.ts`
- `/lib/subscription/usage-limits.ts`

Các helper chính:

- `getPlanLimits(plan)`
- `isUnlimited(plan)`
- `getRemainingUsage({ plan, usedToday })`
- `canUseFeature(plan, feature)`

Sprint này chưa tracking lượt thật bằng database. Dashboard đang dùng demo Free
user với 3 lượt/ngày để kiểm tra UI.

## Premium Lock hoạt động thế nào

Component:

- `/components/subscription/premium-lock.tsx`

Ứng dụng:

- Dashboard section "Tính năng nâng cao".
- Các card khóa:
  - Luận giải chuyên sâu.
  - Báo cáo PDF cá nhân.
  - AI tư vấn vận trình.
  - Vận trình 12 tháng.

Premium Lock chỉ giới thiệu tính năng bị khóa. Không chặn nội dung cơ bản, không
gây sợ hãi và không ép thanh toán.

## Vì sao chưa tích hợp payment thật

Chưa tích hợp payment vì cần hoàn thiện trước:

- Auth thật.
- Usage tracking thật.
- Gắn hồ sơ anonymous vào user.
- Điều khoản sử dụng.
- Chính sách hoàn tiền.
- Webhook đồng bộ subscription.

Không nên nhận tiền khi quyền truy cập và chính sách gói chưa đủ ổn định.

## Roadmap payment sau này

1. Tích hợp Auth.js/NextAuth thật.
2. Thêm usage tracking theo anonymous id/user id.
3. Tạo middleware/helper kiểm tra quyền theo plan.
4. Chọn cổng thanh toán phù hợp thị trường.
5. Tích hợp sandbox payment.
6. Tạo webhook cập nhật `Subscription`.
7. Tạo trang account/billing.
8. Mở khóa tính năng Premium theo `canUseFeature`.
