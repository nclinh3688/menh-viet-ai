import Link from "next/link";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export interface KnowledgeDiscoveryItem {
  href?: string;
  label: string;
  summary?: string;
}

interface KnowledgeDiscoveryProps {
  className?: string;
  items: KnowledgeDiscoveryItem[];
  title?: string;
}

export function KnowledgeDiscovery({
  className,
  items,
  title = "Khám phá thêm",
}: KnowledgeDiscoveryProps) {
  const visibleItems = items.slice(0, 3);

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "mt-5 rounded-md border border-primary/15 bg-primary/6 p-4",
        className,
      )}
    >
      <div className="mb-3 flex items-center gap-2 text-primary">
        <BookOpen className="size-4" />
        <p className="text-sm font-semibold">{title}</p>
      </div>
      <div className="grid gap-2">
        {visibleItems.map((item) =>
          item.href == null ? (
            <div
              className="rounded-md border border-white/10 bg-background/40 px-3 py-2"
              key={item.label}
            >
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              {item.summary == null ? null : (
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {item.summary}
                </p>
              )}
            </div>
          ) : (
            <Link
              className="rounded-md border border-white/10 bg-background/40 px-3 py-2 transition-colors hover:border-primary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              href={item.href}
              key={item.label}
            >
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              {item.summary == null ? null : (
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {item.summary}
                </p>
              )}
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
