import Link from "next/link";
import { LockKeyhole, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PremiumLockProps {
  description?: string;
  featureName?: string;
  title?: string;
}

export function PremiumLock({
  description = "Nâng cấp Premium để xem luận giải đầy đủ, lưu lịch sử và mở khóa các tính năng nâng cao.",
  featureName,
  title = "Mở khóa phân tích chuyên sâu",
}: PremiumLockProps) {
  return (
    <article className="rounded-md border border-primary/20 bg-primary/8 p-5 shadow-2xl shadow-primary/8 backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex size-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
          <LockKeyhole className="size-5" />
        </div>
        {featureName ? (
          <span className="rounded-full border border-white/10 bg-background/48 px-3 py-1 text-xs font-semibold text-muted-foreground">
            {featureName}
          </span>
        ) : null}
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
      <Button asChild className="mt-5 w-full" variant="secondary">
        <Link href="/pricing">
          <Sparkles className="size-4" />
          Xem gói Premium
        </Link>
      </Button>
    </article>
  );
}
