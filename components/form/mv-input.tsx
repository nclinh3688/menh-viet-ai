import * as React from "react";
import { cn } from "@/lib/utils";

export const mvInputClassName =
  "h-11 w-full rounded-xl border border-white/[0.12] bg-white/[0.06] px-3 text-sm text-white outline-none transition placeholder:text-white/[0.42] focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60";

export type MVInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const MVInput = React.forwardRef<HTMLInputElement, MVInputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        className={cn(mvInputClassName, className)}
        ref={ref}
        type={type}
        {...props}
      />
    );
  },
);

MVInput.displayName = "MVInput";
