import { ArrowRight, Compass, Sparkles } from "lucide-react";
import { SiteDisclaimer } from "@/components/shared/site-disclaimer";
import { Button } from "@/components/ui/button";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";

const foundations = [
  "Next.js App Router",
  "TypeScript",
  "Tailwind CSS",
  "shadcn/ui-ready",
  "Prisma + SQLite dev",
  "Zod + React Hook Form",
];

export default function HomePage() {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-96px)] w-full max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[1.08fr_0.92fr] md:px-8">
      <div>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          <Compass className="h-4 w-4" aria-hidden="true" />
          {APP_NAME}
        </div>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-foreground md:text-6xl">
          Khám phá vận mệnh của bạn bằng AI
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
          {APP_DESCRIPTION} Sprint này tập trung vào nền tảng kỹ thuật sạch,
          sẵn sàng mở rộng thành sản phẩm hoàn chỉnh.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button>
            Bắt đầu nền tảng
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <SiteDisclaimer />
        </div>
      </div>

      <div className="rounded-lg border bg-card/72 p-5 shadow-2xl shadow-black/30 backdrop-blur">
        <div className="flex items-center gap-3 border-b pb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Nền móng Sprint 1</h2>
            <p className="text-sm text-muted-foreground">
              App shell, theme, thư mục domain và Prisma dev.
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {foundations.map((item) => (
            <div
              className="rounded-md border bg-background/58 px-4 py-3 text-sm text-muted-foreground"
              key={item}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
