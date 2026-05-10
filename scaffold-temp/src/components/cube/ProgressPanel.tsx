type Props = {
  username: string;
  episode1Complete: boolean;
};

export function ProgressPanel({ username, episode1Complete }: Props) {
  return (
    <section
      className="border border-[#333] bg-[#080808] p-4 font-mono text-xs text-[#bdbdbd]"
      aria-label="Progress"
    >
      <p className="text-[#6a6a6a] uppercase tracking-widest mb-2">
        Cube Children // roster
      </p>
      <p className="text-[#c9f7cf] mb-3">
        Welcome, <span className="text-[#fff]">{username}</span>
      </p>
      <div className="grid gap-2 border-t border-[#222] pt-3">
        <div className="flex justify-between gap-4">
          <span className="text-[#7a7a7a]">ACT</span>
          <span>01</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[#7a7a7a]">EPISODE</span>
          <span>01 — SIGNAL CACHE</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[#7a7a7a]">STATUS</span>
          <span
            className={
              episode1Complete ? "text-[#c9a0ff]" : "text-[#7ddf9a] animate-pulse"
            }
          >
            {episode1Complete ? "ARCHIVED // COMPLETE" : "IN PROGRESS"}
          </span>
        </div>
      </div>
    </section>
  );
}
