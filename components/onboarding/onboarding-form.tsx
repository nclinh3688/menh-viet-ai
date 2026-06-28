"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { createProfileAction } from "@/app/onboarding/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  calendarTypeOptions,
  genderOptions,
  mainInterestOptions,
  profileFormSchema,
  relationshipStatusOptions,
  type ProfileFormValues,
} from "@/lib/validations/profile";

const fieldClassName =
  "h-11 rounded-md border bg-background/68 px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/72 focus:border-primary focus:ring-2 focus:ring-primary/20";

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

export function OnboardingForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
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
        <FormField id="fullName" label="Họ tên" error={errors.fullName?.message}>
          <input
            className={fieldClassName}
            id="fullName"
            placeholder="Ví dụ: Nguyễn An"
            {...register("fullName")}
          />
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="birthDate"
            label="Ngày sinh dương lịch"
            error={errors.birthDate?.message}
          >
            <input
              className={fieldClassName}
              id="birthDate"
              type="date"
              {...register("birthDate")}
            />
          </FormField>

          <FormField
            id="birthTime"
            label="Giờ sinh optional"
            error={errors.birthTime?.message}
          >
            <input
              className={fieldClassName}
              id="birthTime"
              type="time"
              {...register("birthTime")}
            />
          </FormField>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField id="gender" label="Giới tính" error={errors.gender?.message}>
            <select className={fieldClassName} id="gender" {...register("gender")}>
              {genderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField
            id="calendarType"
            label="Loại lịch"
            error={errors.calendarType?.message}
          >
            <select
              className={fieldClassName}
              id="calendarType"
              {...register("calendarType")}
            >
              {calendarTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <FormField
          id="birthPlace"
          label="Nơi sinh optional"
          error={errors.birthPlace?.message}
        >
          <input
            className={fieldClassName}
            id="birthPlace"
            placeholder="Ví dụ: Hà Nội"
            {...register("birthPlace")}
          />
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="relationshipStatus"
            label="Tình trạng"
            error={errors.relationshipStatus?.message}
          >
            <select
              className={fieldClassName}
              id="relationshipStatus"
              {...register("relationshipStatus")}
            >
              {relationshipStatusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>

          <FormField
            id="mainInterest"
            label="Mối quan tâm chính"
            error={errors.mainInterest?.message}
          >
            <select
              className={fieldClassName}
              id="mainInterest"
              {...register("mainInterest")}
            >
              {mainInterestOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        {errors.root?.message ? (
          <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {errors.root.message}
          </p>
        ) : null}

        <Button className="mt-1 w-full" disabled={isPending} size="lg" type="submit">
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Đang lưu hồ sơ
            </>
          ) : (
            "Lưu hồ sơ và tiếp tục"
          )}
        </Button>
      </div>
    </form>
  );
}

interface FormFieldProps {
  children: React.ReactNode;
  error?: string;
  id: string;
  label: string;
}

function FormField({ children, error, id, label }: FormFieldProps) {
  return (
    <div className="grid gap-2 text-sm font-medium text-foreground">
      <label htmlFor={id}>{label}</label>
      {children}
      <span
        className={cn(
          "min-h-5 text-xs leading-5",
          error ? "text-destructive" : "text-muted-foreground/0",
        )}
      >
        {error ?? "Không có lỗi"}
      </span>
    </div>
  );
}
