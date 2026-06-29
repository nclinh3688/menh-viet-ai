"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface AnimatedProgressProps {
  className?: string;
  value: number;
}

export function AnimatedProgress({ className, value }: AnimatedProgressProps) {
  const percent = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("h-full rounded-full bg-primary motion-progress", className)}>
      <span style={{ "--progress-value": `${percent}%` } as CSSProperties} />
    </div>
  );
}
