import { BookOpenText } from "lucide-react";
import { ReportSection } from "./report-section";
import type { ReportRenderModel } from "@/lib/report-engine/report-schema";

export function ReportInterpretation({ report }: { report: ReportRenderModel }) {
  return (
    <ReportSection
      description="Narrative được dựng từ render model, không tự thêm thuật toán."
      icon={BookOpenText}
      id="interpretation"
      title={report.interpretation.title}
    >
      <p className="text-sm leading-7 text-muted-foreground">
        {report.interpretation.body}
      </p>
    </ReportSection>
  );
}
