import { redirect } from "next/navigation";
import { AuthPortal } from "@/components/cube/AuthPortal";
import { getSessionFromCookies } from "@/lib/auth";

export default async function LandingPage() {
  const session = await getSessionFromCookies();
  if (session) redirect("/home");
  return <AuthPortal />;
}
