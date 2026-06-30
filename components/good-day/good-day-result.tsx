import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  Compass,
  Lightbulb,
  ShieldAlert,
} from "lucide-react";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { AnimatedProgress } from "@/components/motion/animated-progress";
import { Reveal } from "@/components/motion/reveal";
import { ResultAdviceCard } from "@/components/result/result-advice-card";
import { ResultInsightCard } from "@/components/result/result-insight-card";
import { ResultNextDiscovery } from "@/components/result/result-next-discovery";
import { ResultShareCta } from "@/components/result/result-share-cta";
import { ResultSourceList } from "@/components/result/result-source-list";
import { ResultWhyCard } from "@/components/result/result-why-card";
import type { GoodDayAnalysis } from "@/lib/astrology/good-day";
import { buildGoodDayResultModel } from "@/lib/result/result-builder";

export function GoodDayResult({ result }: { result: GoodDayAnalysis | null }) {
  if (result == null) {
    return (
      <Reveal className="flex min-h-[520px] items-center rounded-md border bg-card/52 p-6 shadow-2xl shadow-primary/8 backdrop-blur-xl">
        <div>
          <div className="mb-5 flex size-12 items-center justify-center rounded-md bg-primary/12 text-primary">
            <CalendarCheck className="size-6" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">
            Kết quả xem ngày xuất hiện tại đây
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
            Chọn ngày và mục đích để xem điểm ngày, giờ tốt, hướng tốt và các
            gợi ý thực tế theo hệ quy chiếu tham khảo.
          </p>
          <p className="mt-5 rounded-md border border-primary/20 bg-primary/8 px-4 py-3 text-sm leading-6 text-muted-foreground">
            Nội dung chỉ mang tính tham khảo và khám phá bản thân.
          </p>
        </div>
      </Reveal>
    );
  }

  const resultModel = buildGoodDayResultModel(result);

  return (
    <div className="space-y-4">
      <Reveal
        as="section"
        className="premium-surface rounded-md border border-primary/25 bg-primary/10 p-5 shadow-2xl shadow-primary/10"
      >
        <p className="text-sm font-medium text-primary">Điểm ngày cho {result.purpose}</p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-5xl font-semibold text-foreground">
              <AnimatedNumber value={result.score} />
              <span className="text-2xl text-muted-foreground">/100</span>
            </h2>
            <p className="mt-2 text-lg font-semibold text-primary">{result.rating}</p>
          </div>
          <p className="rounded-md border border-white/10 bg-background/52 px-4 py-3 text-sm text-muted-foreground">
            Điểm ổn định theo ngày và mục đích
          </p>
        </div>
        <ProgressBar value={result.score} />
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          {result.advice}
        </p>
      </Reveal>

      <ResultInsightCard result={resultModel} />

      <div className="grid gap-4 sm:grid-cols-2">
        <ListCard
          icon={CheckCircle2}
          items={result.goodActivities}
          title="Việc nên làm"
        />
        <ListCard
          icon={ShieldAlert}
          items={result.badActivities}
          title="Việc nên tránh"
        />
        <ListCard icon={Clock} items={result.luckyHours} title="Giờ tốt tham khảo" />
        <ListCard
          icon={Compass}
          items={result.goodDirections}
          title="Hướng tốt tham khảo"
        />
      </div>

      <section className="rounded-md border bg-card/64 p-5 backdrop-blur-xl">
        <div className="mb-3 flex items-center gap-2">
          <Lightbulb className="size-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Lời khuyên thực tế</h3>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">
          Dù điểm ngày cao hay thấp, hãy ưu tiên kiểm tra lịch trình, ngân sách,
          giấy tờ, người chịu trách nhiệm và phương án dự phòng trước khi thực hiện.
        </p>
      </section>

      <ResultAdviceCard result={resultModel} />
      <ResultWhyCard result={resultModel} />
      <ResultSourceList result={resultModel} />
      <ResultNextDiscovery result={resultModel} />
      <ResultShareCta result={resultModel} />

      <p className="rounded-md border border-primary/20 bg-primary/8 px-4 py-3 text-sm leading-6 text-muted-foreground">
        {result.disclaimer}
      </p>
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="mt-3 h-2 overflow-hidden rounded-full bg-background/70">
      <AnimatedProgress value={value} />
    </div>
  );
}

function ListCard({
  icon: Icon,
  items,
  title,
}: {
  icon: typeof CheckCircle2;
  items: string[];
  title: string;
}) {
  return (
    <article className="premium-surface rounded-md border bg-card/64 p-5 backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-2">
        <Icon className="size-5 text-primary" />
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <ul className="grid gap-2">
        {items.map((item) => (
          <li className="text-sm leading-6 text-muted-foreground" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
