import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, MapPin, Trophy } from "lucide-react";
import { PageHeader, PageContent } from "@/shared/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";

export const metadata: Metadata = {
  title: "Tournaments",
  description:
    "Upcoming and past racquetball tournaments organized by the Rajasthan Racquetball Association across the state.",
};

const tournaments = [
  {
    name: "Rajasthan State Racquetball Championship 2025",
    date: "March 15–17, 2025",
    location: "Jaipur",
    status: "Upcoming",
    categories: ["Men's Open", "Women's Open", "Junior", "Sub-Junior"],
  },
  {
    name: "RRA Inter-District League — Phase 1",
    date: "February 1–28, 2025",
    location: "Multiple Districts",
    status: "Ongoing",
    categories: ["Men's Team", "Women's Team"],
  },
  {
    name: "Jaipur Open Racquetball Tournament",
    date: "January 10–12, 2025",
    location: "Jaipur",
    status: "Completed",
    categories: ["Men's Open", "Women's Open", "Mixed Doubles"],
  },
  {
    name: "RRA Youth Development Camp & Tournament",
    date: "December 20–22, 2024",
    location: "Jodhpur",
    status: "Completed",
    categories: ["Sub-Junior", "Junior"],
  },
  {
    name: "Kota Invitational Racquetball Open",
    date: "November 8–10, 2024",
    location: "Kota",
    status: "Completed",
    categories: ["Men's Open", "Women's Open"],
  },
  {
    name: "Udaipur Racquetball Classic",
    date: "October 5–7, 2024",
    location: "Udaipur",
    status: "Completed",
    categories: ["Men's Open", "Women's Open", "Senior"],
  },
];

const statusColors: Record<string, string> = {
  Upcoming: "bg-accent/10 text-accent",
  Ongoing: "bg-blue-100 text-blue-700",
  Completed: "bg-slate-100 text-slate-600",
};

export default function TournamentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Tournaments"
        description="State-level racquetball tournaments, leagues, and championships organized by RRA across Rajasthan."
      />
      <PageContent>
        <div className="mb-10 flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/register/player">Register as Player</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Host a Tournament</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {tournaments.map((tournament) => (
            <Card key={tournament.name}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <Trophy className="h-6 w-6 text-secondary" />
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[tournament.status]}`}>
                    {tournament.status}
                  </span>
                </div>
                <CardTitle className="mt-4">{tournament.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="h-4 w-4 text-accent" />
                  {tournament.date}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="h-4 w-4 text-accent" />
                  {tournament.location}
                </div>
                <div className="flex flex-wrap gap-2">
                  {tournament.categories.map((cat) => (
                    <span key={cat} className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                      {cat}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageContent>
    </>
  );
}
