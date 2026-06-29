import { FileCheck2 } from "lucide-react";
import { ReportSection } from "./report-section";
import type { ReportRenderModel } from "@/lib/report-engine/report-schema";

export function ReportFooter({ report }: { report: ReportRenderModel }) {
  return (
    <ReportSection
      description="Nguồn phân tích và disclaimer bắt buộc."
      icon={FileCheck2}
      id="sources"
      title="Nguồn phân tích"
    >
      <div className="grid gap-3">
        {report.sources.map((source, index) => (
          <div
            className="rounded-md border border-white/10 bg-background/48 p-4"
            key={`${source.primary}-${source.factCode ?? index}`}
          >
            <p className="font-semibold text-foreground">
              {source.primary}
              {source.secondary.length > 0
                ? ` · ${source.secondary.join(", ")}`
                : ""}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Confidence {source.confidence}%
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {source.explanation}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-5 rounded-md border border-primary/20 bg-primary/8 px-4 py-3 text-sm leading-6 text-muted-foreground">
        {report.disclaimer}
      </p>
    </ReportSection>
  );
}
