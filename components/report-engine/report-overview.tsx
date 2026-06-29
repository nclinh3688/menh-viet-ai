import { BarChart3 } from "lucide-react";
import { ReportSection } from "./report-section";
import type { ReportRenderModel } from "@/lib/report-engine/report-schema";

export function ReportOverview({ report }: { report: ReportRenderModel }) {
  return (
    <ReportSection
      description={report.overview.description}
      icon={BarChart3}
      id="overview"
      title="Tổng quan"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {report.overview.scores.map((score) => (
          <div
            className="rounded-md border border-white/10 bg-background/48 p-4"
            key={score.domain}
          >
            <p className="text-sm font-semibold text-foreground">
              {score.domain}
            </p>
            <p className="mt-2 text-3xl font-semibold text-primary">
              {score.score}/100
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Confidence {score.confidence}%
            </p>
          </div>
        ))}
      </div>
    </ReportSection>
  );
}
