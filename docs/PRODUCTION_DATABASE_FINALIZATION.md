# Production Database Finalization

## Trạng thái hiện tại

Local workspace đã được kiểm tra theo nguyên tắc không in secret ra log.

- `.env`: có `DATABASE_URL` nhưng đang dùng SQLite (`file:...`).
- `.env.local`: chưa tồn tại.
- Prisma schema: đang dùng `provider = "postgresql"`.
- Migration thật: chưa tạo trong workspace này vì local chưa có Neon PostgreSQL `DATABASE_URL`.

Vì local chưa trỏ tới Neon/PostgreSQL, không chạy các lệnh sau trong sprint này:

```bash
npx prisma db pull
npx prisma migrate dev --name init_postgres_ready
npx prisma migrate deploy
```

Lý do: nếu chạy với SQLite URL trong khi schema là PostgreSQL, Prisma sẽ lỗi ở datasource và không kiểm tra được Neon production. Không tự bịa URL và không reset database.

## Cần cấu hình DATABASE_URL ở đâu

### Local

Tạo hoặc cập nhật `.env.local` hoặc `.env` trên máy local:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST.neon.tech/DATABASE?sslmode=require"
```

Không commit `.env` hoặc `.env.local`.

### Vercel

Vercel Project Settings > Environment Variables:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST.neon.tech/DATABASE?sslmode=require"
```

Ngoài ra cần đồng bộ:

```env
AUTH_SECRET="..."
NEXTAUTH_SECRET="..."
AUTH_URL="https://menh-viet-ai.vercel.app"
NEXTAUTH_URL="https://menh-viet-ai.vercel.app"
NEXT_PUBLIC_APP_URL="https://menh-viet-ai.vercel.app"
NEXT_PUBLIC_SITE_URL="https://menh-viet-ai.vercel.app"
```

## Quy trình finalization khi có Neon URL local/staging

Chạy theo thứ tự:

```bash
npx prisma db pull
```

Nếu pass, tiếp tục:

```bash
npx prisma migrate dev --name init_postgres_ready
```

Nếu migration tạo thành công:

```bash
npx prisma migrate deploy
npx prisma generate
npm run lint
npm run build
```

Nếu `db pull` báo database đã có schema:

- Không reset database khi chưa có approval.
- Kiểm tra schema hiện có do Prisma tạo hay do provider/import khác.
- Nếu database production đang trống nhưng có bảng lỗi, nên tạo Neon branch/staging để thử migration trước.

Nếu `migrate dev` báo conflict:

- Không chạy `prisma migrate reset` trên production.
- Tạo backup/snapshot trong Neon trước.
- Ưu tiên xử lý trên Neon branch, sau đó deploy migration đã review.

## Cách test tạo profile thật

Sau khi migration đã chạy trên database PostgreSQL:

1. Chạy local:

```bash
npm run dev
```

2. Mở `/`.
3. Nhập:
   - Ngày sinh: `18/07/1995`
   - Giờ sinh: `04:20`
   - Giới tính: Nam
   - Loại lịch: Dương lịch
4. Đi tới `/onboarding`.
5. Bấm `Lưu hồ sơ và tiếp tục`.
6. Kỳ vọng redirect:

```text
/dashboard?profileId=<id thật>
```

7. Refresh dashboard.
8. Mở:

```text
/birth-report?profileId=<id thật>
```

9. Kỳ vọng report hiển thị.
10. Test thêm:

```text
/dashboard?profileId=sai
/birth-report?profileId=sai
```

Kỳ vọng hiển thị not found thân thiện.

## Lỗi thường gặp

### `URL must start with postgresql:// or postgres://`

Local env vẫn đang là SQLite hoặc placeholder.

Cách xử lý:

- Set `DATABASE_URL` sang Neon PostgreSQL URL thật.
- Restart dev server.
- Chạy lại `npx prisma db pull`.

### `P1001 Can't reach database server`

Ứng dụng không kết nối được Neon.

Kiểm tra:

- URL có đúng host Neon không.
- Network/VPN/firewall.
- Neon database có đang active không.
- `sslmode=require` có trong URL chưa.

### `relation "Profile" does not exist`

Migration chưa chạy hoặc chạy sai database.

Cách xử lý:

- Kiểm tra Vercel `DATABASE_URL`.
- Chạy `npx prisma migrate deploy`.
- Kiểm tra bảng trên Neon Console.

### Onboarding không redirect

Nếu form trả lỗi thân thiện thay vì redirect, profile chưa được tạo.

Kiểm tra:

- Prisma migration đã chạy chưa.
- `DATABASE_URL` runtime có đúng Neon không.
- Server log có lỗi Prisma không.

## Việc còn thiếu

- Cần Neon PostgreSQL `DATABASE_URL` thật trong local `.env.local` hoặc `.env`.
- Cần chạy `npx prisma db pull`.
- Cần tạo migration thật bằng `npx prisma migrate dev --name init_postgres_ready`.
- Cần chạy `npx prisma migrate deploy`.
- Cần test profile thật trên local và production sau Vercel redeploy.

## Ghi chú an toàn

- Không commit `.env`.
- Không in `DATABASE_URL` ra log.
- Không reset database production khi chưa có approval.
- Không chạy migration production từ browser/runtime request.
