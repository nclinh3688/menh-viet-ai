# Mệnh Việt AI

Website nền tảng cho Mệnh Việt AI, xây dựng bằng Next.js App Router,
TypeScript, Tailwind CSS, shadcn/ui-ready structure, Prisma và SQLite dev.

## Chạy local

```bash
npm install
cp .env.example .env
npx prisma generate
npx prisma db push
npm run dev
```

Mặc định Prisma dùng SQLite tại `prisma/dev.db` qua `DATABASE_URL` trong `.env`.

## Database

Sprint 3 dùng Prisma với SQLite cho môi trường dev. Schema hiện có các nhóm dữ
liệu nền tảng:

- `User`: người dùng cơ bản.
- `Profile`: hồ sơ ngày sinh, giới tính, nơi sinh và mối quan tâm.
- `BirthChart`: lá số cơ bản gắn với một hồ sơ.
- `CompatibilityReport`: báo cáo hợp tuổi/hôn nhân từ hai hồ sơ hoặc dữ liệu nhập tay.
- `DailyFortune`: lịch sử phân tích theo ngày cho từng hồ sơ.
- `Subscription`: gói tài khoản nội bộ, chưa tích hợp thanh toán thật.
- `AiReport`: lịch sử báo cáo phân tích, chưa tích hợp AI API thật.

Các trường dạng danh sách/chi tiết như màu may mắn, hướng tốt hoặc nội dung so
khớp đang lưu dưới dạng chuỗi JSON để tương thích SQLite dev. Khi chuyển sang
PostgreSQL có thể migrate các trường này sang kiểu `Json` nếu cần.

Lệnh kiểm tra database:

```bash
npx prisma generate
npx prisma db push
```
