# Database Design

## Hiện tại

Database dùng Prisma với SQLite dev. Schema cần giữ dễ migrate sang PostgreSQL.

## User

Lưu thông tin người dùng khi có auth.

Trường chính:

- `id`
- `name`
- `email`
- `image`
- `createdAt`
- `updatedAt`

Quan hệ:

- Một User có nhiều Profile.
- Một User có nhiều Subscription.
- Một User có nhiều AiReport.

## Profile

Lưu hồ sơ ngày sinh. Có thể tạo trước khi auth, nên `userId` optional.

Trường chính:

- `fullName`
- `birthDate`
- `birthTime`
- `gender`
- `birthPlace`
- `calendarType`
- `relationshipStatus`
- `mainInterest`

## BirthChart

Lưu lá số cơ bản sinh từ Astrology Engine.

Hiện các field list lưu dạng string JSON:

- `luckyColors`
- `unluckyColors`
- `luckyNumbers`
- `goodDirections`
- `badDirections`

Khi chuyển PostgreSQL có thể migrate sang `Json`.

## CompatibilityReport

Lưu báo cáo hợp tuổi/hôn nhân. Cho phép có Profile hoặc dữ liệu nhập tay dạng
JSON string để hỗ trợ user chưa đăng nhập.

## DailyFortune

Lưu phân tích theo ngày khi thuật toán Daily Fortune thật được triển khai.
Sprint hiện tại mới có demo deterministic, chưa ghi DB.

## Subscription

Lưu gói tài khoản nội bộ:

- `FREE`
- `PREMIUM`
- `PRO`

Không tích hợp payment thật ở giai đoạn đầu.

## AiReport

Lưu lịch sử báo cáo AI khi có AI thật. Hiện chưa tích hợp AI API.

## Mở rộng đề xuất

### BlogPost

Dùng cho SEO/CMS.

Trường đề xuất:

- `id`
- `slug`
- `title`
- `description`
- `content`
- `status`
- `publishedAt`
- `createdAt`
- `updatedAt`

### Payment

Dùng khi tích hợp payment thật.

Trường đề xuất:

- `id`
- `userId`
- `provider`
- `providerPaymentId`
- `amount`
- `currency`
- `status`
- `createdAt`

### UsageLimit

Kiểm soát quota Free/Premium/Pro.

Trường đề xuất:

- `id`
- `userId`
- `feature`
- `used`
- `limit`
- `periodStart`
- `periodEnd`
