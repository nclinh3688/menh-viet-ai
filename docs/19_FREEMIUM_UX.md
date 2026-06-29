# Freemium UX

## Vì sao không ép đăng nhập sớm

Mệnh Việt AI cần cho người dùng thấy giá trị trước khi yêu cầu họ để lại danh
tính. Với sản phẩm tử vi, ngũ hành, hợp tuổi và thần số học, rào cản đăng nhập
quá sớm làm giảm niềm tin và giảm tỷ lệ thử nghiệm.

Nguyên tắc: người dùng được xem kết quả miễn phí trước, sau đó mới được mời lưu
hồ sơ.

## Flow người dùng anonymous

1. Vào trang chủ.
2. Nhập thông tin ngày sinh ở form hero.
3. Xem miễn phí kết quả/dashboard.
4. Đọc tổng quan và thấy giá trị cá nhân hóa.
5. Thấy CTA "Bạn muốn lưu kết quả này?"
6. Có thể chọn:
   - "Lưu hồ sơ miễn phí" để tới `/login`.
   - "Để sau" để tiếp tục xem mà không đăng nhập.

Không route public nào được redirect sang login chỉ vì người dùng chưa đăng nhập.

## Khi nào nên mời đăng nhập

Nên mời đăng nhập sau khi người dùng đã có kết quả:

- Sau dashboard tổng quan vận mệnh.
- Cuối trang kết quả hợp tuổi.
- Cuối trang Ngũ Hành.
- Cuối trang Thần số học.
- Cuối trang Ngày đẹp.

Không mời đăng nhập trước form chính của trang chủ.

## CTA được phép dùng

- "Xem miễn phí"
- "Lưu hồ sơ miễn phí"
- "Đăng nhập để lưu kết quả"
- "Bạn vẫn có thể xem miễn phí mà không cần đăng nhập"
- "Tiếp tục xem không cần đăng nhập"
- "Để sau"

## CTA không nên dùng

- "Bạn phải đăng nhập"
- "Bạn cần tạo tài khoản để xem"
- "Bắt buộc đăng nhập để tiếp tục"
- "Tạo hồ sơ" trong header như CTA chính cho người mới

## Quy tắc header

- Header desktop chỉ hiển thị action "Đăng nhập" ở bên phải khi chưa có auth thật.
- Không đặt nút "Tạo hồ sơ" ở header.
- Mobile menu cũng phải có "Đăng nhập".
- Khi Auth.js thật được tích hợp, trạng thái sau login có thể thay "Đăng nhập"
  bằng avatar hoặc account menu.

## Quy tắc login page

- Login page phải nói rõ lợi ích lưu hồ sơ, không tạo cảm giác bắt buộc.
- Google button chỉ kích hoạt khi OAuth đã cấu hình.
- Facebook button có thể disabled hoặc "Sắp ra mắt".
- Luôn có link quay lại trải nghiệm miễn phí.

## Quy tắc dashboard

- Dashboard không bị chặn bởi auth.
- SaveProfileCTA nên đặt sau khi người dùng đã thấy kết quả chính.
- CTA chính dẫn tới `/login`.
- CTA phụ cho phép bỏ qua hoặc cuộn xuống nội dung tiếp theo.
