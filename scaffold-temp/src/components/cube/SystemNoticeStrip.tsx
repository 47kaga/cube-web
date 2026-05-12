"use client";

import { useEffect, useState } from "react";

const NOTICES = [
  "notice: archival route restored",
  "warning: operator memory index incomplete",
  "transmission queue: 01 pending",
  "cube gateway: unresolved",
  "permission chain: partially inherited",
] as const;

export function SystemNoticeStrip() {
  const [i, setI] = useState(0);
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    const t = window.setInterval(() => {
      setI((n) => (n + 1) % NOTICES.length);
    }, 4800);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    const t = window.setInterval(() => {
      setFlicker((f) => !f);
    }, 700);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div
      className="border border-[#2f2a28] bg-[#0a0808] px-3 py-1.5 font-mono text-[10px] text-[#8a7a72] shadow-[inset_0_0_20px_rgba(0,0,0,0.4)]"
      aria-live="polite"
    >
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
        <span className="shrink-0 text-[#5a4a48]">SYS_NOTICES</span>
        <span className="text-[#3a3530]">::</span>
        <span
          className={
            flicker ? "text-[#9a9088] opacity-90" : "text-[#7a7068] opacity-100"
          }
        >
          {NOTICES[i]}
        </span>
      </div>
    </div>
  );
}
