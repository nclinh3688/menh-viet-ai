# Google Auth Setup

## Tổng quan

Sprint này kết nối Google login thật bằng `next-auth` và Prisma Adapter. Người
dùng vẫn có thể dùng các trang public mà không cần đăng nhập. Đăng nhập chỉ dùng
để lưu hồ sơ, xem lịch sử và đồng bộ dữ liệu ở các sprint sau.

## Tạo Google OAuth Client

1. Vào Google Cloud Console.
2. Tạo hoặc chọn project.
3. Mở `APIs & Services` -> `OAuth consent screen`.
4. Cấu hình app name, support email và developer contact.
5. Mở `Credentials` -> `Create Credentials` -> `OAuth client ID`.
6. Chọn loại application: `Web application`.
7. Thêm redirect URI local.

## Redirect URI cần dùng

Local development:

```text
http://localhost:3000/api/auth/callback/google
```

Nếu chạy bằng `127.0.0.1`, cần thêm redirect URI tương ứng:

```text
http://127.0.0.1:3000/api/auth/callback/google
```

Production sau này:

```text
https://your-domain.com/api/auth/callback/google
```

## Biến môi trường

Thêm vào `.env`:

```bash
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
AUTH_SECRET="..."
AUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
```

Vì project đang dùng `next-auth@4`, nên cần giữ `NEXTAUTH_SECRET` và
`NEXTAUTH_URL` đồng bộ với `AUTH_SECRET` và `AUTH_URL`.

Tạo secret local:

```bash
openssl rand -base64 32
```

Không commit secret thật vào git.

## Cách test login/logout

1. Chạy `npx prisma generate`.
2. Chạy `npx prisma db push`.
3. Chạy `npm run dev`.
4. Mở `/login`.
5. Bấm `Tiếp tục với Google`.
6. Sau khi callback thành công, header hiển thị tên/email người dùng.
7. Mở `/history`; nếu chưa có dữ liệu sẽ thấy empty state lịch sử.
8. Bấm `Đăng xuất` trên header để kết thúc session.

## Những việc chưa làm

- Chưa làm Facebook OAuth thật.
- Chưa bắt buộc đăng nhập ở bất kỳ route public nào.
- Chưa tự động lưu kết quả vào `SavedAnalysis`.
- Chưa liên kết hồ sơ anonymous với user sau khi login.
- Chưa có trang account/profile.
- Chưa có payment hoặc Premium thật.
