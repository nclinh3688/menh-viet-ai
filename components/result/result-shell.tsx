import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function ResultShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={cn("space-y-4", className)}>
      {children}
    </Reveal>
  );
}
