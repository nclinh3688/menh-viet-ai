# Coding Standards

## TypeScript

- Bật strict mode.
- Không dùng `any` nếu có thể tránh.
- Type public function rõ ràng.
- Input/output của business logic phải có interface/type.

## Component

- Component nhỏ, một trách nhiệm.
- UI component nằm trong `/components`.
- Không đặt thuật toán trong React component.
- Không để file component quá dài; tách section/card/form khi cần.

## Logic

- Logic nghiệp vụ nằm trong `/lib`.
- Astrology logic nằm trong `/lib/astrology`.
- Database client nằm trong `/lib/db.ts`.
- Helper parse/serialize nằm trong `/lib`.

## Validation

- Dùng Zod cho form input, route handler, server action.
- Schema validation đặt trong `/lib/validations`.
- Server vẫn phải validate dù client đã validate.

## Server Action

- Rõ input/output.
- Không chứa UI logic.
- Không swallow lỗi quan trọng.
- Không gọi API thật nếu Sprint chưa yêu cầu.

## Database

- Prisma schema phải dễ migrate sang PostgreSQL.
- SQLite dev có thể lưu JSON bằng string, nhưng serialize/parse rõ ràng.
- Không hard-code dữ liệu người dùng.

## Styling

- Tailwind theo design system.
- Mobile-first.
- Card radius tối đa 8px trừ khi có lý do.
- Không lòe loẹt, không one-note palette.

## Quality Gate

Trước khi báo xong Sprint:

```bash
npm run lint
npm run build
```

Nếu có database/schema:

```bash
npx prisma generate
npx prisma db push
```

## Không Duplicate

- Tách constants/config khi lặp dữ liệu.
- Tách helper khi logic dùng nhiều nơi.
- Không copy thuật toán vào component.
