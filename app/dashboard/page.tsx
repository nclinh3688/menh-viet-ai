import type { Metadata } from "next";
import { SaveProfileCta } from "@/components/auth/save-profile-cta";
import { UsageLimitBanner } from "@/components/subscription/usage-limit-banner";
import { DailyFortuneHero } from "@/components/dashboard/daily-fortune-hero";
import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardNotFoundState } from "@/components/dashboard/dashboard-not-found-state";
import { FateOverview } from "@/components/dashboard/fate-overview";
import { FeatureShortcuts } from "@/components/dashboard/feature-shortcuts";
import { PersonalSuggestions } from "@/components/dashboard/personal-suggestions";
import { PremiumLockedCards } from "@/components/dashboard/premium-locked-cards";
import { generateBirthChart, generateDailyFortuneDemo } from "@/lib/astrology";
import { APP_NAME } from "@/lib/constants";
import { db } from "@/lib/db";
import { parseJsonArray } from "@/lib/json";

export const metadata: Metadata = {
  title: `Dashboard cá nhân | ${APP_NAME}`,
  description:
    "Dashboard vận mệnh cá nhân hóa với tổng quan Can Chi, Ngũ Hành, Cung Phi và gợi ý tham khảo hằng ngày.",
  alternates: {
    canonical: "/dashboard",
  },
};

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
    return <DashboardEmptyState />;
  }

  const profile = await db.profile.findUnique({
    where: { id: profileId },
    include: { birthChart: true },
  });

  if (profile == null) {
    return <DashboardNotFoundState />;
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
      <UsageLimitBanner plan="FREE" usedToday={0} />
      <DailyFortuneHero fortune={dailyFortune} />
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
        <PersonalSuggestions
          advice={dailyFortune.advice}
          badDirections={badDirections}
          goodDirections={goodDirections}
          luckyColors={luckyColors}
          luckyNumbers={luckyNumbers}
          shouldAvoid={dailyFortune.shouldAvoid}
          shouldDo={dailyFortune.shouldDo}
          summary={birthChart.summary}
          unluckyColors={unluckyColors}
        />
      </div>
      <SaveProfileCta />
      <PremiumLockedCards />
      <FeatureShortcuts />
    </main>
  );
}
