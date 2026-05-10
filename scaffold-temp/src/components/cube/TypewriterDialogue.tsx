"use client";

import { useEffect, useRef, useState } from "react";
import { TerminalLink } from "./TerminalButton";

type Props = {
  text: string;
  /** ms per character */
  speedMs?: number;
  onComplete?: () => void;
};

export function TypewriterDialogue({
  text,
  speedMs = 42,
  onComplete,
}: Props) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);
  const fired = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (shown.length >= text.length) {
      if (!fired.current) {
        fired.current = true;
        setDone(true);
        onCompleteRef.current?.();
      }
      return;
    }
    const t = window.setTimeout(() => {
      setShown(text.slice(0, shown.length + 1));
    }, speedMs);
    return () => window.clearTimeout(t);
  }, [shown, text, speedMs]);

  return (
    <div className="font-mono text-sm text-[#c9a0ff]">
      <div
        className="border border-[#3d2a55] bg-[#0c0810] p-4 shadow-[inset_0_0_20px_rgba(139,92,246,0.06)]"
        role="status"
        aria-live="polite"
      >
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#6b4f8a] mb-2">
          ouv // direct line
        </p>
        <p className="leading-relaxed whitespace-pre-wrap">
          {shown}
          {!done ? (
            <span className="ml-0.5 inline-block animate-pulse text-[#e8e0ff]">
              ▌
            </span>
          ) : null}
        </p>
      </div>
      {done ? (
        <div className="mt-6">
          <TerminalLink
            href="/home"
            className="normal-case tracking-normal text-[#dcb8ff] border-[#5a3d72]"
          >
            persevere.
          </TerminalLink>
        </div>
      ) : null}
    </div>
  );
}
