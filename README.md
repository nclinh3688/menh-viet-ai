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
