"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TerminalButton } from "./TerminalButton";
import { TerminalLink } from "./TerminalButton";

export function SubmissionBox() {
  const router = useRouter();
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(false);
    try {
      const res = await fetch("/api/act/1/episode/1/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer }),
      });
      const data = (await res.json()) as { ok?: boolean; redirect?: string };
      if (res.ok && data.redirect) {
        router.push(data.redirect);
        return;
      }
      setError(true);
      setFlash(
        "FALSE ANSWER SUBMITTED. INITIALIZING ANTI-PROPHET PROTOCOL-C.",
      );
      window.setTimeout(() => {
        router.replace("/home");
      }, 1800);
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative max-w-lg border border-[#333] bg-[#0a0a0a] p-6 font-mono text-sm"
    >
      {flash ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center border border-[#7f1d1d] bg-[#1a0505]/95 p-4 text-center text-xs uppercase tracking-wide text-[#fecaca] animate-pulse">
          {flash}
        </div>
      ) : null}
      <label className="block text-[11px] uppercase tracking-widest text-[#6a6a6a] mb-2">
        Final passphrase
      </label>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows={4}
        className={[
          "w-full resize-y border border-[#2a2a2a] bg-[#050505] p-3 text-[#dcdcdc]",
          "caret-[#7ddf9a] shadow-[inset_0_0_0_1px_rgba(125,223,154,0.08)]",
          "focus:border-[#8b5cf6] focus:outline-none focus:ring-1 focus:ring-[#8b5cf6]/40",
          "placeholder:text-[#444]",
          error ? "animate-[cube-shake_0.35s_ease-in-out]" : "",
        ].join(" ")}
        placeholder="type response..."
        autoComplete="off"
        spellCheck={false}
      />
      {error ? (
        <p className="mt-2 text-xs uppercase tracking-wide text-[#b91c1c]">
          signal rejected
        </p>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-3">
        <TerminalButton type="submit" disabled={busy}>
          {busy ? "transmitting…" : "submit"}
        </TerminalButton>
        <TerminalLink
          href="/act/1/episode/1"
          className="normal-case tracking-normal text-[#aaa] border-[#444]"
        >
          Back to dossier
        </TerminalLink>
      </div>
    </form>
  );
}
