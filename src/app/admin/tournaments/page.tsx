import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { formatDate } from "@/lib/utils";
import { requireAdminScope } from "@/security/rbac/admin-scope";
import { PERMISSIONS, hasPermission } from "@/security/rbac/permissions";
import { isFederationWide } from "@/security/rbac/district-scope";
import { AddTournamentButton } from "@/shared/components/admin/add-tournament-modal";

async function getTournaments(districtId?: string) {
  try {
    const { default: prisma } = await import("@/infrastructure/database/prisma");
    return prisma.tournament.findMany({
      where: districtId ? { districtId } : undefined,
      include: { district: true, _count: { select: { registrations: true } } },
      orderBy: { startDate: "desc" },
    });
  } catch {
    return [];
  }
}

async function getDistricts(districtId?: string) {
  try {
    const { default: prisma } = await import("@/infrastructure/database/prisma");
    return prisma.district.findMany({
      where: districtId ? { id: districtId } : undefined,
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    });
  } catch {
    return [];
  }
}

export default async function AdminTournamentsPage() {
  const { districtId, user } = await requireAdminScope(PERMISSIONS.TOURNAMENTS_READ);
  const [tournaments, districts] = await Promise.all([getTournaments(districtId), getDistricts(districtId)]);
  const canManage = hasPermission(user, PERMISSIONS.TOURNAMENTS_MANAGE);
  const lockedDistrictId = !isFederationWide(user) ? user.districtId ?? undefined : undefined;

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Tournaments</h1>
          <p className="text-slate-500">{tournaments.length} tournaments</p>
        </div>
        {canManage && (
          <AddTournamentButton districts={districts} lockedDistrictId={lockedDistrictId} />
        )}
      </div>
      <Card>
        <CardHeader><CardTitle>All Tournaments</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="pb-3 pr-4 font-semibold text-slate-600">Name</th>
                  <th className="pb-3 pr-4 font-semibold text-slate-600">Category</th>
                  <th className="pb-3 pr-4 font-semibold text-slate-600">District</th>
                  <th className="pb-3 pr-4 font-semibold text-slate-600">Dates</th>
                  <th className="pb-3 pr-4 font-semibold text-slate-600">Registrations</th>
                  <th className="pb-3 font-semibold text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {tournaments.length === 0 ? (
                  <tr><td colSpan={6} className="py-8 text-center text-slate-500">No tournaments yet</td></tr>
                ) : (
                  tournaments.map((t) => (
                    <tr key={t.id} className="border-b border-slate-100">
                      <td className="py-3 pr-4 font-medium">{t.name}</td>
                      <td className="py-3 pr-4">{t.category}</td>
                      <td className="py-3 pr-4">{t.district?.name ?? "State-wide"}</td>
                      <td className="py-3 pr-4">{formatDate(t.startDate)} - {formatDate(t.endDate)}</td>
                      <td className="py-3 pr-4">{t._count.registrations}</td>
                      <td className="py-3">
                        <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                          {t.status.replace(/_/g, " ")}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
