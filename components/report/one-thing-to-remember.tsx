import { BookmarkCheck } from "lucide-react";
import { ASTROLOGY_DISCLAIMER } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface OneThingToRememberProps {
  className?: string;
  insight: string;
}

export function OneThingToRemember({
  className,
  insight,
}: OneThingToRememberProps) {
  return (
    <section
      className={cn(
        "premium-surface rounded-lg border border-primary/30 bg-primary/10 p-5 shadow-2xl shadow-primary/10 backdrop-blur-xl md:p-6",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <BookmarkCheck className="size-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-primary">
            Nếu chỉ nhớ một điều...
          </p>
          <p className="mt-3 text-lg leading-8 text-foreground">{insight}</p>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            {ASTROLOGY_DISCLAIMER}
          </p>
        </div>
      </div>
    </section>
  );
}
