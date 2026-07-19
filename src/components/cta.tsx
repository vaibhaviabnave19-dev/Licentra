import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

type Props = {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
};

/** Copper solid CTA. Reserved for "Start Free" and "Talk to Sales". */
export function CTA({
  to,
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
  type,
  ariaLabel,
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 h-11 px-6 text-[15px] font-medium tracking-tight rounded-[3px] transition-[transform,box-shadow,background-color] duration-150 will-change-transform";
  const styles =
    variant === "primary"
      ? "bg-copper text-graphite hover:bg-soft-copper active:translate-y-[1px] shadow-[0_1px_0_rgba(0,0,0,0.4),0_6px_16px_-8px_rgba(200,125,74,0.5)]"
      : "border border-ash text-bone hover:border-copper hover:text-copper";
  const cls = `${base} ${styles} ${className}`;
  if (to) {
    return (
      <Link to={to} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
