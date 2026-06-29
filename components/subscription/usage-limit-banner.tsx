import Link from "next/link";
import { Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getPlanLimits,
  getRemainingUsage,
  type SubscriptionPlanKey,
} from "@/lib/subscription";

interface UsageLimitBannerProps {
  plan: SubscriptionPlanKey;
  usedToday: number;
}

export function UsageLimitBanner({ plan, usedToday }: UsageLimitBannerProps) {
  const limits = getPlanLimits(plan);
  const remainingUsage = getRemainingUsage({ plan, usedToday });
  const isLow =
    typeof remainingUsage === "number" &&
    remainingUsage <= Math.max(1, Math.ceil(Number(limits.dailyAnalysisLimit) * 0.34));

  return (
    <section className="rounded-lg border border-white/10 bg-card/64 p-5 backdrop-blur-xl md:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
            <Gauge className="size-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-primary">Giới hạn Freemium</p>
            <h2 className="mt-1 text-xl font-semibold text-foreground">
              {remainingUsage === "unlimited"
                ? "Bạn đang ở gói không giới hạn"
                : `Bạn còn ${remainingUsage} lượt xem miễn phí hôm nay`}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {isLow
                ? "Đăng nhập để tăng giới hạn hoặc nâng cấp Premium."
                : `${limits.name} cho phép ${
                    limits.dailyAnalysisLimit === "unlimited"
                      ? "không giới hạn"
                      : `${limits.dailyAnalysisLimit} lượt`
                  } phân tích cơ bản mỗi ngày.`}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild variant="secondary">
            <Link href="/login">Đăng nhập</Link>
          </Button>
          <Button asChild>
            <Link href="/pricing">Xem Premium</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
