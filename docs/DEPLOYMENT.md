# Deployment Guide

Tài liệu này chuẩn bị Mệnh Việt AI cho Public Beta trên Vercel. Sprint này không
tích hợp payment hoặc AI API. Prisma datasource chính dùng PostgreSQL.

## 1. Production Environment

Cấu hình các biến sau trong Vercel Project Settings > Environment Variables:

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | Chuỗi kết nối PostgreSQL managed hoặc local PostgreSQL. |
| `AUTH_SECRET` | Yes | Secret cho Auth.js/NextAuth session signing. Không commit vào repo. |
| `AUTH_URL` | Yes | URL public của production, ví dụ `https://menhviet.ai`. |
| `GOOGLE_CLIENT_ID` | Yes | Google OAuth Client ID. |
| `GOOGLE_CLIENT_SECRET` | Yes | Google OAuth Client Secret. |
| `NEXT_PUBLIC_APP_URL` | Yes | URL public dùng cho canonical, sitemap, metadata và OAuth documentation. |
| `NEXT_PUBLIC_SITE_NAME` | Yes | Tên hiển thị public, mặc định `Mệnh Việt AI`. |

`NEXTAUTH_SECRET`, `NEXTAUTH_URL` và `NEXT_PUBLIC_SITE_URL` có thể được giữ như
alias tương thích nếu hạ tầng cũ vẫn đọc các biến này.

## 2. Create Vercel Project

1. Kết nối repository với Vercel.
2. Chọn framework preset `Next.js`.
3. Dùng install command mặc định `npm install`.
4. Dùng build command `npm run build`.
5. Sau khi deploy thành công, kiểm tra `/`, `/login`, `/dashboard`, `/pricing`,
   `/robots.txt`, `/sitemap.xml` và `/manifest.webmanifest`.

## 3. Database Production Plan

Prisma datasource hiện dùng PostgreSQL:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
```

Production trên Vercel không dựa vào SQLite file vì filesystem serverless không
phù hợp cho dữ liệu bền vững. Kế hoạch production:

1. Tạo PostgreSQL managed database bằng Vercel Postgres, Neon hoặc Supabase.
2. Lưu connection string vào `DATABASE_URL` trong Vercel.
3. Chạy `npx prisma generate`.
4. Chạy migration production bằng `npm run prisma:deploy` sau khi migration files
   đã được tạo và review.
5. Chạy smoke test các luồng auth, profile, dashboard và history.

Nếu cần local dev không phụ thuộc máy cá nhân, tạo một development branch riêng
trên Neon/Supabase thay vì quay lại SQLite.

## 4. Prisma Commands

Local development với PostgreSQL:

```bash
npx prisma generate
npm run prisma:migrate -- --name init_postgres_ready
```

Production:

```bash
npx prisma generate
npm run prisma:deploy
```

`package.json` có `postinstall` chạy `prisma generate` để Vercel có Prisma Client
sau khi cài dependency.

## 5. Google OAuth Setup

Trong Google Cloud Console:

1. Tạo OAuth Client loại `Web application`.
2. Thêm Authorized JavaScript origin:
   - `https://your-domain.com`
3. Thêm Authorized redirect URI:
   - `https://your-domain.com/api/auth/callback/google`
4. Copy Client ID và Client Secret vào Vercel env:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
5. Set `AUTH_URL` và `NEXT_PUBLIC_APP_URL` đúng domain production.

Local redirect URI:

```text
http://localhost:3000/api/auth/callback/google
```

## 6. Post Deploy Checks

Sau khi deploy:

1. Mở trang chủ và kiểm tra form hero không lỗi.
2. Mở `/login` và kiểm tra nút Google.
3. Đăng nhập Google bằng tài khoản test.
4. Mở `/history` và xác nhận route nhận biết trạng thái đăng nhập.
5. Mở `/dashboard` không có `profileId` và kiểm tra empty state.
6. Kiểm tra `/robots.txt` và `/sitemap.xml`.
7. Kiểm tra canonical/OpenGraph bằng view-source hoặc công cụ SEO.
8. Xác nhận không có secret trong browser bundle hoặc log.

## 7. Security Notes

- Không commit `.env` thật.
- Không log env hoặc OAuth secret.
- Không dùng SQLite file cho production traffic.
- Không bật payment hoặc AI API trước khi có sprint riêng.
- Rotate `AUTH_SECRET` nếu nghi ngờ bị lộ.
