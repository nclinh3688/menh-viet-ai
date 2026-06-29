import Link from "next/link";
import { Compass } from "lucide-react";
import type { ReportRenderModel } from "@/lib/report-engine/report-schema";

interface ReportHeaderProps {
  report: ReportRenderModel;
  title?: string;
}

export function ReportHeader({
  report,
  title = "Mệnh Việt Report",
}: ReportHeaderProps) {
  return (
    <header className="rounded-lg border bg-card/72 p-5 backdrop-blur-xl md:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">Report Engine</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal text-foreground md:text-5xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Report được render từ facts của Rule Engine, không tự suy luận và
            luôn giữ phần giải thích theo nguồn dữ liệu đã có.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-primary/20 bg-primary/8 px-4 py-3 text-primary">
          <Compass className="size-4" />
          <span className="text-sm font-semibold">
            Confidence {report.overview.confidence}%
          </span>
        </div>
      </div>

      <nav
        aria-label="Điều hướng nhanh trong report"
        className="mt-5 flex flex-wrap gap-2"
      >
        {report.anchors.map((anchor) => (
          <Link
            className="rounded-full border border-white/10 bg-background/48 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            href={anchor.href}
            key={anchor.href}
          >
            {anchor.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
