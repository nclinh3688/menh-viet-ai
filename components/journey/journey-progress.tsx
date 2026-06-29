import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface JourneyStep {
  isCompleted?: boolean;
  label: string;
}

interface JourneyProgressProps {
  className?: string;
  discoveredCount?: number;
  percent: number;
  steps?: JourneyStep[];
  title?: string;
  totalCount?: number;
}

const defaultSteps: JourneyStep[] = [
  { isCompleted: true, label: "Tổng quan" },
  { label: "Con người" },
  { label: "Công việc" },
  { label: "Tình yêu" },
  { label: "Tài chính" },
  { label: "Lời khuyên" },
];

export function JourneyProgress({
  className,
  discoveredCount,
  percent,
  steps = defaultSteps,
  title = "Hành trình khám phá",
  totalCount,
}: JourneyProgressProps) {
  const hasTopicCount = discoveredCount != null && totalCount != null && totalCount > 0;
  const safeDiscovered = hasTopicCount
    ? Math.max(0, Math.min(discoveredCount, totalCount))
    : 0;
  const safePercent = hasTopicCount
    ? Math.round((safeDiscovered / totalCount) * 100)
    : Math.max(0, Math.min(100, Math.round(percent)));

  return (
    <section
      className={cn(
        "premium-surface rounded-lg border bg-card/68 p-5 backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">{title}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {hasTopicCount
              ? `Đã khám phá: ${safeDiscovered} / ${totalCount} chủ đề`
              : "Theo dõi các phần bạn đã đọc trong báo cáo này."}
          </p>
        </div>
        <span className="text-2xl font-semibold text-foreground">
          {hasTopicCount ? `${safeDiscovered}/${totalCount}` : `${safePercent}%`}
        </span>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300"
          style={{ width: `${safePercent}%` }}
        />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step) => {
          const Icon = step.isCompleted ? Check : Circle;

          return (
            <div
              className="flex items-center gap-2 text-sm text-muted-foreground"
              key={step.label}
            >
              <span
                className={cn(
                  "flex size-6 items-center justify-center rounded-full border",
                  step.isCompleted
                    ? "border-primary/35 bg-primary/12 text-primary"
                    : "border-white/12 bg-white/5 text-muted-foreground",
                )}
              >
                <Icon className="size-3.5" />
              </span>
              <span className={step.isCompleted ? "text-foreground" : undefined}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
