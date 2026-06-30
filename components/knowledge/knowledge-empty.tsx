import Link from "next/link";
import { BookDashed } from "lucide-react";
import { Button } from "@/components/ui/button";

export function KnowledgeEmpty({
  description = "Chưa có Knowledge Item phù hợp với bộ lọc hiện tại.",
  title = "Chưa có dữ liệu phù hợp",
}: {
  description?: string;
  title?: string;
}) {
  return (
    <section className="premium-surface rounded-lg border bg-card/64 p-6 text-center backdrop-blur-xl">
      <div className="mx-auto flex size-12 items-center justify-center rounded-md bg-primary/12 text-primary">
        <BookDashed className="size-6" />
      </div>
      <h2 className="mt-4 text-2xl font-semibold text-foreground">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      <Button asChild className="mt-5" variant="secondary">
        <Link href="/knowledge">Về trung tâm tri thức</Link>
      </Button>
    </section>
  );
}
