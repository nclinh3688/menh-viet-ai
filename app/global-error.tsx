"use client";

import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="vi" className="dark">
      <body>
        <main className="flex min-h-screen items-center justify-center bg-background px-5 py-12 text-foreground">
          <section className="w-full max-w-3xl rounded-lg border bg-card/80 p-6 text-center shadow-2xl shadow-black/30 md:p-8">
            <div className="mx-auto flex size-12 items-center justify-center rounded-md bg-destructive/12 text-destructive">
              <AlertTriangle className="size-6" />
            </div>
            <h1 className="mt-5 text-3xl font-semibold">
              Mệnh Việt chưa thể hiển thị trang này
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              Hãy thử tải lại trang. Nếu lỗi vẫn tiếp diễn, quay lại sau ít phút.
            </p>
            <button
              className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground"
              onClick={reset}
              type="button"
            >
              Thử lại
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
