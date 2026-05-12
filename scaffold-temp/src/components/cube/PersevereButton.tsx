"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

const STEPS = [
  "opening route...",
  "checking clearance...",
  "binding operator...",
  "dossier unlocked.",
] as const;

export type PersevereHandle = {
  startLaunch: () => void;
};

type Props = {
  href: string;
  active: boolean;
  onPointerEnter: () => void;
  onFocusRow: () => void;
};

export const PersevereButton = forwardRef<PersevereHandle, Props>(
  function PersevereButton({ href, active, onPointerEnter, onFocusRow }, ref) {
    const router = useRouter();
    const [launching, setLaunching] = useState(false);
    const [step, setStep] = useState(0);
    const locked = useRef(false);
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mq.matches);
      const fn = () => setReducedMotion(mq.matches);
      mq.addEventListener("change", fn);
      return () => mq.removeEventListener("change", fn);
    }, []);

    const runLaunch = useCallback(async () => {
      if (locked.current) return;
      locked.current = true;
      setLaunching(true);
      const stepMs = reducedMotion ? 60 : 300;
      for (let s = 0; s < STEPS.length; s++) {
        setStep(s);
        await new Promise((r) => window.setTimeout(r, stepMs));
      }
      router.push(href);
    }, [href, router, reducedMotion]);

    useImperativeHandle(
      ref,
      () => ({
        startLaunch: () => {
          void runLaunch();
        },
      }),
      [runLaunch],
    );

    const label = launching
      ? (STEPS[step] ?? STEPS[STEPS.length - 1])
      : "persevere.";

    return (
      <button
        type="button"
        disabled={launching}
        onClick={() => void runLaunch()}
        onMouseEnter={onPointerEnter}
        onFocus={onFocusRow}
        data-launching={launching ? "true" : "false"}
        className={[
          "group relative w-full border px-3 py-2.5 text-left font-mono text-sm tracking-wide outline-none transition-[border-color,box-shadow,background-color,color] duration-200",
          "border-[#2d4a32] bg-[#070c09] text-[#6b9a72] shadow-[inset_0_0_0_1px_rgba(45,90,55,0.12)]",
          "hover:border-[#6b4f8a] hover:bg-[#100a14] hover:text-[#c9b8e8] hover:shadow-[0_0_14px_rgba(107,79,138,0.22),inset_0_0_0_1px_rgba(107,79,138,0.25)]",
          "focus-visible:ring-1 focus-visible:ring-[#8b5cf6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]",
          "disabled:cursor-wait disabled:opacity-95",
          active
            ? "border-[#8b5cf6] bg-[#120c18] text-[#d8ccf0] shadow-[inset_0_0_0_1px_rgba(139,92,246,0.2)]"
            : "",
          launching ? "cursor-wait border-[#4a3560] text-[#c9b8e8]" : "",
        ].join(" ")}
      >
        <span
          className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-150 group-data-[launching=true]:opacity-100"
          aria-hidden
        >
          <span className="home-persevere-sweep absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-transparent via-[rgba(139,92,246,0.22)] to-transparent" />
        </span>
        <span className="relative flex items-center gap-2">
          <span className="select-none text-[#4a5a48]">[</span>
          <span className="w-5 shrink-0 text-right text-[#5a5a5a] select-none">
            {active ? ">" : "·"}
          </span>
          <span
            className={
              launching
                ? "min-w-0 flex-1 tracking-wide"
                : "min-w-0 flex-1 tracking-wide motion-reduce:transform-none group-hover:animate-persevere-jitter"
            }
          >
            {label}
          </span>
          <span className="select-none text-[#4a5a48]">]</span>
          <span className="ml-auto font-mono text-[9px] uppercase tracking-wider text-[#4a5048] group-hover:text-[#6a5a78]">
            ROUTE
          </span>
        </span>
      </button>
    );
  },
);
