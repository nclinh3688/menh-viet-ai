"use client";

import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Hash,
  Loader2,
  Sparkles,
} from "lucide-react";
import { MVButton } from "@/components/form/mv-button";
import { MVDateInput } from "@/components/form/mv-date-input";
import { MVFormField } from "@/components/form/mv-form-field";
import { MVInput } from "@/components/form/mv-input";
import { Reveal } from "@/components/motion/reveal";
import { analyzeFiveElements } from "@/lib/astrology/five-elements";
import type { FiveElementsAnalysis } from "@/lib/astrology/five-elements";
import { cn } from "@/lib/utils";
import { FiveElementsResult } from "./five-elements-result";

type InputMode = "year" | "date";

export function FiveElementsForm() {
  const [mode, setMode] = useState<InputMode>("year");
  const [birthYear, setBirthYear] = useState("1995");
  const [birthDate, setBirthDate] = useState("");
  const [analysis, setAnalysis] = useState<FiveElementsAnalysis | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = analyzeFiveElements(
        mode === "date" ? { birthDate } : { birthYear },
      );
      setAnalysis(result);
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
    <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-14">
      <Reveal className="premium-surface rounded-md border border-white/10 bg-card/78 p-5 shadow-2xl shadow-primary/10 backdrop-blur sm:p-6">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          <Sparkles className="size-4" />
          Phân tích Ngũ Hành cá nhân
        </div>
        <h1 className="text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
          Xem mệnh Ngũ Hành theo năm sinh
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
          Nhập năm sinh hoặc ngày sinh để xem hành bản mệnh, màu sắc, số hợp và
          các gợi ý phát triển cá nhân theo hệ quy chiếu Ngũ Hành.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-2 rounded-md border border-white/10 bg-background/60 p-1">
            <ModeButton
              icon={Hash}
              isActive={mode === "year"}
              label="Năm sinh"
              onClick={() => setMode("year")}
            />
            <ModeButton
              icon={CalendarDays}
              isActive={mode === "date"}
              label="Ngày sinh"
              onClick={() => setMode("date")}
            />
          </div>

          {mode === "year" ? (
            <MVFormField label="Năm sinh" hint="Ví dụ: 1995">
              <MVInput
                inputMode="numeric"
                max="2100"
                min="1900"
                onChange={(event) => setBirthYear(event.target.value)}
                placeholder="Ví dụ: 1995"
                value={birthYear}
              />
            </MVFormField>
          ) : (
            <MVFormField label="Ngày sinh" hint="Nhập dạng ngày/tháng/năm">
              <MVDateInput
                onChange={(event) => setBirthDate(event.target.value)}
                value={birthDate}
              />
            </MVFormField>
          )}

          {error.length > 0 ? (
            <p className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </p>
          ) : null}

          <MVButton className="w-full sm:w-auto" disabled={isSubmitting} size="lg">
            {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
            Phân tích Ngũ Hành
            <ArrowRight className="size-4" />
          </MVButton>
        </form>
      </Reveal>

      <FiveElementsResult analysis={analysis} />
    </section>
  );
}

function ModeButton({
  icon: Icon,
  isActive,
  label,
  onClick,
}: {
  icon: typeof Hash;
  isActive: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-md text-sm font-semibold transition",
        isActive
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/15"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
      onClick={onClick}
      type="button"
    >
      <Icon className="size-4" />
      {label}
    </button>
  );
}
