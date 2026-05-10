"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

const chrome =
  "group relative inline-flex border border-[#3f3f3f] bg-[#111] px-3 py-1.5 font-mono text-sm uppercase tracking-wider text-[#c4f0c9] shadow-[2px_2px_0_#000] transition-[transform,box-shadow,border-color] duration-75 hover:border-[#6b6b6b] hover:text-[#e8ffe8] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#8b5cf6]";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function TerminalButton({
  children,
  className = "",
  ...rest
}: Props) {
  return (
    <button
      type="button"
      className={[chrome, "disabled:cursor-not-allowed disabled:opacity-40", className].join(
        " ",
      )}
      {...rest}
    >
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(139,92,246,0.08),transparent)] opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="relative">{children}</span>
    </button>
  );
}

export function TerminalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={[chrome, className].join(" ")}>
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(139,92,246,0.08),transparent)] opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="relative">{children}</span>
    </Link>
  );
}
