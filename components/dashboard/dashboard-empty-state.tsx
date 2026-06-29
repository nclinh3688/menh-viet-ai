import Link from "next/link";
import { LogIn, Sparkles, UserRoundPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Xem hồ sơ cơ bản miễn phí",
  "Không cần đăng nhập trước",
  "Có thể lưu lại sau",
];

export function DashboardEmptyState() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-5xl items-center px-5 py-12 md:px-8">
      <div className="w-full overflow-hidden rounded-lg border bg-card/70 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1.08fr_0.92fr] lg:p-10">
          <div>
            <p className="text-sm font-semibold text-primary">Dashboard</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-normal text-foreground md:text-5xl">
              Chào mừng bạn đến với Mệnh Việt AI
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              Bạn chưa có hồ sơ vận mệnh. Nhập ngày sinh để xem Can Chi, Ngũ
              hành, Cung Phi và gợi ý cá nhân hóa miễn phí.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/">
                  <Sparkles className="size-4" />
                  Khám phá miễn phí
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/login">
                  <LogIn className="size-4" />
                  Đăng nhập để lưu hồ sơ
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid content-start gap-3">
            {benefits.map((benefit) => (
              <div
                className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-foreground"
                key={benefit}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary">
                  <UserRoundPlus className="size-4" />
                </span>
                {benefit}
              </div>
            ))}

            <p className="mt-2 rounded-md border border-primary/20 bg-primary/8 px-4 py-3 text-sm leading-6 text-muted-foreground">
              Nội dung chỉ mang tính tham khảo và khám phá bản thân, không thay
              thế tư vấn chuyên môn.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
