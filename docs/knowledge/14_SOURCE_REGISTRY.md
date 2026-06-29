# Source Registry Foundation

## Source Registry là gì?

Source Registry là danh mục nguồn tri thức chuẩn của Mệnh Việt. Mỗi nguồn có id,
tên tiếng Việt, mô tả, confidence mặc định, ghi chú phạm vi sử dụng và domain
liên quan.

Mục tiêu là để mọi kết luận quan trọng trong report có nguồn rõ ràng, lý do và
confidence.

## Vì sao cần Source Registry?

- Tránh dùng nguồn mơ hồ trong report.
- Giúp validator phát hiện nguồn chưa đăng ký.
- Giúp UI hiển thị label dễ hiểu hơn thay vì raw id.
- Chuẩn bị cho Premium report có nhiều nguồn hơn, không chỉ nhiều chữ hơn.
- Giữ nguyên tắc: AI không được tự tạo dữ liệu hoặc nguồn.

## Danh sách source MVP

- `CAN_CHI`: Can Chi
- `THIEN_CAN`: Thiên Can
- `DIA_CHI`: Địa Chi
- `NAP_AM`: Nạp âm
- `FIVE_ELEMENTS`: Ngũ Hành
- `CUNG_PHI`: Cung Phi
- `BAT_TRACH`: Bát Trạch
- `NUMEROLOGY`: Thần số học
- `DAILY_FORTUNE_DETERMINISTIC`: Daily Fortune deterministic MVP
- `GOOD_DAY_MVP`: Xem ngày đẹp MVP

## Confidence hoạt động thế nào?

Mỗi `SourceItem` có `confidence` từ 0 đến 100.

- Nguồn ổn định trong MVP như Ngũ Hành, Can Chi có confidence cao hơn.
- Nguồn demo/deterministic như Daily Fortune MVP có confidence thấp hơn.
- Confidence là mức tin cậy trong hệ thống sản phẩm, không phải sự thật tuyệt đối.

Resolver có hàm:

- `getSourceConfidence(ids)`

Hàm này lấy trung bình confidence của các source resolve được.

## Cách thêm source mới

1. Thêm id vào `SourceId` trong `/lib/sources/source-types.ts`.
2. Thêm item vào `sourceRegistry` trong `/lib/sources/source-registry.ts`.
3. Nếu đang có legacy label, thêm alias vào `legacySourceAliases`.
4. Ghi rõ:
   - `name`
   - `category`
   - `description`
   - `confidence`
   - `notes`
   - `references`
   - `relatedDomains`
5. Chạy `npm run lint` và `npm run build`.

## Tích hợp hiện tại

- `ReportWhyCard` dùng `formatSourceLabel()` để hiển thị label nguồn đẹp hơn.
- `report-validator` dùng `isKnownSource()` để cảnh báo nguồn chưa đăng ký.
- Resolver hỗ trợ cả source id chuẩn và legacy label như `Ngũ Hành`, `Can Chi`,
  `Cung Phi`, `Thần số học`.

## Giới hạn hiện tại

- Chưa có source registry trong database.
- Chưa có versioning source.
- Chưa có source editor/admin.
- Chưa bắt buộc rule registry dùng `SourceId`; hiện vẫn hỗ trợ legacy label để
  không phá dữ liệu cũ.
- Chưa có CI quality gate cho source chưa đăng ký.
