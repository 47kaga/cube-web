"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutControl() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.replace("/");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={busy}
      className="font-mono text-[10px] uppercase tracking-widest text-[#555] hover:text-[#888] disabled:opacity-40"
    >
      {busy ? "…" : "disconnect session"}
    </button>
  );
}
