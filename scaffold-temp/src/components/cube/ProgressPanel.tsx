type Props = {
  username: string;
  episode1Complete: boolean;
};

export function ProgressPanel({ username, episode1Complete }: Props) {
  return (
    <section
      className="border border-[#2a2a2a] bg-[#060606] p-4 font-mono text-xs text-[#bdbdbd] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
      aria-label="Progress"
    >
      <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.35em] text-[#4a4a4a]">
        internal tracking
      </p>
      <p className="mb-3 text-[#6a6a6a] uppercase tracking-widest">
        CUBE CHILDREN // ROSTER
      </p>
      <p className="mb-1 text-[10px] uppercase tracking-wider text-[#5a5a5a]">
        CURRENT OPERATOR
      </p>
      <p className="mb-4 text-[#c9f7cf]">
        <span className="text-[#fff]">{username}</span>
      </p>
      <div className="grid gap-2 border-t border-[#1a1a1a] pt-3">
        <div className="flex justify-between gap-4">
          <span className="text-[#5a5a5a]">ACT INDEX</span>
          <span>01</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[#5a5a5a]">EPISODE SIGNAL</span>
          <span>01 — SIGNAL CACHE</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[#5a5a5a]">ARCHIVE STATUS</span>
          <span
            className={
              episode1Complete
                ? "text-[#c9a0ff]"
                : "text-[#7ddf9a] animate-pulse"
            }
          >
            {episode1Complete ? "ARCHIVED // COMPLETE" : "IN PROGRESS"}
          </span>
        </div>
      </div>
    </section>
  );
}
