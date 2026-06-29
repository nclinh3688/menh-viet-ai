# History + Save Result Foundation

## Vì sao cần lịch sử

Lịch sử giúp người dùng quay lại các phân tích đã xem thay vì phải nhập lại
thông tin. Đây là nền tảng giữ chân người dùng cho dashboard cá nhân, báo cáo
hợp tuổi, thần số học, ngũ hành và ngày đẹp.

## Anonymous user

Người dùng anonymous vẫn được xem kết quả miễn phí. Website không bắt buộc đăng
nhập trước khi dùng. Ở giai đoạn này, anonymous user chưa có lịch sử dài hạn vì
chưa có định danh ổn định.

CTA phù hợp:

- "Đăng nhập để lưu kết quả"
- "Đăng nhập miễn phí để xem lịch sử"
- "Bạn vẫn có thể xem miễn phí mà không cần đăng nhập"

Không dùng nội dung ép buộc như "phải đăng nhập để xem".

## Registered user

Registered user là người đã đăng nhập. Sau khi auth thật được kết nối, kết quả
có thể được lưu vào bảng `SavedAnalysis` theo `userId`.

Các lợi ích:

- Xem lại kết quả bất cứ lúc nào.
- Lưu hồ sơ và các phân tích quan trọng.
- Chuẩn bị đồng bộ nhiều thiết bị.
- Chuẩn bị usage limit cao hơn Free anonymous.

## Premium sau này

Premium có thể mở rộng lịch sử theo hướng:

- Lưu lịch sử không giới hạn.
- Gắn tag hoặc ghi chú cá nhân.
- Xuất PDF từ kết quả đã lưu.
- So sánh nhiều lần phân tích theo thời gian.

Sprint này chưa khóa lịch sử bằng payment.

## Các loại phân tích có thể lưu

`SavedAnalysis.type` hỗ trợ:

- `BIRTH_CHART`
- `COMPATIBILITY`
- `NUMEROLOGY`
- `FIVE_ELEMENTS`
- `GOOD_DAY`

`payload` lưu dạng `JSON.stringify` trong `String` để tương thích SQLite dev và
dễ chuyển sang JSONB khi nâng cấp PostgreSQL.

## Thành phần kỹ thuật

- Prisma model: `SavedAnalysis`
- Helper: `/lib/history/save-analysis.ts`
- Route: `/history`
- Components:
  - `/components/history/history-empty-state.tsx`
  - `/components/history/history-card.tsx`
  - `/components/history/save-analysis-cta.tsx`

## Những việc chưa làm

- Chưa có auth runtime thật nên `getCurrentUser()` vẫn trả về `null`.
- Chưa lưu tự động kết quả từ các module.
- Chưa có route chi tiết `/history/[id]`.
- Chưa có tracking anonymous id.
- Chưa có giới hạn lịch sử theo plan.
- Chưa có payment hoặc premium thật.
