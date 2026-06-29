import { CalendarDays, HeartHandshake, LayoutDashboard, Sparkles, Star, Workflow } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const features = [
  {
    description: "So sánh Can Chi, Ngũ hành, Cung Phi để hiểu điểm cần hòa hợp.",
    icon: HeartHandshake,
    title: "Hợp tuổi hôn nhân",
  },
  {
    description: "Xem bản mệnh, màu hợp, màu nên tiết chế và gợi ý cân bằng.",
    icon: Workflow,
    title: "Ngũ hành bản mệnh",
  },
  {
    description: "Khám phá chỉ số ngày sinh và các chu kỳ cá nhân ở giai đoạn sau.",
    icon: Star,
    title: "Thần số học",
  },
  {
    description: "Gợi ý ngày phù hợp cho cưới hỏi, khai trương, ký kết khi mở rộng.",
    icon: CalendarDays,
    title: "Ngày đẹp",
  },
  {
    description: "Theo dõi hồ sơ, lá số cơ bản, chỉ số hôm nay và gợi ý cá nhân.",
    icon: LayoutDashboard,
    title: "Dashboard cá nhân",
  },
];

export function FeatureGrid() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8">
      <Reveal className="max-w-2xl">
        <p className="text-sm font-semibold text-primary">Bạn có thể xem gì?</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground md:text-4xl">
          Một hồ sơ, nhiều góc nhìn để khám phá bản thân
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <Reveal
              as="article"
              className="premium-surface rounded-lg border bg-card/62 p-5 backdrop-blur-xl"
              delay={index * 60}
              key={feature.title}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {feature.description}
              </p>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-5 rounded-lg border bg-primary/8 p-4 text-sm leading-6 text-muted-foreground">
        <Sparkles className="mr-2 inline h-4 w-4 text-primary" aria-hidden="true" />
        Các luận giải được trình bày như hệ quy chiếu tham khảo, không phải phán
        quyết tuyệt đối.
      </div>
    </section>
  );
}
