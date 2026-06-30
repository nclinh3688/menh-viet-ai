import { CheckCircle2, ShieldAlert } from "lucide-react";
import type { ResultModel } from "@/lib/result/result-types";

export function ResultAdviceCard({ result }: { result: ResultModel }) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <ListCard icon={CheckCircle2} items={result.advice} title="Gợi ý áp dụng" />
      <ListCard icon={ShieldAlert} items={result.cautions} title="Điểm cần lưu ý" />
    </section>
  );
}

function ListCard({
  icon: Icon,
  items,
  title,
}: {
  icon: typeof CheckCircle2;
  items: string[];
  title: string;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <article className="premium-surface rounded-md border bg-card/64 p-5 backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-2">
        <Icon className="size-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <ul className="grid gap-2">
        {items.map((item) => (
          <li className="text-sm leading-6 text-muted-foreground" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
