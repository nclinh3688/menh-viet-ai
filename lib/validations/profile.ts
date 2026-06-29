import { z } from "zod";
import {
  isValidBirthDate,
  isValidBirthTime,
  normalizeBirthDateInput,
  normalizeBirthTimeInput,
} from "./date-time";

export const genderOptions = [
  { label: "Nam", value: "MALE" },
  { label: "Nữ", value: "FEMALE" },
  { label: "Khác", value: "OTHER" },
] as const;

export const calendarTypeOptions = [
  { label: "Dương lịch", value: "solar" },
  { label: "Âm lịch", value: "lunar" },
] as const;

export const relationshipStatusOptions = [
  "Độc thân",
  "Đang yêu",
  "Đã cưới",
] as const;

export const mainInterestOptions = [
  "Tình duyên",
  "Hôn nhân",
  "Sự nghiệp",
  "Tài chính",
  "Gia đình",
  "Phong thủy",
  "Khám phá bản thân",
] as const;

const optionalText = z
  .string()
  .trim()
  .transform((value) => (value.length > 0 ? value : undefined))
  .optional();

export const profileFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .max(120, "Họ tên không được vượt quá 120 ký tự.")
    .transform((value) => (value.length > 0 ? value : "Bạn")),
  birthDate: z
    .string()
    .min(1, "Vui lòng chọn ngày sinh.")
    .transform((value) => normalizeBirthDateInput(value))
    .refine((value) => isValidBirthDate(value), {
      message: "Ngày sinh không hợp lệ. Vui lòng nhập dạng ngày/tháng/năm.",
    }),
  birthTime: z
    .string()
    .trim()
    .optional()
    .refine((value) => isValidBirthTime(normalizeBirthTimeInput(value ?? "")), {
      message: "Giờ sinh không hợp lệ. Ví dụ: 04:20.",
    }),
  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    message: "Vui lòng chọn giới tính.",
  }),
  birthPlace: optionalText,
  calendarType: z.enum(["solar", "lunar"], {
    message: "Vui lòng chọn loại lịch.",
  }),
  relationshipStatus: z.enum(relationshipStatusOptions, {
    message: "Vui lòng chọn tình trạng.",
  }),
  mainInterest: z.enum(mainInterestOptions, {
    message: "Vui lòng chọn mối quan tâm chính.",
  }),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
