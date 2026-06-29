import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { mvInputClassName } from "./mv-input";

export interface MVSelectOption {
  label: string;
  value: string;
}

export interface MVSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: readonly MVSelectOption[];
}

export const MVSelect = React.forwardRef<HTMLSelectElement, MVSelectProps>(
  ({ className, options, ...props }, ref) => {
    return (
      <span className="relative block">
        <select
          className={cn(
            mvInputClassName,
            "appearance-none bg-white/[0.06] pr-10 text-white [color-scheme:dark] [&:-webkit-autofill]:[-webkit-text-fill-color:white]",
            className,
          )}
          ref={ref}
          {...props}
        >
          {options.map((option) => (
            <option className="bg-background text-foreground" key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-primary" />
      </span>
    );
  },
);

MVSelect.displayName = "MVSelect";
