import { redirect } from "next/navigation";
import { AnalogShell } from "@/components/cube/AnalogShell";
import { DashboardMenu } from "@/components/cube/DashboardMenu";
import { Leaderboard } from "@/components/cube/Leaderboard";
import { LogoutControl } from "@/components/cube/LogoutControl";
import { ProgressPanel } from "@/components/cube/ProgressPanel";
import {
  getCurrentUser,
  isEpisode1Complete,
} from "@/lib/auth";
import { getLeaderboard } from "@/lib/leaderboard";

export default async function HomePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/");

  const episode1Complete = await isEpisode1Complete(user.id);
  const board = await getLeaderboard();
  const missionHref = "/act/1/episode/1";

  const menuItems = [
    { id: "persevere", label: "persevere.", href: missionHref },
    {
      id: "dossier",
      label: "DOSSIER // ACT 1 · EP 1",
      href: "/act/1/episode/1",
    },
  ];

  return (
    <main className="min-h-[100dvh] bg-[#030303] px-4 py-10 md:px-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[#222] pb-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#5a5a5a]">
              O-Systems // local console
            </p>
            <h1 className="mt-1 font-mono text-lg text-[#e4e4e4]">
              operator dashboard
            </h1>
          </div>
          <LogoutControl />
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <AnalogShell className="p-5 md:p-6">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-[#6a6a6a]">
              Navigation
            </p>
            <DashboardMenu items={menuItems} />
          </AnalogShell>

          <div className="space-y-6">
            <ProgressPanel
              username={user.username}
              episode1Complete={episode1Complete}
            />
            <Leaderboard rows={board} currentUserId={user.id} />
          </div>
        </div>
      </div>
    </main>
  );
}
