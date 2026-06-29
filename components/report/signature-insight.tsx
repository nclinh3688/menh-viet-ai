import { Sparkles } from "lucide-react";
import { ASTROLOGY_DISCLAIMER } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SignatureInsightProps {
  className?: string;
  insight: string;
  label?: string;
  title?: string;
}

export function SignatureInsight({
  className,
  insight,
  label = "Signature Insight",
  title = "Nếu chỉ chọn một điều đáng nhớ nhất trong hồ sơ này...",
}: SignatureInsightProps) {
  return (
    <section
      className={cn(
        "premium-surface overflow-hidden rounded-lg border border-primary/35 bg-primary/12 p-5 shadow-2xl shadow-primary/10 backdrop-blur-xl md:p-6",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-lg shadow-primary/20">
          <Sparkles className="size-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-primary">{label}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-normal text-foreground">
            {title}
          </h2>
          <p className="mt-4 text-base leading-8 text-foreground/88">
            {insight}
          </p>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            {ASTROLOGY_DISCLAIMER}
          </p>
        </div>
      </div>
    </section>
  );
}
