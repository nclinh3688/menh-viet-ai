import { ArrowDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WhyStep {
  description: string;
  label: string;
}

interface WhyCardProps {
  className?: string;
  steps: WhyStep[];
  title?: string;
}

export function WhyCard({
  className,
  steps,
  title = "Tại sao Mệnh Việt đưa ra kết luận này?",
}: WhyCardProps) {
  if (steps.length === 0) {
    return null;
  }

  return (
    <section
      className={cn(
        "rounded-lg border bg-card/64 p-5 backdrop-blur-xl",
        className,
      )}
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-md bg-primary/12 text-primary">
          <HelpCircle className="size-5" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      </div>

      <div className="grid gap-3">
        {steps.map((step, index) => (
          <div key={step.label}>
            <div className="rounded-md border border-white/10 bg-background/48 p-4 transition-colors duration-200 hover:border-primary/25">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {step.label}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </div>
            {index === steps.length - 1 ? null : (
              <div className="flex justify-center py-2 text-primary">
                <ArrowDown className="size-4" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
