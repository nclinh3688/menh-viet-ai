import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  Compass,
  HelpCircle,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import type { ResultDiscoveryItem, ResultModel } from "@/lib/result/result-types";

interface PremiumResultExperienceProps {
  basedOn?: string[];
  confidence?: number;
  insight?: string;
  knowledgeInsight?: string;
  nextDiscovery?: ResultDiscoveryItem[];
  practicalValues?: string[];
  result?: ResultModel;
}

export function PremiumResultExperience({
  basedOn,
  confidence,
  insight,
  knowledgeInsight,
  nextDiscovery,
  practicalValues,
  result,
}: PremiumResultExperienceProps) {
  const resolvedInsight = trimToSentences(insight ?? result?.keyInsight ?? "", 3);
  const resolvedConfidence = confidence ?? result?.confidence;
  const resolvedBasedOn = uniqueItems(
    basedOn ?? result?.sources.map((source) => source.label) ?? [],
  ).slice(0, 5);
  const resolvedPracticalValues = (
    practicalValues ?? result?.advice ?? []
  ).slice(0, 4);
  const resolvedKnowledgeInsight = trimToSentences(
    knowledgeInsight ?? result?.knowledgeInsight ?? "",
    2,
  );
  const resolvedDiscovery = (nextDiscovery ?? result?.nextDiscovery ?? []).slice(0, 3);

  return (
    <section
      aria-label="Trải nghiệm kết quả chính"
      className="premium-surface grid gap-5 rounded-lg border border-primary/20 bg-card/72 p-5 shadow-2xl shadow-primary/8 backdrop-blur-xl md:p-6"
    >
      <ResultSectionHeader
        icon={Sparkles}
        kicker="Section 1"
        title="Điều Mệnh Việt nhận thấy"
      />
      <p className="max-w-3xl text-base leading-8 text-foreground">
        {resolvedInsight}
      </p>

      <div className="grid gap-4 lg:grid-cols-2">
        <SubSection
          icon={HelpCircle}
          title="Vì sao có kết luận này?"
          trailing={
            resolvedConfidence == null ? null : (
              <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Confidence {resolvedConfidence}%
              </span>
            )
          }
        >
          <p className="text-sm font-medium text-muted-foreground">Dựa trên:</p>
          <ul className="mt-3 grid gap-2">
            {resolvedBasedOn.map((item) => (
              <li className="flex gap-2 text-sm leading-6 text-muted-foreground" key={item}>
                <span className="mt-2 size-1.5 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SubSection>

        <SubSection icon={Lightbulb} title="Giá trị thực tế">
          <p className="text-sm font-medium text-foreground">
            Có thể áp dụng như thế nào?
          </p>
          <ul className="mt-3 grid gap-2">
            {resolvedPracticalValues.map((item) => (
              <li className="flex gap-2 text-sm leading-6 text-muted-foreground" key={item}>
                <span className="mt-2 size-1.5 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SubSection>
      </div>

      {resolvedKnowledgeInsight.length > 0 ? (
        <SubSection icon={BookOpen} title="Điều ít người biết">
          <p className="text-sm leading-7 text-muted-foreground">
            {resolvedKnowledgeInsight}
          </p>
        </SubSection>
      ) : null}

      {resolvedDiscovery.length > 0 ? (
        <SubSection icon={Compass} title="Khám phá tiếp">
          <div className="grid gap-3 sm:grid-cols-3">
            {resolvedDiscovery.map((item) => (
              <Link
                className="group rounded-md border border-white/10 bg-background/48 p-4 transition-colors hover:border-primary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                href={item.href}
                key={`${item.href}-${item.label}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold leading-6 text-foreground">
                    {item.label}
                  </p>
                  <ArrowRight className="mt-1 size-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
                </div>
                {item.summary == null ? null : (
                  <p className="mt-2 line-clamp-3 text-xs leading-5 text-muted-foreground">
                    {item.summary}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </SubSection>
      ) : null}
    </section>
  );
}

function ResultSectionHeader({
  icon: Icon,
  kicker,
  title,
}: {
  icon: typeof Sparkles;
  kicker: string;
  title: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/12 text-primary">
        <Icon className="size-5" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          {kicker}
        </p>
        <h2 className="mt-1 text-2xl font-semibold text-foreground">{title}</h2>
      </div>
    </div>
  );
}

function SubSection({
  children,
  icon: Icon,
  title,
  trailing,
}: {
  children: ReactNode;
  icon: typeof Sparkles;
  title: string;
  trailing?: ReactNode;
}) {
  return (
    <article className="rounded-md border border-white/10 bg-background/46 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon className="size-4 text-primary" />
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        {trailing}
      </div>
      {children}
    </article>
  );
}

function trimToSentences(value: string, maxSentences: number) {
  const normalized = value
    .replace(/^Điều Mệnh Việt nhận thấy:\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();

  if (normalized.length === 0) {
    return "";
  }

  const sentences = normalized.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [normalized];

  return sentences.slice(0, maxSentences).join(" ").trim();
}

function uniqueItems(items: string[]) {
  return [...new Set(items.map((item) => item.trim()).filter(Boolean))];
}
