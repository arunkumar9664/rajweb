"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  UserCog,
  UserCheck,
  GraduationCap,
  Building2,
  Award,
  Settings,
  LogOut,
  Menu,
  X,
  ArrowLeft,
  ClipboardList,
  User as UserIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig, siteImages } from "@/shared/config/site";
import { LogoImage } from "@/shared/components/ui/media-image";

const navItems = [
  { name: "Dashboard", href: "/account/dashboard", icon: LayoutDashboard },
  { name: "My Profile", href: "/account/profile", icon: UserCog },
  { name: "My Applications", href: "/account/applications", icon: ClipboardList },
  { name: "Player Registration", href: "/account/player", icon: UserCheck, indent: true },
  { name: "Coach Registration", href: "/account/coach", icon: GraduationCap, indent: true },
  { name: "Club Membership", href: "/account/memberships/club", icon: Building2, indent: true },
  { name: "School Membership", href: "/account/memberships/school", icon: Building2, indent: true },
  { name: "Academy Membership", href: "/account/memberships/academy", icon: Building2, indent: true },
  { name: "My Certificates", href: "/account/certificates", icon: Award },
  { name: "Settings", href: "/account/settings", icon: Settings },
];

export function PanelSidebar({
  name,
  email,
  avatar,
}: {
  name: string;
  email: string;
  avatar: string | null;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        className="fixed left-4 top-4 z-50 rounded-md border border-slate-200 bg-white p-2 text-primary shadow-sm lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center gap-2.5 border-b border-slate-100 px-5">
          <div className="flex h-9 w-9 items-center justify-center">
            <LogoImage src={siteImages.logo} alt={siteConfig.name} maxHeight={36} maxWidth={36} />
          </div>
          <div>
            <p className="text-sm font-bold text-primary">{siteConfig.shortName}</p>
            <p className="text-xs text-slate-400">My Account</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "mb-1 flex items-center gap-3 rounded-lg py-2.5 text-sm font-medium transition-colors",
                  item.indent ? "ml-3 px-3" : "px-3",
                  isActive
                    ? "bg-secondary/10 text-secondary"
                    : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-100 p-4">
          <div className="mb-3 flex items-center gap-3 px-1">
            {avatar ? (
              <Image src={avatar} alt={name} width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                <UserIcon className="h-4 w-4" />
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-primary">{name}</p>
              <p className="truncate text-xs text-slate-400">{email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-secondary"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
          <Link
            href="/"
            className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Website
          </Link>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
    </>
  );
}
