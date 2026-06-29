import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  as?: "div" | "section" | "article";
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({
  as: Component = "div",
  children,
  className,
  delay = 0,
}: RevealProps) {
  return (
    <Component
      className={cn("motion-reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Component>
  );
}
