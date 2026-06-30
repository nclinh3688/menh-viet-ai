import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import type { ResultModel } from "@/lib/result/result-types";

export function ResultNextDiscovery({ result }: { result: ResultModel }) {
  if (result.nextDiscovery.length === 0) {
    return null;
  }

  return (
    <section className="premium-surface rounded-md border bg-card/64 p-5 backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-2">
        <Compass className="size-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Khám phá tiếp</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {result.nextDiscovery.map((item) => (
          <Link
            className="rounded-md border border-white/10 bg-background/48 p-4 transition-colors hover:border-primary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            href={item.href}
            key={item.label}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-foreground">{item.label}</p>
              <ArrowRight className="size-4 text-primary" />
            </div>
            {item.summary == null ? null : (
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.summary}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
