"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type MVCalendarTypeValue = "lunar" | "solar";

interface MVCalendarTypeToggleProps {
  className?: string;
  disabled?: boolean;
  name?: string;
  onBlur?: () => void;
  onChange?: (value: MVCalendarTypeValue) => void;
  value?: MVCalendarTypeValue;
}

const options = [
  { icon: "☀", label: "Dương lịch", value: "solar" },
  { icon: "☾", label: "Âm lịch", value: "lunar" },
] as const;

export function MVCalendarTypeToggle({
  className,
  disabled = false,
  name,
  onBlur,
  onChange,
  value,
}: MVCalendarTypeToggleProps) {
  const [internalValue, setInternalValue] =
    React.useState<MVCalendarTypeValue>("solar");
  const selectedValue = value ?? internalValue;

  function handleSelect(nextValue: MVCalendarTypeValue) {
    if (disabled) {
      return;
    }

    if (value == null) {
      setInternalValue(nextValue);
    }

    onChange?.(nextValue);
  }

  return (
    <div
      aria-label="Loại lịch"
      className={cn(
        "grid grid-cols-2 gap-1 rounded-xl border border-white/[0.12] bg-white/[0.06] p-1",
        className,
      )}
      role="radiogroup"
    >
      {name == null ? null : <input name={name} type="hidden" value={selectedValue} />}
      {options.map((option) => (
        <button
          aria-checked={selectedValue === option.value}
          className={cn(
            "relative flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg text-sm font-semibold text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60",
            selectedValue === option.value && "bg-primary text-primary-foreground",
          )}
          disabled={disabled}
          key={option.value}
          onBlur={onBlur}
          onClick={() => handleSelect(option.value)}
          role="radio"
          type="button"
        >
          <span>{option.icon}</span>
          {option.label}
        </button>
      ))}
    </div>
  );
}
