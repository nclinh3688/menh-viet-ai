import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DailyScoreCard } from "@/components/dashboard/daily-score-card";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { FateOverview } from "@/components/dashboard/fate-overview";
import { FeatureShortcuts } from "@/components/dashboard/feature-shortcuts";
import { PersonalSuggestions } from "@/components/dashboard/personal-suggestions";
import { generateBirthChart, generateDailyFortuneDemo } from "@/lib/astrology";
import { db } from "@/lib/db";
import { parseJsonArray } from "@/lib/json";

interface DashboardPageProps {
  searchParams: Promise<{
    profileId?: string;
  }>;
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const { profileId } = await searchParams;

  if (profileId == null || profileId.trim().length === 0) {
    return (
      <DashboardState
        title="Bạn cần tạo hồ sơ trước"
        description="Dashboard cần một profileId hợp lệ để cá nhân hóa dữ liệu vận mệnh."
        actionLabel="Tạo hồ sơ"
        actionHref="/onboarding"
      />
    );
  }

  const profile = await db.profile.findUnique({
    where: { id: profileId },
    include: { birthChart: true },
  });

  if (profile == null) {
    return (
      <DashboardState
        title="Không tìm thấy hồ sơ"
        description="Hồ sơ này có thể đã bị xóa hoặc profileId không chính xác. Bạn có thể tạo lại hồ sơ mới."
        actionLabel="Tạo hồ sơ mới"
        actionHref="/onboarding"
      />
    );
  }

  const generatedChart = generateBirthChart({
    fullName: profile.fullName,
    birthDate: profile.birthDate,
    birthTime: profile.birthTime ?? undefined,
    gender: profile.gender,
  });

  const birthChart =
    profile.birthChart ??
    (await db.birthChart.create({
      data: {
        profileId: profile.id,
        heavenlyStem: generatedChart.heavenlyStem,
        earthlyBranch: generatedChart.earthlyBranch,
        zodiacAnimal: generatedChart.zodiacAnimal,
        element: generatedChart.element,
        napAm: generatedChart.napAm,
        cungPhi: generatedChart.cungPhi,
        lifePalace: generatedChart.lifePalace,
        luckyColors: JSON.stringify(generatedChart.luckyColors),
        unluckyColors: JSON.stringify(generatedChart.unluckyColors),
        luckyNumbers: JSON.stringify(generatedChart.luckyNumbers),
        goodDirections: JSON.stringify(generatedChart.goodDirections),
        badDirections: JSON.stringify(generatedChart.badDirections),
        summary: generatedChart.summary,
      },
    }));

  const luckyColors = parseJsonArray<string>(birthChart.luckyColors);
  const unluckyColors = parseJsonArray<string>(birthChart.unluckyColors);
  const luckyNumbers = parseJsonArray<number>(birthChart.luckyNumbers);
  const goodDirections = parseJsonArray<string>(birthChart.goodDirections);
  const badDirections = parseJsonArray<string>(birthChart.badDirections);
  const dailyFortune = generateDailyFortuneDemo(profile.id);

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-5 px-5 py-8 md:px-8 md:py-10">
      <DashboardHeader fullName={profile.fullName} />
      <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <FateOverview
          chart={{
            heavenlyStem: birthChart.heavenlyStem,
            earthlyBranch: birthChart.earthlyBranch,
            zodiacAnimal: birthChart.zodiacAnimal,
            element: birthChart.element,
            napAm: birthChart.napAm,
            cungPhi: birthChart.cungPhi,
            cungPhiGroup: generatedChart.cungPhiGroup,
          }}
        />
        <DailyScoreCard fortune={dailyFortune} />
      </div>
      <PersonalSuggestions
        advice={dailyFortune.advice}
        badDirections={badDirections}
        goodDirections={goodDirections}
        luckyColors={luckyColors}
        luckyNumbers={luckyNumbers}
        summary={birthChart.summary}
        unluckyColors={unluckyColors}
      />
      <FeatureShortcuts />
    </main>
  );
}

interface DashboardStateProps {
  actionHref: string;
  actionLabel: string;
  description: string;
  title: string;
}

function DashboardState({
  actionHref,
  actionLabel,
  description,
  title,
}: DashboardStateProps) {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-3xl items-center px-5 py-12 md:px-8">
      <div className="w-full rounded-lg border bg-card/70 p-6 text-center shadow-2xl shadow-black/30 backdrop-blur-xl md:p-8">
        <p className="mb-3 text-sm font-semibold text-primary">Dashboard</p>
        <h1 className="text-3xl font-semibold tracking-normal text-foreground md:text-4xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl leading-8 text-muted-foreground">
          {description}
        </p>
        <Button asChild className="mt-8">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      </div>
    </section>
  );
}
