import { useEffect, useRef, useState } from "react";
import { cn, formatZloty } from "@/lib/utils";

type AnimatedPriceProps = {
  value: number;
  className?: string;
};

export function AnimatedPrice({ value, className }: AnimatedPriceProps) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setDisplay(value);
      fromRef.current = value;
      return;
    }
    const from = fromRef.current;
    const delta = value - from;
    if (delta === 0) {
      setDisplay(value);
      return;
    }
    const duration = 520;
    let start: number | null = null;
    let frame = 0;
    const tick = (now: number) => {
      if (start === null) start = now;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setDisplay(Math.round(from + delta * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
      else fromRef.current = value;
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <span className={cn("tabular-nums", className)}>{formatZloty(display)}</span>;
}

export function AnimatedRange({ low, high, className }: { low: number; high: number; className?: string }) {
  return (
    <span className={cn("inline-flex flex-wrap items-baseline gap-x-2", className)}>
      <AnimatedPrice value={low} />
      <span aria-hidden="true">–</span>
      <AnimatedPrice value={high} />
    </span>
  );
}
