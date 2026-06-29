import Link from "next/link";
import { Compass } from "lucide-react";
import { ReportSection } from "./report-section";
import type { ReportRenderModel } from "@/lib/report-engine/report-schema";

export function ReportNextDiscovery({ report }: { report: ReportRenderModel }) {
  return (
    <ReportSection
      description="Không khóa Premium, chỉ điều hướng khám phá tiếp."
      icon={Compass}
      id="next-discovery"
      title="Khám phá tiếp"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {report.nextDiscovery.map((item) => (
          <Link
            className="rounded-md border border-white/10 bg-background/48 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </ReportSection>
  );
}
