import { redirect } from "next/navigation";
import { AnalogShell } from "@/components/cube/AnalogShell";
import { BootSequence } from "@/components/cube/BootSequence";
import { getSessionFromCookies } from "@/lib/auth";

export default async function BootPage() {
  const session = await getSessionFromCookies();
  if (!session) redirect("/");
  return (
    <main className="min-h-[100dvh] flex items-center justify-center bg-black px-4 py-10">
      <AnalogShell className="w-full max-w-2xl p-6 md:p-10">
        <BootSequence username={session.username} />
      </AnalogShell>
    </main>
  );
}
