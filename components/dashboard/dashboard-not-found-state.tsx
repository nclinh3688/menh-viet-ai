import Link from "next/link";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardNotFoundState() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-3xl items-center px-5 py-12 md:px-8">
      <div className="w-full rounded-lg border bg-card/70 p-6 text-center shadow-2xl shadow-black/30 backdrop-blur-xl md:p-8">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary">
          <AlertCircle className="size-5" />
        </div>
        <p className="mt-5 text-sm font-semibold text-primary">Dashboard</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-normal text-foreground md:text-4xl">
          Không tìm thấy hồ sơ
        </h1>
        <p className="mx-auto mt-4 max-w-xl leading-8 text-muted-foreground">
          Hồ sơ này có thể đã bị xóa hoặc đường dẫn không chính xác.
        </p>
        <p className="mx-auto mt-5 max-w-xl rounded-md border border-primary/20 bg-primary/8 px-4 py-3 text-sm leading-6 text-muted-foreground">
          Nội dung chỉ mang tính tham khảo và khám phá bản thân, không thay thế
          tư vấn chuyên môn.
        </p>
        <Button asChild className="mt-8" size="lg">
          <Link href="/">
            <RotateCcw className="size-4" />
            Tạo hồ sơ mới
          </Link>
        </Button>
      </div>
    </section>
  );
}
