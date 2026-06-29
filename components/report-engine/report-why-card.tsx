import { HelpCircle } from "lucide-react";
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

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {item.sources.map((source) => {
                const sourceItem = getSourceById(source.primary);

                return (
                  <div
                    className="rounded-md border border-primary/15 bg-primary/6 p-3"
                    key={`${item.factCode}-${source.primary}`}
                  >
                    <p className="text-sm font-semibold text-foreground">
                      Nguồn: {formatSourceLabel(source.primary)}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Vai trò: {sourceItem?.description ?? "Nguồn dùng để kiểm tra rule đã khớp."}
                    </p>
                    <p className="mt-2 text-xs font-medium text-primary">
                      Độ tin cậy nguồn {sourceItem?.confidence ?? item.confidence}%
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 rounded-md border border-white/10 bg-background/50 p-3">
              <p className="text-sm font-semibold text-foreground">Rule đã dùng</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.rules.join(", ")}
              </p>
            </div>

            <p className="mt-4 text-sm font-semibold text-foreground">
              Lý do liên quan đến kết luận
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
