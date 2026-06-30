import Link from "next/link";
import { Network } from "lucide-react";
import type { KnowledgeItem } from "@/lib/knowledge-db/knowledge-item";

export function KnowledgeRelated({
  items,
  title = "Có thể bạn muốn tìm hiểu",
}: {
  items: KnowledgeItem[];
  title?: string;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="premium-surface rounded-lg border bg-card/64 p-5 backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-2">
        <Network className="size-5 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <Link
            className="rounded-md border border-white/10 bg-background/45 p-4 transition-colors hover:border-primary/35"
            href={`/knowledge/${item.slug}`}
            key={item.id}
          >
            <p className="font-semibold text-foreground">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {item.summary}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
