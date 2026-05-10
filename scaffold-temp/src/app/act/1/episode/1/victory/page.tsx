import { redirect } from "next/navigation";
import { AnalogShell } from "@/components/cube/AnalogShell";
import { TypewriterDialogue } from "@/components/cube/TypewriterDialogue";
import {
  getCurrentUser,
  isEpisode1Complete,
} from "@/lib/auth";
import { VICTORY_OUV_TEXT } from "@/content/episode1-placeholder";

export default async function Episode1VictoryPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/");
  if (!(await isEpisode1Complete(user.id))) {
    redirect("/home");
  }

  return (
    <main className="min-h-[100dvh] flex items-center justify-center bg-black px-4 py-12">
      <AnalogShell className="w-full max-w-lg p-6 md:p-8">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-[#5a5a5a]">
          sealed response // {user.username}
        </p>
        <TypewriterDialogue text={VICTORY_OUV_TEXT} />
      </AnalogShell>
    </main>
  );
}
