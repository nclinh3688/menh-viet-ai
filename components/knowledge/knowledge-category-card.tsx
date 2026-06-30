import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KnowledgeProgress } from "./knowledge-progress";

interface KnowledgeCategoryCardProps {
  completeness: number;
  description: string;
  href: string;
  itemCount: number;
  title: string;
}

export function KnowledgeCategoryCard({
  completeness,
  description,
  href,
  itemCount,
  title,
}: KnowledgeCategoryCardProps) {
  return (
    <article className="premium-surface flex h-full flex-col rounded-lg border bg-card/64 p-5 backdrop-blur-xl">
      <div className="mb-5 flex size-11 items-center justify-center rounded-md bg-primary/12 text-primary">
        <BookOpen className="size-5" />
      </div>
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      <div className="mt-5 rounded-md border border-white/10 bg-background/45 p-3">
        <p className="text-sm text-muted-foreground">
          Knowledge Items: <span className="font-semibold text-foreground">{itemCount}</span>
        </p>
        <div className="mt-3">
          <KnowledgeProgress value={completeness} />
        </div>
      </div>
      <Button asChild className="mt-5 w-full" variant="secondary">
        <Link href={href}>
          Khám phá
          <ArrowRight className="size-4" />
        </Link>
      </Button>
    </article>
  );
}
