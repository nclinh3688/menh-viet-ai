import { Heart, Sparkles, Wallet, Brain, BriefcaseBusiness } from "lucide-react";
import type { DailyFortuneDemo } from "@/lib/astrology";

const scoreIcons = {
  "Tình cảm": Heart,
  "Công việc": BriefcaseBusiness,
  "Tài chính": Wallet,
  "Tinh thần": Brain,
  "May mắn": Sparkles,
} as const;

interface DailyFortuneHeroProps {
  fortune: DailyFortuneDemo;
}

export function DailyFortuneHero({ fortune }: DailyFortuneHeroProps) {
  return (
    <section className="rounded-lg border bg-card/70 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-6">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="rounded-lg border bg-background/58 p-5">
          <p className="text-sm font-semibold text-primary">Hôm nay</p>
          <div className="mt-4 flex items-end gap-2">
            <span className="text-6xl font-semibold leading-none text-foreground">
              {fortune.totalScore}
            </span>
            <span className="pb-2 text-lg font-semibold text-muted-foreground">
              /100
            </span>
          </div>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${fortune.totalScore}%` }}
            />
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            {fortune.advice}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-normal text-foreground">
                Chỉ số vận trình
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Cập nhật theo ngày {fortune.dateKey}
              </p>
            </div>
            <span className="rounded-full border px-3 py-1 text-xs font-semibold text-primary">
              Daily
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {fortune.scores.map((item) => {
              const Icon = scoreIcons[item.label as keyof typeof scoreIcons] ?? Sparkles;

              return (
                <article className="rounded-md border bg-background/58 p-4" key={item.label}>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-primary">{item.score}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
