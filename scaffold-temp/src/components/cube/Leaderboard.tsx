import type { LeaderboardRow } from "@/lib/leaderboard";

type Props = {
  rows: LeaderboardRow[];
  currentUserId: string;
};

export function Leaderboard({ rows, currentUserId }: Props) {
  return (
    <section
      className="border border-[#333] bg-[#080808] p-4 font-mono text-xs"
      aria-label="Leaderboard"
    >
      <p className="text-[#6a6a6a] uppercase tracking-widest mb-3">
        Transmission ranking
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="text-[#5a5a5a] border-b border-[#222]">
              <th className="py-1 pr-2 font-normal">#</th>
              <th className="py-1 pr-2 font-normal">OPERATOR</th>
              <th className="py-1 font-normal">PROGRESS</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.userId}
                className={
                  r.userId === currentUserId
                    ? "text-[#dcd0ff] bg-[#120a18]"
                    : "text-[#bdbdbd]"
                }
              >
                <td className="py-1 pr-2 align-top text-[#6a6a6a]">{r.rank}</td>
                <td className="py-1 pr-2 align-top">{r.username}</td>
                <td className="py-1 align-top">
                  {r.episode1Complete
                    ? "ACT 1 / EP 1 ✓"
                    : "ACT 1 / EP 1 …"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
