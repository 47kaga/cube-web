/** Static atmospheric fragment — not gameplay. */
export function HomeCorruptionFragment() {
  return (
    <div className="border border-[#2a2224] bg-[#080608] p-2.5 font-mono text-[9px] leading-snug text-[#5a4a50] shadow-[inset_0_0_12px_rgba(0,0,0,0.45)]">
      <span className="text-[#4a3a40]">mem_seg</span>{" "}
      <span className="text-[#6a3040] line-through decoration-[#4a3038]">
        CHAIN_OK
      </span>{" "}
      <span className="animate-pulse text-[#5a4a68]">???</span>
      <span className="mt-1 block text-[#3a3538]">[fragment unreadable]</span>
    </div>
  );
}
