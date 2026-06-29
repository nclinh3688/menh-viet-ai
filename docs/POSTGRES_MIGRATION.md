# PostgreSQL Migration

## Vì sao cần PostgreSQL

Mệnh Việt AI cần database bền vững cho auth, profile, lịch sử phân tích và các
gói tài khoản. SQLite phù hợp cho giai đoạn khởi tạo local, nhưng không phù hợp
cho production trên Vercel vì filesystem serverless không ổn định cho dữ liệu ghi
lâu dài. PostgreSQL là lựa chọn production ổn định hơn cho Public Beta.

## Trạng thái hiện tại

`prisma/schema.prisma` hiện dùng:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Các field danh sách/payload vẫn lưu dạng `String` chứa JSON để migration an toàn
và tương thích với logic hiện tại. Chuyển sang Prisma `Json` nên là một sprint
riêng sau khi có nhu cầu query dữ liệu sâu hơn.

## Setup local

Khuyến nghị dùng một trong hai cách:

1. PostgreSQL local qua Docker/Postgres.app/Homebrew.
2. Development branch trên Neon, Supabase hoặc Vercel Postgres.

`.env` local:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
AUTH_SECRET=""
AUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="Mệnh Việt AI"
```

Lệnh local:

```bash
npm install
npx prisma generate
npm run prisma:migrate -- --name init_postgres_ready
npm run dev
```

Nếu chưa có PostgreSQL local, không chạy migration dev. Hãy tạo database trước
hoặc dùng database branch hosted.

## Setup production

1. Tạo PostgreSQL managed database trên Vercel Postgres, Neon hoặc Supabase.
2. Copy pooled/non-pooled connection string theo khuyến nghị của provider.
3. Set `DATABASE_URL` trong Vercel.
4. Set các env auth/public URL.
5. Chạy build.
6. Chạy migration production:

```bash
npm run prisma:deploy
```

Với Vercel, migration nên chạy trong bước release thủ công hoặc CI/CD có quyền
truy cập production database. Không chạy migration từ browser/runtime request.

## Migration status

Sprint này chuyển schema sang PostgreSQL-ready. Migration file chưa được tạo bằng
`prisma migrate dev` vì workspace hiện không có PostgreSQL URL hợp lệ để Prisma
shadow database kiểm tra migration.

Khi có `DATABASE_URL` PostgreSQL hợp lệ:

```bash
npm run prisma:migrate -- --name init_postgres_ready
npm run prisma:generate
npm run lint
npm run build
```

Sau khi migration được tạo, review SQL trước khi deploy.

## Rollback notes

- Giữ backup database trước khi chạy migration production.
- Nếu migration lỗi trước khi ghi dữ liệu, rollback bằng cách restore schema từ
  backup hoặc revert migration trong nhánh deploy.
- Nếu migration đã ghi dữ liệu, ưu tiên restore từ backup/snapshot của provider.
- Không quay lại SQLite cho production traffic.

## Những điểm cần theo dõi

- NextAuth Prisma Adapter cần các bảng `User`, `Account`, `Session`,
  `VerificationToken` hoạt động đúng trên PostgreSQL.
- `SavedAnalysis.payload` hiện là string JSON, cần validate serialize/parse ở
  tầng app.
- Các enum Prisma đã tương thích PostgreSQL, nhưng migration SQL vẫn cần review.
