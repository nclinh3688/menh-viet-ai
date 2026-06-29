# Form Design System

## Vì sao không dùng date picker

Website Mệnh Việt AI thường cần nhập ngày sinh ở các năm rất cũ. Date picker
mặc định của trình duyệt, đặc biệt trên Safari, khiến người dùng phải cuộn/chọn
năm lâu và giao diện dễ lệch khỏi tông nền tối cao cấp.

Vì vậy form ngày sinh dùng text input theo chuẩn `dd/mm/yyyy`.

## Quy chuẩn nhập ngày sinh

Component chuẩn: `MVDateInput`.

Người dùng có thể nhập:

- `18071995`
- `18/7/1995`
- `18-07-1995`
- `18.07.1995`

Input sẽ chuẩn hóa về:

- `18/07/1995`

Validation:

- Ngày từ `1-31`.
- Tháng từ `1-12`.
- Năm từ `1900-2100`.
- Kiểm tra ngày hợp lệ theo tháng/năm.

Thông báo lỗi:

> Ngày sinh không hợp lệ. Vui lòng nhập dạng ngày/tháng/năm.

## Quy chuẩn nhập giờ sinh

Component chuẩn: `MVTimeInput`.

Người dùng có thể nhập:

- `420`
- `0420`
- `4:20`
- `04:20`

Input sẽ chuẩn hóa về:

- `04:20`

Validation:

- Giờ từ `0-23`.
- Phút từ `0-59`.
- Trường này optional.

Thông báo lỗi:

> Giờ sinh không hợp lệ. Ví dụ: 04:20.

## Quy chuẩn màu input

Các input chính dùng:

- Background: `rgba(255,255,255,0.06)`
- Border: `rgba(255,255,255,0.12)`
- Text: trắng
- Placeholder: `rgba(255,255,255,0.42)`
- Focus border: vàng kim theo token `primary`
- Height: 44px
- Radius: `rounded-xl`

Không dùng nền trắng mặc định của browser.

## Khi nào dùng component nào

- `MVInput`: text input thường như tên, nơi sinh.
- `MVDateInput`: ngày sinh hoặc ngày cần nhập thủ công.
- `MVTimeInput`: giờ sinh optional.
- `MVSelect`: lựa chọn dạng dropdown như giới tính, tình trạng, mối quan tâm.
- `MVCalendarTypeToggle`: chọn Dương lịch / Âm lịch.
- `MVFormField`: label, hint và error message thống nhất.
- `MVButton`: nút submit trong form cao cấp.

## Không dùng input mặc định

Không dùng:

- `<input type="date">`
- `<input type="time">`
- input/select nền trắng không style

Nếu cần nhập ngày/giờ ở sprint sau, phải dùng `MVDateInput` và `MVTimeInput`,
logic normalize/validate đặt trong `/lib/validations/date-time.ts`.
