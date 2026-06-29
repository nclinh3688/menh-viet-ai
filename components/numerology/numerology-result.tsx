import {
  BriefcaseBusiness,
  Heart,
  Lightbulb,
  ShieldAlert,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ASTROLOGY_DISCLAIMER } from "@/lib/constants";
import type { NumerologyAnalysis, NumerologyProfile } from "@/lib/numerology";

export function NumerologyResult({
  analysis,
}: {
  analysis: NumerologyAnalysis | null;
}) {
  if (analysis == null) {
    return (
      <Reveal className="flex min-h-[520px] items-center rounded-md border border-white/10 bg-card/52 p-6 shadow-2xl shadow-primary/8 backdrop-blur">
        <div>
          <div className="mb-5 flex size-12 items-center justify-center rounded-md bg-primary/12 text-primary">
            <Sparkles className="size-6" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">
            Kết quả thần số học sẽ xuất hiện tại đây
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
            Mệnh Việt AI sẽ phân tích các con số nền tảng từ ngày sinh và họ tên,
            sau đó gợi ý cách đọc theo hướng khám phá bản thân.
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
        <p className="text-sm font-medium text-primary">Kết quả cho {analysis.fullName}</p>
        <h2 className="mt-2 text-4xl font-semibold text-foreground">
          Số chủ đạo {analysis.lifePathNumber}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {analysis.lifePathProfile.title}
        </p>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          {analysis.summary}
        </p>
      </Reveal>

      <div className="grid gap-3 sm:grid-cols-2">
        <NumberTile label="Số chủ đạo" value={analysis.lifePathNumber} />
        <NumberTile label="Số thái độ" value={analysis.attitudeNumber} />
        <NumberTile
          label="Số linh hồn"
          value={analysis.soulUrgeNumber ?? "MVP"}
        />
        <NumberTile
          label="Số sứ mệnh"
          value={analysis.destinyNumber ?? "MVP"}
        />
      </div>

      <ProfileSection profile={analysis.lifePathProfile} />

      <div className="premium-surface rounded-md border border-white/10 bg-card/64 p-5 backdrop-blur">
        <h3 className="text-lg font-semibold text-foreground">
          Góc nhìn từ họ tên
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Tên sau chuẩn hóa MVP:{" "}
          <span className="text-foreground">{analysis.nameBreakdown.normalizedName}</span>
        </p>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {analysis.mvpNote}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {analysis.soulUrgeProfile != null ? (
            <MiniProfile title="Số linh hồn" profile={analysis.soulUrgeProfile} />
          ) : null}
          {analysis.destinyProfile != null ? (
            <MiniProfile title="Số sứ mệnh" profile={analysis.destinyProfile} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

function NumberTile({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="premium-surface rounded-md border border-white/10 bg-card/64 p-4 backdrop-blur">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold text-foreground">{value}</p>
    </div>
  );
}

function ProfileSection({ profile }: { profile: NumerologyProfile }) {
  return (
    <div className="premium-surface rounded-md border border-white/10 bg-card/64 p-5 backdrop-blur">
      <h3 className="text-lg font-semibold text-foreground">
        Diễn giải số chủ đạo {profile.number}
      </h3>
      <div className="mt-5 grid gap-4">
        <InsightBlock icon={Sparkles} items={profile.strengths} title="Điểm mạnh" />
        <InsightBlock icon={ShieldAlert} items={profile.weaknesses} title="Điểm yếu" />
        <InsightBlock
          icon={TrendingUp}
          items={profile.growthDirections}
          title="Hướng phát triển"
        />
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <TextInsight icon={Heart} title="Tình yêu" value={profile.love} />
        <TextInsight icon={BriefcaseBusiness} title="Công việc" value={profile.work} />
      </div>
    </div>
  );
}

function InsightBlock({
  icon: Icon,
  items,
  title,
}: {
  icon: typeof Sparkles;
  items: string[];
  title: string;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <Icon className="size-4 text-primary" />
        {title}
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

function TextInsight({
  icon: Icon,
  title,
  value,
}: {
  icon: typeof Lightbulb;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-md border border-white/10 bg-background/52 p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
        <Icon className="size-4 text-primary" />
        {title}
      </div>
      <p className="text-sm leading-6 text-muted-foreground">{value}</p>
    </div>
  );
}

function MiniProfile({
  profile,
  title,
}: {
  profile: NumerologyProfile;
  title: string;
}) {
  return (
    <div className="rounded-md border border-white/10 bg-background/52 p-4">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {title}
      </p>
      <p className="mt-2 text-xl font-semibold text-foreground">
        {profile.number} - {profile.title}
      </p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {profile.growthDirections[0]}
      </p>
    </div>
  );
}
