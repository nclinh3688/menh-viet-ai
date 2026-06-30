import { ArrowDown, HelpCircle } from "lucide-react";
import type { ResultModel } from "@/lib/result/result-types";

export function ResultWhyCard({ result }: { result: ResultModel }) {
  if (result.why.length === 0) {
    return null;
  }

  return (
    <section className="premium-surface rounded-md border bg-card/64 p-5 backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-2">
        <HelpCircle className="size-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          Vì sao có kết luận này?
        </h3>
      </div>
      <div className="grid gap-4">
        {result.why.map((item) => (
          <article className="rounded-md border border-white/10 bg-background/45 p-4" key={item.conclusion}>
            <TimelineStep label="Knowledge" value={item.knowledge} />
            <TimelineArrow />
            <TimelineStep label="Rule" value={item.rule} />
            <TimelineArrow />
            <TimelineStep label="Reason" value={item.reason} />
            <TimelineArrow />
            <TimelineStep label="Conclusion" value={item.conclusion} />
          </article>
        ))}
      </div>
    </section>
  );
}

function TimelineArrow() {
  return (
    <div className="flex justify-center py-1 text-primary/80" aria-hidden="true">
      <ArrowDown className="size-4" />
    </div>
  );
}

function TimelineStep({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-background/50 p-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{value}</p>
    </div>
  );
}
