# UI Components

## Component chuẩn

### SiteHeader

Navigation chính, CTA login/dashboard/pricing. Mobile menu rõ ràng.

### SiteFooter

Liên kết pháp lý, disclaimer, social, sitemap và internal links.

### HeroSection

Hero cao cấp cho landing page. Phải có visual asset thật hoặc generated bitmap,
không dùng gradient trống.

### BirthInputForm

Form nhập ngày sinh nhanh. Validate bằng Zod, mobile-first.

### FeatureCard

Hiển thị tính năng: hợp tuổi, ngũ hành, thần số học, ngày đẹp.

### ScoreCard

Hiển thị điểm theo thang 100, có progress bar và mô tả ngắn.

### FateOverviewCard

Hiển thị Thiên Can, Địa Chi, con giáp, ngũ hành, nạp âm, cung phi.

### CompatibilityResultCard

Hiển thị hợp tuổi, điểm tổng và điểm thành phần.

### PricingCard

Hiển thị Free/Premium/Pro, quyền lợi, CTA rõ ràng.

### DisclaimerBox

Component bắt buộc cho nội dung tử vi/phong thủy:

"Nội dung chỉ mang tính tham khảo và khám phá bản thân."

### SeoArticleCard

Card bài viết SEO có title, excerpt, category, CTA đọc thêm.

## Quy tắc component

- Component nhỏ, rõ trách nhiệm.
- UI component trong `/components`.
- Logic nghiệp vụ trong `/lib`.
- Không để thuật toán trong React component.
- Props có type rõ.
- Không hard-code dữ liệu lớn trong component; đưa vào constants/config khi cần.
