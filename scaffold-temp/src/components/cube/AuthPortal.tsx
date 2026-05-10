"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GlitchCubeTitle } from "./GlitchCubeTitle";
import { CRTFrame } from "./CRTFrame";
import { TerminalButton } from "./TerminalButton";

type Mode = "login" | "signup";

export function AuthPortal() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const path = mode === "login" ? "/api/auth/login" : "/api/auth/signup";
    try {
      const res = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Request failed");
        setBusy(false);
        return;
      }
      router.replace("/boot");
      router.refresh();
    } catch {
      setError("Network error");
      setBusy(false);
    }
  }

  const inputClass =
    "w-full border border-[#2a2a2a] bg-[#080808] px-3 py-2 font-mono text-sm text-[#eaeaea] caret-[#7ddf9a] shadow-[inset_0_0_0_1px_rgba(125,223,154,0.06)] placeholder:text-[#444] focus:border-[#8b5cf6] focus:outline-none focus:ring-1 focus:ring-[#8b5cf6]/35";

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-[#f2f2f2] dark:bg-[#050505] px-4 py-12">
      <div className="w-full max-w-md">
        <CRTFrame className="p-6 md:p-8">
          <h1 className="font-mono text-center text-sm md:text-base tracking-wide text-[#bdbdbd] mb-8">
            the{" "}
            <span className="inline-block align-middle px-1">
              [<GlitchCubeTitle />]
            </span>{" "}
            welcomes you
          </h1>

          <div className="flex gap-2 mb-6 font-mono text-[11px] uppercase tracking-widest">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError(null);
              }}
              className={`flex-1 border py-2 transition-colors ${
                mode === "login"
                  ? "border-[#8b5cf6] bg-[#140f1a] text-[#e8e0ff]"
                  : "border-[#333] bg-transparent text-[#777] hover:border-[#555]"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setError(null);
              }}
              className={`flex-1 border py-2 transition-colors ${
                mode === "signup"
                  ? "border-[#8b5cf6] bg-[#140f1a] text-[#e8e0ff]"
                  : "border-[#333] bg-transparent text-[#777] hover:border-[#555]"
              }`}
            >
              Sign up
            </button>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#6a6a6a] mb-1">
                Username
              </label>
              <input
                name="username"
                autoComplete="username"
                className={inputClass}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#6a6a6a] mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                className={inputClass}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error ? (
              <p className="text-xs font-mono text-[#f87171]">{error}</p>
            ) : null}
            <TerminalButton
              type="submit"
              disabled={busy}
              className="w-full justify-center normal-case"
            >
              {busy ? "…" : mode === "login" ? "enter" : "create access"}
            </TerminalButton>
          </form>
        </CRTFrame>
      </div>
    </div>
  );
}
