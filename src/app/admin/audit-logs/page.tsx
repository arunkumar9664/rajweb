import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { formatDate } from "@/lib/utils";
import { requireAdminScope } from "@/security/rbac/admin-scope";
import { PERMISSIONS } from "@/security/rbac/permissions";

async function getAuditLogs() {
  try {
    const { default: prisma } = await import("@/infrastructure/database/prisma");
    return prisma.auditLog.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  } catch {
    return [];
  }
}

export default async function AdminAuditLogsPage() {
  await requireAdminScope(PERMISSIONS.AUDIT_READ);
  const logs = await getAuditLogs();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Audit Logs</h1>
        <p className="text-slate-500">System activity tracking</p>
      </div>
      <Card>
        <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="pb-3 pr-4 font-semibold text-slate-600">Time</th>
                  <th className="pb-3 pr-4 font-semibold text-slate-600">User</th>
                  <th className="pb-3 pr-4 font-semibold text-slate-600">Action</th>
                  <th className="pb-3 pr-4 font-semibold text-slate-600">Module</th>
                  <th className="pb-3 font-semibold text-slate-600">Entity</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr><td colSpan={5} className="py-8 text-center text-slate-500">No audit logs yet</td></tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} className="border-b border-slate-100">
                      <td className="py-3 pr-4 whitespace-nowrap">{formatDate(log.createdAt, { hour: "2-digit", minute: "2-digit" })}</td>
                      <td className="py-3 pr-4">{log.user?.name || "System"}</td>
                      <td className="py-3 pr-4">
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium">{log.action}</span>
                      </td>
                      <td className="py-3 pr-4">{log.module}</td>
                      <td className="py-3 font-mono text-xs">{log.entityId || "—"}</td>
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
