"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

type Props = {
  username: string;
  actSlug: string;
  episodeSlug: string;
  onOpenChange?: (open: boolean) => void;
};

function safeUser(username: string) {
  return username.replace(/[^a-zA-Z0-9_-]/g, "_");
}

function storageKeyNew(
  username: string,
  actSlug: string,
  episodeSlug: string,
) {
  return `cube-operator-notes:${safeUser(username)}:${actSlug}-${episodeSlug}`;
}

function storageKeyOld(
  username: string,
  actSlug: string,
  episodeSlug: string,
) {
  return `cube-notes:${safeUser(username)}:${actSlug}-${episodeSlug}`;
}

function slugLabel(slug: string, prefix: string) {
  const n = /\d+/.exec(slug)?.[0] ?? "?";
  return `${prefix} ${n.padStart(2, "0")}`;
}

/** Panel width in px — must match closed-state translate. */
const OPERATOR_NOTES_PANEL_PX = 520;

function loadNotesWithMigration(
  username: string,
  actSlug: string,
  episodeSlug: string,
): string {
  const newKey = storageKeyNew(username, actSlug, episodeSlug);
  const oldKey = storageKeyOld(username, actSlug, episodeSlug);
  try {
    let raw = localStorage.getItem(newKey);
    if (raw != null && raw !== "") return raw;
    const legacy = localStorage.getItem(oldKey);
    if (legacy != null && legacy !== "") {
      localStorage.setItem(newKey, legacy);
      localStorage.removeItem(oldKey);
      return legacy;
    }
  } catch {
    /* ignore */
  }
  return "";
}

export function FieldNotesDrawer({
  username,
  actSlug,
  episodeSlug,
  onOpenChange,
}: Props) {
  const baseId = useId();
  const panelId = `${baseId}-panel`;
  const tabId = `${baseId}-tab`;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">(
    "idle",
  );
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipPersistAfterHydrate = useRef(true);

  const key = storageKeyNew(username, actSlug, episodeSlug);
  const oldKey = storageKeyOld(username, actSlug, episodeSlug);

  const setOpenBoth = useCallback(
    (next: boolean) => {
      setOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange],
  );

  useEffect(() => {
    const initial = loadNotesWithMigration(username, actSlug, episodeSlug);
    if (initial) setValue(initial);
    setHydrated(true);
  }, [username, actSlug, episodeSlug]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenBoth(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpenBoth]);

  useEffect(() => {
    if (!hydrated) return;
    if (skipPersistAfterHydrate.current) {
      skipPersistAfterHydrate.current = false;
      return;
    }
    setSaveState("saving");
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(key, value);
        setSaveState("saved");
        window.setTimeout(() => setSaveState("idle"), 1600);
      } catch {
        setSaveState("idle");
      }
    }, 400);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [value, hydrated, key]);

  function clearNotes() {
    if (
      !window.confirm(
        "Clear all operator notes in this buffer? This cannot be undone.",
      )
    ) {
      return;
    }
    skipPersistAfterHydrate.current = false;
    setValue("");
    try {
      localStorage.removeItem(key);
      localStorage.removeItem(oldKey);
    } catch {
      /* ignore */
    }
    setSaveState("saved");
    window.setTimeout(() => setSaveState("idle"), 1200);
  }

  return (
    <div className="pointer-events-none fixed left-0 top-24 z-50">
      <div
        className="pointer-events-auto flex flex-row flex-nowrap items-stretch transition-transform duration-300 ease-out"
        style={{
          transform: open
            ? "translateX(0)"
            : `translateX(-${OPERATOR_NOTES_PANEL_PX}px)`,
        }}
      >
        <aside
          id={panelId}
          role="region"
          aria-labelledby={tabId}
          aria-hidden={!open}
          className={[
            "operator-notes-panel flex max-h-[min(560px,calc(100dvh-7rem))] min-h-[430px] w-[520px] shrink-0 flex-col overflow-hidden border border-[#6a6848] border-r-0 bg-[#e4dfbc] shadow-[6px_8px_0_rgba(0,0,0,0.28)]",
            !open ? "pointer-events-none" : "",
          ].join(" ")}
        >
          <NotepadBody
            value={value}
            onChange={setValue}
            saveState={saveState}
            onClear={clearNotes}
            actSlug={actSlug}
            episodeSlug={episodeSlug}
          />
        </aside>

        <button
          type="button"
          id={tabId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpenBoth(!open)}
          className={[
            "operator-notes-tab relative flex h-[11.5rem] w-11 shrink-0 flex-col items-center justify-center border border-[#4a4638] border-l-0 bg-[#c9c49a] py-2 font-mono text-[9px] font-bold uppercase leading-tight tracking-[0.1em] text-[#2a2f28] shadow-[4px_5px_0_rgba(0,0,0,0.24)]",
            "rounded-r-sm outline-none focus-visible:ring-2 focus-visible:ring-[#5a2d72] focus-visible:ring-offset-2 focus-visible:ring-offset-[#c9c49a]",
          ].join(" ")}
        >
          <span
            className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-multiply crt-scanlines"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute inset-0 opacity-[0.1] bg-[radial-gradient(circle_at_30%_20%,rgba(90,80,50,0.2),transparent_50%)]"
            aria-hidden
          />
          <span
            className="relative max-h-[9.5rem] px-0.5 text-center [writing-mode:vertical-rl] rotate-180"
            style={{ textOrientation: "mixed" }}
          >
            OPERATOR NOTES
          </span>
        </button>
      </div>
    </div>
  );
}

function NotepadBody({
  value,
  onChange,
  saveState,
  onClear,
  actSlug,
  episodeSlug,
}: {
  value: string;
  onChange: (v: string) => void;
  saveState: "idle" | "saving" | "saved";
  onClear: () => void;
  actSlug: string;
  episodeSlug: string;
}) {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 23px,
            rgba(60,70,55,0.14) 23px,
            rgba(60,70,55,0.14) 24px
          )`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply crt-scanlines" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_20%_10%,rgba(80,70,40,0.15),transparent_55%)]" />

      <header className="relative z-10 shrink-0 border-b border-[#8a8660] bg-[#d8d2a8] px-3 py-2">
        <div className="flex items-center justify-between gap-2 border border-[#9a9468] bg-[#cec89c] px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-[#3a4038] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
          <span>OPERATOR NOTES // LOCAL</span>
          <span className="text-[#5a6050]">LOCAL BUFFER</span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-0.5 font-mono text-[9px] text-[#4a5248]">
          <span>{slugLabel(actSlug, "ACT")}</span>
          <span className="text-[#7a8068]">|</span>
          <span>{slugLabel(episodeSlug, "EP")}</span>
          <span className="text-[#7a8068]">|</span>
          <span>autosave: local</span>
        </div>
        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="min-h-[1rem] font-mono text-[9px] text-[#5a6258]">
            {saveState === "saving"
              ? "saving…"
              : saveState === "saved"
                ? "saved locally"
                : "\u00a0"}
          </p>
          <button
            type="button"
            onClick={onClear}
            className="border border-[#8b4513] bg-[#5c1f0f] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#f0c8b8] shadow-[1px_1px_0_#2a0a05] hover:bg-[#6e2818]"
          >
            CLEAR NOTES
          </button>
        </div>
      </header>

      <div className="relative z-10 min-h-0 flex-1 overflow-auto p-2">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="h-56 min-h-[12rem] w-full resize-y border border-[#7a7658] bg-[#e8e4c4]/90 p-3 font-mono text-sm leading-[24px] text-[#2a3328] caret-[#3d5c40] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] placeholder:text-[#7a8068]/70 focus:border-[#4a6048] focus:outline-none focus:ring-1 focus:ring-[#4a6048]/40 sm:h-64"
          placeholder="// scratch space…"
          aria-label="Operator notes"
        />
      </div>
    </div>
  );
}
