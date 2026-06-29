import {
  BriefcaseBusiness,
  CircleDot,
  Palette,
  Repeat2,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ASTROLOGY_DISCLAIMER } from "@/lib/constants";
import type { FiveElementsAnalysis } from "@/lib/astrology/five-elements";

export function FiveElementsResult({
  analysis,
}: {
  analysis: FiveElementsAnalysis | null;
}) {
  if (analysis == null) {
    return (
      <Reveal className="flex min-h-[480px] items-center rounded-md border border-white/10 bg-card/52 p-6 shadow-2xl shadow-primary/8 backdrop-blur">
        <div>
          <div className="mb-5 flex size-12 items-center justify-center rounded-md bg-primary/12 text-primary">
            <Sparkles className="size-6" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">
            Kết quả sẽ xuất hiện tại đây
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
            Sau khi nhập dữ liệu, Mệnh Việt AI sẽ trả về hành bản mệnh, màu sắc,
            số hợp và quan hệ tương sinh tương khắc theo hệ quy chiếu tham khảo.
          </p>
          <p className="mt-5 rounded-md border border-primary/20 bg-primary/8 px-4 py-3 text-sm leading-6 text-muted-foreground">
            {ASTROLOGY_DISCLAIMER}
          </p>
        </div>
      </Reveal>
    );
  }

  return (
    <div className="space-y-4">
      <Reveal className="premium-surface rounded-md border border-primary/25 bg-primary/10 p-5 shadow-2xl shadow-primary/10">
        <p className="text-sm font-medium text-primary">Kết quả năm {analysis.year}</p>
        <h2 className="mt-2 text-4xl font-semibold text-foreground">
          Mệnh {analysis.element}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Nạp âm tham khảo: <span className="text-foreground">{analysis.napAm}</span>
        </p>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          {analysis.summary}
        </p>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2">
        <ResultCard
          icon={Palette}
          items={analysis.profile.luckyColors}
          title="Màu hợp"
        />
        <ResultCard
          icon={ShieldAlert}
          items={analysis.profile.unluckyColors}
          title="Màu nên tiết chế"
        />
        <ResultCard
          icon={CircleDot}
          items={analysis.profile.luckyNumbers.map(String)}
          title="Số hợp"
        />
        <ResultCard
          icon={BriefcaseBusiness}
          items={analysis.profile.careerHints}
          title="Nghề phù hợp"
        />
      </div>

      <div className="premium-surface rounded-md border border-white/10 bg-card/64 p-5 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Repeat2 className="size-5" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              Quan hệ tương sinh và tương khắc
            </h3>
            <p className="text-sm text-muted-foreground">
              Dùng để tham khảo cách cân bằng môi trường và lựa chọn ưu tiên.
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <RelationPill label="Sinh xuất" value={`${analysis.element} sinh ${analysis.generates}`} />
          <RelationPill
            label="Được sinh"
            value={`${analysis.generatedBy} sinh ${analysis.element}`}
          />
          <RelationPill label="Khắc xuất" value={`${analysis.element} khắc ${analysis.controls}`} />
          <RelationPill
            label="Bị khắc"
            value={`${analysis.controlledBy} khắc ${analysis.element}`}
          />
        </div>
      </div>

      <div className="premium-surface rounded-md border border-white/10 bg-card/64 p-5 backdrop-blur">
        <h3 className="font-semibold text-foreground">Tính cách tham khảo</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {analysis.profile.personalitySummary}
        </p>
      </div>
    </div>
  );
}

function ResultCard({
  icon: Icon,
  items,
  title,
}: {
  icon: typeof Palette;
  items: string[];
  title: string;
}) {
  return (
    <div className="premium-surface rounded-md border border-white/10 bg-card/64 p-5 backdrop-blur">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            className="rounded-full border border-white/10 bg-background/58 px-3 py-1 text-sm text-foreground"
            key={item}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function RelationPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-background/52 px-4 py-3">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}
