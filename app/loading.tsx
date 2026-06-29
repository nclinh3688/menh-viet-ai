import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-160px)] w-full max-w-4xl items-center justify-center px-5 py-12 md:px-8">
      <section className="premium-surface w-full rounded-lg border bg-card/72 p-6 text-center shadow-2xl shadow-primary/10 backdrop-blur-xl md:p-8">
        <div className="mx-auto flex size-12 items-center justify-center rounded-md bg-primary/12 text-primary">
          <Loader2 className="size-6 animate-spin" />
        </div>
        <h1 className="mt-5 text-2xl font-semibold text-foreground">
          Đang chuẩn bị nội dung
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
          Mệnh Việt đang tải dữ liệu cần thiết để hiển thị trải nghiệm của bạn.
        </p>
      </section>
    </main>
  );
}
