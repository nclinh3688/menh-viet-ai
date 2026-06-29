import { PLAN_LIMITS, type SubscriptionPlanKey } from "./plans";

export type PremiumFeature =
  | "advancedReport"
  | "aiChat"
  | "exportPdf"
  | "saveHistory";

export function getPlanLimits(plan: SubscriptionPlanKey) {
  return PLAN_LIMITS[plan];
}

export function canUseFeature(plan: SubscriptionPlanKey, feature: PremiumFeature) {
  const limits = getPlanLimits(plan);

  switch (feature) {
    case "advancedReport":
      return limits.canViewAdvancedReport;
    case "aiChat":
      return limits.canUseAiChat;
    case "exportPdf":
      return limits.canExportPdf;
    case "saveHistory":
      return limits.canSaveHistory;
  }
}

export function getRemainingUsage({
  plan,
  usedToday,
}: {
  plan: SubscriptionPlanKey;
  usedToday: number;
}) {
  const limits = getPlanLimits(plan);

  if (limits.dailyAnalysisLimit === "unlimited") {
    return "unlimited" as const;
  }

  return Math.max(limits.dailyAnalysisLimit - usedToday, 0);
}

export function isUnlimited(plan: SubscriptionPlanKey) {
  return getPlanLimits(plan).dailyAnalysisLimit === "unlimited";
}
