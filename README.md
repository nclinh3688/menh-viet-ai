# Mệnh Việt AI

Website nền tảng cho Mệnh Việt AI, xây dựng bằng Next.js App Router,
TypeScript, Tailwind CSS, shadcn/ui-ready structure, Prisma và PostgreSQL.

## Chạy local

```bash
npm install
cp .env.example .env
npx prisma generate
npm run prisma:migrate -- --name init_postgres_ready
npm run dev
```

Prisma hiện dùng PostgreSQL qua `DATABASE_URL`. Khi chạy local, dùng PostgreSQL
local hoặc một development branch từ Neon/Supabase/Vercel Postgres.

## Database

Schema hiện dùng Prisma với PostgreSQL để sẵn sàng cho Public Beta production.
Các nhóm dữ liệu nền tảng:

- `User`: người dùng cơ bản.
- `Profile`: hồ sơ ngày sinh, giới tính, nơi sinh và mối quan tâm.
- `BirthChart`: lá số cơ bản gắn với một hồ sơ.
- `CompatibilityReport`: báo cáo hợp tuổi/hôn nhân từ hai hồ sơ hoặc dữ liệu nhập tay.
- `DailyFortune`: lịch sử phân tích theo ngày cho từng hồ sơ.
- `Subscription`: gói tài khoản nội bộ, chưa tích hợp thanh toán thật.
- `AiReport`: lịch sử báo cáo phân tích, chưa tích hợp AI API thật.

Các trường dạng danh sách/chi tiết như màu may mắn, hướng tốt hoặc nội dung so
khớp vẫn lưu dưới dạng chuỗi JSON để giữ migration an toàn. Có thể chuyển sang
kiểu `Json` trong một sprint database riêng nếu cần query sâu hơn.

Lệnh kiểm tra database:

```bash
npx prisma generate
npm run prisma:migrate -- --name init_postgres_ready
```

## Deploy Vercel

Public Beta nên deploy trên Vercel với build command mặc định `npm run build`.
Project dùng PostgreSQL cho production. Database managed nên dùng Vercel
Postgres, Neon hoặc Supabase.

Biến môi trường cần cấu hình trên Vercel:

```bash
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require
AUTH_SECRET=
AUTH_URL=https://your-domain.com
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME="Mệnh Việt AI"
```

Trong giai đoạn local, dùng PostgreSQL local hoặc database branch riêng. SQLite
không còn là cấu hình khuyến nghị cho Public Beta vì production cần dữ liệu bền
vững trên Vercel.

Checklist deploy nhanh:

```bash
npm install
npx prisma generate
npm run prisma:deploy
npm run lint
npm run build
```

Google OAuth redirect URI cho production:

```text
https://your-domain.com/api/auth/callback/google
```

Chi tiết triển khai nằm trong `docs/DEPLOYMENT.md`.
