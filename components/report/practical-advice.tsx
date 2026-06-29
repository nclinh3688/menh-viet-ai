import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PracticalAdviceProps {
  className?: string;
  items: string[];
  title?: string;
}

export function PracticalAdvice({
  className,
  items,
  title = "Gợi ý áp dụng",
}: PracticalAdviceProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      className={cn(
        "premium-surface rounded-lg border bg-card/68 p-5 backdrop-blur-xl",
        className,
      )}
    >
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div className="flex items-start gap-3" key={item}>
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
            <p className="text-sm leading-6 text-muted-foreground">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
