import { redirect } from "next/navigation";
import { EvidenceDossier } from "@/components/cube/EvidenceDossier";
import { getCurrentUser } from "@/lib/auth";
import {
  EPISODE_1_CONVERSATION,
  EPISODE_1_TITLE,
} from "@/content/episode1-placeholder";

export default async function Episode1EvidencePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/");

  return (
    <main className="min-h-[100dvh] bg-[#0a0a0a] px-4 py-10 md:px-8">
      <EvidenceDossier
        episodeTitle={EPISODE_1_TITLE}
        conversation={EPISODE_1_CONVERSATION}
      />
    </main>
  );
}
