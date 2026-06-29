import { z } from "zod";
import { GOOD_DAY_PURPOSES } from "@/lib/astrology/good-day";
import {
  birthDateInputToIsoDate,
  isValidBirthDate,
  normalizeBirthDateInput,
} from "./date-time";

export const goodDayPurposeOptions = GOOD_DAY_PURPOSES.map((purpose) => ({
  label: purpose,
  value: purpose,
}));

export const goodDayFormSchema = z.object({
  date: z
    .string()
    .min(1, "Vui lòng chọn ngày cần xem.")
    .transform((value) => normalizeBirthDateInput(value))
    .refine((value) => isValidBirthDate(value), {
      message: "Ngày cần xem không hợp lệ. Vui lòng nhập dạng ngày/tháng/năm.",
    })
    .transform((value) => birthDateInputToIsoDate(value)),
  purpose: z.enum(GOOD_DAY_PURPOSES, {
    message: "Vui lòng chọn mục đích.",
  }),
});

export type GoodDayFormValues = z.infer<typeof goodDayFormSchema>;
