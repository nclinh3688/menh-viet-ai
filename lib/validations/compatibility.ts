import { z } from "zod";

export const compatibilityCalendarTypeOptions = [
  { label: "Dương lịch", value: "SOLAR" },
  { label: "Âm lịch", value: "LUNAR" },
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
  .transform((value) => (value.length > 0 ? value : undefined))
  .optional();

const personSchema = z.object({
  birthDate: z
    .string()
    .min(1, "Vui lòng chọn ngày sinh.")
    .refine((value) => !Number.isNaN(Date.parse(value)), {
      message: "Ngày sinh không hợp lệ.",
    }),
  birthTime: optionalBirthTime,
  calendarType: z.enum(["SOLAR", "LUNAR"], {
    message: "Vui lòng chọn loại lịch.",
  }),
  fullName: optionalName,
});

export const compatibilityFormSchema = z.object({
  female: personSchema,
  male: personSchema,
});

export type CompatibilityFormValues = z.infer<typeof compatibilityFormSchema>;
