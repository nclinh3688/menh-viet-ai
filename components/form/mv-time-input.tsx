"use client";

import * as React from "react";
import { MVInput, type MVInputProps } from "./mv-input";
import { normalizeBirthTimeInput } from "@/lib/validations/date-time";

export const MVTimeInput = React.forwardRef<HTMLInputElement, MVInputProps>(
  ({ onBlur, placeholder = "04:20", ...props }, ref) => {
    function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
      event.currentTarget.value = normalizeBirthTimeInput(event.currentTarget.value);
      onBlur?.(event);
    }

    return (
      <MVInput
        {...props}
        inputMode="numeric"
        maxLength={5}
        onBlur={handleBlur}
        placeholder={placeholder}
        ref={ref}
        type="text"
      />
    );
  },
);

MVTimeInput.displayName = "MVTimeInput";
