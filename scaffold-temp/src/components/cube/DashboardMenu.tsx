"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PersevereButton, type PersevereHandle } from "./PersevereButton";

type Props = {
  missionHref: string;
};

export function DashboardMenu({ missionHref }: Props) {
  const router = useRouter();
  const persevereRef = useRef<PersevereHandle>(null);
  const [selected, setSelected] = useState(0);

  const clamp = useCallback((i: number) => Math.max(0, Math.min(1, i)), []);

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
        if (selected === 0) persevereRef.current?.startLaunch();
        else router.push(missionHref);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [clamp, missionHref, router, selected]);

  return (
    <nav className="font-mono text-sm" aria-label="Main console menu">
      <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.35em] text-[#4a4a4a]">
        TRANSMISSION ACCESS
      </p>
      <ul className="flex flex-col gap-1">
        <li>
          <PersevereButton
            ref={persevereRef}
            href={missionHref}
            active={selected === 0}
            onPointerEnter={() => setSelected(0)}
            onFocusRow={() => setSelected(0)}
          />
        </li>
        <li>
          <Link
            href={missionHref}
            className={[
              "flex items-center gap-2 border px-3 py-2 font-mono text-sm transition-[border-color,background-color,color] duration-150",
              selected === 1
                ? "border-[#8b5cf6] bg-[#141018] text-[#e8e0ff] shadow-[inset_0_0_0_1px_rgba(139,92,246,0.12)]"
                : "border-[#333] bg-[#0c0c0c] text-[#bdbdbd] hover:border-[#4a4a4a] hover:bg-[#0e0e0e]",
            ].join(" ")}
            onMouseEnter={() => setSelected(1)}
            onFocus={() => setSelected(1)}
          >
            <span className="select-none text-[#4a4a4a]">[</span>
            <span className="w-5 shrink-0 text-right text-[#5a5a5a] select-none">
              {selected === 1 ? ">" : "·"}
            </span>
            <span className="min-w-0 flex-1 tracking-wide">
              DOSSIER // ACT 1 · EP 1
            </span>
            <span className="shrink-0 font-mono text-[9px] uppercase tracking-wider text-[#4a5048]">
              EP01
            </span>
            <span className="select-none text-[#4a4a4a]">]</span>
          </Link>
        </li>
      </ul>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-[#4a4a4a]">
        ↑↓ navigate · enter run
      </p>
    </nav>
  );
}
