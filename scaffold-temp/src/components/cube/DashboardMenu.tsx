"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type DashboardMenuItem = {
  id: string;
  label: string;
  href: string;
};

type Props = {
  items: DashboardMenuItem[];
};

export function DashboardMenu({ items }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState(0);

  const clamp = useCallback(
    (i: number) => Math.max(0, Math.min(items.length - 1, i)),
    [items.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => clamp(s + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => clamp(s - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const href = items[selected]?.href;
        if (href) router.push(href);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [clamp, items, selected, router]);

  return (
    <nav
      className="font-mono text-sm"
      aria-label="Main console menu"
    >
      <ul className="flex flex-col gap-1">
        {items.map((it, i) => {
          const active = i === selected;
          return (
            <li key={it.id}>
              <Link
                href={it.href}
                className={[
                  "flex items-center gap-3 border px-3 py-2 transition-colors",
                  active
                    ? "border-[#8b5cf6] bg-[#141018] text-[#e8e0ff]"
                    : "border-[#333] bg-[#0c0c0c] text-[#bdbdbd] hover:border-[#555] hover:bg-[#101010]",
                ].join(" ")}
                onMouseEnter={() => setSelected(i)}
                onFocus={() => setSelected(i)}
              >
                <span className="text-[#5a5a5a] w-6 text-right select-none">
                  {active ? ">" : " "}
                </span>
                <span className="tracking-wide">{it.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-[10px] uppercase tracking-widest text-[#5a5a5a]">
        ↑↓ navigate · enter run
      </p>
    </nav>
  );
}
