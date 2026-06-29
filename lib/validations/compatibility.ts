import { z } from "zod";
import {
  birthDateInputToIsoDate,
  isValidBirthDate,
  isValidBirthTime,
  normalizeBirthDateInput,
  normalizeBirthTimeInput,
} from "./date-time";

export const compatibilityCalendarTypeOptions = [
  { label: "Dương lịch", value: "solar" },
  { label: "Âm lịch", value: "lunar" },
] as const;

const optionalName = z
  .string()
  .trim()
  .max(120, "Họ tên không được vượt quá 120 ký tự.")
  .transform((value) => (value.length > 0 ? value : undefined))
  .optional();

const optionalBirthTime = z
  .string()
  .trim()
  .optional()
  .refine((value) => isValidBirthTime(normalizeBirthTimeInput(value ?? "")), {
    message: "Giờ sinh không hợp lệ. Ví dụ: 04:20.",
  });

const personSchema = z.object({
  birthDate: z
    .string()
    .min(1, "Vui lòng chọn ngày sinh.")
    .transform((value) => normalizeBirthDateInput(value))
    .refine((value) => isValidBirthDate(value), {
      message: "Ngày sinh không hợp lệ. Vui lòng nhập dạng ngày/tháng/năm.",
    })
    .transform((value) => birthDateInputToIsoDate(value)),
  birthTime: optionalBirthTime,
  calendarType: z.enum(["solar", "lunar"], {
    message: "Vui lòng chọn loại lịch.",
  }),
  fullName: optionalName,
});

export const compatibilityFormSchema = z.object({
  female: personSchema,
  male: personSchema,
});

export type CompatibilityFormValues = z.infer<typeof compatibilityFormSchema>;
