import type { ComponentType, ReactNode } from "react";
import { Link as LinkIcon } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

interface ReportSectionProps {
  children: ReactNode;
  className?: string;
  description?: string;
  icon: ComponentType<{ className?: string }>;
  id: string;
  title: string;
}

export function ReportSection({
  children,
  className,
  description,
  icon: Icon,
  id,
  title,
}: ReportSectionProps) {
  return (
    <Reveal
      as="section"
      className={cn(
        "premium-surface scroll-mt-24 rounded-lg border bg-card/68 p-5 backdrop-blur-xl md:p-6",
        className,
      )}
    >
      <div className="mb-5 flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/12 text-primary">
          <Icon className="size-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            <a
              aria-label={`Cuộn tới ${title}`}
              className="rounded-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              href={`#${id}`}
              id={id}
            >
              <LinkIcon className="size-3.5" />
            </a>
          </div>
          {description == null ? null : (
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>
      {children}
    </Reveal>
  );
}
