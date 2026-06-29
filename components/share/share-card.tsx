import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ShareCardProps {
  className?: string;
  insight: string;
  luckyColors?: string[];
  name: string;
  todayScore?: number;
}

export function ShareCard({
  className,
  insight,
  luckyColors = [],
  name,
  todayScore,
}: ShareCardProps) {
  return (
    <section
      className={cn(
        "premium-surface rounded-lg border border-primary/25 bg-card/72 p-5 backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">{APP_NAME}</p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">{name}</h2>
        </div>
        {todayScore == null ? null : (
          <div className="rounded-md border border-primary/25 bg-primary/10 px-3 py-2 text-right">
            <p className="text-xs text-muted-foreground">Hôm nay</p>
            <p className="text-xl font-semibold text-primary">{todayScore}/100</p>
          </div>
        )}
      </div>

      <p className="mt-5 text-base leading-7 text-foreground/88">{insight}</p>

      {luckyColors.length === 0 ? null : (
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Màu hợp
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {luckyColors.map((color) => (
              <span
                className="rounded-full border border-white/10 bg-background/58 px-3 py-1 text-sm text-foreground"
                key={color}
              >
                {color}
              </span>
            ))}
          </div>
        </div>
      )}

      <Button className="mt-6 w-full" type="button">
        <Share2 className="size-4" />
        Chia sẻ
      </Button>
    </section>
  );
}
