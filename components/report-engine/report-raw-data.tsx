import { Database } from "lucide-react";
import { ReportSection } from "./report-section";
import type { ReportRenderModel } from "@/lib/report-engine/report-schema";

export function ReportRawData({ report }: { report: ReportRenderModel }) {
  return (
    <ReportSection
      description="Dữ liệu gốc đã được Rule Engine chuẩn hóa thành fact, score và recommendation."
      icon={Database}
      id="raw-data"
      title="Dữ liệu gốc"
    >
      <div className="grid gap-3 md:grid-cols-2">
        {report.rawData.facts.map((fact) => (
          <div
            className="rounded-md border border-white/10 bg-background/48 p-4"
            key={fact.code}
          >
            <p className="font-semibold text-foreground">{fact.code}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Domain {fact.domain} · Weight {fact.weight} · Confidence{" "}
              {fact.confidence}%
            </p>
          </div>
        ))}
      </div>
    </ReportSection>
  );
}
