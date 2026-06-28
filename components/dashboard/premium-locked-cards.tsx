import Link from "next/link";
import { Bot, FileText, Lock, MoonStar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "./fate-overview";

const lockedFeatures = [
  {
    description: "Phân tích sâu hơn về bản mệnh, nhịp năng lượng và chủ đề cần quan sát.",
    icon: Sparkles,
    title: "Luận giải chuyên sâu",
  },
  {
    description: "Tải báo cáo cá nhân hóa để lưu trữ hoặc chia sẻ khi cần.",
    icon: FileText,
    title: "Báo cáo PDF",
  },
  {
    description: "Đặt câu hỏi theo hồ sơ cá nhân với guardrail an toàn.",
    icon: Bot,
    title: "AI tư vấn cá nhân",
  },
  {
    description: "Xem các giai đoạn nổi bật trong năm theo hệ quy chiếu tham khảo.",
    icon: MoonStar,
    title: "Vận trình 12 tháng",
  },
];

export function PremiumLockedCards() {
  return (
    <section className="rounded-lg border bg-card/64 p-5 backdrop-blur-xl md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SectionTitle title="Mở khóa Premium" />
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Các báo cáo nâng cao sẽ được mở khi có gói Premium. Chưa tích hợp thanh toán thật.
          </p>
        </div>
        <Button asChild variant="secondary">
          <Link href="/pricing">Xem gói</Link>
        </Button>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {lockedFeatures.map((feature) => {
          const Icon = feature.icon;

          return (
            <article className="relative rounded-md border bg-background/58 p-4" key={feature.title}>
              <div className="mb-5 flex items-center justify-between gap-3">
                <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <span className="inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-semibold text-muted-foreground">
                  <Lock className="h-3 w-3" aria-hidden="true" />
                  Premium
                </span>
              </div>
              <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {feature.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
