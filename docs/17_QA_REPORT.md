# QA Report - Navigation Integration

## 1. Route đã kiểm tra

- `/` - Trang chủ đang có hero, form nhanh, feature grid, preview dashboard, pricing preview và FAQ.
- `/onboarding` - Trang tạo hồ sơ có form, prefill query từ trang chủ và disclaimer.
- `/dashboard` - Có empty state khi thiếu `profileId`, error state khi `profileId` sai và dashboard khi hồ sơ hợp lệ.
- `/love-compatibility` - Đã tạo placeholder an toàn vì trước đó menu có link nhưng route chưa tồn tại.
- `/five-elements` - Trang phân tích Ngũ Hành đã có form, kết quả, phần giáo dục, metadata và disclaimer.
- `/numerology` - Trang Thần số học đã có form, kết quả MVP, metadata và disclaimer.
- `/pricing` - Đã tạo placeholder pricing vì homepage/dashboard có link nhưng route chưa tồn tại.

## 2. Vấn đề tìm thấy

- Header có link `/love-compatibility` và `/pricing` nhưng chưa có route tương ứng.
- Header có link `/good-day` nhưng route này chưa tồn tại và không nằm trong yêu cầu menu của sprint hiện tại.
- Dashboard feature shortcuts có link `/good-day` và `/feng-shui` nhưng hai route này chưa tồn tại.
- Chưa có footer chung để chứa link nhanh và disclaimer toàn site.
- Dashboard và Onboarding chưa có metadata riêng, đang phụ thuộc metadata mặc định từ layout.
- Dashboard empty/error state đã thân thiện nhưng thiếu disclaimer dài theo chuẩn QA mới.
- `npm run build` mặc định dùng Turbopack, trong môi trường sandbox có thể lỗi khi Turbopack cần tạo process/bind port.

## 3. Vấn đề đã sửa

- Cập nhật header chính với menu:
  - Trang chủ
  - Tử vi
  - Hợp tuổi
  - Ngũ hành
  - Thần số học
  - Pricing
  - CTA Tạo hồ sơ
- Thêm mobile menu dạng dropdown bằng HTML native, không thêm thư viện mới.
- Tạo footer chung trong layout với:
  - Tên Mệnh Việt AI
  - Mô tả ngắn
  - Link nhanh
  - Disclaimer: "Nội dung chỉ mang tính tham khảo và khám phá bản thân, không thay thế tư vấn chuyên môn."
- Tạo route `/love-compatibility` dạng placeholder đẹp, không giả lập thuật toán hợp tuổi chưa hoàn thiện.
- Tạo route `/pricing` dạng giới thiệu gói Free/Premium/Pro, không tích hợp thanh toán thật.
- Sửa dashboard feature shortcuts để chỉ trỏ tới route đang tồn tại:
  - `/love-compatibility`
  - `/five-elements`
  - `/numerology`
  - `/pricing`
- Thêm metadata riêng cho:
  - `/onboarding`
  - `/dashboard`
  - `/love-compatibility`
  - `/pricing`
- Bổ sung disclaimer dài vào dashboard empty/error state.
- Cập nhật script `npm run build` sang `next build --webpack` để build ổn định trong môi trường QA hiện tại.

## 4. Vấn đề còn lại

- `/love-compatibility` mới là placeholder, chưa có thuật toán hợp tuổi thật.
- `/pricing` mới là trang giới thiệu, chưa có auth/subscription/payment thật theo đúng phạm vi hiện tại.
- Mobile menu hiện dùng native dropdown, đủ ổn cho QA nhưng có thể nâng cấp bằng component drawer chuẩn hơn khi design system đầy đủ hơn.
- Chưa có test tự động cho form và navigation.
- Chưa có sitemap động hoặc schema SEO cho các landing page.

## 5. Đề xuất Sprint tiếp theo

1. Xây dựng Love Compatibility MVP với logic trong `/lib/astrology`, không đặt thuật toán trong React component.
2. Tạo các placeholder hoặc MVP route cho `/good-day` và `/feng-shui` nếu muốn đưa lại vào navigation hoặc dashboard shortcuts.
3. Chuẩn hóa `DisclaimerBox` thành component dùng lại thay vì text lặp ở nhiều nơi.
4. Thêm sitemap và metadata helper cho các landing page chính.
5. Thêm smoke test cơ bản cho navigation, onboarding submit và dashboard state.
