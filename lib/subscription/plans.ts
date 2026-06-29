export const SUBSCRIPTION_PLANS = ["FREE", "REGISTERED", "PREMIUM", "PRO"] as const;

export type SubscriptionPlanKey = (typeof SUBSCRIPTION_PLANS)[number];

export interface SubscriptionPlanLimits {
  canExportPdf: boolean;
  canSaveHistory: boolean;
  canUseAiChat: boolean;
  canViewAdvancedReport: boolean;
  dailyAnalysisLimit: number | "unlimited";
  name: string;
}

export const PLAN_LIMITS: Record<SubscriptionPlanKey, SubscriptionPlanLimits> = {
  FREE: {
    canExportPdf: false,
    canSaveHistory: false,
    canUseAiChat: false,
    canViewAdvancedReport: false,
    dailyAnalysisLimit: 3,
    name: "Free",
  },
  REGISTERED: {
    canExportPdf: false,
    canSaveHistory: true,
    canUseAiChat: false,
    canViewAdvancedReport: false,
    dailyAnalysisLimit: 10,
    name: "Registered",
  },
  PREMIUM: {
    canExportPdf: true,
    canSaveHistory: true,
    canUseAiChat: false,
    canViewAdvancedReport: true,
    dailyAnalysisLimit: "unlimited",
    name: "Premium",
  },
  PRO: {
    canExportPdf: true,
    canSaveHistory: true,
    canUseAiChat: true,
    canViewAdvancedReport: true,
    dailyAnalysisLimit: "unlimited",
    name: "Pro",
  },
};
