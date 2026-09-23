import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";
import prisma from "@/infrastructure/database/prisma";
import { getCurrentUser } from "@/security/auth/session";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import {
  calculateProfileCompletion,
  PROFILE_FIELD_LABELS,
} from "@/modules/account/profile-completion";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My Dashboard",
  description: "Your RRA account dashboard.",
};

const registrationLinks = [
  { label: "Register as a Player", href: "/account/player" },
  { label: "Register as a Coach", href: "/account/coach" },
  { label: "Club Membership", href: "/account/memberships/club" },
  { label: "School Membership", href: "/account/memberships/school" },
  { label: "Academy Membership", href: "/account/memberships/academy" },
];

export default async function AccountDashboardPage() {
  const authUser = await getCurrentUser();
  if (!authUser) redirect("/account/login");

  const user = await prisma.user.findUnique({
    where: { id: authUser.id },
    include: { profile: true },
  });
  if (!user) redirect("/account/login");

  const completion = calculateProfileCompletion({
    name: user.name,
    phone: user.phone,
    profile: user.profile,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Welcome, {user.name.split(" ")[0]}</h1>
        <p className="text-slate-500">Manage your RRA registrations and applications from here.</p>
      </div>

      {completion.percent < 100 && (
        <Card className="border-accent/30 bg-accent/5">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-primary">Profile Completion</p>
              <p className="text-sm font-semibold text-primary">{completion.percent}%</p>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-accent transition-all"
                style={{ width: `${completion.percent}%` }}
              />
            </div>
            <div>
              <p className="mb-2 text-sm text-slate-600">Complete your profile to continue.</p>
              <ul className="grid gap-1.5 sm:grid-cols-2">
                {(["name", "phone", "address", "city", "state", "pincode"] as const).map((field) => {
                  const isMissing = completion.missing.includes(field);
                  return (
                    <li key={field} className="flex items-center gap-2 text-sm">
                      {isMissing ? (
                        <XCircle className="h-4 w-4 shrink-0 text-slate-400" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
                      )}
                      <span className={isMissing ? "text-slate-500" : "text-slate-700"}>
                        {PROFILE_FIELD_LABELS[field]}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <Button asChild>
              <Link href="/account/profile">Complete Profile</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {completion.percent === 100 && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="flex items-center gap-3 p-6">
            <CheckCircle2 className="h-6 w-6 shrink-0 text-green-600" />
            <p className="text-sm font-medium text-green-800">
              Your profile is complete.{" "}
              <Link href="/account/profile" className="underline hover:text-green-900">
                Edit details
              </Link>
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {registrationLinks.map((link) => (
            <Button key={link.href} variant="outline" asChild className="justify-start">
              <Link href={link.href} prefetch>
                {link.label}
              </Link>
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Applications &amp; Certificates</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <Button variant="outline" asChild className="justify-start">
            <Link href="/account/applications" prefetch>
              View My Applications
            </Link>
          </Button>
          <Button variant="outline" asChild className="justify-start">
            <Link href="/account/certificates" prefetch>
              View My Certificates
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
