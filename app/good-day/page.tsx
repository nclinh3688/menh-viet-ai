import type { Metadata } from "next";
import { GoodDayForm } from "@/components/good-day/good-day-form";

export const metadata: Metadata = {
  title: "Xem ngày đẹp - Mệnh Việt AI",
  description:
    "Xem ngày tốt cho cưới hỏi, khai trương, ký hợp đồng, mua xe, mua nhà và xuất hành.",
  alternates: {
    canonical: "/good-day",
  },
  openGraph: {
    title: "Xem ngày đẹp - Mệnh Việt AI",
    description:
      "Xem ngày tốt cho cưới hỏi, khai trương, ký hợp đồng, mua xe, mua nhà và xuất hành.",
    type: "website",
  },
};

export default function GoodDayPage() {
  return (
    <main>
      <GoodDayForm />
    </main>
  );
}
