import type { Metadata } from "next";
import { redirect } from "next/navigation";
import prisma from "@/infrastructure/database/prisma";
import { getCurrentUser } from "@/security/auth/session";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { StatusBadge } from "@/shared/components/ui/status-badge";
import { formatDate } from "@/lib/utils";
import { AcademyMembershipForm } from "./academy-membership-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Academy Membership",
  description: "Apply for academy membership or view your application status.",
};

export default async function AccountAcademyMembershipPage() {
  const authUser = await getCurrentUser();
  if (!authUser) redirect("/account/login");

  const [user, membership] = await Promise.all([
    prisma.user.findUnique({ where: { id: authUser.id }, select: { name: true, email: true, phone: true } }),
    prisma.academyMembership.findUnique({ where: { userId: authUser.id }, include: { district: true } }),
  ]);
  if (!user) redirect("/account/login");

  if (membership) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-primary">Academy Membership</h1>
          <p className="text-slate-500">You already have an academy membership application.</p>
        </div>
        <Card className="mx-auto max-w-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>{membership.academyName}</CardTitle>
            <StatusBadge status={membership.status} />
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="text-slate-500">Membership ID:</span> <span className="font-medium">{membership.membershipId}</span></p>
            <p><span className="text-slate-500">District:</span> <span className="font-medium">{membership.district.name}</span></p>
            <p><span className="text-slate-500">Director:</span> <span className="font-medium">{membership.directorName}</span></p>
            <p><span className="text-slate-500">Submitted:</span> <span className="font-medium">{formatDate(membership.createdAt)}</span></p>
            {membership.approvedAt && (
              <p><span className="text-slate-500">Approved:</span> <span className="font-medium">{formatDate(membership.approvedAt)}</span></p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Academy Membership</h1>
        <p className="text-slate-500">Apply for academy affiliation with the Rajasthan Racquetball Association.</p>
      </div>
      <Card className="mx-auto max-w-2xl">
        <CardContent className="pt-6">
          <AcademyMembershipForm prefill={{ directorName: user.name, email: user.email, phone: user.phone ?? "" }} />
        </CardContent>
      </Card>
    </div>
  );
}
