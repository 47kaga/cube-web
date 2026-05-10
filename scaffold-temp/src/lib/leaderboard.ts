import prisma from "@/lib/prisma";

export type LeaderboardRow = {
  rank: number;
  userId: string;
  username: string;
  highestAct: number;
  highestEpisode: number;
  episode1Complete: boolean;
};

function scoreFromProgress(
  rows: { actNumber: number; episodeNumber: number; completed: boolean }[],
) {
  let bestAct = 0;
  let bestEp = 0;
  let ep1 = false;
  for (const r of rows) {
    if (!r.completed) continue;
    if (r.actNumber === 1 && r.episodeNumber === 1) ep1 = true;
    if (
      r.actNumber > bestAct ||
      (r.actNumber === bestAct && r.episodeNumber > bestEp)
    ) {
      bestAct = r.actNumber;
      bestEp = r.episodeNumber;
    }
  }
  return { bestAct, bestEp, ep1 };
}

export async function getLeaderboard(): Promise<LeaderboardRow[]> {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      progress: {
        where: { completed: true },
        select: { actNumber: true, episodeNumber: true, completed: true },
      },
    },
    orderBy: { username: "asc" },
  });

  const scored = users.map((u) => {
    const { bestAct, bestEp, ep1 } = scoreFromProgress(u.progress);
    return {
      userId: u.id,
      username: u.username,
      highestAct: bestAct,
      highestEpisode: bestEp,
      episode1Complete: ep1,
      sortKey: bestAct * 1000 + bestEp,
    };
  });

  scored.sort((a, b) => {
    if (b.sortKey !== a.sortKey) return b.sortKey - a.sortKey;
    return a.username.localeCompare(b.username);
  });

  return scored.map((s, i) => ({
    rank: i + 1,
    userId: s.userId,
    username: s.username,
    highestAct: s.highestAct,
    highestEpisode: s.highestEpisode,
    episode1Complete: s.episode1Complete,
  }));
}
