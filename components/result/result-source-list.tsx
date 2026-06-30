import { BookOpenCheck } from "lucide-react";
import type { ResultModel } from "@/lib/result/result-types";

export function ResultSourceList({ result }: { result: ResultModel }) {
  if (result.sources.length === 0) {
    return null;
  }

  return (
    <section className="premium-surface rounded-md border bg-card/64 p-5 backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-2">
        <BookOpenCheck className="size-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Nguồn phân tích</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {result.sources.map((source) => (
          <div
            className="rounded-md border border-white/10 bg-background/48 p-4"
            key={source.label}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-foreground">{source.label}</p>
              <span className="text-xs font-semibold text-primary">
                {source.confidence}%
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {source.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
