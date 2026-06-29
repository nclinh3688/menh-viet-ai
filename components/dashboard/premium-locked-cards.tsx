import Link from "next/link";
import { Bot, FileText, MoonStar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PremiumLock } from "@/components/subscription/premium-lock";
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
    <section
      className="rounded-lg border bg-card/64 p-5 backdrop-blur-xl md:p-6"
      id="premium-preview"
    >
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
          return (
            <PremiumLock
              description={feature.description}
              featureName="Premium"
              key={feature.title}
              title={feature.title}
            />
          );
        })}
      </div>
    </section>
  );
}
