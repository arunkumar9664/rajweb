import type { Metadata } from "next";
import { redirect } from "next/navigation";
import prisma from "@/infrastructure/database/prisma";
import { getCurrentUser } from "@/security/auth/session";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { StatusBadge } from "@/shared/components/ui/status-badge";
import { formatDate } from "@/lib/utils";
import { ClubMembershipForm } from "./club-membership-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Club Membership",
  description: "Apply for club membership or view your application status.",
};

export default async function AccountClubMembershipPage() {
  const authUser = await getCurrentUser();
  if (!authUser) redirect("/account/login");

  const [user, membership] = await Promise.all([
    prisma.user.findUnique({ where: { id: authUser.id }, select: { name: true, email: true, phone: true } }),
    prisma.clubMembership.findUnique({ where: { userId: authUser.id }, include: { district: true } }),
  ]);
  if (!user) redirect("/account/login");

  if (membership) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-primary">Club Membership</h1>
          <p className="text-slate-500">You already have a club membership application.</p>
        </div>
        <Card className="mx-auto max-w-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>{membership.clubName}</CardTitle>
            <StatusBadge status={membership.status} />
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="text-slate-500">Membership ID:</span> <span className="font-medium">{membership.membershipId}</span></p>
            <p><span className="text-slate-500">District:</span> <span className="font-medium">{membership.district.name}</span></p>
            <p><span className="text-slate-500">Contact Person:</span> <span className="font-medium">{membership.contactPerson}</span></p>
            <p><span className="text-slate-500">Courts:</span> <span className="font-medium">{membership.numberOfCourts}</span></p>
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
        <h1 className="text-2xl font-bold text-primary">Club Membership</h1>
        <p className="text-slate-500">Apply for club affiliation with the Rajasthan Racquetball Association.</p>
      </div>
      <Card className="mx-auto max-w-2xl">
        <CardContent className="pt-6">
          <ClubMembershipForm prefill={{ contactPerson: user.name, email: user.email, phone: user.phone ?? "" }} />
        </CardContent>
      </Card>
    </div>
  );
}
