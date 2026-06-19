"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LayoutDashboard, LogIn, LogOut } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

const ADMIN_ROLES = new Set([
  "super-admin",
  "federation-admin",
  "district-admin",
  "tournament-manager",
  "content-manager",
]);

export function HeaderAuth() {
  const { data: session, status } = useSession();
  const role = session?.user?.role as string | undefined;
  const isAdmin = role && ADMIN_ROLES.has(role);

  if (status === "loading") {
    return (
      <Button variant="ghost" size="sm" disabled className="hidden lg:inline-flex">
        ...
      </Button>
    );
  }

  if (session?.user && isAdmin) {
    return (
      <div className="hidden items-center gap-2 lg:flex">
        <span className="max-w-[140px] truncate text-xs text-slate-500" title={session.user.email ?? undefined}>
          {session.user.name}
        </span>
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin">
            <LayoutDashboard className="mr-1.5 h-4 w-4" />
            Dashboard
          </Link>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: "/" })}>
          <LogOut className="mr-1.5 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button variant="ghost" size="sm" className="hidden lg:inline-flex" asChild>
      <Link href="/login">
        <LogIn className="mr-1.5 h-4 w-4" />
        Admin Login
      </Link>
    </Button>
  );
}

export function MobileHeaderAuth({ onNavigate }: { onNavigate?: () => void }) {
  const { data: session, status } = useSession();
  const role = session?.user?.role as string | undefined;
  const isAdmin = role && ADMIN_ROLES.has(role);

  if (status === "loading") return null;

  if (session?.user && isAdmin) {
    return (
      <div className="flex flex-col gap-2 border-t border-slate-200 pt-4">
        <p className="px-1 text-xs text-slate-500">Signed in as {session.user.name}</p>
        <Button variant="outline" asChild onClick={onNavigate}>
          <Link href="/admin">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Admin Dashboard
          </Link>
        </Button>
        <Button variant="ghost" onClick={() => signOut({ callbackUrl: "/" })}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className="border-t border-slate-200 pt-4">
      <Button variant="outline" className="w-full" asChild onClick={onNavigate}>
        <Link href="/login">
          <LogIn className="mr-2 h-4 w-4" />
          Admin Login
        </Link>
      </Button>
    </div>
  );
}
