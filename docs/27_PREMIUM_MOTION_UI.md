# Premium Motion UI

## Component motion đã tạo

- `/components/visual/premium-background.tsx`
  - Nền aurora/glow cố định, star particles nhẹ, không dùng canvas.
  - Chạy bằng CSS transform/filter, pointer-events none.

- `/components/visual/fate-orb.tsx`
  - Vật thể 3D-like cho hero.
  - Dùng CSS/SVG-like DOM rings, không dùng Three.js.
  - Ẩn/giảm kích thước trên mobile để không che form.

- `/components/motion/reveal.tsx`
  - Fade in + translateY 12px.
  - Hỗ trợ delay qua CSS variable.

- `/components/motion/animated-number.tsx`
  - Animate score từ 0 tới giá trị thật.
  - Respect `prefers-reduced-motion`.

- `/components/motion/animated-progress.tsx`
  - Progress bar reveal bằng transform scaleX.
  - Không thay đổi dữ liệu, chỉ thay đổi cách hiển thị.

## Quy tắc animation

- Motion phải chậm, nhẹ, không giật.
- Duration mặc định khoảng 200-760ms cho card/reveal/progress.
- Background drift dùng chu kỳ dài 28-34s.
- Không dùng animation gây sợ hãi, mê tín cực đoan hoặc game hóa quá mức.
- Không che form, CTA hoặc nội dung chính.

## Khi nào dùng animation

- Hero text và form.
- Dashboard daily score.
- Result cards có score/progress.
- Pricing cards hoặc feature cards cần tạo chiều sâu.
- Empty/result state cần cảm giác sản phẩm cao cấp hơn.

## Khi nào không dùng

- Không animate đoạn text dài.
- Không animate mọi item nhỏ trong danh sách dài.
- Không dùng hover lift cho control nhập liệu chính.
- Không dùng motion để che loading chậm hoặc thay đổi dữ liệu nghiệp vụ.
- Không dùng hiệu ứng nặng như canvas/Three.js khi CSS đủ tốt.

## Performance notes

- Background dùng 2 layer aurora và star particles bằng CSS, không có JS runtime.
- Score animation chỉ chạy khi component mount.
- `prefers-reduced-motion: reduce` tắt drift, reveal, progress và hover transform.
- `premium-surface` chỉ dùng transform/box-shadow nhẹ.
- Webpack filesystem cache đang tắt trong `next.config.ts` để tránh lỗi ENOSPC trên máy dev hiện tại; đây không liên quan tới motion runtime.

## Trang đã áp dụng

- `/`: background, hero reveal, fate orb, feature/pricing/dashboard preview card motion.
- `/dashboard`: daily score number/progress animation và card depth.
- `/love-compatibility`: result score/progress animation.
- `/five-elements`: form/result card depth và reveal.
- `/numerology`: form/result card depth và reveal.
- `/good-day`: result score/progress animation.
- `/pricing`: pricing card reveal/hover depth.
- `/login`: login card reveal/hover depth.
