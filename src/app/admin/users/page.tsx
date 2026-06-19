import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { requireAdminScope } from "@/security/rbac/admin-scope";
import { PERMISSIONS } from "@/security/rbac/permissions";

async function getUsers() {
  try {
    const { default: prisma } = await import("@/infrastructure/database/prisma");
    return prisma.user.findMany({
      include: { role: true, district: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function AdminUsersPage() {
  await requireAdminScope(PERMISSIONS.USERS_READ);
  const users = await getUsers();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Users</h1>
        <p className="text-slate-500">{users.length} system users</p>
      </div>
      <Card>
        <CardHeader><CardTitle>All Users</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="pb-3 pr-4 font-semibold text-slate-600">Name</th>
                  <th className="pb-3 pr-4 font-semibold text-slate-600">Email</th>
                  <th className="pb-3 pr-4 font-semibold text-slate-600">Role</th>
                  <th className="pb-3 pr-4 font-semibold text-slate-600">District</th>
                  <th className="pb-3 font-semibold text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-slate-100">
                    <td className="py-3 pr-4 font-medium">{user.name}</td>
                    <td className="py-3 pr-4">{user.email}</td>
                    <td className="py-3 pr-4">{user.role.name}</td>
                    <td className="py-3 pr-4">{user.district?.name || "—"}</td>
                    <td className="py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
