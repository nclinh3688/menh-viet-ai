# Information Architecture

## Menu chính

- Trang chủ: định vị sản phẩm và CTA tạo hồ sơ.
- Xem tử vi: nhập ngày sinh, xem lá số cơ bản.
- Hợp tuổi: so sánh hai hồ sơ hoặc nhập thông tin hai người.
- Ngũ hành: phân tích bản mệnh, màu, hướng, cân bằng.
- Thần số học: chỉ số ngày sinh, đường đời, năm cá nhân.
- Ngày đẹp: xem ngày tốt cho cưới hỏi, khai trương, ký kết.
- Phong thủy: hướng nhà, bàn làm việc, màu sắc, không gian.
- Blog: nội dung SEO chất lượng cao.
- Pricing: gói Free, Premium, Pro.
- Dashboard: hồ sơ cá nhân, lịch sử phân tích, gợi ý hằng ngày.

## Public Routes

- `/`
- `/onboarding`
- `/dashboard?profileId=...`
- `/love-compatibility`
- `/five-elements`
- `/numerology`
- `/good-day`
- `/feng-shui`
- `/blog`
- `/pricing`

## Auth Routes Giai Đoạn Sau

- `/login`
- `/register`
- `/account`
- `/billing`

## SEO Routes Giai Đoạn Sau

- `/tu-vi/[year]`
- `/menh/[element]`
- `/hop-tuoi/[maleYear]-[femaleYear]`
- `/ngay-dep/[date]`
- `/blog/[slug]`

## Dashboard Structure

- Header cá nhân.
- Tổng quan vận mệnh.
- Daily score.
- Gợi ý cá nhân.
- Shortcut tính năng.
- Lịch sử phân tích.
- Upsell Premium.
