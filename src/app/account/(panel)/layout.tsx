import { redirect } from "next/navigation";
import { getCurrentUser } from "@/security/auth/session";
import prisma from "@/infrastructure/database/prisma";
import { PanelSidebar } from "./panel-sidebar";

export const dynamic = "force-dynamic";

export default async function AccountPanelLayout({ children }: { children: React.ReactNode }) {
  const authUser = await getCurrentUser();
  if (!authUser) redirect("/account/login");

  const user = await prisma.user.findUnique({
    where: { id: authUser.id },
    select: { name: true, email: true, avatar: true },
  });
  if (!user) redirect("/account/login");

  return (
    <div className="min-h-screen bg-slate-50">
      <PanelSidebar name={user.name} email={user.email} avatar={user.avatar} />
      <main className="lg:pl-64">
        <div className="mx-auto max-w-5xl px-4 py-8 pt-20 sm:px-6 lg:px-8 lg:pt-8">{children}</div>
      </main>
    </div>
  );
}
