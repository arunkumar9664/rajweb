import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { requireAdminScope } from "@/security/rbac/admin-scope";
import { PERMISSIONS } from "@/security/rbac/permissions";

import { DashboardCard } from "@/shared/components/ui/dashboard-card";
import { DataTable, ColumnDef } from "@/shared/components/ui/data-table";

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

type UserWithRole = Awaited<ReturnType<typeof getUsers>>[number];

export default async function AdminUsersPage() {
  await requireAdminScope(PERMISSIONS.USERS_READ);
  const users = await getUsers();

  const columns: ColumnDef<UserWithRole>[] = [
    { header: "Name", accessorKey: "name", className: "font-medium" },
    { header: "Email", accessorKey: "email" },
    { header: "Role", cell: (u) => u.role.name },
    { header: "District", cell: (u) => u.district?.name || "—" },
    {
      header: "Status",
      cell: (u) => (
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            u.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {u.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Users</h1>
        <p className="text-slate-500">{users.length} system users</p>
      </div>
      <DashboardCard title="All Users">
        <DataTable
          data={users}
          columns={columns}
          keyExtractor={(u) => u.id}
          emptyTitle="No users found"
        />
      </DashboardCard>
    </div>
  );
}
