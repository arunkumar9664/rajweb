import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Award } from "lucide-react";
import prisma from "@/infrastructure/database/prisma";
import { getCurrentUser } from "@/security/auth/session";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { StatusBadge } from "@/shared/components/ui/status-badge";
import { formatDate } from "@/lib/utils";
import { CoachAccountForm } from "./coach-account-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Coach Registration",
  description: "Register as a coach or view your coach registration status.",
};

export default async function AccountCoachPage() {
  const authUser = await getCurrentUser();
  if (!authUser) redirect("/account/login");

  const [user, coach] = await Promise.all([
    prisma.user.findUnique({ where: { id: authUser.id }, select: { name: true, email: true, phone: true } }),
    prisma.coach.findUnique({
      where: { userId: authUser.id },
      include: {
        district: true,
        certificates: { where: { isRevoked: false }, orderBy: { issuedAt: "desc" }, take: 1 },
      },
    }),
  ]);
  if (!user) redirect("/account/login");

  if (coach) {
    const certificate = coach.certificates[0];
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-primary">Coach Registration</h1>
          <p className="text-slate-500">You already have a coach registration.</p>
        </div>
        <Card className="mx-auto max-w-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>{coach.name}</CardTitle>
            <StatusBadge status={coach.status} />
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="text-slate-500">Coach ID:</span> <span className="font-medium">{coach.coachId}</span></p>
            <p><span className="text-slate-500">District:</span> <span className="font-medium">{coach.district.name}</span></p>
            <p><span className="text-slate-500">Certification Level:</span> <span className="font-medium">{coach.certificationLevel.replace("_", " ")}</span></p>
            <p><span className="text-slate-500">Submitted:</span> <span className="font-medium">{formatDate(coach.createdAt)}</span></p>
            <div className="border-t border-slate-100 pt-3">
              {certificate ? (
                <div className="flex items-center gap-2 text-green-700">
                  <Award className="h-4 w-4 shrink-0" />
                  <span>
                    Certificate issued —{" "}
                    <Link href={`/verify?certificateNumber=${certificate.certificateNumber}`} className="underline">
                      {certificate.certificateNumber}
                    </Link>
                  </span>
                </div>
              ) : (
                <p className="text-slate-500">Certificate will be available once issued by the association.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Coach Registration</h1>
        <p className="text-slate-500">Register as a coach with the Rajasthan Racquetball Association.</p>
      </div>
      <Card className="mx-auto max-w-2xl">
        <CardContent className="pt-6">
          <CoachAccountForm prefill={{ name: user.name, email: user.email, phone: user.phone ?? "" }} />
        </CardContent>
      </Card>
    </div>
  );
}
