import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ShareCardProps {
  className?: string;
  insight: string;
  luckyColors?: string[];
  name: string;
  siteUrl?: string;
  todayScore?: number;
}

export function ShareCard({
  className,
  insight,
  luckyColors = [],
  name,
  siteUrl = "menhviet.ai",
  todayScore,
}: ShareCardProps) {
  return (
    <section
      className={cn(
        "premium-surface rounded-lg border border-primary/25 bg-card/72 p-5 backdrop-blur-xl",
        className,
      )}
    >
      <div className="rounded-lg border border-primary/20 bg-[radial-gradient(circle_at_top_left,rgba(215,181,109,0.20),transparent_34%),rgba(255,255,255,0.04)] p-4">
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

      <div className="mt-5 flex items-center justify-between gap-4 rounded-md border border-white/10 bg-background/48 p-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            QR website
          </p>
          <p className="mt-1 text-sm font-semibold text-foreground">{siteUrl}</p>
        </div>
        <div
          aria-label="QR website placeholder"
          className="grid size-16 grid-cols-4 gap-1 rounded-md border border-primary/25 bg-primary/10 p-2 text-primary"
        >
          {Array.from({ length: 16 }).map((_, index) => (
            <span
              className={
                [0, 1, 4, 5, 10, 11, 14].includes(index)
                  ? "rounded-[2px] bg-primary"
                  : "rounded-[2px] bg-primary/20"
              }
              key={index}
            />
          ))}
        </div>
      </div>
      </div>

      <Button className="mt-6 w-full" type="button">
        <Share2 className="size-4" />
        Chia sẻ
      </Button>
    </section>
  );
}
