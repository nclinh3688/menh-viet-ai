"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarCheck, Loader2, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { MVButton } from "@/components/form/mv-button";
import { MVDateInput } from "@/components/form/mv-date-input";
import { MVFormField } from "@/components/form/mv-form-field";
import { MVSelect } from "@/components/form/mv-select";
import { analyzeGoodDay } from "@/lib/astrology/good-day";
import type { GoodDayAnalysis } from "@/lib/astrology/good-day";
import {
  goodDayFormSchema,
  goodDayPurposeOptions,
  type GoodDayFormValues,
} from "@/lib/validations/good-day";
import { GoodDayResult } from "./good-day-result";

const defaultValues: GoodDayFormValues = {
  date: "",
  purpose: "Công việc chung",
};

export function GoodDayForm() {
  const [result, setResult] = useState<GoodDayAnalysis | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<GoodDayFormValues>({
    defaultValues,
    resolver: zodResolver(goodDayFormSchema),
  });

  function onSubmit(values: GoodDayFormValues) {
    startTransition(() => {
      try {
        setResult(analyzeGoodDay(values));
      } catch (caughtError) {
        setResult(null);
        setError("root", {
          message:
            caughtError instanceof Error
              ? caughtError.message
              : "Không thể phân tích ngày vừa nhập.",
        });
      }
    });
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-14">
      <div className="rounded-md border bg-card/72 p-5 shadow-2xl shadow-primary/10 backdrop-blur-xl md:p-6">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          <CalendarCheck className="size-4" />
          Xem ngày đẹp MVP
        </div>
        <h1 className="text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
          Chọn ngày và mục đích cần xem
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Mệnh Việt AI sẽ chấm điểm ngày theo mô hình deterministic MVP, kèm giờ
          tốt, hướng tốt và lời khuyên thực tế để bạn tham khảo trước khi lên kế hoạch.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <MVFormField
            label="Ngày cần xem"
            error={errors.date?.message}
            hint="Nhập dạng ngày/tháng/năm"
          >
            <MVDateInput
              id="date"
              {...register("date")}
            />
          </MVFormField>

          <MVFormField label="Mục đích" error={errors.purpose?.message}>
            <MVSelect
              id="purpose"
              options={goodDayPurposeOptions}
              {...register("purpose")}
            />
          </MVFormField>

          {errors.root?.message ? (
            <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {errors.root.message}
            </p>
          ) : null}

          <MVButton className="w-full" disabled={isPending} size="lg" type="submit">
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Đang phân tích
              </>
            ) : (
              <>
                <Sparkles className="size-4" />
                Xem ngày đẹp
              </>
            )}
          </MVButton>
        </form>
      </div>

      <GoodDayResult result={result} />
    </section>
  );
}
