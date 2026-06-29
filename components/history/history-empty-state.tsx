import Link from "next/link";
import { History, LogIn, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HistoryEmptyStateProps {
  description: string;
  href: string;
  icon?: "history" | "sparkles";
  label: string;
  title: string;
}

export function HistoryEmptyState({
  description,
  href,
  icon = "history",
  label,
  title,
}: HistoryEmptyStateProps) {
  const Icon = icon === "sparkles" ? Sparkles : History;
  const ButtonIcon = href === "/login" ? LogIn : Sparkles;

  return (
    <section className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-3xl items-center px-5 py-12 md:px-8">
      <div className="w-full rounded-lg border bg-card/70 p-6 text-center shadow-2xl shadow-black/30 backdrop-blur-xl md:p-8">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>
        <p className="mt-5 text-sm font-semibold text-primary">Lịch sử</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-normal text-foreground md:text-4xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl leading-8 text-muted-foreground">
          {description}
        </p>
        <p className="mx-auto mt-5 max-w-xl rounded-md border border-primary/20 bg-primary/8 px-4 py-3 text-sm leading-6 text-muted-foreground">
          Nội dung chỉ mang tính tham khảo và khám phá bản thân, không thay thế
          tư vấn chuyên môn.
        </p>
        <Button asChild className="mt-8" size="lg">
          <Link href={href}>
            <ButtonIcon className="size-4" />
            {label}
          </Link>
        </Button>
      </div>
    </section>
  );
}
