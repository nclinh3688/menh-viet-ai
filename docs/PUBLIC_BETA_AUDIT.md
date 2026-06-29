# Public Beta Audit

Ngày audit: 2026-06-29  
Phạm vi: audit toàn bộ project hiện tại, không sửa tính năng.

## Executive Summary

Mệnh Việt đã có nền tảng sản phẩm khá đầy đủ cho private alpha: route chính đã
hoạt động, UI nền tối nhất quán, form system riêng, auth Google foundation, lưu
lịch sử, Birth Report, Knowledge DB, Source Registry và Knowledge Graph. Build
và lint hiện pass.

Tuy nhiên, chưa nên mở Public Beta rộng. Các rủi ro lớn nhất nằm ở production
copy còn lộ chữ `MVP/demo/Sắp ra mắt/sprint`, thiếu sitemap/robots/JSON-LD,
thiếu route-level loading/error states, thuật toán daily fortune còn demo, usage
limit chưa tracking thật, payment chưa có, và test tự động gần như chưa có.

Beta Readiness: **68%**

## 1. Route Audit

| Route | Type | Status | Nhận xét |
| --- | --- | --- | --- |
| `/` | Static | OK | Homepage conversion tốt, có hero form, visual asset, section pricing/FAQ. Còn copy `demo` trong dashboard preview/pricing preview. |
| `/onboarding` | Dynamic | OK | Form tốt, lưu Profile, redirect dashboard. Cần loading/error route-level. |
| `/dashboard` | Dynamic | OK | Empty state tốt, profile state tốt, có premium/usage/save CTA. Daily fortune vẫn demo deterministic. |
| `/birth-report` | Dynamic | Chưa hoàn thiện | Report sâu, explainability tốt. Cần giảm trùng section và kiểm QA content dài trên mobile. |
| `/love-compatibility` | Static | Chưa hoàn thiện | Module MVP hoạt động nhưng title/copy lộ `MVP`; chưa lưu kết quả thật ở module này. |
| `/five-elements` | Static | OK | Form + education + result tốt; nên tích hợp Knowledge Pack v1 vào UI sau. |
| `/numerology` | Static | Chưa hoàn thiện | Chạy được, nhưng UI/copy lộ `MVP`; tên tiếng Việt vẫn là MVP. |
| `/good-day` | Static | Chưa hoàn thiện | Chạy được, nhưng copy lộ MVP/deterministic; thuật toán chưa đủ public beta. |
| `/pricing` | Static | Placeholder | Có trang đẹp nhưng Premium/Pro `Sắp ra mắt`, chưa payment, chưa waitlist thật. |
| `/login` | Dynamic | OK | Google button phụ thuộc env, Facebook disabled. Copy còn nói sprint/Premium sau. |
| `/history` | Dynamic | OK | Auth-aware, empty state tốt, nhưng nút xem lại detail chưa hoàn chỉnh nếu chưa có detail route. |
| `/api/auth/[...nextauth]` | Dynamic API | OK | NextAuth Google + Prisma adapter. Cần env production và security review. |
| `/_not-found` | Static generated | Chưa hoàn thiện | Không có custom `not-found.tsx`. |

Không thấy route chết trong header hiện tại. Chưa có `/blog`, `/feng-shui`,
landing SEO theo năm/mệnh/hợp tuổi như docs chiến lược.

## 2. UI Audit

### Desktop

Tốt: header, footer, hero, dashboard, report, pricing đều có bố cục rõ, glass UI
và spacing tương đối nhất quán.

Rủi ro: header desktop có nhiều item; với width trung bình có nguy cơ chật. Birth
Report dài, nhiều card liên tiếp, cần hierarchy tốt hơn trước public beta.

### Tablet

Chưa có kiểm visual tự động. Grid responsive dùng Tailwind hợp lý, nhưng một số
layout `lg:grid-cols-*` có thể nhảy đột ngột giữa tablet và desktop.

### Mobile

Tốt: form component mobile-first, nav dùng `details`, cards 1 cột.

Rủi ro: mobile menu bằng native `details` không tự đóng khi chọn link; không có
focus trap như drawer chuẩn. Report dài có thể gây fatigue.

### Dark Mode

OK. App ép `className="dark"`, color-scheme được định hướng trong CSS. Không có
light mode public.

### Loading / Empty / Error / Not Found

- Empty state: dashboard, birth-report, history có.
- Loading: thiếu route-level `loading.tsx`.
- Error: thiếu route-level `error.tsx`.
- Not Found: thiếu custom `not-found.tsx`.
- Skeleton: chưa có skeleton chung.

### Animation

Premium background, reveal, progress animation có. Có reduced motion fallback
theo sprint motion trước, nhưng cần kiểm thực tế Lighthouse/mobile.

### Glass UI / Card / Button / Form

Glass UI nhất quán. Form component riêng tốt. Button có focus-visible. Một số
copy/button còn dùng trạng thái placeholder như `Sắp ra mắt`.

### Dialog

Không thấy dialog/modal system. Chưa phải blocker nếu beta không cần modal.

## 3. Content Audit

Quét các chuỗi rủi ro:

- `MVP`: xuất hiện trong production UI/meta ở `/love-compatibility`,
  `/numerology`, dashboard overview, good-day, source registry text nếu render.
- `demo`: xuất hiện trong dashboard daily fortune/home dashboard preview/pricing
  preview/source labels.
- `Sắp ra mắt`: xuất hiện trong `/pricing` và `/login` Facebook.
- `Sprint`: xuất hiện trong docs và một số login/pricing copy nói sprint riêng.
- `AI diễn giải`, `AI phân tích`: chỉ nằm trong quality checker/docs, không thấy
  production UI report.
- `Placeholder`, `Lorem ipsum`: không thấy production UI trực tiếp.
- `Fake Data`: không thấy.
- `Dev Only`: không thấy; dev debug panel được guard bằng `NODE_ENV`.

Production UI lỗi cần xử lý trước beta:

1. `/love-compatibility` title/meta có `MVP`.
2. `/numerology` title/description/body có `MVP`.
3. `/good-day` form/result có `MVP deterministic`.
4. `/dashboard` có `Astrology Engine MVP`.
5. Homepage dashboard/pricing preview có chữ `demo`.
6. `/pricing` và `/login` có `Sắp ra mắt`; chấp nhận nếu label beta rõ, nhưng
   không nên để như placeholder thương mại.

## 4. Performance Audit

Kết quả build:

- `npm run lint`: pass.
- `npm run build`: pass.
- `.next`: khoảng 28 MB.
- Static files: 36.
- Public image chính `public/images/menh-viet-hero.png`: khoảng 1.8 MB.

Rủi ro:

- Hero image 1.8 MB cần nén/resize/AVIF/WebP.
- Premium background animation toàn app cần đo FPS trên mobile thấp.
- Birth Report page là server-rendered dynamic, nhiều section/card, có thể nặng
  về HTML và hydration của client children.
- Chưa có bundle analyzer.
- Chưa có Lighthouse budget.
- `.DS_Store` nằm trong `public`, cần xóa trước beta vì bị public serve.

## 5. Accessibility Audit

Tốt:

- Nhiều icon decorative có `aria-hidden`.
- Header nav/footer nav có `aria-label`.
- Button có focus-visible.
- Image hero có alt.

Rủi ro:

- Mobile menu dùng `details/summary`, chưa phải drawer accessible đầy đủ.
- Thiếu skip link.
- Chưa audit contrast bằng công cụ.
- Các progress bars/rings cần `aria-valuenow` nếu dùng như semantic progress.
- Form error announcement chưa rõ có `aria-describedby`/`aria-live`.
- Native select styled dark nhưng option contrast cần test Safari/Chrome.

## 6. SEO Audit

Tốt:

- Hầu hết route chính có `metadata.title`, `description`, `canonical`.
- Một số route có OpenGraph.
- Root metadata dùng helper.

Thiếu:

- Không thấy `app/sitemap.ts`.
- Không thấy `app/robots.ts`.
- Không thấy JSON-LD/FAQ schema.
- Không thấy Twitter metadata.
- Không thấy dynamic SEO landing pages theo năm sinh/mệnh/hợp tuổi.
- Metadata một số page còn chứa `MVP`, làm giảm trust.
- `public/.DS_Store` cần loại bỏ.
- Birth report/dashboard/profile pages có canonical chung dù có query
  `profileId`; cần noindex hoặc canonical strategy rõ.

## 7. Auth Audit

Tốt:

- NextAuth Google provider đã cấu hình.
- Prisma Adapter có `User`, `Account`, `Session`, `VerificationToken`.
- Anonymous flow vẫn dùng được.
- Header đổi trạng thái theo session.
- `/history` phân biệt chưa login/login/no history.

Rủi ro:

- Google login phụ thuộc env; chưa audit OAuth production redirect.
- Facebook disabled nhưng vẫn hiện trong login.
- `authOptions` luôn include Google provider với empty id/secret nếu env thiếu;
  UI disable, nhưng API provider vẫn tồn tại. Cần review production behavior.
- Session strategy database dùng SQLite dev; production cần PostgreSQL.
- Save profile/user association chưa hoàn chỉnh: onboarding tạo profile
  anonymous, chưa attach user sau login.
- Usage limit chỉ UI/helper, chưa tracking thật.
- Premium/subscription chưa enforce quyền.

## 8. Birth Report Audit

Tốt:

- Có overview, raw data, signature insight, interpretation, strengths, cautions,
  career, finance, relationship, health, recommendations, why, sources,
  disclaimer, share card, premium teaser.
- Quality checker và validator có dev panel.
- Không thấy `AI diễn giải/AI phân tích` trong report UI.
- Source Registry và Knowledge Pack Ngũ Hành đã được dùng trong adapter.

Rủi ro:

- Report render nhiều section trùng ý: `SignatureInsight` và `ReportKeyInsight`,
  `NextDiscovery` và `ReportNextDiscovery`.
- Dev debug panel chỉ ẩn ở production; tốt, nhưng cần đảm bảo deploy env đúng.
- Một số narrative còn hơi kỹ thuật: “Rule Engine”, “fact”, “confidence” có thể
  tốt cho explainability nhưng cần bản copy thân thiện hơn cho đại chúng.
- Raw data hiển thị enum `MALE/FEMALE/SOLAR` nếu chưa format tiếng Việt.
- BirthChart cache không invalidated nếu profile đổi ngày sinh/giới tính.

## 9. Knowledge Audit

Tốt:

- Knowledge Registry: 9 items.
- Knowledge Validator: pass, 0 errors, 0 warnings.
- Source Registry: 10 sources.
- Knowledge Graph: 35 links.
- Five Elements Pack v1 có overview + 5 hành + graph relations.
- Search theo keyword/tag hoạt động ở mức helper.

Rủi ro:

- Knowledge graph chưa có validator riêng cho link trùng/link tới item không tồn tại.
- Registry code-based sẽ khó scale nếu nhập hàng nghìn item.
- Chưa có reviewer workflow/changelog/version diff.
- Chưa tích hợp Knowledge Search vào UI/admin.
- Source confidence vẫn chủ yếu nội bộ, chưa có bibliography chuẩn.

## 10. Technical Debt Top 50

### Critical

1. Gỡ production copy `MVP/demo/deterministic/sprint` khỏi UI/meta.
2. Thêm `robots.ts` và `sitemap.ts`.
3. Thêm custom `not-found.tsx`, `error.tsx`, `loading.tsx`.
4. Xóa `public/.DS_Store`.
5. Nén/đổi hero image sang WebP/AVIF và tối ưu responsive sizes.
6. Thêm noindex/canonical strategy cho `/dashboard`, `/birth-report` query pages.
7. Review NextAuth provider behavior khi Google env thiếu.
8. Chuyển production DB từ SQLite sang PostgreSQL trước public traffic.
9. Tạo automated smoke tests cho onboarding -> dashboard -> birth report.
10. Thêm content quality gate để chặn từ cấm trong production UI.

### High

11. Implement usage tracking thật cho free/registered limits.
12. Gắn profile anonymous với user sau login hoặc tạo flow claim profile.
13. Xây history detail route hoặc chỉnh nút “Xem lại” cho rõ.
14. Chuẩn hóa Vietnamese labels cho enums trong raw data.
15. Thêm graph link validator.
16. Thêm Knowledge Registry validator vào CI.
17. Thêm JSON-LD FAQ schema cho landing pages.
18. Thêm OpenGraph/Twitter metadata đầy đủ cho tất cả route.
19. Thêm accessible mobile drawer thay cho native details.
20. Thêm skip link.
21. Thêm aria cho score/progress.
22. Thêm form error `aria-describedby`/`aria-live`.
23. Đo Lighthouse mobile và đặt performance budget.
24. Thêm bundle analyzer.
25. Giảm trùng section trong Birth Report.
26. Chuyển copy “Rule Engine/fact/confidence” sang ngôn ngữ người dùng ở bản default.
27. Tạo visual QA checklist desktop/tablet/mobile.
28. Tạo test cho date/time normalization.
29. Tạo test cho astrology can-chi/cung-phi/birth-chart.
30. Tạo test cho compatibility scoring safety.

### Medium

31. Chuẩn hóa metadata title tiếng Việt thay vì “Pricing”.
32. Chuyển `Sắp ra mắt` thành waitlist/roadmap beta rõ ràng.
33. Cập nhật homepage preview tránh chữ `demo`.
34. Cập nhật Good Day copy tránh lộ deterministic model.
35. Cập nhật Numerology copy tránh lộ MVP.
36. Cập nhật Love Compatibility copy tránh lộ MVP.
37. Thêm skeleton cho dashboard/report/history.
38. Thêm empty/error state cho module form result lỗi computation.
39. Tối ưu header overflow ở tablet.
40. Thêm privacy/terms pages nếu auth public.
41. Thêm cookie/session policy note.
42. Thêm security headers review.
43. Thêm rate limiting cho server actions/API.
44. Thêm duplicate-save handling ở DB level nếu cần.
45. Thêm admin/report abuse workflow cho content.

### Low

46. Tách docs sprint cũ khỏi public repo bundle nếu deploy docs.
47. Chuẩn hóa naming “Mệnh Việt AI” vs “Mệnh Việt”.
48. Tạo component SEO article card từ docs UI component plan.
49. Thêm sitemap dynamic cho future SEO landings.
50. Thêm changelog cho Knowledge Pack.

## Điểm mạnh

- Product foundation rõ: freemium, anonymous-first, dashboard, report, pricing.
- UI có bản sắc: dark premium, glass surface, motion nhẹ.
- Logic domain nằm trong `/lib`, UI tách component tốt.
- Form system riêng giải quyết date/time/select mặc định.
- Auth foundation và history/save flow đã có.
- Birth Report có explainability, source, why, disclaimer.
- Knowledge DB/Source Registry/Graph là nền rất tốt cho scale.

## Điểm yếu

- Public-facing copy còn nhiều dấu vết nội bộ.
- SEO nền tảng còn thiếu sitemap/robots/schema.
- Testing thiếu nghiêm trọng.
- Daily fortune/good day/numerology còn ở mức MVP rõ ràng.
- Auth/profile/history chưa thành vòng đời user hoàn chỉnh.
- Usage limit/premium chưa enforce thật.
- Chưa có production infra assumptions rõ.

## Critical Bugs / Public Beta Blockers

1. Production UI/meta còn chữ `MVP/demo/Sắp ra mắt/sprint`.
2. Thiếu sitemap/robots/noindex strategy.
3. Thiếu custom error/loading/not-found states.
4. `public/.DS_Store` đang nằm trong public assets.
5. SQLite không phù hợp production public beta.
6. Không có automated smoke/regression tests.
7. Usage limit chỉ demo, có thể gây hiểu nhầm về Freemium.
8. Birth Report query pages có thể bị index sai nếu không noindex.

## Top 20 Việc Cần Làm Trước Beta

1. Gỡ toàn bộ copy nội bộ khỏi production UI/meta.
2. Tạo `robots.ts`, `sitemap.ts`, noindex cho private/query pages.
3. Xóa `public/.DS_Store`.
4. Tối ưu hero image.
5. Thêm `loading.tsx`, `error.tsx`, `not-found.tsx`.
6. Tạo smoke test cho route chính.
7. Tạo content quality script chạy CI.
8. Tạo Knowledge Graph validator.
9. Review NextAuth env/provider behavior production.
10. Chuẩn bị PostgreSQL production.
11. Thêm profile claim/attach sau login.
12. Hoàn thiện history detail hoặc chỉnh CTA.
13. Đổi copy pricing “coming soon” thành beta waitlist rõ ràng.
14. Thêm privacy/terms.
15. Thêm rate limit server actions.
16. Chuẩn hóa enum display tiếng Việt trong report.
17. Đo Lighthouse mobile.
18. Thêm JSON-LD FAQ cho homepage/core modules.
19. Giảm trùng section Birth Report.
20. Kiểm visual mobile/tablet thủ công trước release.

## Beta Readiness

**68%**

Đủ tốt để tiếp tục private beta hoặc closed beta với nhóm nhỏ. Chưa đủ an toàn
cho public beta rộng vì SEO, content polish, production infra, accessibility và
test coverage chưa đạt mức thương mại.

## Roadmap Beta Đề Xuất

### Beta Prep 1: Production Polish

- Remove internal copy.
- Add loading/error/not-found.
- Optimize public assets.
- Add robots/sitemap/noindex.

### Beta Prep 2: Trust + Safety

- Content quality CI.
- Terms/privacy.
- Disclaimer consistency check.
- Birth Report copy simplification.

### Beta Prep 3: Auth + Data Reliability

- Production DB.
- Google OAuth production config.
- Profile claim flow.
- History detail behavior.

### Beta Prep 4: QA Automation

- Route smoke tests.
- Form validation tests.
- Astrology engine tests.
- Knowledge validator/graph validator tests.

### Beta Prep 5: SEO Foundation

- JSON-LD FAQ.
- OpenGraph/Twitter standardization.
- Initial SEO landing templates after core product polish.
