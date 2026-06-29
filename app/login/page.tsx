import type { Metadata } from "next";
import { LoginCard } from "@/components/auth/login-card";
import { APP_NAME } from "@/lib/constants";
import { getAuthProviderStatus } from "@/lib/auth";
import { getCurrentUser } from "@/lib/auth/get-current-user";

export const metadata: Metadata = {
  title: `Đăng nhập lưu hồ sơ | ${APP_NAME}`,
  description:
    "Đăng nhập để lưu kết quả, xem lại lịch sử và đồng bộ hồ sơ Mệnh Việt AI trên nhiều thiết bị.",
  alternates: {
    canonical: "/login",
  },
};

export default async function LoginPage() {
  const currentUser = await getCurrentUser();

  return (
    <main>
      <LoginCard
        currentUser={currentUser}
        providerStatus={getAuthProviderStatus()}
      />
    </main>
  );
}
