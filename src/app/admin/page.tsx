import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Users, UserCheck, GraduationCap, Trophy, Building2, Newspaper } from "lucide-react";
import { requireAdminScope } from "@/security/rbac/admin-scope";

async function getStats(districtId?: string) {
  try {
    const { default: prisma } = await import("@/infrastructure/database/prisma");
    const districtWhere = districtId ? { districtId } : {};
    const [players, coaches, tournaments, clubMemberships, news, pendingPlayers] = await Promise.all([
      prisma.player.count({ where: districtWhere }),
      prisma.coach.count({ where: districtWhere }),
      prisma.tournament.count({ where: districtId ? { districtId } : {} }),
      prisma.clubMembership.count({ where: districtWhere }),
      prisma.news.count({ where: { isPublished: true } }),
      prisma.player.count({ where: { ...districtWhere, status: "PENDING" } }),
    ]);
    return { players, coaches, tournaments, clubMemberships, news, pendingPlayers };
  } catch {
    return { players: 0, coaches: 0, tournaments: 0, clubMemberships: 0, news: 0, pendingPlayers: 0 };
  }
}

export default async function AdminDashboard() {
  const { districtId } = await requireAdminScope();
  const stats = await getStats(districtId);

  const cards = [
    { title: "Total Players", value: stats.players, icon: UserCheck, color: "text-blue-600" },
    { title: "Pending Approvals", value: stats.pendingPlayers, icon: Users, color: "text-secondary" },
    { title: "Coaches", value: stats.coaches, icon: GraduationCap, color: "text-green-600" },
    { title: "Tournaments", value: stats.tournaments, icon: Trophy, color: "text-accent" },
    { title: "Club Memberships", value: stats.clubMemberships, icon: Building2, color: "text-purple-600" },
    { title: "Published News", value: stats.news, icon: Newspaper, color: "text-indigo-600" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
        <p className="text-slate-500">Welcome to RRA Admin Panel</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">{card.title}</CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {[
              { label: "Review Players", href: "/admin/players" },
              { label: "Manage Tournaments", href: "/admin/tournaments" },
              { label: "Publish News", href: "/admin/media" },
              { label: "Issue Certificates", href: "/admin/certificates" },
            ].map((action) => (
              <a
                key={action.href}
                href={action.href}
                className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-primary transition-colors hover:bg-slate-50"
              >
                {action.label}
              </a>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Platform</span>
              <span className="font-medium">RRA Federation Portal v1.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Environment</span>
              <span className="font-medium">{process.env.NODE_ENV}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Database</span>
              <span className="font-medium">PostgreSQL + Prisma</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
