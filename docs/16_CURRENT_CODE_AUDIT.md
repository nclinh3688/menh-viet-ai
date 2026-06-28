# Current Code Audit

## Phạm vi audit

Audit này dựa trên:

- `docs/00_PROJECT_VISION.md`
- `docs/04_DESIGN_SYSTEM.md`
- `docs/07_ASTROLOGY_ENGINE.md`
- `docs/15_CODING_STANDARDS.md`

Mục tiêu là đánh giá trạng thái code hiện tại, không đề xuất thêm tính năng mới
trong Sprint audit này.

## 1. Những phần đang tốt

### Nền tảng kỹ thuật

- Project đã dùng Next.js App Router, TypeScript, Tailwind CSS, Prisma và SQLite dev.
- Cấu trúc thư mục đã đi đúng hướng: UI nằm trong `components`, logic nằm trong `lib`.
- `lib/db.ts` có PrismaClient singleton phù hợp môi trường Next.js dev.
- Zod validation đã có trong `lib/validations/profile.ts`, không chỉ validate ở client.

### Astrology Engine

- Thuật toán tử vi cơ bản đã nằm trong `lib/astrology`, đúng coding standard.
- Các module đã tách theo domain:
  - `can-chi.ts`
  - `elements.ts`
  - `cung-phi.ts`
  - `birth-chart.ts`
  - `daily-fortune.ts`
  - `types.ts`
- Component React không chứa thuật toán Can Chi/Ngũ Hành/Cung Phi.
- Summary của BirthChart có disclaimer bắt buộc.

### Database

- Prisma schema đã có các model nền tảng: `User`, `Profile`, `BirthChart`,
  `CompatibilityReport`, `DailyFortune`, `Subscription`, `AiReport`.
- `Profile.userId` optional, phù hợp luồng anonymous onboarding.
- `BirthChart.profileId` unique, đúng quan hệ một hồ sơ một lá số cơ bản.
- Các field dạng list trong SQLite đang serialize JSON string rõ ràng khi tạo BirthChart.

### UI hiện tại

- Nền tối, glass card và accent gold/teal đang bám tương đối tốt theo design system.
- Onboarding có mobile-first layout và loading state khi submit.
- Dashboard đã được tách thành nhiều component nhỏ hơn thay vì dồn toàn bộ UI vào một file.
- Empty state cho `/dashboard` thiếu `profileId` và `profileId` sai đã có.

### Safety/Product positioning

- Disclaimer xuất hiện ở home, onboarding, dashboard và BirthChart summary.
- Nội dung hiện chưa có câu chữ hù dọa hoặc khẳng định tương lai chắc chắn.

## 2. Những phần chưa đạt

### Trang chủ chưa đúng định vị sản phẩm

`app/page.tsx` vẫn còn nội dung "Sprint này tập trung vào nền tảng kỹ thuật sạch"
và card "Nền móng Sprint 1". Đây là copy nội bộ dev, chưa đạt vision thương mại
hóa hoặc định vị "nền tảng AI khám phá bản thân".

### Header còn quá sơ khai

`components/layout/main-layout.tsx` chỉ có logo text và badge "Sprint 1". Điều này
không phù hợp information architecture trong docs: Trang chủ, Xem tử vi, Hợp tuổi,
Ngũ hành, Thần số học, Ngày đẹp, Phong thủy, Blog, Pricing, Dashboard.

### Dashboard đang trộn data orchestration vào page

`app/dashboard/page.tsx` đang làm nhiều việc cùng lúc:

- Đọc search params.
- Query Profile.
- Gọi Astrology Engine.
- Tạo BirthChart.
- Serialize/parse JSON.
- Chuẩn bị props UI.
- Render empty state.

File chưa quá dài nghiêm trọng, nhưng orchestration nên được tách dần sang helper
trong `lib` để page gọn và dễ test.

### Onboarding form dài

`components/onboarding/onboarding-form.tsx` dài 238 dòng, chứa form layout, field
component, submit handling và render logic. Chưa vi phạm chức năng, nhưng đã là
ứng viên tách nhỏ.

### BirthChart thiếu lưu `cungPhiGroup`

Engine trả `cungPhiGroup`, nhưng database `BirthChart` chưa lưu field này. Dashboard
hiện suy lại group từ generated chart dựa trên Profile, trong khi các field còn lại
lấy từ BirthChart cũ. Nếu thuật toán Cung Phi thay đổi sau này, dữ liệu hiển thị
có thể không đồng bộ giữa BirthChart đã lưu và kết quả engine hiện tại.

### JSON string parsing còn mỏng

`lib/json.ts` parse array an toàn, nhưng chưa validate item type. Ví dụ
`parseJsonArray<number>` vẫn có thể trả array chứa string nếu dữ liệu DB sai.

### Thiếu tests

Astrology Engine có logic cốt lõi nhưng chưa có test tự động cho:

- Can Chi theo năm.
- Cung Phi theo gender.
- Nạp âm fallback.
- Daily Fortune deterministic.
- BirthChart summary có disclaimer.

## 3. Những file cần refactor

Ưu tiên refactor nhỏ, không làm lại toàn bộ:

1. `app/page.tsx`
   - Thay copy Sprint/dev bằng copy sản phẩm.
   - Đưa `foundations` hoặc feature list sang config nếu tiếp tục dùng.

2. `components/layout/main-layout.tsx`
   - Tách thành `SiteHeader` sau này.
   - Bỏ badge "Sprint 1" khỏi production UI.

3. `app/dashboard/page.tsx`
   - Tách data preparation thành helper, ví dụ `lib/dashboard/get-dashboard-data.ts`.
   - Tách `DashboardState` thành component riêng nếu dùng lại.

4. `components/onboarding/onboarding-form.tsx`
   - Tách `FormField`.
   - Tách option rendering hoặc form config.
   - Cân nhắc tạo input/select component chuẩn.

5. `lib/astrology/birth-chart.ts`
   - Tách bảng nạp âm ra file data riêng nếu tiếp tục mở rộng.
   - Bổ sung test trước khi tăng độ phức tạp.

6. `prisma/schema.prisma`
   - Khi chuyển PostgreSQL, cân nhắc đổi các string JSON sang `Json`.
   - Cân nhắc lưu `cungPhiGroup`.

## 4. Những component cần tách nhỏ

### Cần tách sớm

- `components/onboarding/onboarding-form.tsx`
  - `FormField`
  - `SelectField`
  - `TextField`
  - `onboardingFormConfig`

### Có thể tách sau

- `app/dashboard/page.tsx`
  - `DashboardState`
  - Data loader/helper cho BirthChart.

- `app/page.tsx`
  - `HeroSection`
  - `Foundation/FeatureGrid`
  - CTA block.

## 5. Logic đang đặt sai chỗ

Không thấy thuật toán astrology nằm trong React component. Đây là điểm tốt.

Các điểm cần cân nhắc:

- `app/dashboard/page.tsx` đang chứa orchestration tạo BirthChart và serialize JSON.
  Đây là server logic hợp lệ, nhưng để dễ test và giảm độ dài page, nên chuyển dần
  sang `/lib/dashboard` hoặc `/lib/birth-chart`.
- `components/onboarding/onboarding-form.tsx` chứa nhiều layout config/options render.
  Options đã nằm trong validation file, tốt; phần field rendering có thể tách.

## 6. Vấn đề UI/UX

### Production polish

- Home page còn copy "Sprint 1", làm giảm cảm giác sản phẩm thương mại.
- Header chưa có navigation, footer chưa có.
- Một số route shortcut trên dashboard dẫn tới trang chưa tồn tại:
  `/love-compatibility`, `/five-elements`, `/numerology`, `/good-day`, `/pricing`.
  Đây có thể chấp nhận trong MVP, nhưng cần placeholder hoặc disabled state ở Sprint UI sau.

### Mobile-first

- Layout hiện nhìn theo hướng mobile-first, nhưng cần kiểm tra thực tế các viewport.
- Form onboarding dài; nên cân nhắc stepper hoặc group section nếu conversion thấp.

### Design system

- Card radius đang đúng mức 8px.
- Nền tối và glass card ổn.
- Cần chuẩn hóa `DisclaimerBox` thay vì mỗi nơi tự render disclaimer.
- Cần `SiteHeader`/`SiteFooter` chuẩn để tăng độ tin cậy và SEO.

## 7. Vấn đề SEO

- `app/layout.tsx` có metadata cơ bản, nhưng SEO vẫn rất sơ khai.
- Chưa có `sitemap.ts`, `robots.ts`.
- Chưa có Open Graph image hoặc structured data.
- Home page chưa có copy SEO đủ mạnh theo vision.
- Chưa có internal linking thực sự vì các route SEO/blog/pricing chưa có.
- Chưa có blog hoặc landing page theo năm sinh/mệnh/hợp tuổi.

Lưu ý: không nên tạo landing page hàng loạt trước khi có content strategy và
template chất lượng, để tránh nội dung mỏng.

## 8. Rủi ro kỹ thuật

### Race condition khi tạo BirthChart

`app/dashboard/page.tsx` kiểm tra `profile.birthChart ?? create`. Nếu hai request
cùng lúc vào dashboard cho cùng Profile chưa có BirthChart, có thể một request
thất bại vì unique `profileId`. Nên dùng `upsert` hoặc catch unique constraint.

### Dữ liệu BirthChart có thể stale

Nếu Profile đổi ngày sinh/giới tính, BirthChart cũ vẫn được dùng. Sprint hiện tại
chưa có update profile thực sự, nhưng khi thêm cập nhật hồ sơ cần invalidation hoặc
regenerate BirthChart.

### JSON string không có schema

SQLite dev lưu JSON string ổn, nhưng không có validation khi đọc. Dữ liệu lỗi có
thể làm UI thiếu badge hoặc hiển thị sai.

### Astrology correctness

Engine hiện là MVP. Các bảng nạp âm/cung phi cần test và review trước khi dùng
cho nội dung thương mại hoặc SEO lớn.

### Thiếu automated tests

Hiện quality gate chủ yếu là lint/build. Với astrology/domain logic, thiếu test là
rủi ro lớn khi mở rộng hợp tuổi, thần số học, ngày đẹp.

### Git/worktree

Worktree hiện có nhiều thay đổi từ các Sprint gần đây. Trước các Sprint lớn nên
commit theo mốc hoặc tạo branch rõ ràng để tránh trộn scope.

## 9. Đề xuất thứ tự sửa

1. Commit/chốt các thay đổi hiện tại theo Sprint để có baseline sạch.
2. UI Foundation:
   - Tạo `SiteHeader`, `SiteFooter`, `DisclaimerBox`.
   - Thay copy Sprint/dev trên Home.
   - Thêm placeholder thân thiện cho các shortcut chưa làm.
3. Refactor nhẹ onboarding:
   - Tách `FormField`, `TextField`, `SelectField`.
   - Giữ nguyên behavior.
4. Refactor dashboard data:
   - Tạo helper load/generate dashboard data.
   - Đổi BirthChart create sang upsert/catch unique.
5. Bổ sung tests cho `/lib/astrology`.
6. Chuẩn hóa SEO nền:
   - Metadata theo page.
   - `robots.ts`, `sitemap.ts`.
   - Open Graph defaults.
7. Chuẩn bị auth/subscription:
   - Chưa payment thật.
   - Chỉ thêm quota/service layer khi có yêu cầu Sprint cụ thể.

## Kết luận

Code hiện tại đúng hướng cho MVP: logic domain đã nằm trong `/lib`, UI đã tách
component ở mức cơ bản, database đủ nền tảng và không có dấu hiệu mê tín cực đoan.
Các điểm cần ưu tiên tiếp theo là production polish, SEO foundation, giảm độ dài
form/page, và thêm test cho Astrology Engine trước khi mở rộng tính năng thương mại.
