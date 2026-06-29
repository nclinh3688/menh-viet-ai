import type { BirthChart, Profile } from "@prisma/client";
import { renderSectionNarrative } from "@/lib/narrative/section-template-registry";
import { renderReportModel } from "@/lib/report-engine/report-renderer";
import type { ReportRenderModel } from "@/lib/report-engine/report-schema";
import { runRuleEngine } from "@/lib/rule-engine/rule-runner";
import type { KnowledgeInput, RuleEngineOutput } from "@/lib/rule-engine/rule-types";

interface DailyScoreInput {
  dateKey?: string;
  financeScore?: number;
  loveScore?: number;
  mentalScore?: number;
  totalScore?: number;
  workScore?: number;
}

interface BuildBirthReportInput {
  birthChart: BirthChart;
  dailyScore?: DailyScoreInput;
  profile: Profile;
}

function buildBirthKnowledge({
  birthChart,
  profile,
}: BuildBirthReportInput): KnowledgeInput {
  return {
    birthChart: {
      cungPhi: birthChart.cungPhi,
      earthlyBranch: birthChart.earthlyBranch,
      element: birthChart.element,
      heavenlyStem: birthChart.heavenlyStem,
      zodiacAnimal: birthChart.zodiacAnimal,
    },
    profile: {
      gender: profile.gender,
      mainInterest: profile.mainInterest,
    },
  };
}

function applyNarrative(report: ReportRenderModel, output: RuleEngineOutput) {
  const baseContext = {
    facts: output.facts,
    recommendations: output.recommendations,
    scores: output.scores,
  };
  const overview = renderSectionNarrative("OVERVIEW", {
    ...baseContext,
    section: "OVERVIEW",
  });
  const strengths = renderSectionNarrative("STRENGTHS", {
    ...baseContext,
    section: "STRENGTHS",
  });
  const career = renderSectionNarrative("CAREER", {
    ...baseContext,
    section: "CAREER",
  });
  const finance = renderSectionNarrative("FINANCE", {
    ...baseContext,
    section: "FINANCE",
  });
  const relationship = renderSectionNarrative("RELATIONSHIP", {
    ...baseContext,
    section: "RELATIONSHIP",
  });
  const health = renderSectionNarrative("HEALTH", {
    ...baseContext,
    section: "HEALTH",
  });
  const recommendations = renderSectionNarrative("RECOMMENDATIONS", {
    ...baseContext,
    section: "RECOMMENDATIONS",
  });

  return {
    ...report,
    career: {
      ...report.career,
      description: career.body,
    },
    finance: {
      ...report.finance,
      description: finance.body,
    },
    health: {
      ...report.health,
      description: health.body,
    },
    keyInsight: {
      ...report.keyInsight,
      body: overview.body,
    },
    overview: {
      ...report.overview,
      description: overview.body,
    },
    recommendations: {
      ...report.recommendations,
      description: recommendations.body,
    },
    relationship: {
      ...report.relationship,
      description: relationship.body,
    },
    strengths: {
      ...report.strengths,
      description: strengths.body,
    },
  } satisfies ReportRenderModel;
}

export function buildBirthReport(
  input: BuildBirthReportInput,
): ReportRenderModel {
  const knowledge = buildBirthKnowledge(input);
  const ruleOutput = runRuleEngine(knowledge);
  const report = renderReportModel(ruleOutput);
  const dailyScoreText =
    input.dailyScore?.totalScore == null
      ? "Chưa có điểm ngày trong payload báo cáo."
      : `Điểm hôm nay ${input.dailyScore.totalScore}/100, dùng như một tín hiệu tham khảo trong ngày.`;

  return applyNarrative(
    {
      ...report,
      interpretation: {
        body: `${report.interpretation.body} ${dailyScoreText}`,
        title: "Mệnh Việt luận giải",
      },
      keyInsight: {
        body: report.keyInsight.body,
        title: "Mệnh Việt nhận thấy điều nổi bật nhất ở bạn là...",
      },
      overview: {
        ...report.overview,
        title: `Báo cáo vận mệnh cá nhân của ${input.profile.fullName}`,
      },
      rawData: {
        ...report.rawData,
        facts: report.rawData.facts,
      },
    },
    ruleOutput,
  );
}
