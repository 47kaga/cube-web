import { redirect } from "next/navigation";
import { AnalogShell } from "@/components/cube/AnalogShell";
import { SubmissionBox } from "@/components/cube/SubmissionBox";
import {
  getCurrentUser,
  isEpisode1Complete,
} from "@/lib/auth";

export default async function Episode1SubmitPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/");
  if (await isEpisode1Complete(user.id)) {
    redirect("/act/1/episode/1/victory");
  }

  return (
    <main className="min-h-[100dvh] bg-[#030303] px-4 py-10 md:px-10">
      <div className="mx-auto max-w-xl space-y-6">
        <header className="font-mono text-xs uppercase tracking-widest text-[#5a5a5a]">
          ACT 1 / EP 1 // submission channel
        </header>
        <AnalogShell className="p-6">
          <SubmissionBox />
        </AnalogShell>
      </div>
    </main>
  );
}
