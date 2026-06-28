import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    cta: "Bắt đầu miễn phí",
    description: "Tạo hồ sơ, xem lá số cơ bản và dashboard demo.",
    href: "/onboarding",
    name: "Free",
    price: "0đ",
    features: ["1 hồ sơ cơ bản", "Can Chi, Ngũ hành, Cung Phi", "Chỉ số hôm nay demo"],
  },
  {
    cta: "Xem Premium",
    description: "Báo cáo sâu hơn, lịch sử phân tích và PDF report ở giai đoạn sau.",
    href: "/pricing",
    name: "Premium",
    price: "99k/tháng",
    features: ["Báo cáo chi tiết", "Hợp tuổi nâng cao", "PDF report"],
  },
];

export function PricingPreview() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold text-primary">Free vs Premium</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground md:text-4xl">
          Bắt đầu miễn phí, nâng cấp khi cần phân tích sâu hơn
        </h2>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {plans.map((plan) => (
          <article className="rounded-lg border bg-card/64 p-5 backdrop-blur-xl md:p-6" key={plan.name}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{plan.description}</p>
              </div>
              <p className="whitespace-nowrap text-lg font-semibold text-primary">{plan.price}</p>
            </div>
            <ul className="mt-6 grid gap-3">
              {plan.features.map((feature) => (
                <li className="flex items-center gap-2 text-sm text-muted-foreground" key={feature}>
                  <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-6 w-full" variant={plan.name === "Free" ? "default" : "secondary"}>
              <Link href={plan.href}>{plan.cta}</Link>
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
