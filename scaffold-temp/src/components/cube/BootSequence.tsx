"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TerminalButton } from "./TerminalButton";

type Props = {
  username: string;
};

const DEFAULT_LINES = [
  'checking integrity of system components...',
  "checking security protocols...",
  "bypassing security protocol IE-256FA...",
  "decrypting O-Systems protocol...",
  "requesting permission from [REDACTED]...",
  "permission granted.",
];

export function BootSequence({ username }: Props) {
  const router = useRouter();
  const lines = useMemo(
    () => [...DEFAULT_LINES, `welcome to the system, ${username}.`],
    [username],
  );
  const [logIndex, setLogIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [bar, setBar] = useState(0);
  const [done, setDone] = useState(false);

  const skip = useCallback(() => {
    router.replace("/home");
  }, [router]);

  useEffect(() => {
    if (done) return;
    const full = lines[logIndex] ?? "";
    if (typed.length < full.length) {
      const t = window.setTimeout(() => {
        setTyped(full.slice(0, typed.length + 1));
      }, 28 + Math.random() * 40);
      return () => window.clearTimeout(t);
    }
    if (logIndex < lines.length - 1) {
      const t = window.setTimeout(() => {
        setLogIndex((i) => i + 1);
        setTyped("");
      }, 220);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => {
      setDone(true);
      setBar(100);
    }, 400);
    return () => window.clearTimeout(t);
  }, [typed, logIndex, lines, done]);

  useEffect(() => {
    if (done) {
      const t = window.setTimeout(() => router.replace("/home"), 900);
      return () => window.clearTimeout(t);
    }
  }, [done, router]);

  useEffect(() => {
    const target = Math.min(100, ((logIndex + (typed.length > 0 ? 0.4 : 0)) / lines.length) * 100);
    setBar((b) => Math.max(b, Math.floor(target)));
  }, [logIndex, typed.length, lines.length]);

  return (
    <div className="font-mono text-sm text-[#9dffb8]">
      <pre className="whitespace-pre-wrap min-h-[10rem] leading-relaxed">
        {lines.slice(0, logIndex).map((l, i) => (
          <span key={`${i}-${l.slice(0, 24)}`}>
            {`> ${l}\n`}
          </span>
        ))}
        {lines[logIndex] ? (
          <span>
            {`> ${typed}`}
            <span className="animate-pulse text-[#c9a0ff]">▌</span>
          </span>
        ) : null}
      </pre>
      <div className="mt-6 h-3 w-full max-w-md border border-[#1f3d28] bg-[#050805]">
        <div
          className="h-full bg-[#2d6a3e] transition-[width] duration-300 ease-out"
          style={{ width: `${bar}%` }}
        />
      </div>
      <p className="mt-2 text-[10px] uppercase tracking-widest text-[#5a7a62]">
        system_load // {bar}%
      </p>
      <div className="mt-8 flex items-center gap-4">
        <TerminalButton
          type="button"
          onClick={skip}
          className="text-[10px] normal-case tracking-normal text-[#6a8a72] border-[#2a3d30]"
        >
          skip (dev)
        </TerminalButton>
      </div>
    </div>
  );
}
