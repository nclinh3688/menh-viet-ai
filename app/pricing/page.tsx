import type { Metadata } from "next";
import Link from "next/link";
import { Check, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Pricing | ${APP_NAME}`,
  description:
    "So sánh gói Free, Registered, Premium và Pro của Mệnh Việt AI. Trang hiện tại chưa tích hợp thanh toán thật.",
  alternates: {
    canonical: "/pricing",
  },
};

const plans = [
  {
    cta: "Dùng miễn phí",
    description: "Dành cho người mới muốn thử các phân tích cơ bản.",
    features: [
      "3 lượt phân tích/ngày",
      "Xem hồ sơ cơ bản",
      "Dashboard cá nhân",
      "Không lưu lịch sử dài",
    ],
    href: "/",
    name: "Free",
    price: "0đ",
  },
  {
    cta: "Đăng nhập miễn phí",
    description: "Dành cho người muốn lưu hồ sơ và dùng nhiều hơn sau này.",
    features: [
      "10 lượt/ngày",
      "Lưu hồ sơ sau này",
      "Đồng bộ nhiều thiết bị sau này",
      "Chuẩn bị lịch sử phân tích",
    ],
    href: "/login",
    name: "Registered",
    price: "0đ",
  },
  {
    cta: "Tham gia danh sách chờ",
    description: "Dành cho người cần phân tích sâu hơn và lưu lịch sử.",
    features: [
      "Không giới hạn phân tích cơ bản",
      "Luận giải chuyên sâu",
      "Lưu lịch sử",
      "Báo cáo PDF sau này",
    ],
    href: "/login",
    name: "Premium",
    price: "99.000đ/tháng",
  },
  {
    cta: "Sắp ra mắt",
    description: "Dành cho người dùng cần AI Coach và báo cáo nâng cao.",
    features: [
      "AI Coach",
      "PDF nâng cao",
      "Tư vấn cá nhân hóa",
      "Ưu tiên tính năng mới",
    ],
    href: "/login",
    name: "Pro",
    price: "199.000đ/tháng",
  },
];

export default function PricingPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <section className="max-w-3xl">
        <p className="text-sm font-semibold text-primary">Pricing</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-normal text-foreground md:text-5xl">
          Dùng miễn phí trước, nâng cấp khi cần phân tích sâu hơn
        </h1>
        <p className="mt-4 text-base leading-8 text-muted-foreground">
          Mệnh Việt AI đang chuẩn bị nền tảng Premium/Pro. Trang này chỉ giới
          thiệu gói, chưa tích hợp thanh toán thật.
        </p>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-4">
        {plans.map((plan) => (
          <article
            className="flex rounded-md border bg-card/68 p-5 shadow-2xl shadow-primary/8 backdrop-blur-xl"
            key={plan.name}
          >
            <div className="flex w-full flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">
                    {plan.name}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {plan.description}
                  </p>
                </div>
                {plan.name === "Premium" || plan.name === "Pro" ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/8 px-2 py-1 text-xs font-semibold text-primary">
                    <Sparkles className="size-3" />
                    Soon
                  </span>
                ) : null}
              </div>

              <p className="mt-6 text-2xl font-semibold text-primary">{plan.price}</p>

              <ul className="mt-6 grid gap-3">
                {plan.features.map((feature) => (
                  <li
                    className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"
                    key={feature}
                  >
                    <Check className="mt-1 size-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className="mt-auto w-full"
                variant={plan.name === "Premium" ? "default" : "secondary"}
              >
                <Link href={plan.href}>
                  {plan.name === "Pro" ? <Clock className="size-4" /> : null}
                  {plan.cta}
                </Link>
              </Button>
            </div>
          </article>
        ))}
      </section>

      <p className="mt-8 rounded-md border border-primary/20 bg-primary/8 px-4 py-3 text-sm leading-6 text-muted-foreground">
        Chưa tích hợp thanh toán thật. Premium/Pro sẽ được triển khai sau khi có
        auth, usage tracking và chính sách hoàn tiền rõ ràng.
      </p>
    </main>
  );
}
