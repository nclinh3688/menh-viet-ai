import type { DailyFortuneDemo } from "@/lib/astrology";
import { SectionTitle } from "./fate-overview";

interface DailyScoreCardProps {
  fortune: DailyFortuneDemo;
}

export function DailyScoreCard({ fortune }: DailyScoreCardProps) {
  return (
    <section className="rounded-lg border bg-card/64 p-5 backdrop-blur-xl md:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle title="Chỉ số hôm nay" />
        <p className="text-sm text-muted-foreground">{fortune.dateKey}</p>
      </div>
      <div className="mt-5 grid gap-4">
        {fortune.scores.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-foreground">{item.label}</span>
              <span className="rounded-full border bg-background/60 px-3 py-1 text-xs font-semibold text-primary">
                {item.score}/100
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
