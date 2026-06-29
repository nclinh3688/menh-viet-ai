"use server";

import { db } from "@/lib/db";
import {
  birthDateInputToIsoDate,
  normalizeBirthTimeInput,
} from "@/lib/validations/date-time";
import { profileFormSchema, type ProfileFormValues } from "@/lib/validations/profile";

type CreateProfileResult =
  | {
      ok: true;
      profileId: string;
    }
  | {
      ok: false;
      message: string;
      fieldErrors?: Partial<Record<keyof ProfileFormValues, string[]>>;
    };

export async function createProfileAction(
  values: ProfileFormValues,
): Promise<CreateProfileResult> {
  const parsed = profileFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      ok: false,
      message: "Thông tin chưa hợp lệ. Vui lòng kiểm tra lại form.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const profile = await db.profile.create({
    data: {
      userId: null,
      fullName: parsed.data.fullName,
      birthDate: new Date(birthDateInputToIsoDate(parsed.data.birthDate)),
      birthTime: normalizeOptionalTime(parsed.data.birthTime),
      gender: parsed.data.gender,
      birthPlace: parsed.data.birthPlace,
      calendarType: mapCalendarTypeToPrisma(parsed.data.calendarType),
      relationshipStatus: parsed.data.relationshipStatus,
      mainInterest: parsed.data.mainInterest,
    },
    select: {
      id: true,
    },
  });

  return {
    ok: true,
    profileId: profile.id,
  };
}

function mapCalendarTypeToPrisma(value: "lunar" | "solar") {
  return value === "solar" ? "SOLAR" : "LUNAR";
}

function normalizeOptionalTime(value: string | undefined) {
  const normalizedValue = normalizeBirthTimeInput(value ?? "");

  return normalizedValue.length > 0 ? normalizedValue : undefined;
}
