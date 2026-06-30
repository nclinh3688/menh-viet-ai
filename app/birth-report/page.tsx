import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Sparkles } from "lucide-react";
import { DashboardNotFoundState } from "@/components/dashboard/dashboard-not-found-state";
import { JourneyProgress } from "@/components/journey/journey-progress";
import {
  ReportCareer,
  ReportCautions,
  ReportFinance,
  ReportFooter,
  ReportHeader,
  ReportHealth,
  ReportInterpretation,
  ReportKeyInsight,
  ReportNextDiscovery,
  ReportOverview,
  ReportQualityDebugPanel,
  ReportRawData,
  ReportRecommendations,
  ReportRelationship,
  ReportStrengths,
  ReportWhyCard,
} from "@/components/report-engine";
import { KnowledgeDiscovery } from "@/components/report/knowledge-discovery";
import { OneThingToRemember } from "@/components/report/one-thing-to-remember";
import { NextDiscovery } from "@/components/report/next-discovery";
import { PracticalAdvice } from "@/components/report/practical-advice";
import { SignatureInsight } from "@/components/report/signature-insight";
import { PremiumResultExperience } from "@/components/result/premium-result-experience";
import { ShareCard } from "@/components/share/share-card";
import { PremiumLock } from "@/components/subscription/premium-lock";
import { Button } from "@/components/ui/button";
import { generateBirthChart, generateDailyFortuneSnapshot } from "@/lib/astrology";
import { APP_NAME, ASTROLOGY_DISCLAIMER } from "@/lib/constants";
import { db } from "@/lib/db";
import { parseJsonArray } from "@/lib/json";
import { getFiveElementReportFacts } from "@/lib/knowledge-db/astrology/five-elements-pack";
import { checkReportContentQuality } from "@/lib/quality/content-quality-checker";
import { buildBirthReport } from "@/lib/report-engine/adapters/birth-report-adapter";
import { validateReport } from "@/lib/report-engine/report-validator";
import { formatSourceLabel } from "@/lib/sources/source-resolver";

export const metadata: Metadata = {
  title: `Báo cáo vận mệnh cá nhân | ${APP_NAME}`,
  description:
    "Báo cáo vận mệnh cá nhân theo pipeline Astrology Engine, Rule Engine, Report Engine và Narrative Engine.",
  alternates: {
    canonical: "/birth-report",
  },
};

interface BirthReportPageProps {
  searchParams: Promise<{
    profileId?: string;
  }>;
}

export default async function BirthReportPage({
  searchParams,
}: BirthReportPageProps) {
  const { profileId } = await searchParams;

  if (profileId == null || profileId.trim().length === 0) {
    return <BirthReportEmptyState />;
  }

  let profile;

  try {
    profile = await db.profile.findUnique({
      include: { birthChart: true },
      where: { id: profileId },
    });
  } catch {
    return <DashboardNotFoundState />;
  }

  if (profile == null) {
    return <DashboardNotFoundState />;
  }

  const generatedChart = generateBirthChart({
    birthDate: profile.birthDate,
    birthTime: profile.birthTime ?? undefined,
    fullName: profile.fullName,
    gender: profile.gender,
  });

  let birthChart;

  try {
    birthChart =
      profile.birthChart ??
      (await db.birthChart.create({
        data: {
          badDirections: JSON.stringify(generatedChart.badDirections),
          cungPhi: generatedChart.cungPhi,
          earthlyBranch: generatedChart.earthlyBranch,
          element: generatedChart.element,
          goodDirections: JSON.stringify(generatedChart.goodDirections),
          heavenlyStem: generatedChart.heavenlyStem,
          lifePalace: generatedChart.lifePalace,
          luckyColors: JSON.stringify(generatedChart.luckyColors),
          luckyNumbers: JSON.stringify(generatedChart.luckyNumbers),
          napAm: generatedChart.napAm,
          profileId: profile.id,
          summary: generatedChart.summary,
          unluckyColors: JSON.stringify(generatedChart.unluckyColors),
          zodiacAnimal: generatedChart.zodiacAnimal,
        },
      }));
  } catch {
    return <DashboardNotFoundState />;
  }

  const dailyScore = generateDailyFortuneSnapshot(profile.id);
  const report = buildBirthReport({
    birthChart,
    dailyScore,
    profile,
  });
  const luckyColors = parseJsonArray<string>(birthChart.luckyColors);
  const contentQuality = checkReportContentQuality(report);
  const reportValidation = validateReport(report);
  const completedSteps = [
    report.overview.facts.length > 0,
    report.strengths.items.length > 0,
    report.career.items.length > 0,
    report.relationship.items.length > 0,
    report.finance.items.length > 0,
    report.recommendations.items.length > 0,
  ].filter(Boolean).length;
  const totalDiscoveryTopics =
    report.anchors.length +
    report.nextDiscovery.length +
    report.sources.length +
    report.rawData.facts.length;
  const signatureFactors = buildSignatureFactors(report);
  const knowledgeDiscovery = buildKnowledgeDiscovery(birthChart.element);
  const oneThingToRemember = buildOneThingToRemember(report.keyInsight.body);

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-5 px-5 py-8 md:px-8 md:py-10">
      <ReportHeader report={report} title={`Báo cáo vận mệnh của ${profile.fullName}`} />
      <JourneyProgress
        discoveredCount={completedSteps}
        percent={0}
        steps={[
          { isCompleted: true, label: "Tổng quan" },
          { isCompleted: true, label: "Con người" },
          { isCompleted: report.career.items.length > 0, label: "Công việc" },
          { isCompleted: report.relationship.items.length > 0, label: "Tình yêu" },
          { isCompleted: report.finance.items.length > 0, label: "Tài chính" },
          { isCompleted: true, label: "Lời khuyên" },
        ]}
        totalCount={totalDiscoveryTopics}
      />
      <SignatureInsight
        confidence={report.overview.confidence}
        factors={signatureFactors}
        insight={report.keyInsight.body}
      />
      <PremiumResultExperience
        basedOn={report.sources.map((source) => formatSourceLabel(source.primary))}
        confidence={report.overview.confidence}
        insight={report.keyInsight.body}
        knowledgeInsight={knowledgeDiscovery[0]?.summary}
        nextDiscovery={knowledgeDiscovery.slice(0, 3)}
        practicalValues={report.recommendations.items.slice(0, 4)}
      />
      <ReportOverview report={report} />
      <KnowledgeDiscovery items={knowledgeDiscovery} />
      <BirthRawDataCard
        birthChart={{
          cungPhi: birthChart.cungPhi,
          earthlyBranch: birthChart.earthlyBranch,
          element: birthChart.element,
          heavenlyStem: birthChart.heavenlyStem,
          napAm: birthChart.napAm,
          zodiacAnimal: birthChart.zodiacAnimal,
        }}
        profile={{
          birthDate: profile.birthDate,
          birthPlace: profile.birthPlace,
          birthTime: profile.birthTime,
          calendarType: profile.calendarType,
          fullName: profile.fullName,
          gender: profile.gender,
        }}
      />
      <ReportRawData report={report} />
      <ReportKeyInsight report={report} />
      <KnowledgeDiscovery items={knowledgeDiscovery} />
      <ReportInterpretation report={report} />
      <ReportStrengths report={report} />
      <KnowledgeDiscovery items={knowledgeDiscovery} />
      <ReportCautions report={report} />
      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <ReportCareer report={report} />
          <KnowledgeDiscovery items={knowledgeDiscovery} />
        </div>
        <div>
          <ReportFinance report={report} />
          <KnowledgeDiscovery items={knowledgeDiscovery} />
        </div>
        <div>
          <ReportRelationship report={report} />
          <KnowledgeDiscovery items={knowledgeDiscovery} />
        </div>
        <div>
          <ReportHealth report={report} />
          <KnowledgeDiscovery items={knowledgeDiscovery} />
        </div>
      </div>
      <ReportRecommendations report={report} />
      <PracticalAdvice items={report.recommendations.items} />
      <ReportWhyCard report={report} />
      <NextDiscovery items={report.nextDiscovery} />
      <ReportNextDiscovery report={report} />
      <OneThingToRemember insight={oneThingToRemember} />
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <ShareCard
          insight={report.keyInsight.body}
          luckyColors={luckyColors}
          name={profile.fullName}
          siteUrl={
            process.env.NEXT_PUBLIC_APP_URL ??
            process.env.NEXT_PUBLIC_SITE_URL ??
            "menhviet.ai"
          }
          todayScore={dailyScore.totalScore}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <PremiumLock
            description="Premium sẽ mở phần vận trình theo từng tháng khi có đủ dữ liệu lịch sử."
            featureName="Premium"
            title="Vận trình 12 tháng"
          />
          <PremiumLock
            description="Báo cáo PDF cá nhân sẽ dùng cùng dữ liệu report này, không thêm kết luận ngoài nguồn."
            featureName="Premium"
            title="Báo cáo PDF cá nhân"
          />
        </div>
      </div>
      <ReportFooter report={report} />
      {process.env.NODE_ENV === "development" ? (
        <ReportQualityDebugPanel
          contentQuality={contentQuality}
          validation={reportValidation}
        />
      ) : null}
    </main>
  );
}

function buildSignatureFactors(report: ReturnType<typeof buildBirthReport>) {
  return report.rawData.facts
    .slice(0, 3)
    .map((fact) => `${formatFactCodeLabel(fact.code)} · confidence ${fact.confidence}%`);
}

function formatFactCodeLabel(code: string) {
  return code
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildKnowledgeDiscovery(element: string) {
  const fiveElementFacts = getFiveElementReportFacts(element);

  if (fiveElementFacts == null) {
    return [];
  }

  return fiveElementFacts.relatedKnowledge.slice(0, 3).map((item) => ({
    href: "/five-elements",
    label: item.title,
    summary: item.summary,
  }));
}

function buildOneThingToRemember(signatureInsight: string) {
  const [firstSentence] = signatureInsight.split(".");

  return `${firstSentence.trim()}.`;
}

function BirthReportEmptyState() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-4xl items-center px-5 py-12 md:px-8">
      <div className="premium-surface w-full rounded-lg border bg-card/70 p-6 text-center shadow-2xl shadow-black/30 backdrop-blur-xl md:p-8">
        <div className="mx-auto flex size-12 items-center justify-center rounded-md bg-primary/12 text-primary">
          <FileText className="size-6" />
        </div>
        <p className="mt-5 text-sm font-semibold text-primary">
          Báo cáo vận mệnh cá nhân
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-normal text-foreground md:text-4xl">
          Tạo hồ sơ để xem báo cáo đầy đủ
        </h1>
        <p className="mx-auto mt-4 max-w-2xl leading-8 text-muted-foreground">
          Nhập ngày sinh để Mệnh Việt tạo hồ sơ Can Chi, Ngũ Hành, Cung Phi và
          báo cáo khám phá bản thân theo hệ quy chiếu tham khảo.
        </p>
        <p className="mx-auto mt-5 max-w-xl rounded-md border border-primary/20 bg-primary/8 px-4 py-3 text-sm leading-6 text-muted-foreground">
          {ASTROLOGY_DISCLAIMER}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">
              <Sparkles className="size-4" />
              Khám phá miễn phí
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/login">Đăng nhập để lưu hồ sơ</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function BirthRawDataCard({
  birthChart,
  profile,
}: {
  birthChart: {
    cungPhi: string;
    earthlyBranch: string;
    element: string;
    heavenlyStem: string;
    napAm: string;
    zodiacAnimal: string;
  };
  profile: {
    birthDate: Date;
    birthPlace: string | null;
    birthTime: string | null;
    calendarType: string;
    fullName: string;
    gender: string;
  };
}) {
  const rows = [
    ["Họ tên", profile.fullName],
    ["Ngày sinh", profile.birthDate.toLocaleDateString("vi-VN")],
    ["Giờ sinh", profile.birthTime ?? "Chưa nhập"],
    ["Nơi sinh", profile.birthPlace ?? "Chưa nhập"],
    ["Loại lịch", profile.calendarType],
    ["Giới tính", profile.gender],
    ["Thiên Can", birthChart.heavenlyStem],
    ["Địa Chi", birthChart.earthlyBranch],
    ["Con giáp", birthChart.zodiacAnimal],
    ["Ngũ Hành", birthChart.element],
    ["Nạp âm", birthChart.napAm],
    ["Cung Phi", birthChart.cungPhi],
  ];

  return (
    <section className="premium-surface rounded-lg border bg-card/68 p-5 backdrop-blur-xl md:p-6">
      <p className="text-sm font-semibold text-primary">Dữ liệu gốc</p>
      <h2 className="mt-2 text-2xl font-semibold text-foreground">
        Thông tin dùng để tạo báo cáo
      </h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map(([label, value]) => (
          <div
            className="rounded-md border border-white/10 bg-background/48 p-4"
            key={label}
          >
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {label}
            </p>
            <p className="mt-2 text-sm font-semibold text-foreground">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
