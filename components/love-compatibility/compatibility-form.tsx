"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeartHandshake, Loader2, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { analyzeCompatibility } from "@/lib/astrology/compatibility";
import type { CompatibilityResult } from "@/lib/astrology/compatibility";
import { cn } from "@/lib/utils";
import {
  compatibilityCalendarTypeOptions,
  compatibilityFormSchema,
  type CompatibilityFormValues,
} from "@/lib/validations/compatibility";
import { CompatibilityResultCard } from "./compatibility-result-card";

const fieldClassName =
  "h-11 rounded-md border bg-background/68 px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/72 focus:border-primary focus:ring-2 focus:ring-primary/20";

const defaultValues: CompatibilityFormValues = {
  female: {
    birthDate: "",
    birthTime: undefined,
    calendarType: "SOLAR",
    fullName: undefined,
  },
  male: {
    birthDate: "",
    birthTime: undefined,
    calendarType: "SOLAR",
    fullName: undefined,
  },
};

export function CompatibilityForm() {
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<CompatibilityFormValues>({
    defaultValues,
    resolver: zodResolver(compatibilityFormSchema),
  });

  function onSubmit(values: CompatibilityFormValues) {
    startTransition(() => {
      try {
        setResult(analyzeCompatibility(values));
      } catch (caughtError) {
        setResult(null);
        setError("root", {
          message:
            caughtError instanceof Error
              ? caughtError.message
              : "Không thể phân tích dữ liệu vừa nhập.",
        });
      }
    });
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-14">
      <div className="rounded-md border bg-card/72 p-5 shadow-2xl shadow-primary/10 backdrop-blur-xl md:p-6">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          <HeartHandshake className="size-4" />
          Hợp tuổi hôn nhân MVP
        </div>
        <h1 className="text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
          Xem mức độ hòa hợp của hai người
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Nhập ngày sinh của hai người để phân tích Cung Phi, Địa Chi, Ngũ Hành,
          Thiên Can và một số yếu tố bổ sung theo hệ quy chiếu tham khảo.
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <PersonFields
            errors={{
              birthDate: errors.male?.birthDate?.message,
              birthTime: errors.male?.birthTime?.message,
              calendarType: errors.male?.calendarType?.message,
              fullName: errors.male?.fullName?.message,
            }}
            prefix="male"
            register={register}
            title="Thông tin nam"
          />

          <PersonFields
            errors={{
              birthDate: errors.female?.birthDate?.message,
              birthTime: errors.female?.birthTime?.message,
              calendarType: errors.female?.calendarType?.message,
              fullName: errors.female?.fullName?.message,
            }}
            prefix="female"
            register={register}
            title="Thông tin nữ"
          />

          {errors.root?.message ? (
            <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {errors.root.message}
            </p>
          ) : null}

          <Button className="w-full" disabled={isPending} size="lg" type="submit">
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Đang phân tích
              </>
            ) : (
              <>
                <Sparkles className="size-4" />
                Xem hợp tuổi
              </>
            )}
          </Button>
        </form>
      </div>

      <CompatibilityResultCard result={result} />
    </section>
  );
}

function PersonFields({
  errors,
  prefix,
  register,
  title,
}: {
  errors: Partial<Record<"birthDate" | "birthTime" | "calendarType" | "fullName", string>>;
  prefix: "female" | "male";
  register: ReturnType<typeof useForm<CompatibilityFormValues>>["register"];
  title: string;
}) {
  return (
    <fieldset className="rounded-md border border-white/10 bg-background/35 p-4">
      <legend className="px-2 text-sm font-semibold text-primary">{title}</legend>
      <div className="mt-3 grid gap-4">
        <FormField
          id={`${prefix}.fullName`}
          label="Họ tên optional"
          error={errors.fullName}
        >
          <input
            className={fieldClassName}
            id={`${prefix}.fullName`}
            placeholder={prefix === "male" ? "Ví dụ: Nguyễn An" : "Ví dụ: Trần Bình"}
            {...register(`${prefix}.fullName`)}
          />
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            id={`${prefix}.birthDate`}
            label="Ngày sinh"
            error={errors.birthDate}
          >
            <input
              className={fieldClassName}
              id={`${prefix}.birthDate`}
              type="date"
              {...register(`${prefix}.birthDate`)}
            />
          </FormField>

          <FormField
            id={`${prefix}.birthTime`}
            label="Giờ sinh optional"
            error={errors.birthTime}
          >
            <input
              className={fieldClassName}
              id={`${prefix}.birthTime`}
              type="time"
              {...register(`${prefix}.birthTime`)}
            />
          </FormField>
        </div>

        <FormField
          id={`${prefix}.calendarType`}
          label="Loại lịch"
          error={errors.calendarType}
        >
          <select
            className={fieldClassName}
            id={`${prefix}.calendarType`}
            {...register(`${prefix}.calendarType`)}
          >
            {compatibilityCalendarTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>
      </div>
    </fieldset>
  );
}

function FormField({
  children,
  error,
  id,
  label,
}: {
  children: React.ReactNode;
  error?: string;
  id: string;
  label: string;
}) {
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
