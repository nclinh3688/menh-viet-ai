import type { Metadata } from "next";
import { NumerologyForm } from "@/components/numerology/numerology-form";
import { APP_NAME, ASTROLOGY_DISCLAIMER } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Thần số học theo tên và ngày sinh | ${APP_NAME}`,
  description:
    "Tính số chủ đạo, số thái độ, số linh hồn và số sứ mệnh theo họ tên và ngày sinh, kèm gợi ý điểm mạnh, điểm yếu, tình yêu và công việc.",
  alternates: {
    canonical: "/numerology",
  },
  openGraph: {
    title: `Thần số học theo tên và ngày sinh | ${APP_NAME}`,
    description:
      "Khám phá các con số nền tảng từ ngày sinh và họ tên theo hướng tham khảo, dễ hiểu và không cực đoan.",
    type: "website",
  },
};

export default function NumerologyPage() {
  return (
    <main>
      <NumerologyForm />
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-md border border-primary/20 bg-primary/8 p-5">
          <p className="text-sm leading-6 text-muted-foreground">
            {ASTROLOGY_DISCLAIMER} Thần số học trong phiên bản này là mô hình
            tham khảo để khám phá bản thân, không thay thế tư vấn chuyên môn hoặc
            quyết định quan trọng về tài chính, sức khỏe, pháp lý và quan hệ.
          </p>
        </div>
      </section>
    </main>
  );
}
