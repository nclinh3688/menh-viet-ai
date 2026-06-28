import type { Metadata } from "next";
import Link from "next/link";
import { Check, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Pricing | ${APP_NAME}`,
  description:
    "So sánh gói Free, Premium và Pro của Mệnh Việt AI. Trang hiện tại chưa tích hợp thanh toán thật.",
  alternates: {
    canonical: "/pricing",
  },
};

const plans = [
  {
    cta: "Tạo hồ sơ miễn phí",
    description: "Dành cho người mới bắt đầu khám phá hồ sơ cá nhân.",
    features: ["Dashboard cơ bản", "Can Chi, Ngũ Hành, Cung Phi", "Thần số học MVP"],
    href: "/onboarding",
    name: "Free",
    price: "0đ",
  },
  {
    cta: "Chưa mở thanh toán",
    description: "Dành cho báo cáo sâu hơn trong các sprint sau.",
    features: ["Luận giải chuyên sâu", "Hợp tuổi nâng cao", "PDF report"],
    href: "/onboarding",
    name: "Premium",
    price: "99k/tháng",
  },
  {
    cta: "Chưa mở thanh toán",
    description: "Dành cho người dùng cần phân tích và tư vấn cá nhân hóa hơn.",
    features: ["AI Coach an toàn", "Vận trình 12 tháng", "Lưu lịch sử phân tích"],
    href: "/onboarding",
    name: "Pro",
    price: "199k/tháng",
  },
];

export default function PricingPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <section className="max-w-3xl">
        <p className="text-sm font-semibold text-primary">Pricing</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-normal text-foreground md:text-5xl">
          Bắt đầu miễn phí, nâng cấp khi cần phân tích sâu hơn
        </h1>
        <p className="mt-4 text-base leading-8 text-muted-foreground">
          Các gói Premium và Pro đang ở trạng thái giới thiệu sản phẩm. Trang này
          chưa tích hợp thanh toán thật.
        </p>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            className="rounded-md border bg-card/68 p-5 shadow-2xl shadow-primary/8 backdrop-blur-xl"
            key={plan.name}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">{plan.name}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {plan.description}
                </p>
              </div>
              {plan.name !== "Free" ? (
                <span className="inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-semibold text-muted-foreground">
                  <Lock className="size-3" />
                  Demo
                </span>
              ) : null}
            </div>
            <p className="mt-6 text-3xl font-semibold text-primary">{plan.price}</p>
            <ul className="mt-6 grid gap-3">
              {plan.features.map((feature) => (
                <li className="flex items-center gap-2 text-sm text-muted-foreground" key={feature}>
                  <Check className="size-4 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              asChild
              className="mt-6 w-full"
              variant={plan.name === "Free" ? "default" : "secondary"}
            >
              <Link href={plan.href}>{plan.cta}</Link>
            </Button>
          </article>
        ))}
      </section>
    </main>
  );
}
