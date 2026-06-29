import { db } from "@/lib/db";

export const SAVED_ANALYSIS_TYPES = [
  "BIRTH_CHART",
  "COMPATIBILITY",
  "NUMEROLOGY",
  "FIVE_ELEMENTS",
  "GOOD_DAY",
] as const;

export type SavedAnalysisType = (typeof SAVED_ANALYSIS_TYPES)[number];

export interface CreateSavedAnalysisInput {
  payload?: unknown;
  profileId?: string | null;
  summary: string;
  title: string;
  type: SavedAnalysisType;
  userId?: string | null;
}

export async function createSavedAnalysis(input: CreateSavedAnalysisInput) {
  return db.savedAnalysis.create({
    data: {
      payload: JSON.stringify(input.payload ?? {}),
      profileId: input.profileId ?? null,
      summary: input.summary,
      title: input.title,
      type: input.type,
      userId: input.userId ?? null,
    },
  });
}

export async function getUserSavedAnalyses(userId: string) {
  return db.savedAnalysis.findMany({
    orderBy: { createdAt: "desc" },
    where: { userId },
  });
}

export async function getSavedAnalysisById(id: string) {
  return db.savedAnalysis.findUnique({
    where: { id },
  });
}
