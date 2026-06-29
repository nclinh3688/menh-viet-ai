import * as React from "react";
import { cn } from "@/lib/utils";

interface MVCalendarTypeToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value"> {
  value?: "lunar" | "solar";
}

const options = [
  { icon: "☀", label: "Dương lịch", value: "solar" },
  { icon: "☾", label: "Âm lịch", value: "lunar" },
] as const;

export const MVCalendarTypeToggle = React.forwardRef<
  HTMLInputElement,
  MVCalendarTypeToggleProps
>(({ className, name, value, ...props }, ref) => {
  return (
    <div className={cn("grid grid-cols-2 gap-1 rounded-xl border border-white/[0.12] bg-white/[0.06] p-1", className)}>
      {options.map((option, index) => (
        <label
          className="relative flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg text-sm font-semibold text-muted-foreground transition-colors has-[:checked]:bg-primary has-[:checked]:text-primary-foreground"
          key={option.value}
        >
          <input
            className="sr-only"
            defaultChecked={value == null ? option.value === "solar" : value === option.value}
            name={name}
            ref={index === 0 ? ref : undefined}
            type="radio"
            value={option.value}
            {...props}
          />
          <span>{option.icon}</span>
          {option.label}
        </label>
      ))}
    </div>
  );
});

MVCalendarTypeToggle.displayName = "MVCalendarTypeToggle";
