import { useEffect, useState } from "react";
import { useInView, useReducedMotion } from "@/lib/hooks";

/** Draws a thin copper line left-to-right when scrolled into view, once. */
export function LedgerLine({ className = "", width = "100%" }: { className?: string; width?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const rm = useReducedMotion();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        height: 1,
        background: "var(--copper-ledger)",
        width,
        transformOrigin: "left center",
        transform: inView || rm ? "scaleX(1)" : "scaleX(0)",
        transition: "transform 900ms cubic-bezier(0.2,0.7,0.2,1)",
      }}
      aria-hidden="true"
    />
  );
}

/** Counts up a number once when first scrolled into view. */
export function CountUp({
  to,
  duration = 1400,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const rm = useReducedMotion();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (rm) {
      setVal(to);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, rm, to, duration]);
  const formatted = val.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return (
    <span ref={ref} className={`font-mono ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
