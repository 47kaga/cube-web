import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  getSessionFromCookies,
  EPISODE_1,
  isEpisode1Complete,
} from "@/lib/auth";

const CORRECT = "FIRST BREATH";

function normalizeAnswer(s: string) {
  return s.trim().replace(/\s+/g, " ").toUpperCase();
}

export async function POST(request: Request) {
  const session = await getSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: { answer?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const raw = body.answer ?? "";
  if (await isEpisode1Complete(session.sub)) {
    return NextResponse.json(
      { ok: true, alreadyComplete: true, redirect: "/act/1/episode/1/victory" },
      { status: 200 },
    );
  }
  if (normalizeAnswer(raw) !== normalizeAnswer(CORRECT)) {
    return NextResponse.json({ ok: false, error: "incorrect" }, { status: 400 });
  }
  await prisma.progress.upsert({
    where: {
      userId_actNumber_episodeNumber: {
        userId: session.sub,
        actNumber: EPISODE_1.act,
        episodeNumber: EPISODE_1.episode,
      },
    },
    create: {
      userId: session.sub,
      actNumber: EPISODE_1.act,
      episodeNumber: EPISODE_1.episode,
      completed: true,
      completedAt: new Date(),
    },
    update: {
      completed: true,
      completedAt: new Date(),
    },
  });
  return NextResponse.json({
    ok: true,
    redirect: "/act/1/episode/1/victory",
  });
}
