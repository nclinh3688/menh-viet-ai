import { Lightbulb } from "lucide-react";
import type { ResultModel } from "@/lib/result/result-types";

export function ResultInsightCard({ result }: { result: ResultModel }) {
  return (
    <section className="premium-surface rounded-md border border-primary/25 bg-card/72 p-5 backdrop-blur-xl">
      <div className="mb-3 flex items-center gap-2">
        <Lightbulb className="size-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          Điều Mệnh Việt nhận thấy
        </h3>
      </div>
      <p className="text-sm leading-7 text-muted-foreground">{result.keyInsight}</p>
    </section>
  );
}
