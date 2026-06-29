import { HelpCircle } from "lucide-react";
import { ReportSection } from "./report-section";
import type { ReportRenderModel } from "@/lib/report-engine/report-schema";
import { formatSourceLabel } from "@/lib/sources/source-resolver";

export function ReportWhyCard({ report }: { report: ReportRenderModel }) {
  return (
    <ReportSection
      description="Nguồn dữ liệu, rule đã dùng, confidence và reason."
      icon={HelpCircle}
      id="why"
      title="Tại sao Mệnh Việt đưa ra kết luận này?"
    >
      <div className="grid gap-4">
        {report.why.map((item) => (
          <article
            className="rounded-md border border-white/10 bg-background/48 p-4"
            key={item.factCode}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="font-semibold text-foreground">{item.factCode}</h3>
              <span className="w-fit rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                Confidence {item.confidence}%
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Rule: {item.rules.join(", ")}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Nguồn:{" "}
              {item.sources
                .map((source) => formatSourceLabel(source.primary))
                .join(", ")}
            </p>
            <ul className="mt-3 grid gap-2">
              {item.reason.map((reason) => (
                <li className="text-sm leading-6 text-muted-foreground" key={reason}>
                  {reason}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </ReportSection>
  );
}
