"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { createProfileAction } from "@/app/onboarding/actions";
import { MVButton } from "@/components/form/mv-button";
import { MVCalendarTypeToggle } from "@/components/form/mv-calendar-type-toggle";
import { MVDateInput } from "@/components/form/mv-date-input";
import { MVFormField } from "@/components/form/mv-form-field";
import { MVInput } from "@/components/form/mv-input";
import { MVSelect } from "@/components/form/mv-select";
import { MVTimeInput } from "@/components/form/mv-time-input";
import {
  genderOptions,
  mainInterestOptions,
  profileFormSchema,
  relationshipStatusOptions,
  type ProfileFormValues,
} from "@/lib/validations/profile";

const defaultValues: ProfileFormValues = {
  fullName: "",
  birthDate: "",
  birthTime: undefined,
  gender: "MALE",
  birthPlace: undefined,
  calendarType: "SOLAR",
  relationshipStatus: "Độc thân",
  mainInterest: "Khám phá bản thân",
};

interface OnboardingFormProps {
  initialValues?: Partial<ProfileFormValues>;
}

export function OnboardingForm({ initialValues }: OnboardingFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      ...defaultValues,
      ...initialValues,
    },
  });

  function onSubmit(values: ProfileFormValues) {
    startTransition(async () => {
      const result = await createProfileAction(values);

      if (!result.ok) {
        setError("root", { message: result.message });

        if (result.fieldErrors) {
          for (const [field, messages] of Object.entries(result.fieldErrors)) {
            if (messages?.[0]) {
              setError(field as keyof ProfileFormValues, {
                message: messages[0],
              });
            }
          }
        }

        return;
      }

      router.push(`/dashboard?profileId=${result.profileId}`);
    });
  }

  return (
    <form
      className="rounded-lg border bg-card/70 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-7"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid gap-5">
        <MVFormField
          label="Tên của bạn"
          error={errors.fullName?.message}
          hint="Không bắt buộc"
        >
          <MVInput
            id="fullName"
            placeholder="Ví dụ: Nguyễn An"
            {...register("fullName")}
          />
        </MVFormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <MVFormField
            label="Ngày sinh"
            error={errors.birthDate?.message}
            hint="Nhập dạng ngày/tháng/năm"
          >
            <MVDateInput
              id="birthDate"
              {...register("birthDate")}
            />
          </MVFormField>

          <MVFormField
            label="Giờ sinh"
            error={errors.birthTime?.message}
            hint="Không bắt buộc"
          >
            <MVTimeInput
              id="birthTime"
              {...register("birthTime")}
            />
          </MVFormField>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <MVFormField label="Giới tính" error={errors.gender?.message}>
            <MVSelect id="gender" options={genderOptions} {...register("gender")} />
          </MVFormField>

          <MVFormField label="Loại lịch" error={errors.calendarType?.message}>
            <MVCalendarTypeToggle
              value={initialValues?.calendarType ?? defaultValues.calendarType}
              {...register("calendarType")}
            />
          </MVFormField>
        </div>

        <MVFormField
          label="Nơi sinh optional"
          error={errors.birthPlace?.message}
        >
          <MVInput
            id="birthPlace"
            placeholder="Ví dụ: Hà Nội"
            {...register("birthPlace")}
          />
        </MVFormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <MVFormField
            label="Tình trạng"
            error={errors.relationshipStatus?.message}
          >
            <MVSelect
              id="relationshipStatus"
              options={relationshipStatusOptions.map((option) => ({
                label: option,
                value: option,
              }))}
              {...register("relationshipStatus")}
            />
          </MVFormField>

          <MVFormField
            label="Mối quan tâm chính"
            error={errors.mainInterest?.message}
          >
            <MVSelect
              id="mainInterest"
              options={mainInterestOptions.map((option) => ({
                label: option,
                value: option,
              }))}
              {...register("mainInterest")}
            />
          </MVFormField>
        </div>

        {errors.root?.message ? (
          <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {errors.root.message}
          </p>
        ) : null}

        <MVButton className="mt-1 w-full" disabled={isPending} size="lg" type="submit">
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Đang lưu hồ sơ
            </>
          ) : (
            "Lưu hồ sơ và tiếp tục"
          )}
        </MVButton>
      </div>
    </form>
  );
}
