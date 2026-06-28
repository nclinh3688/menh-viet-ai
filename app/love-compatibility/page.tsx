import type { Metadata } from "next";
import Link from "next/link";
import { HeartHandshake, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Hợp tuổi hôn nhân | ${APP_NAME}`,
  description:
    "Trang hợp tuổi hôn nhân của Mệnh Việt AI. Phiên bản hiện tại là placeholder an toàn trước khi triển khai thuật toán hợp tuổi chi tiết.",
  alternates: {
    canonical: "/love-compatibility",
  },
};

export default function LoveCompatibilityPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-160px)] w-full max-w-5xl items-center px-5 py-12 md:px-8">
      <section className="grid gap-6 rounded-md border bg-card/70 p-6 shadow-2xl shadow-primary/10 backdrop-blur-xl md:grid-cols-[0.9fr_1.1fr] md:p-8">
        <div>
          <div className="mb-5 flex size-12 items-center justify-center rounded-md bg-primary/12 text-primary">
            <HeartHandshake className="size-6" />
          </div>
          <p className="text-sm font-semibold text-primary">Hợp tuổi</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-normal text-foreground md:text-4xl">
            Báo cáo hợp tuổi đang được chuẩn hóa
          </h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Module này sẽ phân tích Thiên Can, Địa Chi, Ngũ Hành và Cung Phi
            theo hướng tham khảo, không đưa ra phán quyết tuyệt đối về tình cảm
            hoặc hôn nhân.
          </p>
          <p className="mt-5 rounded-md border border-primary/20 bg-primary/8 px-4 py-3 text-sm leading-6 text-muted-foreground">
            Nội dung chỉ mang tính tham khảo và khám phá bản thân, không thay thế
            tư vấn chuyên môn.
          </p>
        </div>
        <div className="rounded-md border bg-background/58 p-5">
          <Sparkles className="mb-5 size-6 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            Trong lúc chờ module chi tiết
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Bạn có thể tạo hồ sơ cá nhân để xem dashboard vận mệnh cơ bản, hoặc
            khám phá Ngũ Hành và Thần số học đã sẵn sàng.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/onboarding">Tạo hồ sơ</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/five-elements">Xem Ngũ hành</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
