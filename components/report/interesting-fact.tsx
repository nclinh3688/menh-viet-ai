import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface InterestingFactProps {
  className?: string;
  fact?: string | null;
  sourceLabel?: string;
  title?: string;
}

export function InterestingFact({
  className,
  fact,
  sourceLabel,
  title = "Bạn có biết?",
}: InterestingFactProps) {
  if (fact == null || fact.trim().length === 0) {
    return null;
  }

  return (
    <aside
      className={cn(
        "rounded-lg border border-white/10 bg-card/64 p-5 backdrop-blur-xl",
        className,
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        <Lightbulb className="size-5 text-primary" />
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-sm leading-6 text-muted-foreground">{fact}</p>
      {sourceLabel == null ? null : (
        <p className="mt-3 text-xs text-muted-foreground">
          Dữ liệu: {sourceLabel}
        </p>
      )}
    </aside>
  );
}
