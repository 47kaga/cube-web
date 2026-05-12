import type { LeaderboardRow } from "@/lib/leaderboard";

type Props = {
  rows: LeaderboardRow[];
  currentUserId: string;
};

export function Leaderboard({ rows, currentUserId }: Props) {
  return (
    <section
      className="border border-[#2a2a2a] bg-[#060606] p-4 font-mono text-xs shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
      aria-label="Leaderboard"
    >
      <p className="mb-0.5 font-mono text-[9px] uppercase tracking-[0.35em] text-[#4a4a4a]">
        OPERATOR PROGRESSION
      </p>
      <p className="mb-3 text-[#6a6a6a] uppercase tracking-widest">
        TRANSMISSION RANKING
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[#1a1a1a] text-[#4a4a4a]">
              <th className="py-1.5 pr-2 font-normal">#</th>
              <th className="py-1.5 pr-2 font-normal">OPERATOR</th>
              <th className="py-1.5 font-normal">PROGRESS</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.userId}
                className={
                  r.userId === currentUserId
                    ? "bg-[#100818] text-[#dcd0ff]"
                    : "text-[#b0b0b0]"
                }
              >
                <td className="py-1.5 pr-2 align-top text-[#5a5a5a]">
                  {r.rank}
                </td>
                <td className="py-1.5 pr-2 align-top">{r.username}</td>
                <td className="py-1.5 align-top">
                  {r.episode1Complete ? "ACT 1 / EP 1 ✓" : "ACT 1 / EP 1 …"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
