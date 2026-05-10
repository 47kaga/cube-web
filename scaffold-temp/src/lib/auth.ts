import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { COOKIE_NAME, verifySessionToken } from "@/lib/jwt";

export async function getSessionFromCookies() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function getCurrentUser() {
  const session = await getSessionFromCookies();
  if (!session) return null;
  const user = await prisma.user.findUnique({
    where: { id: session.sub },
    select: { id: true, username: true, createdAt: true },
  });
  return user;
}

export const EPISODE_1 = { act: 1, episode: 1 } as const;

export async function isEpisode1Complete(userId: string) {
  const row = await prisma.progress.findUnique({
    where: {
      userId_actNumber_episodeNumber: {
        userId,
        actNumber: EPISODE_1.act,
        episodeNumber: EPISODE_1.episode,
      },
    },
  });
  return Boolean(row?.completed);
}
