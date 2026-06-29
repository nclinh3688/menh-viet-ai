import { ArrowDown, CheckCircle2, HelpCircle } from "lucide-react";
import { ReportSection } from "./report-section";
import type { ReportRenderModel } from "@/lib/report-engine/report-schema";
import { formatSourceLabel, getSourceById } from "@/lib/sources/source-resolver";

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
            className="rounded-md border border-white/10 bg-background/48 p-4 shadow-lg shadow-black/10"
            key={item.factCode}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  Kết luận dữ liệu
                </p>
                <h3 className="mt-1 font-semibold text-foreground">{item.factCode}</h3>
              </div>
              <span className="w-fit rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                Độ tin cậy {item.confidence}%
              </span>
            </div>

            <div className="mt-5 grid gap-3">
              <TimelineStep
                body={item.sources
                  .map((source) => {
                    const sourceItem = getSourceById(source.primary);

                    return `${formatSourceLabel(source.primary)}: ${
                      sourceItem?.description ?? "nguồn dùng để kiểm tra rule đã khớp"
                    }`;
                  })
                  .join(" ")}
                label="Knowledge"
              />
              <TimelineArrow />
              <TimelineStep body={item.rules.join(", ")} label="Rule" />
              <TimelineArrow />
              <TimelineStep body={item.reason.join(" ")} label="Reason" />
              <TimelineArrow />
              <TimelineStep
                body={`Fact ${item.factCode} được đưa vào báo cáo với confidence ${item.confidence}%.`}
                label="Conclusion"
                tone="primary"
              />
            </div>
          </article>
        ))}
      </div>
    </ReportSection>
  );
}

function TimelineArrow() {
  return (
    <div className="flex justify-center text-primary/80" aria-hidden="true">
      <ArrowDown className="size-4" />
    </div>
  );
}

function TimelineStep({
  body,
  label,
  tone = "default",
}: {
  body: string;
  label: "Conclusion" | "Knowledge" | "Reason" | "Rule";
  tone?: "default" | "primary";
}) {
  return (
    <div
      className={
        tone === "primary"
          ? "rounded-md border border-primary/25 bg-primary/10 p-3"
          : "rounded-md border border-white/10 bg-background/50 p-3"
      }
    >
      <div className="flex items-center gap-2">
        <CheckCircle2 className="size-4 text-primary" />
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          {label}
        </p>
      </div>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
    </div>
  );
}
