"use client";

import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  duration?: number;
  value: number;
}

export function AnimatedNumber({ duration = 700, value }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const shouldReduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frameId = 0;

    if (shouldReduceMotion) {
      frameId = requestAnimationFrame(() => setDisplayValue(value));
      return () => cancelAnimationFrame(frameId);
    }

    const startedAt = performance.now();

    function tick(now: number) {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    }

    frameId = requestAnimationFrame((now) => {
      setDisplayValue(0);
      tick(now);
    });

    return () => cancelAnimationFrame(frameId);
  }, [duration, value]);

  return <>{displayValue}</>;
}
