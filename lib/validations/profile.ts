import { z } from "zod";

export const genderOptions = [
  { label: "Nam", value: "MALE" },
  { label: "Nữ", value: "FEMALE" },
  { label: "Khác", value: "OTHER" },
] as const;

export const calendarTypeOptions = [
  { label: "Dương lịch", value: "SOLAR" },
  { label: "Âm lịch", value: "LUNAR" },
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
    .min(2, "Vui lòng nhập họ tên tối thiểu 2 ký tự.")
    .max(120, "Họ tên không được vượt quá 120 ký tự."),
  birthDate: z
    .string()
    .min(1, "Vui lòng chọn ngày sinh.")
    .refine((value) => !Number.isNaN(Date.parse(value)), {
      message: "Ngày sinh không hợp lệ.",
    }),
  birthTime: optionalText,
  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    message: "Vui lòng chọn giới tính.",
  }),
  birthPlace: optionalText,
  calendarType: z.enum(["SOLAR", "LUNAR"], {
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
