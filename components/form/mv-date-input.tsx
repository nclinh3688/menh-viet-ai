"use client";

import * as React from "react";
import { MVInput, type MVInputProps } from "./mv-input";
import { normalizeBirthDateInput } from "@/lib/validations/date-time";

export const MVDateInput = React.forwardRef<HTMLInputElement, MVInputProps>(
  ({ onBlur, onChange, placeholder = "18/07/1995", ...props }, ref) => {
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const digits = event.currentTarget.value.replace(/\D/g, "");

      if (digits.length > 0 && digits.length <= 8) {
        event.currentTarget.value = formatPartialDate(digits);
      }

      onChange?.(event);
    }

    function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
      event.currentTarget.value = normalizeBirthDateInput(event.currentTarget.value);
      onBlur?.(event);
    }

    return (
      <MVInput
        {...props}
        inputMode="numeric"
        maxLength={10}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={placeholder}
        ref={ref}
        type="text"
      />
    );
  },
);

MVDateInput.displayName = "MVDateInput";

function formatPartialDate(digits: string) {
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
}
