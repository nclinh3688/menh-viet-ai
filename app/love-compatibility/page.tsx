import type { Metadata } from "next";
import { CompatibilityForm } from "@/components/love-compatibility/compatibility-form";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Hợp tuổi hôn nhân MVP | ${APP_NAME}`,
  description:
    "Xem hợp tuổi hôn nhân MVP theo Cung Phi, Địa Chi, Ngũ Hành, Thiên Can và yếu tố bổ sung. Nội dung chỉ mang tính tham khảo.",
  alternates: {
    canonical: "/love-compatibility",
  },
  openGraph: {
    title: `Hợp tuổi hôn nhân MVP | ${APP_NAME}`,
    description:
      "Phân tích mức độ hòa hợp của hai người theo hệ quy chiếu tham khảo, không phán quyết tuyệt đối về tình cảm.",
    type: "website",
  },
};

export default function LoveCompatibilityPage() {
  return (
    <main>
      <CompatibilityForm />
    </main>
  );
}
