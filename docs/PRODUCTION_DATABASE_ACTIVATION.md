# Production Database Activation

## Mục tiêu

Kích hoạt PostgreSQL production để các luồng ghi/đọc dữ liệu thật hoạt động:

- Onboarding tạo `Profile`.
- Redirect sang `/dashboard?profileId=...`.
- Dashboard tạo/đọc `BirthChart`.
- Birth Report đọc cùng `profileId`.
- History/Auth dùng được sau khi Google OAuth được cấu hình.

Sprint này không thêm feature, không đổi UI lớn, không thêm knowledge và không tạo migration khi workspace chưa có `DATABASE_URL` PostgreSQL thật.

## Trạng thái kỹ thuật hiện tại

Prisma schema đã dùng PostgreSQL:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Các script cần thiết đã có:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:deploy
```

`createProfileAction()` hiện chỉ trả `ok: true` sau khi `db.profile.create()` tạo được record thật. Nếu database lỗi hoặc chưa cấu hình đúng, action trả `ok: false` với thông báo thân thiện, không tạo success giả.

## Bước 1: Tạo Neon Database

1. Vào Neon Console.
2. Tạo project mới, ví dụ `menh-viet-ai`.
3. Chọn region gần người dùng mục tiêu hoặc gần Vercel region.
4. Tạo database production, ví dụ `menh_viet_ai`.
5. Vào phần connection details.
6. Copy connection string PostgreSQL.

Khuyến nghị dùng pooled connection string cho runtime serverless nếu Neon cung cấp. Connection string thường có dạng:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST.neon.tech/DB_NAME?sslmode=require"
```

Không commit URL thật vào repo.

## Bước 2: Set Env Trên Vercel

Vào Vercel Project Settings > Environment Variables và set:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST.neon.tech/DB_NAME?sslmode=require"
AUTH_SECRET="..."
AUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="https://your-domain.com"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
NEXT_PUBLIC_APP_URL="https://your-domain.com"
NEXT_PUBLIC_SITE_NAME="Mệnh Việt AI"
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
```

Ghi chú:

- `AUTH_SECRET` và `NEXTAUTH_SECRET` nên cùng một giá trị ở giai đoạn NextAuth v4.
- `AUTH_URL` và `NEXTAUTH_URL` phải là domain production.
- Không dùng `file:./dev.db` cho production.

## Bước 3: Tạo Migration Khi Có DATABASE_URL Thật

Nếu local đã có PostgreSQL URL hợp lệ:

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init_postgres_ready
npm run lint
npm run build
```

Sau khi migration file được tạo:

1. Review SQL trong thư mục `prisma/migrations`.
2. Commit migration cùng code.
3. Không sửa tay migration đã chạy production.

Nếu chưa có `DATABASE_URL` PostgreSQL thật, không tạo migration trong sprint này.

## Bước 4: Deploy Migration Production

Sau khi migration đã có trong repo và Vercel env đã set đúng:

```bash
npm run prisma:deploy
```

Nên chạy lệnh này từ CI/CD hoặc môi trường release có quyền truy cập production database. Không chạy migration từ request runtime của Next.js.

## Bước 5: Test Profile Thật

Sau deploy, test theo thứ tự:

1. Mở `/`.
2. Nhập:
   - Tên: `Nguyen An`
   - Ngày sinh: `18/07/1995`
   - Loại lịch: Dương lịch
   - Giới tính: Nam
3. Submit để sang `/onboarding`.
4. Bấm `Lưu hồ sơ và tiếp tục`.
5. Kỳ vọng redirect sang:

```text
/dashboard?profileId=<id thật>
```

6. Refresh dashboard.
7. Kỳ vọng dashboard vẫn hiển thị hồ sơ đúng.
8. Mở:

```text
/birth-report?profileId=<id thật>
```

9. Kỳ vọng report hiển thị đầy đủ.
10. Mở:

```text
/dashboard?profileId=sai
/birth-report?profileId=sai
```

11. Kỳ vọng hiển thị not found thân thiện.

## Bước 6: Test History Sau Auth

Khi Google OAuth đã cấu hình:

1. Mở `/login`.
2. Đăng nhập Google.
3. Mở `/history`.
4. Nếu chưa có lịch sử, hiển thị empty state đúng.
5. Sau khi save analysis ở sprint/flow tương ứng, record phải xuất hiện trong `/history`.

## Troubleshooting

### Lỗi `URL must start with postgresql:// or postgres://`

Nguyên nhân: `DATABASE_URL` vẫn là SQLite hoặc sai format.

Cách xử lý:

- Đổi `DATABASE_URL` sang PostgreSQL URL.
- Redeploy hoặc restart dev server.
- Chạy lại `npm run prisma:generate`.

### Onboarding không redirect

Kiểm tra:

- Network/server log có lỗi Prisma không.
- `DATABASE_URL` có đúng database production không.
- Migration đã chạy chưa.
- Bảng `Profile` đã tồn tại chưa.

### Dashboard profileId thật không load

Kiểm tra:

- Record `Profile` có tồn tại trong Neon không.
- `BirthChart` có tạo được không.
- Prisma migration có đầy đủ bảng `BirthChart` không.

### Login Google không hoạt động

Kiểm tra:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `AUTH_SECRET`/`NEXTAUTH_SECRET`
- `AUTH_URL`/`NEXTAUTH_URL`
- Redirect URI trong Google Cloud:

```text
https://your-domain.com/api/auth/callback/google
```

## Việc Người Dùng Cần Làm Trên Neon/Vercel

1. Tạo Neon PostgreSQL database.
2. Copy `DATABASE_URL` thật.
3. Set `DATABASE_URL` và auth env trên Vercel.
4. Cung cấp local/staging PostgreSQL URL nếu muốn tôi tạo migration trong workspace.
5. Sau khi migration có trong repo, chạy `npm run prisma:deploy` cho production.
6. Test tạo profile thật trên domain production.

## Production Readiness

Trạng thái hiện tại:

- Prisma schema: PostgreSQL-ready.
- Package scripts: sẵn sàng generate/migrate/deploy.
- App flow: không tạo success giả khi DB lỗi.
- Migration: chưa tạo trong workspace vì chưa có PostgreSQL `DATABASE_URL` thật.

Blocker còn lại: cần `DATABASE_URL` Neon/Vercel production thật và migration production được chạy.
