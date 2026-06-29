"use client";

import { useState } from "react";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { MVButton } from "@/components/form/mv-button";
import { MVDateInput } from "@/components/form/mv-date-input";
import { MVFormField } from "@/components/form/mv-form-field";
import { MVInput } from "@/components/form/mv-input";
import { analyzeNumerology } from "@/lib/numerology";
import type { NumerologyAnalysis } from "@/lib/numerology";
import { NumerologyResult } from "./numerology-result";

export function NumerologyForm() {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [analysis, setAnalysis] = useState<NumerologyAnalysis | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      setAnalysis(analyzeNumerology({ birthDate, fullName }));
    } catch (caughtError) {
      setAnalysis(null);
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Không thể phân tích dữ liệu vừa nhập.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-14">
      <div className="rounded-md border border-white/10 bg-card/78 p-5 shadow-2xl shadow-primary/10 backdrop-blur sm:p-6">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          <Sparkles className="size-4" />
          Thần số học cá nhân
        </div>
        <h1 className="text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
          Khám phá các con số nền tảng của bạn
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
          Nhập họ tên và ngày sinh để xem số chủ đạo, số thái độ, số linh hồn
          và số sứ mệnh theo bản phân tích MVP.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <MVFormField label="Họ tên">
            <MVInput
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Ví dụ: Nguyễn An Nhiên"
              value={fullName}
            />
          </MVFormField>

          <MVFormField label="Ngày sinh" hint="Nhập dạng ngày/tháng/năm">
            <MVDateInput
              onChange={(event) => setBirthDate(event.target.value)}
              value={birthDate}
            />
          </MVFormField>

          {error.length > 0 ? (
            <p className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </p>
          ) : null}

          <MVButton className="w-full sm:w-auto" disabled={isSubmitting} size="lg">
            {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
            Xem phân tích
            <ArrowRight className="size-4" />
          </MVButton>

          <p className="rounded-md border border-primary/20 bg-primary/8 px-4 py-3 text-sm leading-6 text-muted-foreground">
            Số linh hồn và số sứ mệnh đang xử lý tên tiếng Việt ở mức MVP bằng
            cách bỏ dấu và quy đổi chữ cái Latin.
          </p>
        </form>
      </div>

      <NumerologyResult analysis={analysis} />
    </section>
  );
}
