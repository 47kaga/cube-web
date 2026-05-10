export function ConfidentialStamp() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-30 overflow-hidden select-none"
      aria-hidden
    >
      <div className="absolute -right-6 top-10 rotate-12 border-4 border-[#333] px-6 py-1 font-mono text-xs font-bold uppercase tracking-[0.35em] text-[#333] opacity-70 mix-blend-multiply dark:mix-blend-screen dark:text-[#888]">
        CONFIDENTIAL
      </div>
      <div className="absolute -left-4 bottom-24 -rotate-6 border-2 border-dashed border-[#555] px-4 py-1 font-mono text-[10px] uppercase tracking-widest text-[#666] opacity-80">
        BURN AFTER USE
      </div>
      <div className="absolute right-8 bottom-8 rotate-[-14deg] font-mono text-[9px] uppercase text-[#777] opacity-60">
        O-SYSTEMS // NO EXPORT PERMITTED
      </div>
    </div>
  );
}
