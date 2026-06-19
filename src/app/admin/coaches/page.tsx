import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { requireAdminScope } from "@/security/rbac/admin-scope";
import { PERMISSIONS } from "@/security/rbac/permissions";

async function getCoaches(districtId?: string) {
  try {
    const { default: prisma } = await import("@/infrastructure/database/prisma");
    return prisma.coach.findMany({
      where: districtId ? { districtId } : undefined,
      include: { district: true },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  } catch {
    return [];
  }
}

export default async function AdminCoachesPage() {
  const { districtId } = await requireAdminScope(PERMISSIONS.COACHES_READ);
  const coaches = await getCoaches(districtId);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Coaches</h1>
        <p className="text-slate-500">{coaches.length} registered coaches</p>
      </div>
      <Card>
        <CardHeader><CardTitle>All Coaches</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="pb-3 pr-4 font-semibold text-slate-600">Coach ID</th>
                  <th className="pb-3 pr-4 font-semibold text-slate-600">Name</th>
                  <th className="pb-3 pr-4 font-semibold text-slate-600">Level</th>
                  <th className="pb-3 pr-4 font-semibold text-slate-600">District</th>
                  <th className="pb-3 font-semibold text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {coaches.length === 0 ? (
                  <tr><td colSpan={5} className="py-8 text-center text-slate-500">No coaches registered yet</td></tr>
                ) : (
                  coaches.map((coach) => (
                    <tr key={coach.id} className="border-b border-slate-100">
                      <td className="py-3 pr-4 font-mono text-xs">{coach.coachId}</td>
                      <td className="py-3 pr-4 font-medium">{coach.name}</td>
                      <td className="py-3 pr-4">{coach.certificationLevel.replace("_", " ")}</td>
                      <td className="py-3 pr-4">{coach.district.name}</td>
                      <td className="py-3">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          coach.status === "APPROVED" ? "bg-green-100 text-green-700" :
                          coach.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                          "bg-red-100 text-red-700"
                        }`}>{coach.status}</span>
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
