import { Sparkles } from "lucide-react";
import { ASTROLOGY_DISCLAIMER } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SignatureInsightProps {
  className?: string;
  confidence?: number;
  factors?: string[];
  insight: string;
  label?: string;
  title?: string;
}

export function SignatureInsight({
  className,
  confidence,
  factors = [],
  insight,
  label = "Insight nổi bật",
  title = "Điều Mệnh Việt nhận thấy",
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
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-primary">{label}</p>
            {confidence == null ? null : (
              <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Confidence {confidence}%
              </span>
            )}
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-normal text-foreground">
            {title}
          </h2>
          <p className="mt-4 text-base leading-8 text-foreground/88">
            {insight}
          </p>
          {factors.length === 0 ? null : (
            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              {factors.slice(0, 3).map((factor) => (
                <span
                  className="rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm leading-6 text-foreground/82"
                  key={factor}
                >
                  {factor}
                </span>
              ))}
            </div>
          )}
          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            {ASTROLOGY_DISCLAIMER}
          </p>
        </div>
      </div>
    </section>
  );
}
