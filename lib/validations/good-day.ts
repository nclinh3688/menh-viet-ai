import { z } from "zod";
import { GOOD_DAY_PURPOSES } from "@/lib/astrology/good-day";

export const goodDayPurposeOptions = GOOD_DAY_PURPOSES.map((purpose) => ({
  label: purpose,
  value: purpose,
}));

export const goodDayFormSchema = z.object({
  date: z
    .string()
    .min(1, "Vui lòng chọn ngày cần xem.")
    .refine((value) => !Number.isNaN(Date.parse(value)), {
      message: "Ngày cần xem không hợp lệ.",
    }),
  purpose: z.enum(GOOD_DAY_PURPOSES, {
    message: "Vui lòng chọn mục đích.",
  }),
});

export type GoodDayFormValues = z.infer<typeof goodDayFormSchema>;
