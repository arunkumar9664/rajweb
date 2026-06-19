import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { requireAdminScope } from "@/security/rbac/admin-scope";
import { PERMISSIONS } from "@/security/rbac/permissions";
import { playerCertDistrictWhere, coachCertDistrictWhere } from "@/security/rbac/district-scope";
import { hasPermission } from "@/security/rbac/permissions";
import { getStorage } from "@/infrastructure/storage/storage-adapter";
import { formatDate } from "@/lib/utils";
import { IssueCertificateButton } from "@/shared/components/admin/issue-player-certificate-modal";

async function getCertificates(districtId?: string) {
  try {
    const { default: prisma } = await import("@/infrastructure/database/prisma");
    const [playerCerts, coachCerts] = await Promise.all([
      prisma.playerCertificate.findMany({
        where: playerCertDistrictWhere(districtId),
        include: { player: true },
        orderBy: { issuedAt: "desc" },
        take: 50,
      }),
      prisma.coachCertificate.findMany({
        where: coachCertDistrictWhere(districtId),
        include: { coach: true },
        orderBy: { issuedAt: "desc" },
        take: 50,
      }),
    ]);
    return { playerCerts, coachCerts };
  } catch {
    return { playerCerts: [], coachCerts: [] };
  }
}

async function getEligiblePlayers(districtId?: string) {
  try {
    const { default: prisma } = await import("@/infrastructure/database/prisma");
    const players = await prisma.player.findMany({
      where: {
        status: "APPROVED",
        ...(districtId ? { districtId } : {}),
        certificates: { none: { isRevoked: false } },
      },
      include: { district: true },
      orderBy: { name: "asc" },
    });
    return players.map((p) => ({
      id: p.id,
      playerId: p.playerId,
      name: p.name,
      email: p.email,
      district: p.district.name,
    }));
  } catch {
    return [];
  }
}

export default async function AdminCertificatesPage() {
  const { districtId, user } = await requireAdminScope(PERMISSIONS.CERTIFICATES_READ);
  const [{ playerCerts, coachCerts }, eligiblePlayers] = await Promise.all([
    getCertificates(districtId),
    getEligiblePlayers(districtId),
  ]);
  const storage = getStorage();
  const canIssue = hasPermission(user, PERMISSIONS.CERTIFICATES_ISSUE);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Certificates</h1>
          <p className="text-slate-500">Issued player and coach certificates</p>
        </div>
        {canIssue && <IssueCertificateButton players={eligiblePlayers} label="Issue Certificate" />}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Player Certificates ({playerCerts.length})</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-2 pr-3 font-semibold text-slate-600">Cert No.</th>
                    <th className="pb-2 pr-3 font-semibold text-slate-600">Player</th>
                    <th className="pb-2 pr-3 font-semibold text-slate-600">Issued</th>
                    <th className="pb-2 font-semibold text-slate-600">PDF</th>
                  </tr>
                </thead>
                <tbody>
                  {playerCerts.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-slate-500">
                        No player certificates issued yet
                      </td>
                    </tr>
                  ) : (
                    playerCerts.map((c) => (
                      <tr key={c.id} className="border-b border-slate-100">
                        <td className="py-2 pr-3 font-mono text-xs">{c.certificateNumber}</td>
                        <td className="py-2 pr-3">{c.player.name}</td>
                        <td className="py-2 pr-3">{formatDate(c.issuedAt)}</td>
                        <td className="py-2">
                          {c.pdfPath ? (
                            <a href={storage.getUrl(c.pdfPath)} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                              View
                            </a>
                          ) : (
                            <a
                              href={`/verify?certificateNumber=${encodeURIComponent(c.certificateNumber)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent hover:underline"
                            >
                              Verify
                            </a>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Coach Certificates ({coachCerts.length})</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-2 pr-3 font-semibold text-slate-600">Cert No.</th>
                    <th className="pb-2 pr-3 font-semibold text-slate-600">Coach</th>
                    <th className="pb-2 pr-3 font-semibold text-slate-600">Issued</th>
                    <th className="pb-2 font-semibold text-slate-600">PDF</th>
                  </tr>
                </thead>
                <tbody>
                  {coachCerts.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-slate-500">
                        No coach certificates issued yet
                      </td>
                    </tr>
                  ) : (
                    coachCerts.map((c) => (
                      <tr key={c.id} className="border-b border-slate-100">
                        <td className="py-2 pr-3 font-mono text-xs">{c.certificateNumber}</td>
                        <td className="py-2 pr-3">{c.coach.name}</td>
                        <td className="py-2 pr-3">{formatDate(c.issuedAt)}</td>
                        <td className="py-2">
                          {c.pdfPath ? (
                            <a href={storage.getUrl(c.pdfPath)} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                              View
                            </a>
                          ) : (
                            <a
                              href={`/verify?certificateNumber=${encodeURIComponent(c.certificateNumber)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent hover:underline"
                            >
                              Verify
                            </a>
                          )}
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
    </div>
  );
}
