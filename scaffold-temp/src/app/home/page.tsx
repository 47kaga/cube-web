import { redirect } from "next/navigation";
import { AnalogShell } from "@/components/cube/AnalogShell";
import { DashboardMenu } from "@/components/cube/DashboardMenu";
import { HomeCorruptionFragment } from "@/components/cube/HomeCorruptionFragment";
import { HomeSystemBar } from "@/components/cube/HomeSystemBar";
import { Leaderboard } from "@/components/cube/Leaderboard";
import { LogoutControl } from "@/components/cube/LogoutControl";
import { ProgressPanel } from "@/components/cube/ProgressPanel";
import { SystemNoticeStrip } from "@/components/cube/SystemNoticeStrip";
import { getCurrentUser, isEpisode1Complete } from "@/lib/auth";
import { getLeaderboard } from "@/lib/leaderboard";

export default async function HomePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/");

  const episode1Complete = await isEpisode1Complete(user.id);
  const board = await getLeaderboard();
  const missionHref = "/act/1/episode/1";

  return (
    <main className="home-console relative min-h-[100dvh] bg-[#020202] px-4 py-8 md:px-10 md:py-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.055] mix-blend-overlay crt-scanlines"
        aria-hidden
      />
      <div className="relative mx-auto max-w-5xl space-y-4">
        <HomeSystemBar />
        <SystemNoticeStrip />
        <div className="flex items-center gap-2 border border-[#3a2020] bg-[#120808] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-[#b07070]">
          <span className="inline-block h-1 w-8 bg-[#6a3030]" aria-hidden />
          <span>channel integrity: degraded</span>
        </div>

        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[#1f1f1f] pb-4 pt-1">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#5a5a5a]">
              O-SYSTEMS // INTERNAL BACKEND
            </p>
            <h1 className="mt-1 font-mono text-base uppercase tracking-[0.12em] text-[#d8d8d0] md:text-lg">
              OPERATOR DASHBOARD
            </h1>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[#4a4a4a]">
              LOCAL CONSOLE · TRANSMISSION ACCESS
            </p>
          </div>
          <LogoutControl />
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <AnalogShell className="p-5 md:p-6">
            <p className="mb-3 border-b border-[#222] pb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#5a5a5a]">
              navigation // command rows
            </p>
            <DashboardMenu missionHref={missionHref} />
          </AnalogShell>

          <div className="space-y-5">
            <ProgressPanel
              username={user.username}
              episode1Complete={episode1Complete}
            />
            <Leaderboard rows={board} currentUserId={user.id} />
            <HomeCorruptionFragment />
          </div>
        </div>
      </div>
    </main>
  );
}
