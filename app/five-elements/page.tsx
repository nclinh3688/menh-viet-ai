import type { Metadata } from "next";
import { FiveElementsEducation } from "@/components/five-elements/five-elements-education";
import { FiveElementsForm } from "@/components/five-elements/five-elements-form";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Phân tích Ngũ Hành theo năm sinh | ${APP_NAME}`,
  description:
    "Xem mệnh Ngũ Hành theo năm sinh hoặc ngày sinh: màu hợp, màu nên tiết chế, số hợp, nghề phù hợp và quan hệ tương sinh tương khắc.",
  alternates: {
    canonical: "/five-elements",
  },
  openGraph: {
    title: `Phân tích Ngũ Hành theo năm sinh | ${APP_NAME}`,
    description:
      "Khám phá hành bản mệnh, màu sắc, số hợp và gợi ý phát triển cá nhân theo hệ quy chiếu Ngũ Hành.",
    type: "website",
  },
};

export default function FiveElementsPage() {
  return (
    <main>
      <FiveElementsForm />
      <FiveElementsEducation />
    </main>
  );
}
