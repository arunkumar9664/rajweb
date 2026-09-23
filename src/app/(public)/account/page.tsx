import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PageHeader, PageContent } from "@/shared/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { getCurrentUser } from "@/security/auth/session";
import { SignOutButton } from "./sign-out-button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My Account",
  description: "Your RRA account.",
};

const registrationLinks = [
  { label: "Register as a Player", href: "/register/player" },
  { label: "Register as a Coach", href: "/register/coach" },
  { label: "Club Membership", href: "/membership/club" },
  { label: "School Membership", href: "/membership/school" },
  { label: "Academy Membership", href: "/membership/academy" },
];

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/account/login");

  return (
    <>
      <PageHeader eyebrow="Your Account" title={`Welcome, ${user.name}`} description={user.email} />
      <PageContent>
        <div className="mx-auto grid max-w-3xl gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <span className="text-slate-500">Name:</span> <span className="font-medium">{user.name}</span>
              </p>
              <p>
                <span className="text-slate-500">Email:</span> <span className="font-medium">{user.email}</span>
              </p>
              <div className="pt-4">
                <SignOutButton />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Register with RRA</CardTitle>
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
        </div>
      </PageContent>
    </>
  );
}
