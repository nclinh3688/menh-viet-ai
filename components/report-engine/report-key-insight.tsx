import { Sparkles } from "lucide-react";
import { ReportSection } from "./report-section";
import type { ReportRenderModel } from "@/lib/report-engine/report-schema";

export function ReportKeyInsight({ report }: { report: ReportRenderModel }) {
  return (
    <ReportSection
      className="border-primary/35 bg-primary/12"
      description="Phần người dùng nên nhớ nhất trong report."
      icon={Sparkles}
      id="key-insight"
      title="Insight nổi bật"
    >
      <h3 className="text-2xl font-semibold text-foreground">
        {report.keyInsight.title}
      </h3>
      <p className="mt-4 text-base leading-8 text-foreground/88">
        {report.keyInsight.body}
      </p>
    </ReportSection>
  );
}
