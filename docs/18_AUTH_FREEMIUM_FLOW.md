# Auth Freemium Flow

## 1. Anonymous Visitor là gì

Anonymous Visitor là người dùng chưa đăng nhập nhưng vẫn được sử dụng các tính
năng cơ bản của Mệnh Việt AI:

- Tạo hồ sơ tạm thời qua onboarding.
- Xem dashboard cá nhân bằng `profileId`.
- Xem Ngũ Hành.
- Xem Thần số học.
- Xem Hợp tuổi.
- Xem Ngày đẹp.

Nguyên tắc sản phẩm: không bắt người dùng đăng nhập trước khi thấy giá trị.

## 2. Registered User là gì

Registered User là người dùng đã đăng nhập và có bản ghi `User` trong database.
Mục tiêu của trạng thái này:

- Lưu hồ sơ vào tài khoản.
- Xem lại lịch sử phân tích.
- Đồng bộ hồ sơ trên nhiều thiết bị.
- Chuẩn bị áp dụng giới hạn sử dụng cao hơn trong các sprint sau.

`Profile.userId` vẫn optional để người dùng anonymous tiếp tục dùng được sản phẩm.

## 3. Premium User là gì

Premium User là người dùng đã đăng nhập và có subscription trả phí trong tương
lai. Sprint này chưa kích hoạt thanh toán thật.

Premium/Pro sau này có thể mở:

- Báo cáo chuyên sâu.
- PDF report.
- Lịch sử phân tích dài hơn.
- AI Coach an toàn.
- Vận trình 12 tháng.

## 4. User Flow

1. Người dùng vào trang chủ.
2. Người dùng dùng miễn phí: tạo hồ sơ hoặc nhập dữ liệu ở các module.
3. Người dùng xem kết quả trước.
4. UI hiển thị CTA: "Bạn muốn lưu hồ sơ này?"
5. Người dùng bấm "Lưu hồ sơ miễn phí".
6. Người dùng tới `/login`.
7. Sau khi Auth.js/OAuth được cấu hình ở sprint sau, người dùng đăng nhập để
   gắn hồ sơ/lịch sử vào `User`.
8. Sau này người dùng có thể nâng cấp Premium/Pro.

## 5. Cách cấu hình Google OAuth

Biến môi trường cần có:

```env
AUTH_SECRET=""
AUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

Các bước dự kiến:

1. Tạo OAuth app trong Google Cloud Console.
2. Thêm redirect URL cho môi trường dev:
   `http://localhost:3000/api/auth/callback/google`
3. Điền `GOOGLE_CLIENT_ID` và `GOOGLE_CLIENT_SECRET` vào `.env`.
4. Cài Auth.js/NextAuth và Prisma Adapter ở sprint tích hợp OAuth thật.
5. Kết nối provider Google trong cấu hình auth.

Sprint này chưa gọi Google provider thật để tránh lỗi khi chưa có package và
secret.

## 6. Cách cấu hình Facebook OAuth sau này

Biến môi trường cần có:

```env
FACEBOOK_CLIENT_ID=""
FACEBOOK_CLIENT_SECRET=""
```

Các bước dự kiến:

1. Tạo Facebook app.
2. Cấu hình OAuth redirect URL.
3. Bật Facebook Login product.
4. Điền client id/secret vào `.env`.
5. Thêm provider Facebook vào cấu hình Auth.js.

Sprint này Facebook button ở trạng thái disabled/coming soon.

## 7. Những việc chưa làm trong Sprint này

- Chưa cài Auth.js/NextAuth dependency.
- Chưa tạo route `/api/auth`.
- Chưa kích hoạt OAuth thật.
- Chưa gắn hồ sơ anonymous vào user sau login.
- Chưa lưu lịch sử phân tích theo user.
- Chưa có middleware phân quyền.
- Chưa có Premium limit hoặc payment thật.
- Chưa có UI account menu/sign out.

## 8. Database Foundation

Đã chuẩn bị các model theo cấu trúc Auth.js:

- `User`
- `Account`
- `Session`
- `VerificationToken`

`User` đã có:

- `id`
- `name`
- `email`
- `emailVerified`
- `image`
- `createdAt`
- `updatedAt`

`Profile.userId` tiếp tục optional để giữ đúng mô hình freemium.
