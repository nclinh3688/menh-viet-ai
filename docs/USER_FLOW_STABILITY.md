# User Flow Stability Checklist

## Scope

Mục tiêu của checklist này là ổn định các luồng người dùng chính trước production:

- Trang chủ nhập ngày sinh.
- Onboarding tạo hồ sơ.
- Dashboard theo `profileId`.
- Birth Report theo `profileId`.
- Login khi OAuth chưa cấu hình đủ.

Không thêm feature, không thêm knowledge mới, không thay đổi database schema.

## Validation

### Date/time

Đã kiểm tra bằng `npm run validate:date-time`.

Các input ngày sinh hợp lệ:

- `18/07/1995`
- `18/7/1995`
- `18071995`
- `18-07-1995`
- `18.07.1995`

Output chuẩn sau normalize: `18/07/1995`.

Validation không dùng `new Date("18/07/1995")` hoặc `Date.parse("18/07/1995")`.

### Onboarding schema

Đã kiểm tra bằng `npm run validate:onboarding-form`.

Các case pass:

- `birthDate: "18/07/1995"`, `calendarType: "solar"`
- `birthDate: "18/07/1995"`, `calendarType: "lunar"`
- `birthDate: "18/7/1995"`, `calendarType: "solar"`
- `birthDate: "18071995"`, `calendarType: "lunar"`

Các case fail đúng:

- `calendarType: undefined`
- `calendarType: ""`
- `calendarType: "am_lich"`
- `birthDate: "31/02/1995"`

## Route QA

### `/`

- Trang chủ render được.
- Form ngày sinh chuyển sang `/onboarding` với query đúng.
- Query giữ `birthDate=18/07/1995`.
- Query giữ `calendarType=solar` hoặc `calendarType=lunar`.

### `/onboarding`

- `18/07/1995` + Dương lịch không báo lỗi ngày sinh.
- `18/07/1995` + Âm lịch không báo lỗi loại lịch.
- `calendarType` chuẩn là `"solar" | "lunar"`.
- Khi database chưa cấu hình đúng, form hiển thị lỗi thân thiện thay vì server 500.

### `/dashboard`

- Không có `profileId`: hiển thị empty state chào mừng.
- `profileId` sai: hiển thị not found thân thiện.
- Không có runtime error trong route QA.

### `/birth-report`

- Không có `profileId`: hiển thị empty state mời tạo hồ sơ.
- `profileId` sai: hiển thị not found thân thiện.
- Không có runtime error trong route QA.

### `/login`

- Khi thiếu Google OAuth env, nút Google hiển thị trạng thái cần cấu hình.
- Trang không crash.
- Người dùng vẫn có link tiếp tục xem không cần đăng nhập.

## Production Environment Notes

Prisma schema hiện dùng PostgreSQL:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Production bắt buộc cấu hình `DATABASE_URL` bắt đầu bằng:

- `postgresql://`
- hoặc `postgres://`

Nếu local hoặc production vẫn dùng `file:./dev.db`, mọi flow cần lưu/đọc profile thật sẽ không tạo được hồ sơ. Ứng dụng hiện đã xử lý lỗi thân thiện, nhưng để flow tạo hồ sơ chạy hoàn chỉnh cần cấu hình PostgreSQL đúng.

## Main User Flow Status

| Flow | Status | Note |
| --- | --- | --- |
| Home form to onboarding | OK | Query ngày/lịch đúng |
| Onboarding date validation | OK | `dd/mm/yyyy` pass |
| Onboarding calendar type | OK | `solar/lunar` pass |
| Onboarding save | Needs env | Cần PostgreSQL `DATABASE_URL` đúng |
| Dashboard empty state | OK | Không cần DB |
| Dashboard wrong profileId | OK | Not found thân thiện |
| Dashboard real profileId | Needs env | Cần DB profile thật |
| Birth Report empty state | OK | Không cần DB |
| Birth Report wrong profileId | OK | Not found thân thiện |
| Birth Report real profileId | Needs env | Cần DB profile thật |
| Login without Google env | OK | Không crash, button disabled |

## Commands

```bash
npm run validate:date-time
npm run validate:onboarding-form
npm run lint
npm run build
```

## Remaining Risk

Luồng có `profileId` thật phụ thuộc trực tiếp vào cấu hình PostgreSQL production. Trước khi public beta, cần deploy với `DATABASE_URL`, chạy Prisma migration/deploy và tạo thử một profile thật trên môi trường production hoặc staging.
