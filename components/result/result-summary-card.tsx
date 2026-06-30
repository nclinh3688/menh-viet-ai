import { Sparkles } from "lucide-react";
import type { ResultModel } from "@/lib/result/result-types";

export function ResultSummaryCard({ result }: { result: ResultModel }) {
  return (
    <section className="premium-surface rounded-md border border-primary/25 bg-primary/10 p-5 shadow-2xl shadow-primary/10">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-primary">Kết quả tổng quan</p>
        <span className="rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
          Confidence {result.confidence}%
        </span>
      </div>
      <div className="flex items-start gap-3">
        <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Sparkles className="size-5" />
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-foreground">{result.title}</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            {result.summary}
          </p>
        </div>
      </div>
    </section>
  );
}
