# Save Result Real Flow

## Flow anonymous

Người chưa đăng nhập vẫn xem được kết quả ở các trang public. Khi có kết quả,
CTA hiển thị:

- "Đăng nhập để lưu"

Nút này đưa người dùng tới `/login`. Không có redirect bắt buộc và không chặn
nội dung miễn phí.

## Flow registered user

Người đã đăng nhập thấy nút:

- "Lưu kết quả"

Khi bấm, client component gọi server action `saveAnalysisAction`. Action lấy
current user bằng `getCurrentUser()`, validate input bằng Zod, tạo record
`SavedAnalysis`, sau đó `revalidatePath("/history")`.

Sau khi lưu thành công, CTA hiển thị:

- "Đã lưu vào lịch sử"
- Button chuyển sang trạng thái disabled để chống bấm nhiều lần trong MVP.

## SaveAnalysisAction

File:

- `/app/actions/save-analysis.ts`

Input:

- `type`
- `title`
- `summary`
- `payload`
- `profileId` optional

Kết quả:

- `{ success: true, id }`
- `{ success: false, error }`

Nếu user chưa đăng nhập, action trả lỗi cần đăng nhập.

## SavedAnalysis payload

`payload` được lưu trong database dạng `String` qua `JSON.stringify`, phù hợp
SQLite dev. Khi chuyển PostgreSQL có thể cân nhắc đổi sang JSON/JSONB.

Dashboard đang lưu payload gồm:

- `profile`
- `birthChart`
- `dailyFortune`

## Các loại analysis

Các type được hỗ trợ:

- `BIRTH_CHART`
- `COMPATIBILITY`
- `NUMEROLOGY`
- `FIVE_ELEMENTS`
- `GOOD_DAY`

## Module đã gắn

- Dashboard: đã gắn save flow thật cho `BIRTH_CHART`.

## Module chưa gắn

Các module sau chưa gắn save thật để tránh refactor rộng trong sprint này:

- Hợp tuổi: `COMPATIBILITY`
- Thần số học: `NUMEROLOGY`
- Ngũ hành: `FIVE_ELEMENTS`
- Ngày đẹp: `GOOD_DAY`

Những module này nên được gắn ở sprint sau bằng cách truyền input tương tự
`SaveAnalysisCTA` sau khi có result state ổn định.
