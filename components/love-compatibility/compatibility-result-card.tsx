import {
  AlertCircle,
  CheckCircle2,
  HeartHandshake,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { AnimatedProgress } from "@/components/motion/animated-progress";
import { Reveal } from "@/components/motion/reveal";
import { PremiumResultExperience } from "@/components/result/premium-result-experience";
import { ResultShareCta } from "@/components/result/result-share-cta";
import { ResultSourceList } from "@/components/result/result-source-list";
import type { CompatibilityResult } from "@/lib/astrology/compatibility";
import { buildCompatibilityResultModel } from "@/lib/result/result-builder";

export function CompatibilityResultCard({
  result,
}: {
  result: CompatibilityResult | null;
}) {
  if (result == null) {
    return (
      <Reveal className="flex min-h-[560px] items-center rounded-md border bg-card/52 p-6 shadow-2xl shadow-primary/8 backdrop-blur-xl">
        <div>
          <div className="mb-5 flex size-12 items-center justify-center rounded-md bg-primary/12 text-primary">
            <HeartHandshake className="size-6" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">
            Kết quả hợp tuổi xuất hiện tại đây
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
            Sau khi nhập ngày sinh của hai người, hệ thống tính điểm theo Cung
            Phi, Địa Chi, Ngũ Hành, Thiên Can và yếu tố bổ sung.
          </p>
          <p className="mt-5 rounded-md border border-primary/20 bg-primary/8 px-4 py-3 text-sm leading-6 text-muted-foreground">
            Nội dung chỉ mang tính tham khảo và khám phá bản thân.
          </p>
        </div>
      </Reveal>
    );
  }

  const resultModel = buildCompatibilityResultModel(result);

  return (
    <div className="space-y-4">
      <Reveal
        as="section"
        className="premium-surface rounded-md border border-primary/25 bg-primary/10 p-5 shadow-2xl shadow-primary/10"
      >
        <p className="text-sm font-medium text-primary">Tổng điểm hợp tuổi</p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-5xl font-semibold text-foreground">
              <AnimatedNumber value={result.totalScore} />
              <span className="text-2xl text-muted-foreground">/100</span>
            </h2>
            <p className="mt-2 text-lg font-semibold text-primary">{result.rating}</p>
          </div>
          <div className="rounded-md border border-white/10 bg-background/52 px-4 py-3 text-sm text-muted-foreground">
            {result.male.fullName} & {result.female.fullName}
          </div>
        </div>
        <ProgressBar value={result.totalScore} max={100} />
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          {result.summary}
        </p>
      </Reveal>

      <PremiumResultExperience result={resultModel} />

      <section className="grid gap-3 sm:grid-cols-2">
        <PersonSummary title="Nam" profile={result.male} />
        <PersonSummary title="Nữ" profile={result.female} />
      </section>

      <section className="rounded-md border bg-card/64 p-5 backdrop-blur-xl">
        <h3 className="text-lg font-semibold text-foreground">Breakdown điểm</h3>
        <div className="mt-5 grid gap-4">
          {result.breakdown.map((item) => (
            <div key={item.key}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">
                  {item.score}/{item.maxScore}
                </p>
              </div>
              <ProgressBar value={item.score} max={item.maxScore} />
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.explanation}
              </p>
            </div>
          ))}
        </div>
      </section>

      <InsightSection
        icon={CheckCircle2}
        items={result.strengths}
        title="Điểm mạnh"
      />
      <InsightSection
        icon={AlertCircle}
        items={result.frictionPoints}
        title="Điểm dễ va chạm"
      />
      <InsightSection
        icon={Lightbulb}
        items={result.practicalSuggestions}
        title="Gợi ý hóa giải thực tế"
      />
      <ResultSourceList result={resultModel} />
      <ResultShareCta result={resultModel} />

      <p className="rounded-md border border-primary/20 bg-primary/8 px-4 py-3 text-sm leading-6 text-muted-foreground">
        {result.disclaimer}
      </p>
    </div>
  );
}

function ProgressBar({ max, value }: { max: number; value: number }) {
  const percent = Math.max(0, Math.min(100, Math.round((value / max) * 100)));

  return (
    <div className="mt-3 h-2 overflow-hidden rounded-full bg-background/70">
      <AnimatedProgress value={percent} />
    </div>
  );
}

function PersonSummary({
  profile,
  title,
}: {
  profile: CompatibilityResult["male"];
  title: string;
}) {
  return (
    <article className="premium-surface rounded-md border bg-card/64 p-4 backdrop-blur-xl">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {title}
      </p>
      <h3 className="mt-2 text-xl font-semibold text-foreground">
        {profile.fullName}
      </h3>
      <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
        <p>
          Can Chi: <span className="text-foreground">{profile.canChi}</span>
        </p>
        <p>
          Con giáp: <span className="text-foreground">{profile.zodiacAnimal}</span>
        </p>
        <p>
          Ngũ Hành: <span className="text-foreground">{profile.element}</span>
        </p>
        <p>
          Cung Phi: <span className="text-foreground">{profile.cungPhi}</span>
        </p>
      </div>
    </article>
  );
}

function InsightSection({
  icon: Icon,
  items,
  title,
}: {
  icon: typeof Sparkles;
  items: string[];
  title: string;
}) {
  return (
    <section className="premium-surface rounded-md border bg-card/64 p-5 backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-2">
        <Icon className="size-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <ul className="grid gap-3">
        {items.map((item) => (
          <li className="text-sm leading-6 text-muted-foreground" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
