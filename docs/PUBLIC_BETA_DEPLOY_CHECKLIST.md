# Public Beta Deploy Checklist

## Domain and SSL

- [ ] Domain production đã trỏ về Vercel.
- [ ] SSL active.
- [ ] `NEXT_PUBLIC_APP_URL` dùng đúng `https://`.
- [ ] `AUTH_URL` dùng đúng domain production.

## Environment

- [ ] `DATABASE_URL` đã set trong Vercel.
- [ ] `AUTH_SECRET` đã set bằng secret đủ mạnh.
- [ ] `GOOGLE_CLIENT_ID` đã set.
- [ ] `GOOGLE_CLIENT_SECRET` đã set.
- [ ] `NEXT_PUBLIC_APP_URL` đã set.
- [ ] `NEXT_PUBLIC_SITE_NAME` đã set là `Mệnh Việt AI`.
- [ ] Không có `.env` thật được commit.

## Database

- [ ] Provider production là PostgreSQL.
- [ ] Chọn database managed: Vercel Postgres, Neon hoặc Supabase.
- [ ] PostgreSQL migration đã được tạo và review.
- [ ] Prisma Client generate thành công.
- [ ] `prisma migrate deploy` chạy thành công sau khi có migration PostgreSQL.
- [ ] Smoke test auth/profile/history sau migration.

## Google OAuth

- [ ] Authorized JavaScript origin đã thêm domain production.
- [ ] Redirect URI đã thêm:
  `https://your-domain.com/api/auth/callback/google`.
- [ ] Login/logout kiểm tra bằng tài khoản test.
- [ ] User record được tạo trong database production.

## SEO and System Routes

- [ ] `/robots.txt` trả dữ liệu đúng.
- [ ] `/sitemap.xml` trả URL production.
- [ ] `/manifest.webmanifest` hoạt động.
- [ ] Metadata title/description/OpenGraph kiểm tra qua production URL.
- [ ] `not-found`, `error`, `loading` route hoạt động.

## Product Smoke Test

- [ ] Trang chủ hoạt động.
- [ ] Onboarding submit được.
- [ ] Dashboard empty state đúng khi không có `profileId`.
- [ ] Dashboard profile thật hiển thị đúng.
- [ ] Login page không bắt buộc người dùng đăng nhập trước khi xem.
- [ ] Pricing page không có payment thật.
- [ ] Birth report không có wording bị cấm.

## Observability Later

- [ ] Analytics sau này: chọn công cụ đo traffic và conversion.
- [ ] Sentry sau này: theo dõi lỗi runtime production.
- [ ] Log retention policy sau này.
- [ ] Alert cho lỗi auth/database sau này.
