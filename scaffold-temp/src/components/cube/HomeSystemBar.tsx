export function HomeSystemBar() {
  return (
    <div className="border border-[#2a2a2a] bg-[#060606] px-3 py-2 font-mono text-[10px] uppercase tracking-wide text-[#7a7a7a] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
        <span className="tracking-[0.2em] text-[#9a8a6a]">
          O-SYSTEMS // LOCAL CONSOLE
        </span>
        <span className="text-[#5a5a5a]">|</span>
        <span>NODE: UNVERIFIED</span>
        <span className="text-[#5a5a5a]">|</span>
        <span>ACCESS: CHILD-LEVEL</span>
        <span className="text-[#5a5a5a]">|</span>
        <span className="text-[#8a6a4a]">SIGNAL: DEGRADED</span>
        <span className="text-[#5a5a5a]">|</span>
        <span className="text-[#6b9a72]">SESSION: ACTIVE</span>
        <span className="ml-auto flex items-center gap-1.5 text-[#4a6a4a]">
          <span
            className="inline-block h-1.5 w-1.5 animate-pulse rounded-[1px] bg-[#3d7a4a] shadow-[0_0_6px_rgba(61,122,74,0.6)]"
            aria-hidden
          />
          <span className="normal-case tracking-normal text-[9px] text-[#555]">
            pulse
          </span>
        </span>
      </div>
    </div>
  );
}
