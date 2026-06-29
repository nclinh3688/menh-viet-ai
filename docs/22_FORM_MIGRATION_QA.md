# Form Migration QA

## Route đã kiểm tra

- `/`
- `/onboarding`
- `/dashboard`
- `/love-compatibility`
- `/five-elements`
- `/good-day`
- `/numerology`
- `/login`
- `/pricing`

## Form đã migrate

- Trang chủ hero form:
  - `MVInput`
  - `MVDateInput`
  - `MVTimeInput`
  - `MVSelect`
  - `MVCalendarTypeToggle`
  - `MVButton`
- Onboarding form:
  - `MVInput`
  - `MVDateInput`
  - `MVTimeInput`
  - `MVSelect`
  - `MVCalendarTypeToggle`
  - `MVButton`
- Hợp tuổi:
  - Nam/nữ dùng `MVInput`, `MVDateInput`, `MVTimeInput`.
  - Loại lịch dùng `MVCalendarTypeToggle`, không còn select.
  - Submit dùng `MVButton`.
- Ngũ Hành:
  - Năm sinh dùng `MVInput`.
  - Ngày sinh dùng `MVDateInput`.
  - Submit dùng `MVButton`.
- Ngày đẹp:
  - Ngày cần xem dùng `MVDateInput`.
  - Mục đích dùng `MVSelect`.
  - Submit dùng `MVButton`.
- Thần số học:
  - Họ tên dùng `MVInput`.
  - Ngày sinh dùng `MVDateInput`.
  - Submit dùng `MVButton`.
- Login:
  - Google/Facebook buttons dùng `MVButton`.

## Component đã dùng

- `MVInput`
- `MVDateInput`
- `MVTimeInput`
- `MVSelect`
- `MVButton`
- `MVFormField`
- `MVCalendarTypeToggle`

## Date/time picker đã loại bỏ

Không còn dùng:

- `<input type="date">`
- `<input type="time">`

Ngày sinh/ngày xem dùng text input dạng `dd/mm/yyyy`. Giờ sinh dùng text input
dạng `HH:mm`.

## CSS an toàn đã thêm

- `color-scheme: dark` cho `html`, `input`, `select`, `textarea`.
- Rule chống autofill nền trắng trên WebKit.
- `MVSelect` dùng nền tối, text trắng, chevron vàng kim.

## Vấn đề còn lại

- `MVSelect` vẫn dựa trên native select để giữ tính ổn định và accessibility.
  Trình duyệt có thể render dropdown option theo hệ điều hành, nhưng closed state
  của select đã được style nền tối.
- Chưa có visual regression test tự động.

## Checklist test thủ công

1. Trang chủ:
   - Form không có input trắng.
   - Ngày sinh nhập `18071995` tự format thành `18/07/1995`.
   - Giờ sinh nhập `420` tự format thành `04:20`.
2. Onboarding:
   - Form không còn date/time picker.
   - Submit lưu hồ sơ và chuyển dashboard.
3. Hợp tuổi:
   - Nam/nữ không còn input trắng.
   - Loại lịch là segmented toggle.
4. Ngũ Hành:
   - Năm/ngày sinh dùng input tối.
5. Ngày đẹp:
   - Ngày cần xem không mở browser date picker.
   - Mục đích select đóng có nền tối.
6. Thần số học:
   - Họ tên/ngày sinh dùng form design system.
7. Login:
   - Google/Facebook buttons đồng bộ hệ thống.
