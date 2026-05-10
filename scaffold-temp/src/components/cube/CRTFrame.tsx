import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Outer chrome intensity */
  variant?: "dark" | "light";
};

export function CRTFrame({ children, className = "", variant = "dark" }: Props) {
  const border =
    variant === "dark"
      ? "border border-[#2a2a2a] shadow-[inset_0_0_40px_rgba(0,0,0,0.65)]"
      : "border border-[#bdbdbd] shadow-[inset_0_0_30px_rgba(0,0,0,0.08)]";
  return (
    <div
      className={`relative overflow-hidden rounded-sm bg-[#0a0a0a] text-[#dcdcdc] ${border} ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.07] mix-blend-overlay crt-noise" />
      <div className="pointer-events-none absolute inset-0 z-10 crt-scanlines opacity-35" />
      <div className="relative z-0 min-h-0">{children}</div>
    </div>
  );
}
