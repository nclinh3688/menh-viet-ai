"use client";

import Link from "next/link";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-160px)] w-full max-w-4xl items-center justify-center px-5 py-12 md:px-8">
      <section className="premium-surface w-full rounded-lg border bg-card/72 p-6 text-center shadow-2xl shadow-primary/10 backdrop-blur-xl md:p-8">
        <div className="mx-auto flex size-12 items-center justify-center rounded-md bg-destructive/12 text-destructive">
          <AlertTriangle className="size-6" />
        </div>
        <h1 className="mt-5 text-3xl font-semibold text-foreground">
          Có lỗi khi tải nội dung
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
          Bạn có thể thử tải lại hoặc quay về trang chủ để tiếp tục khám phá.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button onClick={reset} type="button">
            <RefreshCcw className="size-4" />
            Thử lại
          </Button>
          <Button asChild variant="secondary">
            <Link href="/">Về trang chủ</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
