# Auth And Subscription

## Auth

Giai đoạn đầu có thể cho phép tạo Profile không cần auth. Khi có auth:

- Email/password hoặc OAuth.
- User sở hữu nhiều Profile.
- Dashboard gắn với account.
- Có thể claim hồ sơ anonymous sau khi đăng nhập.

## Free Limit

Đề xuất:

- 1-3 hồ sơ.
- 3-5 lượt phân tích/ngày.
- Daily dashboard cơ bản.
- Không tải PDF hoặc chỉ preview.

## Premium Limit

Đề xuất:

- 10-20 hồ sơ.
- Nhiều lượt phân tích hơn.
- Báo cáo chi tiết.
- PDF tiêu chuẩn.

## Pro Limit

Đề xuất:

- Giới hạn cao theo fair use.
- Công cụ chuyên sâu.
- AI Coach nâng cao.
- Báo cáo chuyên nghiệp.

## Middleware Kiểm Tra Quyền

Giai đoạn sau cần middleware hoặc server helper:

- Xác định user hiện tại.
- Kiểm tra subscription.
- Kiểm tra quota.
- Redirect hoặc trả paywall state.

## Payment

Không tích hợp payment thật ở giai đoạn đầu. Trước khi làm payment cần rõ:

- Provider.
- Webhook.
- Refund/cancel policy.
- Invoice.
- Support flow.
- Legal disclaimer.
