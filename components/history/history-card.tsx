import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HistoryCardProps {
  createdAt: Date;
  id: string;
  summary: string;
  title: string;
  type: string;
}

const analysisTypeLabels: Record<string, string> = {
  BIRTH_CHART: "Lá số cơ bản",
  COMPATIBILITY: "Hợp tuổi",
  FIVE_ELEMENTS: "Ngũ hành",
  GOOD_DAY: "Ngày đẹp",
  NUMEROLOGY: "Thần số học",
};

export function HistoryCard({
  createdAt,
  id,
  summary,
  title,
  type,
}: HistoryCardProps) {
  return (
    <article className="rounded-lg border bg-card/70 p-5 shadow-xl shadow-black/20 backdrop-blur-xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            {analysisTypeLabels[type] ?? type}
          </p>
          <h2 className="mt-2 text-xl font-semibold text-foreground">
            {title}
          </h2>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
          <Clock className="size-3" />
          {createdAt.toLocaleDateString("vi-VN")}
        </span>
      </div>
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
        {summary}
      </p>
      <Button asChild className="mt-5" size="sm" variant="secondary">
        <Link href={`/history/${id}`}>
          Xem lại
          <ArrowRight className="size-4" />
        </Link>
      </Button>
    </article>
  );
}
