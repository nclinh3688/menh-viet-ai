import { cn } from "@/lib/utils";

interface MVFormFieldProps {
  children: React.ReactNode;
  error?: string;
  hint?: string;
  label: string;
}

export function MVFormField({ children, error, hint, label }: MVFormFieldProps) {
  return (
    <label className="grid gap-2 text-sm font-medium text-foreground">
      <span>{label}</span>
      {children}
      <span
        className={cn(
          "min-h-5 text-xs leading-5",
          error ? "text-destructive" : "text-muted-foreground/72",
        )}
      >
        {error ?? hint ?? ""}
      </span>
    </label>
  );
}
