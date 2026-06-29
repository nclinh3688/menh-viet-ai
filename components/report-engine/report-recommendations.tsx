import { CheckCircle2 } from "lucide-react";
import { ReportSection } from "./report-section";
import type { ReportRenderModel } from "@/lib/report-engine/report-schema";

export function ReportRecommendations({ report }: { report: ReportRenderModel }) {
  return (
    <ReportSection
      description={report.recommendations.description}
      icon={CheckCircle2}
      id="recommendations"
      title={report.recommendations.title}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {report.recommendations.items.map((item) => (
          <div
            className="flex items-start gap-3 rounded-md border border-white/10 bg-background/48 px-4 py-3"
            key={item}
          >
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
            <p className="text-sm leading-6 text-muted-foreground">{item}</p>
          </div>
        ))}
      </div>
    </ReportSection>
  );
}
