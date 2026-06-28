export type AppEnvironment = "development" | "test" | "production";

export interface NavigationItem {
  label: string;
  href: string;
}

export type {
  CalendarType,
  Gender,
  SubscriptionPlan,
  SubscriptionStatus,
} from "@prisma/client";

export type SerializedJson = string;

export interface ScoreBreakdown {
  totalScore: number;
  loveScore?: number;
  workScore?: number;
  financeScore?: number;
  mentalScore?: number;
}
