"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import {
  createSavedAnalysis,
  SAVED_ANALYSIS_TYPES,
} from "@/lib/history/save-analysis";

const saveAnalysisSchema = z.object({
  payload: z.unknown().optional(),
  profileId: z.string().min(1).optional().nullable(),
  summary: z.string().min(12).max(1200),
  title: z.string().min(3).max(160),
  type: z.enum(SAVED_ANALYSIS_TYPES),
});

export type SaveAnalysisActionInput = z.infer<typeof saveAnalysisSchema>;

export type SaveAnalysisActionResult =
  | {
      error: string;
      success: false;
    }
  | {
      id: string;
      success: true;
    };

export async function saveAnalysisAction(
  input: SaveAnalysisActionInput,
): Promise<SaveAnalysisActionResult> {
  const currentUser = await getCurrentUser();

  if (currentUser == null) {
    return {
      error: "Bạn cần đăng nhập để lưu kết quả.",
      success: false,
    };
  }

  const parsed = saveAnalysisSchema.safeParse(input);

  if (!parsed.success) {
    return {
      error: "Dữ liệu lưu kết quả không hợp lệ.",
      success: false,
    };
  }

  const savedAnalysis = await createSavedAnalysis({
    ...parsed.data,
    userId: currentUser.id,
  });

  revalidatePath("/history");

  return {
    id: savedAnalysis.id,
    success: true,
  };
}
