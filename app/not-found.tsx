import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-160px)] w-full max-w-4xl items-center justify-center px-5 py-12 md:px-8">
      <section className="premium-surface w-full rounded-lg border bg-card/72 p-6 text-center shadow-2xl shadow-primary/10 backdrop-blur-xl md:p-8">
        <div className="mx-auto flex size-12 items-center justify-center rounded-md bg-primary/12 text-primary">
          <Compass className="size-6" />
        </div>
        <p className="mt-5 text-sm font-semibold text-primary">Không tìm thấy trang</p>
        <h1 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
          Đường dẫn này không còn khả dụng
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
          Bạn có thể quay về trang chủ để bắt đầu lại hành trình khám phá.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">Về trang chủ</Link>
        </Button>
      </section>
    </main>
  );
}
