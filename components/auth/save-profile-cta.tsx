import Link from "next/link";
import { Cloud, History, Sparkles, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  { icon: Sparkles, text: "Lưu kết quả miễn phí" },
  { icon: History, text: "Xem lại bất cứ lúc nào" },
  { icon: Cloud, text: "Đồng bộ trên điện thoại và máy tính" },
  { icon: UserPlus, text: "Nhận gợi ý hằng ngày sau này" },
];

export function SaveProfileCta() {
  return (
    <section className="rounded-lg border border-primary/20 bg-primary/8 p-5 backdrop-blur-xl md:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">Freemium</p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">
            Bạn muốn lưu kết quả này?
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Đăng nhập miễn phí để lưu hồ sơ, xem lại lịch sử và đồng bộ trên
            nhiều thiết bị.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/login">Lưu hồ sơ miễn phí</Link>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <Link href="#premium-preview">Để sau</Link>
          </Button>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <div
              className="flex items-center gap-2 rounded-md border border-white/10 bg-background/48 px-3 py-2 text-sm text-muted-foreground"
              key={benefit.text}
            >
              <Icon className="size-4 text-primary" />
              {benefit.text}
            </div>
          );
        })}
      </div>
    </section>
  );
}
